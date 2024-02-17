const HashMap = () => {
  let maxSize = 16;

  let buckets = new Array(maxSize).fill(null).map(()=>[]);

  const hash = (key) => {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i))%maxSize;
    }
    return hashCode;
  }

  const set = (key, value) => {
    let hashkey = hash(key);
    let i = buckets[hashkey].findIndex(obj=>obj.key===key);
    if (i!==-1) {
      buckets[hashkey][i].value=value;
    } else {
      buckets[hashkey].push({key, value});
    }
  }

  const get = (key) => {
    let hashCode = hash(key);
    let result = buckets[hashCode].find(obj=>obj.key===key);
    return result?result.value:null;
  }

  const has = (key) => {
    let hashCode = hash(key);
    return Boolean(buckets[hashCode].find(obj=>obj.key===key));
  }

  const remove = (key) => {
    let hashCode = hash(key);
    let i = buckets[hashCode].findIndex(obj=>obj.key===key);
    if (i===-1) {
      return false;
    } else {
      buckets[hashCode] = [...buckets[hashCode].slice(0, i), ...buckets[hashCode].slice(i+1)];
      return true;
    }
  }

  const length = () => {
    return buckets.reduce((sum,a) => sum+a.length, 0);
  }

  const clear = () => {
    buckets = new Array(maxSize).fill(null).map(()=>[]);
  }

  const keys = () => {
    return buckets.flat().map(obj=>obj.key);
  }

  const values = () => {
    return buckets.flat().map(obj=>obj.value);
  }

  const entries = () => {
    return buckets.flat().map(obj=>[obj.key, obj.value]);
  }

  return {set, get, has, remove, length, clear, keys, values, entries};

}

export {HashMap};