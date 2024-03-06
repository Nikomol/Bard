import { useState } from 'react';
import './App.css';

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
