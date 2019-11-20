import TypedI18n, { intorp } from '..'

const en = {
  hello: 'Hello',
  helloWithName: intorp(name => `Hello, ${name}`),
  goodbye: 'Goodbye',
  helloButGoodbye: () => `${en.hello}, but ${en.goodbye}`,
}

const ja = {
  hello: 'こんにちは',
  helloWithName: intorp(name => `こんにちは、 ${name}`),
  goodbye: 'さようなら',
  helloButGoodbye: () => `${ja.hello}ですが${ja.goodbye}`,
}

type Lang = 'en' | 'ja'
type Trans = typeof en & typeof ja

test('TypedI18n', () => {
  const t = new TypedI18n<Lang, Trans>().addLocale('en', en).addLocale('ja', ja)

  t.setLocale('en')
  expect(t.trans.hello).toBe('Hello')
  expect(t.trans.helloWithName('John')).toBe('Hello, John')
  expect(t.trans.helloButGoodbye).toBe('Hello, but Goodbye')

  t.setLocale('ja')
  expect(t.trans.hello).toBe('こんにちは')
  expect(t.trans.helloWithName('John')).toBe('こんにちは、 John')
  expect(t.trans.helloButGoodbye).toBe('こんにちはですがさようなら')
})
