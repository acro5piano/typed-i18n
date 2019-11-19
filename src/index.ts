export class TypedI18n<L extends string, T> {
  locale!: L
  transMap = new Map<L, T>()

  addLocale(lang: L, trans: T) {
    this.transMap.set(lang, trans)
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
