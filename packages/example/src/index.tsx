import React from 'react'
import { Provider } from 'typed-i18n/jsx'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import t from './i18n'

ReactDOM.render(
  <Provider value={t}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
