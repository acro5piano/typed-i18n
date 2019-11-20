import t from './src/i18n'

t.setLocale('en')
console.log(t.trans.hello) // => Hello

t.setLocale('ja')
console.log(t.trans.hello) // => こんにちは
