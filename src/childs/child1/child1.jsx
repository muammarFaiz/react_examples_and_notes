import { memo, useContext, useEffect, useRef, useState } from "react"
import { appContext as context } from "../../App"

const Child1 = memo(function(props) {
  const renderCount = useRef(0)
  const [btnClickCount, setBtnClickCount] = useState(0)
  const [msgFromChild2, setMsgFromChild2] = useState('')
  useEffect(function() {
    props.child12ref.current = setMsgFromChild2
  }, [])

  renderCount.current++
  function handleClickButton() {
    setBtnClickCount(function(prev) {
      return prev + 1
    })
  }

  return (
    <div className="child1">
      <h2>child 1</h2>
      <p>child 1 render count: {renderCount.current}</p>
      <p>button click count: {btnClickCount}</p>
      <p>{msgFromChild2}</p>
      <button onClick={handleClickButton}>re-render child 1</button>
    </div>
  )
})

export default function Barrier(props) {
  const app_context = useContext(context)
  // looks like you can't modify the input value like this after it assigned to the context.provider value
  // app_context.test1 = ''
  // because quoting from freecodecamp.org: "React context allows us to pass down and use (consume) data in
  // whatever component we need in our React app without using props."
  // therefore you can only pass down, also you can pass down a setState or ref so that state/ref can pass up.
  
  return <Child1 child12ref={app_context.child12ref} />
}