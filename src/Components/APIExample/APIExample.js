import React, { useEffect, useState } from "react";
import axios from "axios";


export default function APIExample() {
  const [persons, setPerson] = useState([]);

  const datafromapi =(apiData)=>{
    setPerson(apiData)
  }

  const getData = () => {
    axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
      const persons = res.data;
       setPerson( persons );
    });
  };


  useEffect(()=>{
    getData()
  },[])

  console.log("api data", persons)
  

  return <div>
    <h1>example</h1>
    <ul>
        {
          persons
            .map(person =>
              <li key={person.id}>{person.name}</li>
            )
        }
      </ul>

      <input type="button" value="update" onClick={()=>{getData()}}></input>


    
  </div>;
}
