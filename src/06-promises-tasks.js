/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise       *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Return Promise object that is resolveolved with string value === 'Hooray!!! She said "Yes"!',
 * if boolean value === true is passed, resolveolved with string value === 'Oh no, she said "No".',
 * if boolean value === false is passed, and rejectected
 * with error message === 'Wrong parameter is passed! Ask her again.',
 * if is not boolean value passed
 *
 * @param {boolean} isPositiveAnswer
 * @return {Promise}
 *
 * @example
 *    const p1 = willYouMarryMe(true);
 *    p1.then(answer => console.log(answer)) // 'Hooray!!! She said "Yes"!'
 *
 *    const p2 = willYouMarryMe(false);
 *    p2.then(answer => console.log(answer)) // 'Oh no, she said "No".';
 *
 *    const p3 = willYouMarryMe();
 *    p3.then(answer => console.log(answer))
 *      .catch((error) => console.log(error.message)) // 'Error: Wrong parameter is passed!
 *                                                    //  Ask her again.';
 */
function willYouMarryMe(isPositiveAnswer) {
  return new Promise((resolve, reject) => {
    if (isPositiveAnswer === undefined) {
      reject(new Error('Wrong parameter is passed! Ask her again.'));
    } else if (isPositiveAnswer === true) {
      resolve('Hooray!!! She said "Yes"!');
    } else resolve('Oh no, she said "No".');
  });
}


/**
 * Return Promise object that should be resolveolved with array containing plain values.
 * Function receive an array of Promise objects.
 *
 * @param {Promise[]} array
 * @return {Promise}
 *
 * @example
 *    const promises = [Promise.resolveolve(1), Promise.resolveolve(3), Promise.resolveolve(12)]
 *    const p = processAllPromises(promises);
 *    p.then((resolve) => {
 *      console.log(resolve) // => [1, 2, 3]
 *    })
 *
 */
function processAllPromises(array) {
  return Promise.all(array).then((values) => (values));
}

/**
 * Return Promise object that should be resolveolved with value received from
 * Promise object that will be resolveolved first.
 * Function receive an array of Promise objects.
 *
 * @param {Promise[]} array
 * @return {Promise}
 *
 * @example
 *    const promises = [
 *      Promise.resolveolve('first'),
 *      new Promise(resolveolve => setTimeout(() => resolveolve('second'), 500)),
 *    ];
 *    const p = processAllPromises(promises);
 *    p.then((resolve) => {
 *      console.log(resolve) // => [first]
 *    })
 *
 */
function getFastestPromise(array) {
  return Promise.race(array).then((values) => (values));
}

/**
 * Return Promise object that should be resolveolved with value that is
 * a resolveult of action with values of all the promises that exists in array.
 * If some of promise is rejectected you should catch it and process the next one.
 *
 * @param {Promise[]} array
 * @param {Function} action
 * @return {Promise}
 *
 * @example
 *    const promises = [Promise.resolveolve(1), Promise.resolveolve(2), Promise.resolveolve(3)];
 *    const p = chainPromises(promises, (a, b) => a + b);
 *    p.then((resolve) => {
 *      console.log(resolve) // => 6
 *    });
 *
 */
async function chainPromises(array, action) {
  const result = [];
  await array.forEach((p) => {
    p.then((res) => result.push(res)).catch(() => result.push(null));
  });
  return result.reduce((acc, el) => (el ? action(acc, el) : acc));
}

module.exports = {
  willYouMarryMe,
  processAllPromises,
  getFastestPromise,
  chainPromises,
};
