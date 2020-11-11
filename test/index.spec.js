'use strict'

/* eslint-env mocha */
const { expect } = require('aegir/utils/chai')
const sinon = require('sinon')
const delay = require('delay')

const { setDelayedInterval, clearDelayedInterval } = require('../src')

describe('set-delayed-interval', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('can run a task periodically after an initial delay', async () => {
    const task = sinon.spy(async () => {
      await delay(50)
    })

    const id = setDelayedInterval(task, 50, 100)

    // Stopped => 100
    // Running => 50 = 150
    // Stopped => 50 = 200
    // Running => 50 = 250
    // Stopped => 50 = 300
    // Running => 50 = 350

    await delay(350)
    clearDelayedInterval(id)
    expect(task.callCount).to.eql(3)

    await delay(350)
    expect(task.callCount).to.eql(3)
  })

  it('can default initial delay to interval', async () => {
    const task = sinon.spy(async () => {
      await delay(50)
    })

    const id = setDelayedInterval(task, 100)

    // Stopped => 100
    // Running => 50 = 150
    // Stopped => 100 = 250
    // Running => 50 = 300

    await delay(300)
    clearDelayedInterval(id)
    expect(task.callCount).to.eql(2)

    await delay(300)
    expect(task.callCount).to.eql(2)
  })

  it('should throw in ', async () => {
    const p = catchGlobalError()

    const task = async () => {
      await delay(50)
      throw new Error()
    }

    const id = setDelayedInterval(task, 100)

    await p
    clearDelayedInterval(id)
  })
})

const isBrowser = () => typeof window === 'object' && typeof document === 'object' && document.nodeType === 9

const catchGlobalError = () => {
  return new Promise((resolve) => {
    if (!isBrowser()) { // Node.js
      const originalException = process.listeners('uncaughtException').pop()

      originalException && process.removeListener('uncaughtException', originalException)
      process.once('uncaughtException', (err) => {
        expect(err).to.exist()

        originalException && process.listeners('uncaughtException').push(originalException)
        resolve()
      })
    } else {
      window.onerror = () => {
        resolve()
      }
    }
  })
}
