import { memo, useContext, useEffect, useRef, useState } from "react"
import { appContext as context } from "../../App"


export default function Barrier(props) {
  const app_context = useContext(context)
  
  const Child1 = memo(function({app_context}) {
    const renderCount = useRef(0)
    const [btnClickCount, setBtnClickCount] = useState(0)
    const [msgFromChild2, setMsgFromChild2] = useState('')
    useEffect(function() {
      app_context.setMsgFromChild2 = setMsgFromChild2
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
  
  return <Child1 app_context={app_context} />
}