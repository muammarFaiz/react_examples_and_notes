import { useRouteError } from "react-router-dom"

const ErrEl = function(props) {
  const err = useRouteError()
  console.log(err)

  return (
    <div className="errorpage">
      <h1>Error</h1>
      <p>{err.statusText || err.message}</p>
    </div>
  )
}

export default ErrEl