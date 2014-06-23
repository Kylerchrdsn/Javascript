// Object 
//****************************************************************************
Object.defineProperty(Object.prototype, 'merge', {
  enumerable: false, value: function(obj){ for(key in obj){ this[key] = obj[key] } }
})

// String 
//****************************************************************************
String.prototype.to_i = function(){
  result = this.valueOf(); result = result.replace(/\..+/, '');
  result = result.replace(/\D/g, ''); return +result; 
}
String.prototype.present=function(){ return (this.valueOf() != '') }
String.prototype.include=function(val){ return (this.search(val) != -1) }

// Number 
//****************************************************************************
Number.prototype.to_s = function(){ return ''+this.valueOf(); }

// Array 
//****************************************************************************
Array.prototype.merge({
  clone        : function(){ var neo = []; for(key in this){ if(this.hasOwnProperty(key)){ neo[key] = this[key] } }; return neo },
  clear        : function(){ for(key in this){ if(this.hasOwnProperty(key)){ this.delete(this[key]) } } },
  uniq         : function(){ return this.intersect(this) },
  uniq_bang    : function(){ return this.intersect_bang(this) },
  empty        : function(){ return (this.length == 0) },
  include      : function(value){ return (this.indexOf(value) != -1) },
  each         : function(yield){ for(var x = 0; x < this.length; x++){ if(typeof(yield(x, this[x])) == 'boolean'){ break } } },
  last         : function() { return this[this.length - 1]; },
  compact      : function(){ var clone = this.clone(); clone.delete(null); return clone },
  compact_bang : function(){ this.delete(null); return this },
  intersect    : function(arry){
    var results = []
    this.each(function(index,element){
      if(arry.include(element) && !results.include(element)){
        results.push(element)
      }
    })
    return results
  },
  intersect_bang: function(rhs){
    var 
      results = [],
      lhs     = this
    ;
    lhs.each(function(index,element){
      if(rhs.include(element) && !results.include(element)){
        results.push(element)
      }
    })
    lhs.clear()
    for(key in results){ if(results.hasOwnProperty(key)){ this[key] = results[key] } }
    return results
  },
  each_slice: function(size, yield){
    if(size == 0){ return [] }
    var times=Math.ceil(this.length/size)
    for(var x = 0; x < times; x++){
      var slice = []
      for(var y = size*x; true; y++){
        if(typeof(this[y]) != 'undefined'){ slice.push(this[y]) }
        if((y%size)+1 == size){ break }
      }
      yield(slice)
    }
  },
  map: function(yield){
    var clone = this.clone()
    for(var x = 0; x < clone.length; clone[x] = yield(x, clone[x++]));
    return clone
  },
  map_bang: function(yield){ 
    for(var x = 0; x < this.length; this[x] = yield(x, this[x++]));
    return this
  },
  shuffle: function(){
    var o = this.clone()
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  },
  shuffle_bang: function(){
    for(var j, x, i = this.length; i; j = Math.floor(Math.random() * i), x = this[--i], this[i] = this[j], this[j] = x);
    return this;
  },
  delete: function(query){
    var arry=this
    while(arry.include(query)){
      arry.each(function(i, e){
        if(query == e){ arry.splice(i, 1); return false }
      })
    }
    return query
  }
})
