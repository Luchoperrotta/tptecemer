import React, { useEffect, useState } from "react";

export const App = () => {
  const GIPHY_API_KEY = "N79DhT5EQxbkZQFQkEG9QgVYcdYRBhFV"
  const [catFact, setCatFact] = useState('')
  const [catGif, setCatGif] = useState('')

  function BotonEjecutar(props) {
    return (
      <button onClick={props.handleClick}>
        Ejecutar Función
      </button>
    );
  }

  const callGiphyAPI = (string) => {
    fetch(`https://api.giphy.com/v1/gifs/search?q=${string}&api_key=${GIPHY_API_KEY}`)
    .then((Response) => Response.json())
    .then((data) => setCatGif( data.data[0].url))
    .then((data) => console.log( data.data[0].url))
    
  };
  const callAPI = () => {
    fetch('https://catfact.ninja/fact')
    .then(Response => Response.json())
    .then((data) => {
      setCatFact(data.fact || 'hola michi michi');
      callGiphyAPI(data?.fact?.split(" ").slice(0,3).join(' '))
    });
  };
  useEffect(callAPI, []);
  return(
    <>
    <h1>{catFact}</h1>
    <img src={catGif} crossOrigin/>
    <BotonEjecutar handleClick={callAPI} />
    </>
  ); 
};
export default App;
