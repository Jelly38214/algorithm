// 二分查找场景: 寻找一个数, 寻找左/右侧边界

/** 搜索右区间是开还是闭决定了while条件里面是小于还是小于等于,想想终止条件是什么情况可以推导出到底要不要left=right
 * 考虑偶数个元素的情况,此时取中间两个的左边那个.
 * 注意大数相加溢出情况,因此用left + (right - left) / 2, 而不是(left +right) / 2来得出mid
 * 考虑以下四种情况来检验是否程序正确
 * 1. 元素不存在且比最小元素还小,在左区间的左边
 * 2. 元素不存在且比最大元素还要大, 在右区间右边
 * 3. 元素存在且是最小元素
 * 4. 元素存在且是最大元素
 */

/**
 * 搜索区间[0->left, array.length-1->right], 因此while终止条件是<=
 * left + (right - left) / 2 结果等于(right+left)/2, 但前者能防止left+right太大相加溢出问题
 * 数组个数可以为偶数个,此时中间元素是两个,取左边那个,因此mid = Math.floor(left + (right-left)/2)
 */
function binarySearch(nums, target) {
  if (nums.length === 0) return -1;
  let left = 0,
    right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2); // 偶数个取左边元素

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    }
  }

  return -1;
}

/**
 * 寻找左侧边界的二分搜索
 * 一般二分搜索对于[1, 2, 2, 2, 3], target=2, 此时得到的index为2,但我们需要得到1,这就是左侧边界
 */
function left_bound_bs(nums, target) {
  if (nums.length === 0) return -1;

  let left = 0,
    right = nums.length;

  while (left < right) {
    let mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] === target) {
      right = mid;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid;
    }
  }

  if (left >= nums.length) return -1;
  return nums[left] === target ? left : -1;
}

function left_bound_bs_2(nums, target) {
  if (nums.length === 0) return -1;
  let left = 0,
    right = nums.length - 1;

  // 搜索区间为[0, nums.length-1]
  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);

    if (nums[mid] === target) {
      right = mid - 1; // 收缩右区间,因为要找左侧
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    }
  }

  if (left >= nums.length) return -1;

  return nums[left] === target ? left : -1;
}

function right_bound_bs(nums, target) {
  if (nums.length === 0) return -1;

  let left = 0,
    right = nums.length;

  while (left < right) {
    let mid = Math.floor(left + (right - left) / 2);

    if (nums[mid] === target) {
      // 使区间向右收缩,达到锁定右侧边界的目的
      // 注意mid等于最后元素索引的情况,此时正常的index就是left-1
      left = mid + 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid;
    }
  }

  // 元素不存在且比最小值还小
  if (left === 0) return -1;

  if (nums[left - 1] !== target) return -1;

  // 元素为最大最小值情况
  return left - 1; // 注意
}

function right_bound_bs_2(nums, target) {
  if (nums.length === 0) return -1;

  let left = 0,
    right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2);
    if (nums[mid] === target) {
      left = mid + 1;
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    }
  }

  if (right < 0) return -1;
  if (left > nums.length - 1) return -1;

  // 存在且为最大最小值
  return left - 1;
}
