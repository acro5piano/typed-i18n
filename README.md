[![CircleCI](https://circleci.com/gh/acro5piano/typed-i18n.svg?style=svg)](https://circleci.com/gh/acro5piano/typed-i18n)
[![npm version](https://badge.fury.io/js/typed-i18n.svg)](https://badge.fury.io/js/typed-i18n)

# typed-i18n

type-safe i18n library

# Install

```
npm install --save typed-i18n
```

Or if you use Yarn:

```
yarn add typed-i18n
```

# Why

The aim of `typed-i18n` is to provide zero-configuration type-safe i18n feature.

Typical i18n libraries uses the syntax of `t('group.key')`, which is apparently not type-safe.

`typed-i18n` uses regular JS & TS syntax so you can get these benefits:

- Build-time type safety
- Editor supports
- Checking i18n coverage in TS level

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

If there are some mistakes in your translations, TS will check them. see [#type-safety](#type-safety)
t.setLocale('ja')

# Interpolation

Interpolation is one of the most used functionalities in I18N. It enables you to integrate dynamic values into your translations.

```typescript
import TypedI18n, { interp } from 'typed-i18n'

const en = {
  greeting: interp(name => `Hello, ${name}`),
}

const ja = {
  greeting: interp(name => `こんにちは、 ${name}`),
}

// ...

console.log(t.trans.greeting('John')) // => Hello, John
```

# Nesting

You can nest your translations by creating getter functions:

```typescript
import TypedI18n, { interp } from 'typed-i18n'

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

// ...

console.log(t.trans.helloButGoodbye) // => Hello, but Goodbye
```

# Type-safety

In the above example, the following code will throw TypeScript errors.

```typescript
// missing the locale
t.setLocale('cn')

// missing the key
t.trans.notExistKey

// try to add a locale with missing keys
t.addLocale('de', {
  hello: 'Guten Tag',
})
```

# TODO

- [ ] Deeply nested object support
- [ ] Plurals
- [ ] React bindings
