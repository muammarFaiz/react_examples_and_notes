import { useLoaderData, useParams } from "react-router-dom";
import './madeup_param.css'

export default function Madeup_param(props) {
  const param = useParams()
  const loader_result = useLoaderData()

  return (
    <div className="madeup_page">
      <p>param: {param.madeup}</p>
      <p>{loader_result}</p>
    </div>
  )
}

export async function mp_loader({params}) {
  // params is the param if the component that owned this loader accept a param
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve('mp_loader result')
    }, 1500);
  })
}