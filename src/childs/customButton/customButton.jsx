import { memo, useContext, useState } from "react"
import { appContext } from "../../App"
import './customButton.css'

// using memo to prevent this comp to re-render when the parent re-render if the props still the same
const Mybtn = memo(function(props) {
  const [btnClass, setBtnClass] = useState('')
  const appcontext = useContext(appContext)

  console.log('custom button re-render')
  function clickResponse() {
    if(btnClass !== '') {
      setBtnClass('')
    } else {
      setBtnClass('green_btn')
    }
    appcontext.dispatch({action: 'customBtnClickCount'})
  }

  return <button className={btnClass} onClick={clickResponse}>{props.children}</button>
})

export default Mybtn