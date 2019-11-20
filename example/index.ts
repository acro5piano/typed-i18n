import TypedI18n from 'typed-i18n'

const en = {
  hello: 'Hello',
  goodbye: 'Goodbye',
}

const ja = {
  hello: 'こんにちは',
  goodbye: 'さようなら',
}

type Lang = 'en' | 'ja'
type Translations = typeof en & typeof ja

const t = new TypedI18n<Lang, Translations>()
  .addLocale('en', en)
  .addLocale('ja', ja)

t.setLocale('en')
console.log(t.trans.hello) // => Hello

t.setLocale('ja')
console.log(t.trans.hello) // => こんにちは
