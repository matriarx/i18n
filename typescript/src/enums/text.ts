export enum Case {
  CAMEL = 'camel',
  LOWER = 'lower',
  PASCAL = 'pascal',
  SNAKE = 'snake',
  UPPER = 'upper',
}

export enum Collation {
  COMPAT = 'compat',
  DICT = 'dict',
  EMOJI = 'emoji',
  EOR = 'eor',
  PHONEBK = 'phonebk',
  PHONETIC = 'phonetic',
  PINYIN = 'pinyin',
  REFORMED = 'reformed',
  SEARCHJL = 'searchjl',
  STANDARD = 'standard',
  STROKE = 'stroke',
  TRAD = 'trad',
  UNIHAN = 'unihan',
  ZHUYIN = 'zhuyin',
}

export enum Direction {
  LTR = 'ltr',
  RTL = 'rtl',
}

export default {
  Case,
  Collation,
  Direction,
}
