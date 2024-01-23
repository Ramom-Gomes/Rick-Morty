import React, { useEffect, useState } from 'react';
import './App.css';
import SetaDireita from "./images/setadireita.png";
import SetaEsquerda from "./images/setaesquerda.png";
import gifErro from './images/rick.gif';

function App() {
  const [Pessoas, SetPessoas] = useState([]);
  const [Next, SetNext] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const initialUrl = "https://rickandmortyapi.com/api/character";

  const Load = async (Url) => {
    let resposta = await fetch(Url);
    let json = await resposta.json();
    SetPessoas(json.results || []);
    SetNext(json.info);
  }

  useEffect(() => {
    Load(initialUrl)
  }, []);

  return (
    <div className='main'>
      <div className='personagens'>
        {Pessoas.map((item, index) => (
          <div className='personagemposicao' key={index}>
            <img className='image' src={item.image} width={250} alt="" />
            <div className='personagensmargin'>
              <h1 className='personagemtitulo'>{item.name}</h1>
              <div className='posicaostatusespecie'>
                <div className='personagemstatus'>{item.status}-</div>
                <div className='personagemespecie'>{item.species}</div>
              </div>
              <div className='personagemlocal'>Última localização conhecida:</div>
              <div className='personagemlocalnome'>{item.location.name}</div>
              <div className='personagemlocal'>Visto pela primeira vez em:</div>
              <div className='personagemlocalnome'>{item.origin.name}</div>
            </div>
          </div>
        ))
        }
      </div>
    </div>
  )
}


export default App