function Compile(el, vm) {
  // 保存vm
  this.$vm = vm;
  // 保存el元素
  this.$el = this.isElementNode(el) ? el : document.querySelector(el);
  // 如果元素存在
  if (this.$el) {
    // 1. 取出el中所有子节点保存到fragment容器中
    this.$fragment = this.node2Fragment(this.$el);
    // 2. 编译fragment中所层次子节点
    this.init();
    // 3. 将编译fragment添加到el元素中
    this.$el.appendChild(this.$fragment);
  }
}

Compile.prototype = {
  node2Fragment: function (el) {
    var fragment = document.createDocumentFragment(),
      child;

    // 将原生节点拷贝到fragment
    while (child = el.firstChild) {
      fragment.appendChild(child);
    }

    return fragment;
  },

  init: function () {
    this.compileElement(this.$fragment);
  },

  /*
  编译指定元素/fragment的所有子节点
   */
  compileElement: function (el) {
    // 得到所有最外层的子节点
    var childNodes = el.childNodes,
      me = this;
    // 遍历所有子节点
    [].slice.call(childNodes).forEach(function (node) {
      // 得到节点的文本内容
      var text = node.textContent;
      // 定义匹配大括号表达式的正则对象
      var reg = /\{\{(.*)\}\}/;
      // 判断是否是元素节点
      if (me.isElementNode(node)) {
        // 编译元素节点中的指令属性
        me.compile(node);
        // 如果节点是大括号表达式格式的文本节点
      } else if (me.isTextNode(node) && reg.test(text)) {
        // 编译文本节点
        // node: 文本节点对象
        // RegExp.$1: 表达式  name
        me.compileText(node, RegExp.$1);
      }
      // 如果当前子节点还有子节点
      if (node.childNodes && node.childNodes.length) {
        // 递归调用编译的方法==> 实现所有层次子节点的编译
        me.compileElement(node);
      }
    });
  },

  compile: function (node) {
    // 得到所有属性节点
    var nodeAttrs = node.attributes,
      me = this;
    // 遍历每个属性节点
    [].slice.call(nodeAttrs).forEach(function (attr) {
      // 得到属性名: v-on:click
      var attrName = attr.name;
      // 如果是指令属性
      if (me.isDirective(attrName)) {
        // 得到属性值/表达式: test
        var exp = attr.value;
        // 从属性名中截取出指令名: on:click
        var dir = attrName.substring(2);
        // 如果是事件指令
        if (me.isEventDirective(dir)) {
          // 编译事件指令
          compileUtil.eventHandler(node, me.$vm, exp, dir);
          // 普通指令
        } else {
          compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
        }

        // 移除指令属性
        node.removeAttribute(attrName);
      }
    });
  },

  compileText: function (node, exp) {
    compileUtil.text(node, this.$vm, exp);
  },

  isDirective: function (attr) {
    return attr.indexOf('v-') == 0;
  },

  isEventDirective: function (dir) {
    return dir.indexOf('on') === 0;
  },

  isElementNode: function (node) {
    return node.nodeType == 1;
  },

  isTextNode: function (node) {
    return node.nodeType == 3;
  }
};

// 包含n个用于编译模板语法的方法的工具对象
var compileUtil = {
  // 编译 v-text/{{}}
  text: function (node, vm, exp) {
    this.bind(node, vm, exp, 'text');
  },

  // 编译 v-html
  html: function (node, vm, exp) {
    this.bind(node, vm, exp, 'html');
  },

  // 编译 v-model
  model: function (node, vm, exp) {
    // 初始更新节点/创建一个对应的watcher
    this.bind(node, vm, exp, 'model');

    var me = this,
      // 得到表达式对应的值
      val = this._getVMVal(vm, exp);
    // 给节点绑定input事件监听: 输入发生任何改变时调用
    node.addEventListener('input', function (e) {
      // 得到输入的最新值
      var newValue = e.target.value;
      if (val === newValue) {
        return;
      }
      // 将最新的值设置给表达式所对应的属性值 ==> 触发数据绑定的更新流程
      me._setVMVal(vm, exp, newValue);
      val = newValue;
    });
  },

  // 编译 v-class
  class: function (node, vm, exp) {
    this.bind(node, vm, exp, 'class');
  },

  /*
  真正用来编译的方法
  node: 节点对象
  vm: 可以得到数据的vm
  exp: 表达式  name
  dir: 指令名  text/html/class/model
   */
  bind: function (node, vm, exp, dir) {
    // 得到用于更新节点的更新函数
    var updaterFn = updater[dir + 'Updater'];
    // 执行更新函数初始更新节点 ===> 实现初始化显示
    updaterFn && updaterFn(node, this._getVMVal(vm, exp));

    // 为当前编译表达式创建一个对应的watcher
    new Watcher(vm, exp, function (value, oldValue) { // 指定用于更新节点的回调函数
      // 调用updater对象更新函数去更新节点
      updaterFn && updaterFn(node, value, oldValue);
    });
  },

  // 事件处理
  eventHandler: function (node, vm, exp, dir) {
    // 从指令名取出事件名/类型: click
    var eventType = dir.split(':')[1],
      // 根据表达式取出methods中对应的事件处理函数
      fn = vm.$options.methods && vm.$options.methods[exp];
    // 如果都存在
    if (eventType && fn) {
      // 给当前元素节点绑定指定事件中和回调函数(this被指定vm)的DOM事件监听
      node.addEventListener(eventType, fn.bind(vm), false);
    }
  },

  _getVMVal: function (vm, exp) {
    var val = vm._data;
    exp = exp.split('.');
    exp.forEach(function (k) {
      val = val[k];
    });
    return val;
  },

  _setVMVal: function (vm, exp, value) {
    var val = vm._data;
    exp = exp.split('.');
    exp.forEach(function (k, i) {
      // 非最后一个key，更新val的值
      if (i < exp.length - 1) {
        val = val[k];
      } else {
        val[k] = value;
      }
    });
  }
};

// 包含多个用于直接更新节点的方法的对象
var updater = {
  // 更新节点(文本/元素)的textContent属性值
  textUpdater: function (node, value) {
    node.textContent = typeof value == 'undefined' ? '' : value;
  },

  // 更新节点的innerHTML属性值
  htmlUpdater: function (node, value) {
    node.innerHTML = typeof value == 'undefined' ? '' : value;
  },

  // 更新节点的className属性值
  classUpdater: function (node, value, oldValue) {
    var className = node.className;
    node.className = (className ? className+' ' : '') +  value;
  },

  // 更新节点的value属性值
  modelUpdater: function (node, value, oldValue) {
    node.value = typeof value == 'undefined' ? '' : value;
  }
};