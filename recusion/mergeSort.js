function mergeSort(arr) {
  let n = arr.length;
  if(n === 1) {
    return arr;
  }
  let m = Number((n/2).toFixed(0));
  let L = mergeSort(arr.slice(0,m));
  let R = mergeSort(arr.slice(m));
  let i=j=0;
  let mArr = [];
  while (i<L.length&&j<R.length) {
    if (L[i]<=R[j]) {
      mArr.push(L[i]);
      i++;
    } else {
      mArr.push(R[j]);
      j++;
    }
  }
  if (i<L.length) {
    mArr.push(...L.slice(i));
  }
  if (j<R.length) {
    mArr.push(...R.slice(j));
  }
  return mArr;
}

process.argv.forEach((val, index, array) => {
  if (index === 2) {
    console.log(mergeSort(JSON.parse(val)));
  }
})