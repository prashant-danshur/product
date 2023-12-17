import React, { useCallback, useMemo, useState } from "react";

export default function UseMemoExample() {
  const [number, setNumber] = useState(10);
  const [theme, setTheme] = useState("white");

  const calNumber = (p_number) => {
     for (let index = 0; index < 2000000000; index++) {}
    return number * 2 ;
  };

  //   let value = useMemo(()=>{
  //         return calNumber()
  //   },[number])

  let value = useCallback((number) => {
    return calNumber(number);
  }, [number]);

  const changeTheme = () => {
    setTheme((previousValue) => {
      return previousValue === "white" ? "black" : "white";
    });
  };

  return (
    <div
      style={{
        backgroundColor: theme,
      }}
    >
      <input
        type="number"
        onChange={(e) => {
          setNumber(e.target.value);
        }}
      />
      <input type="button" value="change theme" onClick={changeTheme} />
      <h1>{value(number)}</h1>
    </div>
  );
}
