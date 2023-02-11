import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  createHashRouter, RouterProvider
} from 'react-router-dom'
import ErrEl from './childs/errorElem/errorPage'
import Page404 from './childs/404page/page404'
import Nested1 from './childs/nested1/nested1'
import Nested2 from './childs/nested1/nested2/nested2'
import Madeup_param, { mp_loader } from './childs/madeup_param/madeup_param'

// problem: github pages does not provide nested route, only provide the root route 
// solution: using createHashRouter react router create hash at the front of the root route, in this case:
// http://127.0.0.1:5173/react_examples_and_notes_githubpages/#/
// why: a server ignore # and everything after it, so the github server only receive
// http://127.0.0.1:5173/react_examples_and_notes_githubpages/ from the browser, when the github server
// serve the html js css, react-router read the complete url including the # and after it, that why
// react router able to provide the apropriate components while github only receive the root.
// source:
// https://stackoverflow.com/questions/51974369/what-is-the-difference-between-hashrouter-and-browserrouter-in-react
const router = createHashRouter([
  {path: '/', element: <App />, errorElement: <ErrEl />, children: [
    {path: ':madeup', element: <Madeup_param />, loader: mp_loader}
  ]},
  {path: 'nested1', element: <Nested1 />, children: [
    {path: 'nested2', element: <Nested2 />}
  ]},
  {path: '*', element: <Page404 />}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)