import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';


export default function App() {
  const [content, setContent] = useState(1);

  function handleClick(){
    setContent(content + 1);
  }

  return (
    <>
      <button onClick={handleClick}>{content}</button>
    </>
  )
}