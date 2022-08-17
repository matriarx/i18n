#!/usr/bin/env node

import {execSync} from 'child_process'
import {existsSync, renameSync, copyFileSync, rmSync, writeFileSync} from 'fs'

import chalk from 'chalk'
import envinfo from 'envinfo'

const primary = chalk.hex('#c00060')
const secondary = chalk.hex('#ff60c0')
const accent = chalk.hex('#00c0c0')
const danger = chalk.hex('#c00000')

const project = process.argv[2]

if (!project) {
  console.log(danger('Setup failed: You have to provide a project name 🤷🏻‍♀️'))
  process.exit(1)
}

if (existsSync(project)) {
  console.log(danger(`Setup failed: This will override an existing directory called '${project}' 🤷🏻‍♀️`))
  process.exit(1)
}

if (existsSync('typescript')) {
  console.log(danger("Setup failed: This will override an existing directory called 'typescript' 🤷🏻‍♀️"))
  process.exit(1)
}

const git = await envinfo.helpers.getGitInfo()
const node = await envinfo.helpers.getNodeInfo()
const npm = await envinfo.helpers.getnpmInfo()

if (!git[0]) {
  console.log(danger('Setup failed: Git is required 🤷🏻‍♀️'))
  process.exit(1)
}

if (parseInt(node[1].substring(0, 2), 10) < 18) {
  console.log(danger(`Setup failed: You are using Node v${node[1]}, Node >= v18 is required 🤷🏻‍♀️`))
  process.exit(1)
}

if (parseInt(npm[1].substring(0, 1), 10) < 8) {
  console.log(danger(`Setup failed: You are using npm v${npm[1]}, npm >= v8 is required 🤷🏻‍♀️`))
  process.exit(1)
}

console.log(primary.bold('\n🧚🏻‍♀️✨ TypeScript ✨🧚🏻‍♀️🦄🔮🏰💕\n'))

try {
  console.log(secondary(`🪄✨ Cloning ${accent('https://github.com/matriarx/typescript.git')}... 🔮✨`))
  execSync('git clone --depth 1 --branch v0.0.4 https://github.com/matriarx/typescript.git >/dev/null 2>&1')
} catch (error) {
  console.log(danger('Setup failed: Repository could not be cloned 🤷🏻‍♀️'))
  process.exit(1)
}

console.log(secondary('🪄✨ Initializing... 🏰✨'))

try {
  renameSync('typescript', project)
} catch (error) {
  console.log(danger('Setup failed: Failed to rename project 🤷🏻‍♀️'))
  process.exit(1)
}

process.chdir(project)

try {
  copyFileSync('.env.example', '.env')
  rmSync('.git', {recursive: true, force: true}, () => {})
  rmSync('init', {recursive: true, force: true}, () => {})
  rmSync('docs', {recursive: true, force: true}, () => {})
  rmSync('package.json')
  rmSync('package-lock.json')
} catch (error) {
  console.log(danger('Setup failed: Failed to copy or delete files 🤷🏻‍♀️'))
  process.exit(1)
}

const config = {
  name: project,
  version: '0.0.1',
  description: `${project.substring(0, 1).toUpperCase()}${project.substring(1)} app`,
  keywords: [
    project,
    "javascript",
    "typescript",
  ],
  author: {
    name: '',
    url: '',
    email: '',
  },
  contributors: [],
  homepage: '',
  repository: {
    type: 'git',
    url: '',
  },
  bugs: '',
  license: 'MIT',
  funding: [],
  private: true,
  publishConfig: {},
  config: {},
  engines: {
    "node": ">= 18",
    "npm": ">= 8"
  },
  type: 'module',
  main: 'lib/index.js',
  scripts: {
    "start": "NODE_ENV=production node --es-module-specifier-resolution=node --no-warnings lib/index.js",
    "compile": "swc src -d lib --copy-files",
    "build": "NODE_ENV=production npm run compile",
    "dev": "swc src -d lib --copy-files -w",
    "review": "tsc --emitDeclarationOnly",
    "lint": "eslint --fix '{src,tests}/**/*.ts' --color --debug --no-error-on-unmatched-pattern",
    "style": "prettier --write '{src,tests}/**/*.ts' --loglevel log --no-error-on-unmatched-pattern",
    "test": "jest --config .jestrc.json --colors --passWithNoTests",
    "qa": "npm run review && npm run lint && npm run style && npm test",
    "compose": "docker compose up -d",
    "recompose": "docker compose up --build --force-recreate -d",
    "release": "docker build -f dockerfile.release -t typescript --build-arg TAG=18-alpine --build-arg PORT=80 . --no-cache --force-rm --pull",
    "deploy": "docker run -d -p 80:80 --restart always --name typescript typescript",
    "prepare": "husky install bin && git add bin/pre-commit && git add bin/pre-push"
  },
  bin: {},
  dependencies: {
    "@swc/cli": "^0.1.57",
    "@swc/core": "^1.2.204",
    "dotenv": "^16.0.1"
  },
  devDependencies: {
    "@swc/jest": "^0.2.21",
    "@types/jest": "^28.1.4",
    "@types/node": "^18.0.3",
    "@typescript-eslint/eslint-plugin": "^5.30.4",
    "@typescript-eslint/parser": "^5.30.4",
    "chokidar": "^3.5.3",
    "eslint": "^8.17.0",
    "eslint-config-prettier": "^8.5.0",
    "husky": "^8.0.1",
    "jest": "^28.1.1",
    "lint-staged": "^13.0.2",
    "prettier": "^2.7.1",
    "typescript": "^4.7.4"
  },
  bundleDependencies: [],
}

try {
  writeFileSync('package.json', JSON.stringify(config, null, 2), 'utf8')
} catch (error) {
  console.log(danger('Setup failed: Failed to create `package.json` file 🤷🏻‍♀️'))
  process.exit(1)
}

try {
console.log(secondary('🪄✨ Installing... 🦄✨'))
  execSync('npm install --ignore-scripts')
} catch (error) {
  console.log(danger('Setup failed: Failed to install dependencies 🤷🏻‍♀️'))
  process.exit(1)
}

console.log(primary.bold('\n🧚🏻‍♀️✨ Setup successful ✨🧚🏻‍♀️🦄🔮🏰💕\n'))
console.log(secondary(`🪄✨ Documentation can be found at ${accent('https://github.com/matriarx/typescript')} 🦄✨`))
console.log(secondary(`🪄✨ You can join the community at ${accent('https://discord.gg/matriarx')} ✨💕`))
console.log(secondary('🪄✨ If you need any help you can ask in the community ✨💕'))
console.log(secondary(`🪄✨ You can support me at ${accent('https://github.com/sponsors/matriarx')} or ${accent('https://patreon.com/miamatriarx')} ✨🧚🏻‍♀️`))
console.log(primary('\n✨🧚🏻‍♀️🦄🔮🏰💕\n'))
