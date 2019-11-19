import TypedI18n from '..'

const en = {
  hello: 'Hello',
  goodbye: 'Goodbye',
  helloButGoodbye: t => `${t.trans.hello}, but ${t.trans.goodbye}`,
}

const ja = {
  hello: 'こんにちは',
  goodbye: 'さようなら',
  helloButGoodbye: t => `${t.trans.hello} ですが ${t.trans.goodbye}`,
}

type Lang = 'en' | 'ja'

test('TypedI18n', () => {
  const t = new TypedI18n<Lang, typeof en>()
    .addLocale('en', en)
    .addLocale('ja', ja)

  t.setLocale('en')
  expect(t.trans.hello).toBe('Hello')
  expect(t.trans.helloButGoodbye).toBe('Hello, but Goodbye')

  t.setLocale('ja')
  expect(t.trans.hello).toBe('こんにちは')

  // This throws an error:
  // t.setLocale('cn')
})
