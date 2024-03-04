import { useState } from 'react';
import './App.css';

function count(countet){
  if(content >= 10 && content < 20){
    return(`Ух ты!! + ${content}см твоей пипиське!!!`);
  }
  else if(content >= 20 && content < 100){
    return(`А вот хер тебе! Остальные ${content}см пойдут к моей пипиське :)`);
  }
  else if(content >= 100 && content < 150){
    return(`Ебать разогнался!`);
  }
  else if(content >= 150 && content < 200){
    return(`Всё, хватит!`);
  }
  else if(content == 200){
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    return `ХВАТИТ!`;
  }
  else if(content == 201){
    window.close();
    return `ОТЪЕИСЬ!!!`;
  }
  else{
    return('Привет, даун!');
  }
}

export default function App() {
  const [content, setContent] = useState(1);
  function handleClick() {
    setContent(content + 1);
    
  }

  return (
    <>
      <div className='startPage'>
        <h1>{count(content)}</h1>
        <div className='magicDiv'>
          <button onClick={handleClick} className='magicButton'>Нажми на меня: {content}</button>
        </div>
      </div>
    </>
  )
}
