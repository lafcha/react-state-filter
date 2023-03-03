import { useRef, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  //On utilise le hook useRef pour récupérer les données de l'input
  const inputRef = useRef();

  function onSubmit(e) {
    e.preventDefault();
    //On peut récupérer la valeur de l'input 
    const value = inputRef.current.value;
    if (value === "") return
    setItems(prev => {
      return [...prev, value]
    })
    //Une fois la valeur stockée dans le state, on peut vider l'input
    inputRef.current.value="";
  }

    return (
        <>
            Search: 
            <input type="search" />
        <form onSubmit={onSubmit}>
          New Item: 
          {/* On ajoute le hook en ref de l'input */}
          <input type="text" ref={inputRef} />
          <button type="submit">Add</button>
        </form>
        <h3>Items: </h3>
        {items.map(item => (
          <div>{item}</div>
        ))}
        </>
    );
}

export default App;
