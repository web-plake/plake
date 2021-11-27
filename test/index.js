const { yet } = require('../dist')
const { expect } = require('chai')

describe('plake', () => {
  it('yet returns not yet', () => {
    expect(yet()).to.equal('not yet')
  })
})
