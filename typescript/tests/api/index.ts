import api from 'api'

describe('API', () => {
  test('export default', async () => {
    expect(api).toStrictEqual({})
  })
})
