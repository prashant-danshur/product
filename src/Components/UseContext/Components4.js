import React, { useContext } from 'react'

import {UserContext} from './UseContextExample'

export default function Components4() {
    console.log("Components4")

    const obj = useContext(UserContext)
    console.log(obj)
  return (
    <div>Components4
        <h1>{obj.value}</h1>

        <input onChange={(e)=>{obj.callBack(e.target.value)}}></input>
    </div>
  )
}
