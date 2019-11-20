import React from 'react'
import './App.css'
import { useTrans, useForceUpdate } from './i18n'

function App() {
  const t = useTrans()
  const update = useForceUpdate()

  // TODO
  const changeLang = () => {
    t.setLocale(t.locale === 'en' ? 'ja' : 'en')
    update()
  }

  return (
    <div className="App">
      <span className="App-btn" onClick={changeLang}>
        {t.trans.goodbye}
      </span>
    </div>
  )
}

export default App
