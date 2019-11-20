import * as React from 'react'
import TypedI18n from '.'

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

export function createContextHook<L extends string, T>() {
  function useTrans() {
    return useTransBase<L, T>()
  }
  function useChangeLocale() {
    return useChangeLocaleBase<L>()
  }
  return { useTrans, useChangeLocale }
}

export const { Provider } = I18nContext
