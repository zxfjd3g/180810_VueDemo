function Observer(data) {
  // 保存数据对象
  this.data = data;
  // 启动监视的流程
  this.walk(data);
}

Observer.prototype = {
  walk: function (data) {
    // 保存observer对象
    var me = this;
    // 遍历data中所有属性
    Object.keys(data).forEach(function (key) {
      // 给data重新定义响应式(有监视)的属性
      me.defineReactive(data, key, data[key])
    });
  },

  defineReactive: function (data, key, val) {
    // 创建当前属性对应的dep对象
    var dep = new Dep();
    // 通过间接递归调用实现data中所有层次属性的监视
    var childObj = observe(val);  // 如果value是对象, 就会去监视value对象中的所有属性

    // 给data重新定义属性(添加getter/setter)
    Object.defineProperty(data, key, {
      enumerable: true, // 可枚举
      configurable: false, // 不能再define
      // 建立dep与watcher之间关联关系
      get: function () {
        if (Dep.target) {
          dep.depend();
        }
        return val;
      },
      // 监视data属性值变化, 一旦变化了, 更新所有相关节点
      set: function (newVal) {
        if (newVal === val) {
          return;
        }
        val = newVal;
        // 新的值是object的话，进行监听
        childObj = observe(newVal);
        // 通知所有订阅者
        dep.notify();
      }
    });
  }
};

function observe(value, vm) {
  // 如果value不是对象, 就没有必要进入劫持的流程
  if (!value || typeof value !== 'object') {
    return;
  }
  // 创建一个观察者对象
  return new Observer(value);
};


var uid = 0;

function Dep() {
  this.id = uid++;
  this.subs = [];
}

Dep.prototype = {

  addSub: function (sub) {
    this.subs.push(sub);
  },

  depend: function () {
    Dep.target.addDep(this);
  },

  removeSub: function (sub) {
    var index = this.subs.indexOf(sub);
    if (index != -1) {
      this.subs.splice(index, 1);
    }
  },

  notify: function () {
    // 遍历所有相关的watcher, 并让watcher去更新对应的节点
    this.subs.forEach(function (sub) {
      sub.update();
    });
  }
};

Dep.target = null;