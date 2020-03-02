[![CircleCI](https://circleci.com/gh/acro5piano/typed-i18n.svg?style=svg)](https://circleci.com/gh/acro5piano/typed-i18n)
[![npm version](https://badge.fury.io/js/typed-i18n.svg)](https://badge.fury.io/js/typed-i18n)

# typed-i18n

type-safe i18n library

# Why

The aim of `typed-i18n` is to provide zero-configuration type-safe i18n feature.

Typical i18n libraries uses the syntax of `t('group.key')`, which is apparently not type-safe.

`typed-i18n` uses regular JS & TS syntax so you can get these benefits:

- Build-time type safety
- Editor supports
- Checking i18n coverage in TS level

Also `typed-i18n` supports two translation flows:

**engineer-driven translation**

Engineers directly write translations. We can completely make them type-safe.

**translator-driven translation**

translators fill yaml/json/spreadsheets/(any) then compile it. It is a common pattern, but type-safety will be lost to some extent.

# Install

```
npm install --save typed-i18n
```

Or if you use Yarn:

```
yarn add typed-i18n
```

# Usage

You can write basic translations like this:

```typescript
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
```

If there are any mistakes in your translations, TS will check them.

# Type-safety

In the above example, the following code will throw TypeScript errors.

```typescript
// missing the locale
t.setLocale('cn')

// missing the key
t.trans.notExistKey

// trying to add a locale with missing keys
t.addLocale('de', {
  hello: 'Guten Tag',
})
```

# Interpolation

Interpolation is one of the most used functionalities in I18N. It enables you to integrate dynamic values into your translations.

There are two options to implement it:

**1. use `interp` function**

```typescript
import TypedI18n, { interp } from 'typed-i18n'

const en = {
  greeting: interp(name => `Hello, ${name}`),
}

const t = new TypedI18n<'en', typeof en>().addLocale('en', en)

console.log(t.trans.greeting('John')) // => Hello, John
```

**2. define `$index` and call `withArgs` method**

```typescript
import TypedI18n from 'typed-i18n'

const en = {
  greeting: `Hello, $1`,
}

const t = new TypedI18n<'en', typeof en>().addLocale('en', en)

console.log(t.withArgs('John').trans.greeting) // => Hello, John
```

# Nesting

You can nest your translations. There are two options to implement it:

**1. use getter functions**

```typescript
import TypedI18n from 'typed-i18n'

const en = {
  hello: 'Hello',
  goodbye: 'Goodbye',
  helloButGoodbye: () => `${en.hello}, but ${en.goodbye}.`,
}

const t = new TypedI18n<'en', typeof en>().addLocale('en', en)

console.log(t.trans.helloButGoodbye) // => Hello, but Goodbye.
```

**2. use `$this` expression**

```typescript
import TypedI18n from 'typed-i18n'

const en = {
  hello: 'Hello',
  goodbye: 'Goodbye',
  helloButGoodbye: '$this.hello, but $this.goodbye.',
}

const t = new TypedI18n<'en', typeof en>().addLocale('en', en)

console.log(t.trans.helloButGoodbye) // => Hello, but Goodbye.
```

# React bindings

You can use `typed-i18n` with React:

```
npm install --save typed-i18n-react
```

```typescript
// i18n.ts
import TypedI18n,  from 'typed-i18n'
import createContextHooks from 'typed-i18n-react'

const en = {
  hello: 'Hello',
  changeLocale: 'Change Locale',
}

const ja = {
  hello: 'こんにちは',
  changeLocale: '言語を変える',
}

type Lang = 'en' | 'ja'
type Translations = typeof en & typeof ja

const t = new TypedI18n<Lang, Translations>()
  .addLocale('en', en)
  .addLocale('ja', ja)

export const { useTrans, useChangeLocale, Provider } = createContextHooks(t)
```

```typescript
// App.tsx
import React from 'react'
import ReactDOM from 'react-dom'
import { useTrans, useChangeLocale, Provider } from './i18n'

function App() {
  const t = useTrans()
  const changeLocale = useChangeLocale()

  const changeLang = React.useCallback(() => {
    changeLocale(t.locale === 'en' ? 'ja' : 'en')
  }, [changeLocale, t.locale])

  return (
    <div className="App">
      <div className="App-title">{t.trans.hello}</div>
      <div className="App-btn" onClick={changeLang}>
        {t.trans.changeLocale}
      </div>
    </div>
  )
}

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root'),
)
```

# TODO

- [x] Deeply nested object support
- [x] React bindings
- [ ] Plurals
