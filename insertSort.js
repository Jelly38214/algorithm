/** 
 * 插入排序
 * 
 */

function insertSort(arr) {
  for (var i = 1; i < arr.length; i++) {
    for (var j = i; j > 0; j--) { // 边界为[1, arr.length-1]
      if (arr[j] < arr[j - 1]) {
        var temp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = temp;
      } else {
        break; // 前面是有序的，那么arr[j]比arr[j-1]大，arr[j]就比前面的都大，比如456x, 如果x比6都大，那么肯定比45都大
      }
    }
  }

  return arr;
}

var arr = [3, 223, 2, 33, 21, 10, 30];

console.log(insertSort(arr));