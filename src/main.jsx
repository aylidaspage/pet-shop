import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// 1) Роутер: чтобы работали <Routes>/<Route>/<NavLink>
import { BrowserRouter } from 'react-router-dom'
// 2) Редакс-провайдер: чтобы любой компонент мог читать/менять глобальный state
import { Provider } from 'react-redux'
import { store } from './store/index.js'

createRoot(document.getElementById('root')).render(
  <Provider store={store}> {/* Provider «даёт» всем дочерним компонентам доступ к Redux store */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)
