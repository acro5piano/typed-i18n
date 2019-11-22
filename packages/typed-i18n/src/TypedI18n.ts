type TransFn = (...args: string[]) => string

interface TransFnWithKey {
  [key: string]: string | TransFn | TransFnWithKey
}

type Trans<T> = object & T & TransFnWithKey

function transform<T extends {}>(obj: T): Trans<T> {
  return Object.keys(obj).reduce((car, key) => {
    const value = (obj as any)[key]
    if (typeof value === 'string') {
      return { ...car, [key]: value }
    }
    if (typeof value === 'object') {
      return { ...car, [key]: transform(value) }
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

export function interp(fn: (...args: string[]) => string) {
  return function lazyIntorp(...args: string[]) {
    return fn(...args)
  }
}

function get(obj: any, path: string) {
  return path.split('.').reduce((car, key) => car[key], obj)
}

export class TypedI18n<L extends string, T> {
  locale!: L
  transMap = new Map<L, Trans<T>>()
  args: string[] = []

  addLocale(lang: L, trans: Trans<T>): this {
    const interop = transform(trans)
    this.transMap.set(lang, interop)
    return this
  }

  setLocale(locale: L) {
    this.locale = locale
    return this
  }

  withArgs(...args: string[]) {
    this.args = args
    return this
  }

  getTransProxyHandler() {
    return {
      get: (trans: any, field: string): typeof Proxy | string | Function => {
        const args = this.args
        const value: string | object | Function = trans[field]
        if (typeof value === 'object') {
          return new Proxy(value, this.getTransProxyHandler())
        }
        if (typeof value === 'function') {
          return value
        }
        this.args = []
        const argsFilled: string = args.reduce(
          (car, arg, index) => car.replace(`$${index + 1}`, arg),
          trans[field],
        )
        const THIS_REGEX = /\$this[.|a-z|0-9]+/g
        const thisArgs = argsFilled.match(THIS_REGEX)
        if (!thisArgs) {
          return argsFilled
        }
        const thisFilled = thisArgs.reduce((car, thisArg) => {
          const variable = get(trans, thisArg.replace('$this.', ''))
          return car.replace(thisArg, variable)
        }, value)
        return thisFilled
      },
    }
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
    return new Proxy(
      this.transMap.get(this.locale)!,
      this.getTransProxyHandler(),
    )
  }
}

export default TypedI18n
