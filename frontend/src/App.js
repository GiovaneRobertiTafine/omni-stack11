import React from 'react';
// import Header from './Header';
import './global.css';
// JSX (JavaScript XML)
/**
 * Quando acontece alguma atualizaçao de estado no componente sendo até mesmo variavel
 * Voce precisa utilizar a biblioteca useState para receber essas atualizações de estado 
 * */ 
import Routes from './routes';

function App() {
  // let [counter, setCounter] = useState(0);
  // Quando voce utiliza o useState vc recebe um vetor
  // Array [valor, funcaodeAtualizaçao]
  // function increment() {
  //   setCounter(counter + 1);
  //   console.log(counter);
  // }
  
  return (
    <div>
      <Routes />
    </div>
  );
}

export default App;
