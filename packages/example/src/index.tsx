import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from './i18n'

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root'),
)
