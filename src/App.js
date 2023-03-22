import React, { useEffect, useState } from "react";
export const App = () => {
  const GIPHY_API_KEY = "dc6zaTOxFJmzC"
  const [catFact, setCatFact] = useState('')
  const [catGif, setCatGif] = useState('')

  function BotonEjecutar(props) {
    return (
      <button onClick={props.handleClick} style={{ backgroundColor: 'blue', color: 'white', borderRadius: '5px', boxShadow: '2px 2px 2px grey' }}>
        Click Aqui!
      </button>
    );
  }

  function Navbar() {
    return (
      <nav style={{ backgroundColor: 'black', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80px', fontFamily: 'Courier New' }}>
        <h1 style={{ fontSize: '36px' }}>TP Tec Emergentes</h1>
      </nav>
    );
  }

  const callGiphyAPI = (string) => {
    // const word = "bear"; // aquí puedes reemplazar "cat" con una variable que contenga la cadena de búsqueda del usuario
    fetch(`https://api.giphy.com/v1/gifs/search?api_key=XaGG5vM6Q5p8mUkhCV4QdbTtwfgEgHSD&q=${string}&limit=25&offset=0&rating=g&lang=en`, { mode: "cors" })
      // fetch(`https://api.giphy.com/v1/gifs/search?q=${string}&api_key=${GIPHY_API_KEY}`, { mode: "cors" })

      .then((Response) => Response.json())
      .then((data) => setCatGif(data.data[0]?.images?.original?.url || null))
      .catch((error) => {
        console.error(error);
        setCatGif('https://via.placeholder.com/500x500?text=Error+al+cargar+la+imagen');
      });
  };
  const callAPI = () => {
    fetch('https://catfact.ninja/fact')
      .then(Response => Response.json())
      .then((data) => {
        setCatFact(data.fact || 'hola michi michi');
        callGiphyAPI(data?.fact?.split(" ").slice(0, 3).join(' '))
      });
  };


  useEffect(callAPI, []);
  console.log(catGif);
  return (
    <>
      <div style={{ backgroundImage: "url('fondo.jpg')", backgroundSize: 'cover', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', fontFamily: 'Courier New' }}>
        <Navbar />
        <h1 style={{ fontSize: '24px', color: 'white', backgroundColor: 'grey' }}>{catFact}</h1>
        <img alt="imagen de gato aleatoria" src={catGif} crossOrigin="true"
          style={{
            width: '300px',
            height: '300px',
            borderRadius: '10%',
            boxShadow: '2px 2px 2px grey'
          }} />
        <br />
        <BotonEjecutar handleClick={callAPI} />
      </div>
    </>
  );
};
export default App;

