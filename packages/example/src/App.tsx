import * as React from 'react'
import './App.css'
import { useTrans, useChangeLocale } from './i18n'

function App() {
  const t = useTrans()
  const changeLocale = useChangeLocale()

  const changeLang = React.useCallback(() => {
    changeLocale(t.locale === 'en' ? 'ja' : 'en')
  }, [changeLocale, t.locale])

  return (
    <div className="App">
      <div className="App-title">{t.trans.hello}</div>
      <div className="App-btn" onClick={changeLang}>
        {t.trans.goodbye}
      </div>
    </div>
  )
}

export default App
