/** 
 * 冒泡排序
 * 时间复杂度： O(n*2)
 * 空间复杂度: O(1)
 */

/** 
 * 算法步骤： 外层循环把当前循环的最大值后移
 * 内层循环从索引0开始进行比较相邻的元素，如果索引小的元素大于索引大的元素，就交换元素。
 * 外层循环边界：[1, arr.length -1]
 * 内层循环边界: [0, 外层边界)
 * 第一次循环完成：外层的索引位置为arr.length - 1. 内层的索引位置为arr.length - 1 - 1;
 * 最后一次循环完成：外层的索引的位置1，内层的索引的位置为0
 */
function bubbleSort(arr) {
  var i = arr.length - 1;
  var temp;
  while (i > 0) { // while循环都能改成for循环 
    for (var j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
    i--;
  }

  return arr;
}


var arr = [93, 23, 11, 1, 39, 20, 0, 33, 22, 12, 33]
console.log(bubbleSort(arr));

