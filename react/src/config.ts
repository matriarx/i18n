import {Environment} from 'enums'

import type {Config} from 'types'

export const config: Config = {
  environment: (process.env['NODE_ENV'] ||
    process.env['ENVIRONMENT'] ||
    'development') as Environment,
  debug: !!process.env['DEBUG'],
  host: process.env['HOST'] || '0.0.0.0',
  port: parseInt(process.env['PORT'] || '80', 10),
}

export default config
