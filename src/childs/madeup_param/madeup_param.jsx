import { useLoaderData, useParams } from "react-router-dom";

export default function Madeup_param(props) {
  const param = useParams()
  const loader_result = useLoaderData()

  return <p>{param.madeup + ' ' + loader_result}</p>
}

export async function mp_loader({params}) {
  // params is the param if the component that owned this loader accept a param
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      resolve('mp_loader result')
    }, 1500);
  })
}