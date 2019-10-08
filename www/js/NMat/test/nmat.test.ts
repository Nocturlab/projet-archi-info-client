import * as NMat from '../src'

/**
 * Dummy test
 */
describe('Dummy test', () => {
  it('works if true is truthy', () => {
    expect(true).toBeTruthy()
  })

  it('DummyClass is instantiable', () => {
    expect(new NMat.App()).toBeInstanceOf(NMat.App)
  })
})
