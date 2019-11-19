type TransFn<L extends string, T> = (t: TypedI18n<L, T>) => string

interface TransFnWithKey<L extends string, T> {
  [key: string]: string | TransFn<L, T>
}

type Trans<L extends string, T> = object & T & TransFnWithKey<L, T>

function transform<L extends string, T extends {}>(
  t: TypedI18n<L, T>,
  obj: T,
): Trans<L, T> {
  return Object.keys(obj).reduce((car, key) => {
    const value = (obj as any)[key]
    if (typeof value === 'string') {
      return { ...car, [key]: value }
    }
    return { ...car, [key]: value(t) }
  }, {} as T)
}

export class TypedI18n<L extends string, T> {
  locale!: L
  transMap = new Map<L, T & TransFnWithKey<L, T>>()

  addLocale(lang: L, trans: Trans<L, T>): this {
    this.transMap.set(lang, trans)
    const interop = transform<L, T>(this, trans)
    console.log(interop)
    this.transMap.set(lang, interop)
    return this
  }

  setLocale(locale: L) {
    this.locale = locale
  }

  get trans(): T {
    if (this.transMap.size === 0) {
      throw new Error('Please add at least one locale')
    }
    if (!this.locale) {
      const locale = this.transMap.keys().next().value
      console.warn(`[typed-i18n] warning: falling back to ${locale}`)
      this.locale = locale
    }
    return this.transMap.get(this.locale)!
  }
}

export default TypedI18n
