import TypedI18n from '..'

const en = {
  hello: 'Hello',
  goodbye: 'Goodbye',
  helloButGoodbye: () => `${en.hello}, but ${en.goodbye}`,
}

const ja = {
  hello: 'こんにちは',
  goodbye: 'さようなら',
  helloButGoodbye: () => `${ja.hello}ですが${ja.goodbye}`,
}

type Lang = 'en' | 'ja'

test('TypedI18n', () => {
  const t = new TypedI18n<Lang, typeof en & typeof ja>()
    .addLocale('en', en)
    .addLocale('ja', ja)

  t.setLocale('en')
  expect(t.trans.hello).toBe('Hello')
  expect(t.trans.helloButGoodbye).toBe('Hello, but Goodbye')

  t.setLocale('ja')
  expect(t.trans.hello).toBe('こんにちは')
  expect(t.trans.helloButGoodbye).toBe('こんにちはですがさようなら')

  // This throws an error:
  // t.setLocale('cn')
})
