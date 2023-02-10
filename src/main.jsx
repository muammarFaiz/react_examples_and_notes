import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createBrowserRouter, RouterProvider
} from 'react-router-dom'
import ErrEl from './childs/errorElem/errorPage'

const router = createBrowserRouter([
  {path: '/react_notes', element: <App />, errorElement: <ErrEl />, children: []}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
