import { useState } from 'react';
import './App.css';


export default function App() {
  const [content, setContent] = useState(1);

  const [text_content, setTextContent] = useState("Привет, мир!");

  function handleClick() {
    setContent(content + 1);
    if(content >= 10 && content < 20){
      setTextContent(`Ух ты!! + ${content}см твоей пипиське!!!`);
    }
    else if(content >= 20 && content < 100){
      setTextContent(`А вот хер тебе! Остальные ${content}см пойдут к моей пипиське :)`);
    }
    else if(content >= 100){
      setTextContent(`Ебать, куда разогнался ?`);
    }
  }

  return (
    <>
      <div className='startPage'>
        <h1>{text_content}</h1>
        <div className='magicDiv'>
          <button onClick={handleClick} className='magicButton'>Нажми на меня: {content}</button>
        </div>
      </div>
    </>
  )
}