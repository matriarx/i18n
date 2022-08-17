import {Environment} from 'enums'

describe('Config', () => {
  const ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = {...ENV}
  })

  afterAll(() => {
    process.env = ENV
  })

  test('export default', async () => {
    process.env['NODE_ENV'] = Environment.QA

    const config = (await import('app/config')).default

    expect(config).toBeDefined()
  })

  test('export config', async () => {
    const config = (await import('app/config')).config

    expect(config).toBeDefined()
  })

  test('NODE_ENV !== undefined', async () => {
    process.env['NODE_ENV'] = Environment.DEVELOPMENT

    const config = (await import('app/config')).default

    expect(config.environment).toStrictEqual(Environment.DEVELOPMENT)
  })

  test('NODE_ENV === undefined && ENVIRONMENT !== undefined', async () => {
    delete process.env['NODE_ENV']
    process.env['ENVIRONMENT'] = Environment.DEVELOPMENT

    const config = (await import('app/config')).default

    expect(config.environment).toStrictEqual(Environment.DEVELOPMENT)
  })

  test('NODE_ENV === undefined && ENVIRONMENT === undefined', async () => {
    delete process.env['NODE_ENV']
    delete process.env['ENVIRONMENT']

    const config = (await import('app/config')).default

    expect(config.environment).toStrictEqual(Environment.DEVELOPMENT)
  })

  test('DEBUG !== undefined', async () => {
    process.env['DEBUG'] = 'true'

    const config = (await import('app/config')).default

    expect(config.debug).toStrictEqual(true)
  })

  test('DEBUG === undefined', async () => {
    delete process.env['DEBUG']

    const config = (await import('app/config')).default

    expect(config.debug).toStrictEqual(false)
  })

  test('HOST !== undefined', async () => {
    process.env['HOST'] = '0.0.0.0'

    const config = (await import('app/config')).default

    expect(config.host).toStrictEqual('0.0.0.0')
  })

  test('HOST === undefined', async () => {
    delete process.env['HOST']

    const config = (await import('app/config')).default

    expect(config.host).toStrictEqual('0.0.0.0')
  })

  test('PORT !== undefined', async () => {
    process.env['PORT'] = '80'

    const config = (await import('app/config')).default

    expect(config.port).toStrictEqual(80)
  })

  test('PORT === undefined', async () => {
    delete process.env['PORT']

    const config = (await import('app/config')).default

    expect(config.port).toStrictEqual(80)
  })
})
