import React, { useEffect, useState } from 'react';
import './App.css';
import SetaDireita from "./images/setadireita.png";
import SetaEsquerda from "./images/setaesquerda.png";
import gifErro from './images/rick.gif';

function App() {
  const [Pessoas, SetPessoas] = useState([]);
  const [Next,SetNext] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

const initialUrl = "https://rickandmortyapi.com/api/character";

  const Load = async(Url) => {
    let resposta = await fetch(Url);
    let json = await resposta.json();
    SetPessoas(json.results || []);
    SetNext(json.info);
  }

useEffect(() => {
  Load(initialUrl)
}, []);

const LoadNext = () => {
  if (Next && Next.next) {
    Load(Next.next);
  }
}

const LoadPrev = () => {
  if (Next && Next.prev) {
    Load(Next.prev);
  }
}

const handleSearch = (e) => {
  setSearchTerm(e.target.value);
  Load(initialUrl);
}

useEffect(() => {
  if (searchTerm.trim() === '') {
    Load(initialUrl);
  } else {
    const filteredUrl = `${initialUrl}?name=${encodeURIComponent(searchTerm)}`;
    Load(filteredUrl);
  }
}, [searchTerm]);

const voltarErro = () => {
  setSearchTerm("");
}

  return (
    <div className='main'>
      <div className='botaoposicao'>
        <input className='buscador' placeholder='Digite o nome do personagem' type="text" onChange={handleSearch} value={searchTerm} />
        {Next && Next.prev && <img src={SetaEsquerda} className='botaoimagem' onClick={LoadPrev} alt="" />}
        {Next && Next.next && <img src={SetaDireita} className='botaoimagem2' onClick={LoadNext} alt="" />}
      </div>
      <div className='personagens'>
      {Pessoas.length === 0 ? (
        <div className='erro'>
          <div className='mensagemerro'>Não há personagens com esse nome</div>
          <img src={gifErro} className='imagemerro' alt="" />
          <button onClick={voltarErro} className='botaoerro'>Voltar para o início</button>
        </div>
      ) : (
        Pessoas.map((item, index) => (
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
      )}
      </div>
      <div className='botaoposicao'>
        {Next && Next.prev && <img src={SetaEsquerda} className='botaoimagem' onClick={LoadPrev} alt="" />}
        {Next && Next.next && <img src={SetaDireita} className='botaoimagem2' onClick={LoadNext} alt="" />}
      </div>
    </div>
  )
}


export default App