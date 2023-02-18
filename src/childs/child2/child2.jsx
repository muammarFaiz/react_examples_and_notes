import { memo, useContext, useState, useRef, useEffect } from "react"
import { appContext as context } from "../../App"
import './child2.css'

// using memo to prevent this comp to re-render when the parent re-render if the props still the same
const Child2_inner = memo(function(props) {
  const [btnClass, setBtnClass] = useState('')
  const renderCount = useRef(0)
  const input1 = useRef()
  
  renderCount.current++

  function clickResponse1() {
    if (btnClass !== '') {
      setBtnClass('')
    } else {
      setBtnClass('green_btn')
    }
    props.child12ref.current(input1.current.value)
  }
  function clickResponse2() {
    props.dispatch({action: 'customBtnClickCount'})
  }

  return (
    <div className="child2">
      <h2>child 2</h2>
      <p>child 2 render count: {renderCount.current}</p>
      <input type="text" ref={input1} /><br />
      <button className={btnClass} onClick={clickResponse1}>send it to child 1</button><br />

      {/* click this button to trigger the click count reducer in app component */}
      <button onClick={clickResponse2}>button123</button>
    </div>
  )
})

// this component will always re-render when the context provider re-render because this component use
// useContext / context.consumer.
// BASIC REACT: when a component re-render if it render the context.provider then any childs who use its context will
// also re-render regardless if it use a memo or not.
export default function renderBarrier(props) {
  const app_context = useContext(context)

  return <Child2_inner child12ref={app_context.child12ref} dispatch={app_context.dispatch} />
}