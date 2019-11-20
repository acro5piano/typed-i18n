import TypedI18n from 'typed-i18n'
import { createContextHook } from 'typed-i18n/jsx'

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

export const { useTrans, useChangeLocale } = createContextHook<
  Lang,
  Translations
>()

export default t
