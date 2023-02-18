import { useActionData } from "react-router-dom";

export async function form_action(obj) {
  console.log(obj)
  const formdata = await obj.request.formData()
  const result = formdata.get('faiz')
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve(result)
    }, 1500);
  })
}


export default function Form_respond(obj) {
  const action_result = useActionData()
  return (
    <>
      <p>this is a respond page after you submit the form in tryform <br /> this 'strategy' usually used
      after a user successfully register his user account so this will be a login page</p>
      <p>result: {action_result}</p>
    </>
  )
}
