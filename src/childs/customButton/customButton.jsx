import { memo, useState } from "react"
import './customButton.css'

// using memo to prevent this comp to re-render when the parent re-render if the props still the same
const Mybtn = memo(function(props) {
  const [btnClass, setBtnClass] = useState('')

  console.log('custom button re-render')
  function clickResponse() {
    if(btnClass !== '') {
      setBtnClass('')
    } else {
      setBtnClass('green_btn')
    }
    props.dispatch({action: 'customBtnClickCount'})
  }

  return <button className={btnClass} onClick={clickResponse}>{props.children}</button>
})

export default Mybtn