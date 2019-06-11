/**
 * 快速排序
 * 时间复杂度： O(nlogn)
 */

function quickSort(arr) {
  if (arr.length <= 1) { // 这里需要特别注意，有可能l，r为空数组，比如，都比mid小， 或者都比mid大，或者都是mid
    return arr;
  }
  var mid = arr.splice(Math.floor(arr.length / 2), 1);
  var l = [];
  var r = [];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < mid) {
      l.push(arr[i]);
    } else {
      r.push(arr[i]);
    }
  }
  return quickSort(l).concat(mid, quickSort(r));
}

var arr = [8, 8, 8, 8, 8];
var arr1 = [1, 2, 3, 4, 1, 1, 1];
var arr2 = [2, 3, 4, 1, 2, 3, 5];
console.log(quickSort(arr2));