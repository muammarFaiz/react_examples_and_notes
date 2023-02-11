import { NavLink, Outlet, useNavigate } from "react-router-dom"
import './nested1.css'

export default function Nested1(props) {
  const navigate = useNavigate()
  
  function handleHomeBtn(ev) {
    navigate('/')
  }
  function returnBtn(obj) {
    console.log(obj)
    const [_class, _disabled] = obj.isActive ? ['bordered', true] : ['', false]
    return <button className={_class} disabled={_disabled}>Nested 2</button>
  }

  return (
    <div className="nested1">
      <h1>Nested 1</h1>
      <button onClick={handleHomeBtn}>Home</button>
      <NavLink to={'nested2'}>{returnBtn}</NavLink>
      <Outlet />
    </div>
  )
}