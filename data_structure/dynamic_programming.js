// 动态规划，将一个问题拆成几个子问题，即可推断出大问题的解；动态规划算法从能解决的最简单
// 的子问题开始，通过得到的解去解决更复杂的子问题知道整个问题被解决，子问题解一般存数组里。
// 使用递归计算斐波那契数列
// 斐波那契数列：以公元700年意大利数学家列奥纳多*斐波那契的名字命名，用来描述理想状态下
// 兔子的增长。***数列中后一个值等于前两个的和。
function recurFib(n) {
  if (n < 2) { //边界，当n小于2返回n
    return n;
  } else {
    return recurFib(n - 1) + recurFib(n - 2); // 后一个值为前两个的和
  }
}

//动态规划计算斐波那契数列
function dpFib(n) {
  let val = []; // 存子解的数组
  for (let i = 0; i <= n; i++) { // 初始化子解数组
    val[i] = 0;
  }
  if (n === 0) {
    return 0;
  } else if (n === 1 || n === 2) { // 数列长度为1或2时，返回1,为0时返回0
    return 1;
  } else {
    //计算数列为3开始，数列的1，2分别存储，为计算3铺垫
    val[1] = 1;
    val[2] = 2;
    // 数列长度3及以上，当前的值为前两个相加
    for (let i = 3; i <= n; i++) {
      val[i] = val[i - 1] + val[i - 2];
    }
    // return val;
    return val[n - 1]; //返回值
  }
}

//test
console.time('递归计算斐波那契数列耗时');
console.log(recurFib(10));
console.timeEnd('递归计算斐波那契数列耗时');
console.time('动态规划计算斐波那契数列耗时');
console.log(dpFib(55));
console.timeEnd('动态规划计算斐波那契数列耗时');

// 书中还有一个用动态规划找两个字符串公共最长子串的算法，这也是经典的算法，把动态规划实现的和
// 普通的写到blog中。
// 确定两个字符串中最长公共子串
// 使用一个二维数组存储两个字符串相同位置字符比较结果，初始化二维数组值均为0，两个数组的
// 相同位置发现了匹配，就将数组的对于行和列元素加1，最后由数组得出公共子串
function lcs(word1, word2) { // 参数分别代表两个字符串
                             // 声明两个变量和存储两个字符串相同位置字符比较结果的二维数组
  let max = 0; // 子串的长度值
  let index = 0; // 子串开始的位置
  let lcsarr = new Array(word1.length);
  for (let i = 0; i < word1.length; i++) {
    lcsarr[i] = new Array(word2.length);
    for (let j = 0; j < word2.length; j++) {
      lcsarr[i][j] = 0;
    }
  }
  for (let i = 0; i < word1.length; i++) {
    for (let j = 0; j < word2.length; j++) {
      if (i === 0 || j === 0) {
        lcsarr[i][j] = 0;
      } else {
        if (word1[i - 1] === word2[j - 1]) {
          lcsarr[i][j] = lcsarr[i - 1][j - 1] + 1;
        } else {
          lcsarr[i][j] = 0;
        }
      }
      if (max < lcsarr[i][j]) {
        max = lcsarr[i][j];
        index = i;
      }
    }
  }
  let str = '';
  if (max === 0) {
    return '';
  } else {
    for (let i = index - max; i <= max; i++) {
      str += word2[i];
    }
    return str;
  }
}

//暴力求最长公共子串
const findSubStr = (str1, str2) => {
  if (str1.length > str2.length) { // 把长度较小的字符串赋值给str1
    [str1, str2] = [str2, str1];
  }
  let result = ''; // 变量用来存公共子串
  const length = str1.length; // 较短的字符串的长度
  //这两个循环是对'较短的字符串'进行全长到长度为0的遍历和判断是否在较长的字符串中匹配
  for (let i = length; i > 0; i--) {
    for (let j = 0; j <= length - i; j++) {
      result = str1.substring(j, i); // 将较短串中j到i的部分赋给result
      if (str2.includes(result)) { //如果较长的串中包括结果的话，return
        return result;
      }
    }
  }
}
//test 动态规划和暴力最长公共子串
console.time('动态规划最长公共子串耗时');
console.log('动态规划最长公共子串:', lcs('bbcc2d', 'bbcc2'));
console.timeEnd('动态规划最长公共子串耗时');

console.time('暴力最长公共子串耗时');
console.log('暴力最长公共子串:', findSubStr('ab1b2c4c', 'dbbcc'));
console.timeEnd('暴力最长公共子串耗时')