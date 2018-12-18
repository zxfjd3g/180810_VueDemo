function Watcher(vm, exp, cb) {
  this.cb = cb;
  this.vm = vm;
  this.exp = exp;
  this.depIds = {};
  this.value = this.get();
}

Watcher.prototype = {
  update: function () {
    this.run();
  },
  run: function () {
    // 得到表达式最新的值
    var value = this.get();
    // 老值
    var oldVal = this.value;
    // 如果不相同
    if (value !== oldVal) {
      this.value = value;
      // 调用用于更新节点的回调函数
      this.cb.call(this.vm, value, oldVal);
    }
  },
  addDep: function (dep) {
    // 如果dep与watcher的关系还没有建立
    if (!this.depIds.hasOwnProperty(dep.id)) {
      // 建立dep到watcher的关系
      dep.addSub(this);
      // 建立watcher到dep关系
      this.depIds[dep.id] = dep;
    }
  },
  get: function () {
    Dep.target = this;
    var value = this.getVMVal();
    Dep.target = null;
    return value;
  },

  getVMVal: function () {
    var exp = this.exp.split('.');
    var val = this.vm._data;
    exp.forEach(function (k) {
      val = val[k];
    });
    return val;
  }
};
