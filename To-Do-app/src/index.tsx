import React from 'react'
import App from './App'
import ReactDOM from 'react-dom/client'
import './index.css'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor } from './app/store'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
  </React.StrictMode>
);

