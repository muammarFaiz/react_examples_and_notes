import { useNavigate } from "react-router-dom"

export default function Nested1(props) {
  const navigate = useNavigate()
  
  function handleHomeBtn(ev) {
    navigate('/')
  }

  return (
    <div className="nested1">
      <h1>Nested 1</h1>
      <button onClick={handleHomeBtn}>Home</button>
    </div>
  )
}