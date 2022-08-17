export enum Environment {
  DEVELOPMENT = 'development',
  MOCK = 'mock',
  CI = 'ci',
  QA = 'qa',
  ALPHA = 'alpha',
  BETA = 'beta',
  UAT = 'uat',
  STAGE = 'stage',
  PRODUCTION = 'production',
}

export enum Path {
  INDEX = '/',
  AUTH = '/auth',
}

export default {
  Environment,
  Path,
}
