/**
 * 链表实现LRU缓存淘汰算法
 */

/**
 * 常见的淘汰策略: 先进先出(FIFO), 最少使用(LFU: least Frequently Used), 最近最少使用(LRU: Least Recently Used)
 */

/**
 * LRU 思路:维护一个有序单链表
 *   1. 如果要访问的数据在链表中, 遍历得到对应结点,并将其从原来的位置删除,然后插入到链表的头部
 *   2. 如果不存在在链表中
 *      a. 如果缓存没满,则将创建新的结点并添加到头部
 *      b. 如果缓存已满,则将尾结点删除,并创建新的结点插入头部
 */

// TODO: 优化成O(1)
function Node(key, value) {
  this.key = key;
  this.value = value;
  this.next = null;
  this.prev = null;
}

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.head = null;
  this.size = 0;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  let current = this.head;
  while (current) {
    if (current.key === key) {
      current.prev.next = current.next;

      current.prev = null;
      this.head.prev = current;
      current.next = this.head;
      this.head = current;

      return current.value;
    }

    current = current.next;
  }

  return -1;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  const node = new Node(key, value);

  // 删除掉最后一个节点
  if (this.capacity === this.size) {
    let current = this.head;
    while (current.next !== null) {
      current = current.next;
    }

    current.prev.next = null;

    this.size--;
  }

  if (this.head === null) {
    this.head = node;
  } else {
    this.head.prev = node;
    node.next = this.head;

    this.head = node;
  }

  this.size++;
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

const lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
console.log(lRUCache.get(1), "\n"); // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
console.log(lRUCache.get(2), "\n"); // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
console.log(lRUCache.get(1), "\n"); // return -1 (not found)
console.log(lRUCache.get(3), "\n"); // return 3
console.log(lRUCache.get(4), "\n"); // return 4
