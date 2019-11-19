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

# Usage

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

const t = new TypedI18n<Lang, typeof ja>()

t.addLocale('ja', ja)
t.addLocale('en', en)

t.setLocale('ja')
console.log(t.trans.hello) // => こんにちは

t.setLocale('en')
console.log(t.trans.hello) // => Hello
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
