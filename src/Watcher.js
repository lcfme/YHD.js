var uid$1 = 0;
var Watcher = function(exp,vm,cb){
    this.exp = exp;
    this.cb = cb;
    this.vm = vm;
    //初始化时，触发添加到监听队列
    this.value = null;
    this.getter = parseExpression(exp).get;
    this.uid = uid$1++;
    this.update();
};

Watcher.prototype = {
    get : function(){
        Dep.target = this;
        /*
        this.getter是parseExpression根据exp生成的差不多这样的一个函数
        function anonymous(scope) {
            return  scope.b.c+1+scope.message;
        }
        */
        var value = this.getter?this.getter(this.vm):'';
        Dep.target = null;
        return value;
    },
    update :function(){
        var newVal = this.get();
        if(this.value != newVal){
            this.cb && this.cb(newVal,this.value);
            this.value = newVal;
        }
    }
};