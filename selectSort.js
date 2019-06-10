/**
 * 选择排序
 * 时间复杂度： O(n*2)
 * 空间复杂度: O(1)
 */


/**
 * 选择一个索引位置当基准值，默认看作是最小值，然后把它和剩下的元素比较大小，比它小的，就交换位置。
 * 第一次外层循环完毕，就能得到最小值在索引0处
 */

function selectSort(arr) {
  var temp;
  var i = 0;

  while (i < arr.length - 1) {
    for (var j = i + 1; j < arr.length; j++) { // j是能到最后一个元素，因为它边界是[i+1, arr.length-1]
      if (arr[i] > arr[j]) {
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }

    i++;
  }

  return arr;
}

var arr = [22, 1, 0, 22, 23, 12, 203];
console.log(selectSort(arr));