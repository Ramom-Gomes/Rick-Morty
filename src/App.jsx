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
    <div className='main'>
      <button onClick={LoadPrev}>voltar</button>
      <button onClick={LoadNext}>proximo</button>
      <div className='personagens'>
        {Pessoas.map((item, index) => (
          <div className='personagemposicao' key={index}>
              <img src={item.image} alt="" />
              <div>
                <h1>{item.name}</h1>
                {item.status}
              </div>
          </div>
        ))}
      </div>
    </div>
  )
}


export default App