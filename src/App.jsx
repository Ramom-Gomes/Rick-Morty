import { useEffect, useState } from 'react';
import './App.css';

function App() {
  let [Pessoas, SetPessoas] = useState([]);
  let [Next,SetNext] = useState([]);

const initialUrl = "https://rickandmortyapi.com/api/character";

  const Load = async(Url) => {
    let resposta = await fetch(Url);
    let json = await resposta.json();
    SetPessoas(json.results);
    SetNext(json.info);
  }

useEffect(() => {
  Load(initialUrl)
}, []);

const LoadNext = () => {
    Load(Next.next)
}

const LoadPrev = () => {
    Load(Next.prev)
}

  return (
    <div>
      <button onClick={LoadPrev}>voltar</button>
      <button onClick={LoadNext}>proximo</button>
      {Pessoas.map((item, index) => (
        <div key={index}>
          {item.name}
          {item.status}
          <img src={item.image} alt="" />
        </div>
      ))}
    </div>
  )
}


export default App