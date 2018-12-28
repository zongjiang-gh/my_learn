// https://tc39.github.io/ecma262/#sec-array.prototype.includes
//关于数组的include方法的polyfill(填充工具)
if(!Array.prototype.includes){
  Object.defineProperties(Array.prototype,'includes',{
    value: function (seachElement, fromIndex) {
      if(this == null){
        throw new TypeError('"this" is null or not defined');
      }
      var o = Object(this);
      var len = o.length >>> 0;
      if(len === 0){
        return false;
      }
      var n = fromIndex | 0;
      var k = Math.max(n >=0 ? n : len - Math.abs(n),0);
      //功能函数
      function sameValueZero(x,y) {
        return x === y || (typeof x === 'number' && typeof y === "number" && isNaN(x) && isNaN(y));
      }
      //循环
      while (k < len){
        //判断
        if (sameValueZero(o[k],seachElement)){
          return true;
        }
        k++;
      }
      return false;
    }
  })
}





