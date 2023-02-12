import { useRef } from "react"
import { Form, useActionData } from "react-router-dom"
import './tryform.css'

export async function formaction({request}) {
  const data = await request.formData()
  const faiz = data.get('faiz')
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve(faiz)
    }, 1500);
  })
}

export default function Tryform(props) {
  const form_result = useActionData()
  const rendercount = useRef(0)

  rendercount.current++

  return (
    <div className="tryform">
      <p>tryform render count: {rendercount.current}</p>
      <p>{form_result}</p>
      <Form method="post">
        <input type="text" name="faiz" />
      </Form>
    </div>
  )
}