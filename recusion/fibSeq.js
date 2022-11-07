//to run in command line: node fibSeq.js number
function fibs (n) {
  if (n === 1) {
    return [0];
  }
  let arr = [0, 1];
  let i = 2;
  while (arr.length < n) {
    arr.push(arr[i-1]+arr[i-2]);
    i++;
  }
  return arr;
}

function fibsRec(n) {
  if (n === 1) {
    return [0];
  } else if (n === 2) {
    return [0, 1];
  } else {
    let arr = fibsRec(n-1);
    arr.push(arr[n-2]+arr[n-3]);
    return arr;
  }
}

process.argv.forEach((val, index, array) => {
  if(index === 2) {
    console.log('iteration: ', fibs(val));
    console.log('recursive: ', fibsRec(val));
  }
});
