/**
 * Waits for a specified amount of time
 *
 * @param {number} ms - Time to wait in milliseconds
 * @returns void, after `ms` amount of time has passed
 */
const wait = (ms) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  });

/**
 * Retry an asynchronous function with a delay between retries.
 *
 * @param {Function} fn - The asynchronous function with arity of 0 to retry.
 * @param {Function} predicate - A function with arity of 1 that determines if the retry condition is met. Uses return value from param `fn`.
 * @param {string} [finalErr="retryWithDelay failed, hit max retries"] - The final error message when max retries are reached. Used in rejection.
 * @param {Object} [options] - Retry options. Has default values
 * @param {number} [options.retries=5] - The maximum number of retry attempts. Defaults to 5
 * @param {number} [options.intervalMs=1000] - The delay between retries in milliseconds. Defaults to 1000
 * @returns {*} The result of the last invocation of the asynchronous function.
 * @rejects The string in param `finalErr`
 */
const retryWithDelay = async (
  fn,
  predicate,
  finalErr = "retryWithDelay failed, hit max retries",
  options = {
    retries: 3,
    intervalMs: 50,
  }
) => {
  // Get our result
  const value = await fn();

  // If we get an acceptable result, return it
  if (predicate(value)) {
    return value;
  }

  // If we ran out of retries, reject
  if (options.retries <= 0) {
    return Promise.reject(finalErr);
  }

  // Wait for the specified interval
  await wait(options.intervalMs);

  // Call the same function again
  return retryWithDelay(fn, predicate, finalErr, {
    retries: options.retries - 1,
    intervalMs: options.intervalMs,
  });
};

module.exports = { retryWithDelay, wait };
