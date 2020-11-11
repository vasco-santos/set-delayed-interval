'use strict'

/**
 * Factory that creates a setDelayedInterval
 */
function setDelayedInterval () {
  let timeout

  /**
   * Run a given task each {interval} ms
   */
  async function _runPeriodically(task, interval) {
    while (timeout) {
      await task
      await new Promise(resolve => {
        timeout = setTimeout(resolve, interval)
      })
    }
  }

  /**
  * Asynchronous setInterval that is properly delayed using promises and can be delayed on boot.
  *
  * @param {() => Promise} task
  * @param {number} interval
  * @param {number} [delay = interval]
  * @returns {{ cancel: () => {}}}
  */
  return (task, interval, delay) => {
    delay = delay || interval

    timeout = setTimeout(() => {
      _runPeriodically(task, interval)
    }, delay)

    return {
      cancel: () => {
        clearTimeout(timeout)
      }
    }
  }
}

module.exports = setDelayedInterval
