import * as React from 'react'
import TypedI18n from './TypedI18n'

const I18nContext = React.createContext<TypedI18n<any, any>>(null as any)

function useTransBase<L extends string, T>(): TypedI18n<L, T> {
  const context = React.useContext(I18nContext)
  if (!context) {
    throw new Error('Provider not found')
  }
  return context
}

function useChangeLocaleBase<L>() {
  const context = React.useContext(I18nContext)
  if (!context) {
    throw new Error('Provider not found')
  }
  const [, setTick] = React.useState(0)
  const update = React.useCallback((locale: L) => {
    setTick(tick => tick + 1)
    context.setLocale(locale)
  }, [])
  return update
}

export function createContextHooks<L extends string, T>(t: TypedI18n<L, T>) {
  function useTrans() {
    return useTransBase<L, T>()
  }
  function useChangeLocale() {
    return useChangeLocaleBase<L>()
  }
  function Provider<T>(props: T) {
    return React.createElement(I18nContext.Provider, {
      value: t,
      ...props,
    })
  }
  return { useTrans, useChangeLocale, Provider }
}
