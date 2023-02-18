import { useRef, useState } from "react"
// RRD:
import { Form } from "react-router-dom"
import './tryform.css'

export default function Tryform(props) {
  const rendercount = useRef(0)
  const [loading, setLoading] = useState('')

  rendercount.current++

  return (
    <div className="tryform">
      <p>tryform render count: {rendercount.current}</p>
      <Form method="post" action="/tryform_action" onSubmit={function(ev) {setLoading('show')}}>
        <input type="text" name="faiz" />
      </Form>
      {loading === 'show' ? <p>loading...</p> : ''}
    </div>
  )
}