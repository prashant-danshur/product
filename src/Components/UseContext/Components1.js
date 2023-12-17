import React, { memo } from 'react'
import Components2 from './Components2'

 const Components1 =() =>{
    console.log("Components1")
  return (
    <div>Components1
        <Components2></Components2>
    </div>
  )
}

export default memo(Components1)