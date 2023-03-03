import { useMemo, useRef, useState } from "react";
import { Counter } from "./Counter";

function App() {
  const [items, setItems] = useState([]);
  //On crée un state qui contiendra la valeur de l'input
  const [query, setQuery] = useState("");
  //On ajoute un hook useRef, on le nom inputRef
  const inputRef = useRef();

  function onSubmit(e) {
    e.preventDefault();
    //On peut récupérer la valeur de l'input
    const value = inputRef.current.value;
    if (value === "") return;
    setItems((prev) => {
      return [...prev, value];
    });

    //Une fois la valeur stockée dans le state, on peut vider l'input
    inputRef.current.value = "";
  }

  //On stocke les éléments filtrés dans un tableau
  //Afin de ne pas recalculer à chaque fois que l'on recharge la page / rerender le composant
  //On utilise le hook useMemo pour stocker les informations
  const filteredItems = useMemo(() => {
    return items.filter((item) => { return item.toLowerCase().includes(query.toLowerCase()); })
    //après la fonction, on ajoute les paramètres qui déclencheront le rerender
    //Autrement dit : tant que ces deux variables n'auront pas changé de valeur, on ne refait pas
    //le calcul
  }, [items, query])
  


    return (
        <>
            Search:
            {/* la valeur de l'input sera stocké dans query, on change, 
         on stocke la valeur de l'input dans query*/}
            <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} />
            <form onSubmit={onSubmit}>
                New Item:
                {/* On ajoute le hook en ref de l'input */}
                <input type="text" ref={inputRef} />
                <button type="submit">Add</button>
            </form>
            <h3>Items: </h3>
            {/* On affiche que les items filtrés */}
        {filteredItems.map((item) => (
                <div key={item}>{item}</div>
        ))}
        <Counter />
        </>
    );
}

export default App;
