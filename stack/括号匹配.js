/**
 *
 */
function validParentheses(str) {
  const stack = [];

  for (const s of str) {
    if (s === "(" || s === "{" || s === "[") {
      stack.push(s);
      continue;
    }

    const topStack = stack.pop();

    if (s === ")") {
      if (topStack !== "(") {
        return false;
      }
    } else if (s === "}") {
      if (topStack !== "{") {
        return false;
      }
    } else if (s === "]") {
      if (topStack !== "[") {
        return false;
      }
    }
  }

  if (stack.length) return false;

  return true;
}

console.log(
  validParentheses(""),
  validParentheses("("),
  validParentheses("()")
);