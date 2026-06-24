import './App.css';
import Dados from './components/dados';

function App() {
  return (
    <div className="app">
      <h1>Custom Task LTDA</h1>
      <p>Exibição de produtos organizados em cards com persistência no navegador.</p>
      <Dados />
    </div>
  );
}

export default App;
