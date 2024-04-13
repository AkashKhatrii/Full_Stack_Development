// function calculateArithmetic(a, b, type) {
//   if (type == "sum") {
//     return a + b;
//   }

//   if (type == "sub") {
//     return a - b;
//   }
// }

function calculateArithmetic(a, b, fnToCall) {
    const ans = fnToCall(a, b);
    return ans;
  }
  
  function sum(a, b) {
    return a + b;
  }
  
  function sub(a, b) {
    return a - b;
  }
  let res = calculateArithmetic(1, 2, sub);
  console.log(res);
