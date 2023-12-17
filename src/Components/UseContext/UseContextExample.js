import React, { createContext, useContext, useState } from "react";
import Components1 from "./Components1";

export const UserContext = createContext();

export default function UseContextExample() {
    console.log("UseContextExample")

    const [name,setName]= useState("")

    const getDataFromChilde = (data)=>{
        console.log("parant", data)
    }
  return (
    <div>
      <h1>UseContextExample</h1>

    <input onChange={(e)=>{setName(e.target.value)}}></input>
    

      <UserContext.Provider value={{"value":name,"callBack":getDataFromChilde }} >
        <Components1 />
      </UserContext.Provider>
    </div>
  );
}
