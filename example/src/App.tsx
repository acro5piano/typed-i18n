import React from 'react'
import './App.css'
import { useTrans } from './i18n'

function App() {
  const t = useTrans()

  // TODO
  const changeLang = () => {
    t.setLocale(t.locale === 'en' ? 'ja' : 'en')
  }

  React.useEffect(() => {
    console.log('hoge')
  })

  return (
    <div className="App">
      <span className="App-btn" onClick={changeLang}>
        {t.trans.goodbye}
      </span>
    </div>
  )
}

export default App
