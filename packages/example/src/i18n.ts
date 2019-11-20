import * as React from 'react'
import TypedI18n from 'typed-i18n'
import { createContextHook } from 'typed-i18n/build/jsx'

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

export const useTrans = createContextHook<Lang, Translations>()

export function useForceUpdate() {
  const [, setTick] = React.useState(0)
  const update = React.useCallback(() => {
    setTick(tick => tick + 1)
  }, [])
  return update
}

export default t
