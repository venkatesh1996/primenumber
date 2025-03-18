module.exports = async (context, req) => {
  context.log("JavaScript HTTP trigger function processed a request.");
  // if (!req.body) {
  //   context.res = {
  //     status: 500,
  //     body: {
  //       message: "No request body found",
  //     },
  //   };
  //   return;
  // }
  const number = parseInt(req.query.number || (req.body && req.body.number));

  if (isNaN(number)) {
    context.res = {
      status: 400,
      body: "Please pass a valid number on the query string or in the request body",
    };
    return;
  }

  const isPrime = (num) => {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
  };

  context.res = {
    body: { number, isPrime: isPrime(number) },
  };
};
