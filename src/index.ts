type TransFn = (...args: string[]) => string

interface TransFnWithKey {
  [key: string]: string | TransFn
}

type Trans<T> = object & T & TransFnWithKey

function transform<T extends {}>(obj: T): Trans<T> {
  return Object.keys(obj).reduce((car, key) => {
    const value = (obj as any)[key]
    if (typeof value === 'string') {
      return { ...car, [key]: value }
    }
    if (value.name === 'lazyIntorp') {
      return { ...car, [key]: value }
    }
    return { ...car, [key]: value() }
  }, {} as T)
}

export function createLocale<T>(trans: Trans<T>) {
  return trans
}

export function intorp(fn: (...args: string[]) => string) {
  return function lazyIntorp(...args: string[]) {
    return fn(...args)
  }
}

export class TypedI18n<L extends string, T> {
  locale!: L
  transMap = new Map<L, Trans<T>>()

  addLocale(lang: L, trans: Trans<T>): this {
    const interop = transform(trans)
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
