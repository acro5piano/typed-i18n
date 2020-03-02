import * as React from 'react'
import TypedI18n from 'typed-i18n'
import { createContextHooks } from '.'
import TestRenderer from 'react-test-renderer' // ES6

const en = {
  hello: 'Hello',
}

const ja = {
  hello: 'こんにちは',
}

type Lang = 'en' | 'ja'
type Locale = typeof en & typeof ja

const typedI18n = new TypedI18n<Lang, Locale>()
  .addLocale('en', en)
  .addLocale('ja', ja)

const { useTrans, Provider } = createContextHooks(typedI18n)

function App() {
  return (
    <Provider>
      <Component />
    </Provider>
  )
}

function Component() {
  const t = useTrans()

  return <div>{t.trans.hello}</div>
}

function getText(node: React.ReactElement) {
  const dom = TestRenderer.create(node).toJSON()
  if (!dom || !dom.children) {
    throw new Error()
  }
  return dom.children[0] as string
}

test('render', () => {
  typedI18n.setLocale('en')
  expect(getText(<App />)).toBe('Hello')

  typedI18n.setLocale('ja')
  expect(getText(<App />)).toBe('こんにちは')
})
