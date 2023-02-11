import { useNavigate } from "react-router-dom"

export default function Nested2(props) {
  const navigate = useNavigate()

  function handleBtn() {
    navigate('/')
  }
  function handleBack() {
    navigate('../')
  }

  return (
    <div className="nested2">
      <h1>Nested 2</h1>
      <button onClick={handleBtn}>Home</button>
      <button onClick={handleBack}>back</button>
    </div>
  )
}