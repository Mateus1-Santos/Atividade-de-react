import { useState } from 'react';
import './App.css'
import InputAdicionar from './components/TaskInput'

function App() {
  // useState guarda a lista de tarefas
  const [tarefas, setTarefas] = useState([]);
  
  // Texto que o usuário digita
  const [texto, setTexto] = useState('');

  // Função para adicionar tarefa
  function adicionarTarefa() {
    if (texto.trim()) {
      setTarefas([...tarefas, { id: Date.now(), texto: texto, concluida: false }]);
      setTexto('');
    }
  }

  return (
    <>
      <h1>Sua lista personalizada</h1>
      <div>
        <p>Veja e gerencie suas tarefas de forma simples e eficiente.</p>

        <InputAdicionar value={texto} onChange={(e) => setTexto(e.target.value)} />
        
        <button onClick={adicionarTarefa}>Adicionar</button>

        {/* Lista de tarefas */}
        <ul>
          {tarefas.map(tarefa => (
            <li key={tarefa.id}>{tarefa.texto}</li>
          ))}
        </ul>

      </div>
    </>
  )
}

export default App