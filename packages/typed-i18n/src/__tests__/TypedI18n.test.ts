import TypedI18n, { interp } from '../TypedI18n'

const en = {
  hello: 'Hello',
  helloWithName: interp(name => `Hello, ${name}`),
  goodbye: 'Goodbye',
  helloButGoodbye: () => `${en.hello}, but ${en.goodbye}`,
  screen: {
    title: 'Welcome',
  },
}

const ja = {
  hello: 'こんにちは',
  helloWithName: interp(name => `こんにちは、 ${name}`),
  goodbye: 'さようなら',
  helloButGoodbye: () => `${ja.hello}ですが${ja.goodbye}`,
  screen: {
    title: 'ようこそ',
  },
}

type Lang = 'en' | 'ja'
type Trans = typeof en & typeof ja

test('TypedI18n', () => {
  const t = new TypedI18n<Lang, Trans>().addLocale('en', en).addLocale('ja', ja)

  t.setLocale('en')
  expect(t.trans.hello).toBe('Hello')
  expect(t.trans.helloWithName('John')).toBe('Hello, John')
  expect(t.trans.helloButGoodbye).toBe('Hello, but Goodbye')
  expect(t.trans.screen.title).toBe('Welcome')

  t.setLocale('ja')
  expect(t.trans.hello).toBe('こんにちは')
  expect(t.trans.helloWithName('John')).toBe('こんにちは、 John')
  expect(t.trans.helloButGoodbye).toBe('こんにちはですがさようなら')
  expect(t.trans.screen.title).toBe('ようこそ')
})
