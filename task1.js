const add = (...args) => args.reduce((result, current) => {
  for(let key in current){
      let value = current[key];
      if(!result[key]){
        result[key] = value;
      } else {
        result[key] += value;
      }
  }
  return result;
}, {} );

add(a, b);
