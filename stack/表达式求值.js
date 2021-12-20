/**
 * 加减乘除四则运算: 3 + 5 * 8 - 6; 34 + 13 * 9 + 44 - 12/3
 */

/**
 * 编译器使用两个栈来实现: 操作数栈, 运算符栈
 * 从左到右遍历,遇到数字(考虑多位数)就压入操作数栈
 * 遇到运算符,与运算符栈的栈顶元素进行比较
 *    如果它的优先级比栈顶元素高,降它压入运算符栈,
 *    反之, 从运算符栈中取出栈顶元素,再从操作数栈取出2个操作数,进行计算(顶部的数字在操作符右边,次顶在左边),将结果压入操作数栈
 */

function expressionValue(expression) {
  const priority = {
    "+": 0,
    "-": 0,
    "*": 1,
    "/": 1,
  };
  const expressionElementArray = expression.match(/(\d+)|([+\-*\/])/g);

  const operators = [];
  const operands = [];
  const numberReg = /\d/;

  for (const s of expressionElementArray) {
    if (numberReg.test(s)) {
      operands.push(s);
      continue;
    }

    if (!operators.length) {
      operators.push(s);
      continue;
    }

    let topOperatorsElement = operators[operators.length - 1];
    if (priority[s] > priority[topOperatorsElement]) {
      operators.push(s);
      continue;
    }

    while (priority[s] <= priority[topOperatorsElement]) {
      const top1 = operands.pop();
      const top2 = operands.pop();
      const calculated = eval(`${top2}${topOperatorsElement}${top1}`);
      operands.push(calculated);

      operators.pop();
      topOperatorsElement = operators.pop();
    }

    operators.push(s);
  }

  // 清空栈
  while (true) {
    const top1 = operands.pop();
    const top2 = operands.pop();
    const calculated = eval(`${top2}${operators.pop()}${top1}`);
    if (operators.length && operands.length) {
      operands.push(calculated);
    } else {
      return calculated;
    }
  }
}

console.log(expressionValue("3 + 5 * 8 - 6"));
console.log(expressionValue("34 + 13 * 9 + 44 - 12/3"));
