// 寻找可行解,再在可行解中选择最优解

/**
 * 步骤
 * 1. 确认左闭右开窗口: [left, right),
 * 2. 增加right扩大窗口, 知道right=s.length
 *   每一次扩大都追加在t内的字符到窗口,并判断是否满足valid的值等于need的值
 * 3. 找到可行解后,开始通过增加left缩减窗口
 *   每次缩减都需要修改window里字符和valid
 */

/**
 * 检验条件:
 * s和t完全相等时,
 * t为s的一个字符
 * s中不存在t时
 * t/s为空字符串时
 */

function slidingWindow(s, t) {
  const need = {},
    window = {};

  for (const i of t) {
    window[i] = 0;

    need[i] ? need[i]++ : (need[i] = 1);
  }

  let left = (right = valid = 0); // valid表示窗口中满足need条件的字符次数

  let start = (slen = Number.MAX_SAFE_INTEGER); // 记录最小覆盖字串的起始索引及长度
  while (right < s.length) {
    // c 是将移入窗口的字符
    const c = s[right];
    right++; // 右移窗口

    // 进行窗口内数据的一系列更新
    if (c in need) {
      window[c]++; //只有在t的字符,才被window计数. 所有字符都计数浪费内存

      if (window[c] === need[c]) {
        valid++;
      }
    }

    // 判断左侧窗口是否要收缩
    while (valid === Object.keys(need).length) {
      if (right - left < len) { // 因为找的最小子串,所以len找最小的
        start = left;
        len = right - left; //因为上面right已经++过,所以这里直接减,不需要再加一
      }
      // d是将移出窗口的字符
      const d = s[left];
      left++; // 左移窗口

      // 进行窗口内数据的一系列更新
      if (d in need) {
        if (window[d] === need[d]) {
          valid--;
        }
        window[d]--;
      }
    }
  }

  return len === -1 ? "" : s.slice(start, start + len);
}
