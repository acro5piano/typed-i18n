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

export function createContextHook<L extends string, T>() {
  return function useTrans() {
    return useTransBase<L, T>()
  }
}

export const { Provider } = I18nContext
