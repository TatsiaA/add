function intersect(obj1, obj2) {
  let keys = Object.keys(obj1);
  keys.filter(function(x){
      return obj2[x] !== undefined;
  });
  let result = {};
  keys.forEach((key) => {
    if(obj1[key] === obj2[key]){
      result[key] = obj1[key];
    }
  })
  return result;
}

intersect(a, b);
