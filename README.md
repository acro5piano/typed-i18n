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

test('TypedI18n', () => {
  const t = new TypedI18n<Lang, typeof ja>()

  t.addLocale('ja', ja)
  t.addLocale('en', en)

  t.setLocale('ja')
  expect(t.trans.hello).toBe('こんにちは')

  t.setLocale('en')
  expect(t.trans.hello).toBe('Hello')
})
```
