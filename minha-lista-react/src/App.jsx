import { useState } from 'react';
import './App.css'
import TaskInput from './components/TaskInput'
import TaskItem from './components/TaskItem'

function App() {
  // useState guarda a lista de tarefas
  const [tarefas, setTarefas] = useState([]);
  
  // Texto que o usuário digita
  const [texto, setTexto] = useState('');

  // Filtro: 'all', 'pending', 'completed'
  const [filtro, setFiltro] = useState('all');

  // Função para adicionar tarefa
  function adicionarTarefa() {
    if (texto.trim()) {
      setTarefas([...tarefas, { id: Date.now(), texto: texto.trim(), concluida: false }]);
      setTexto('');
    }
  }

  // Função para marcar como concluída
  function toggleConcluida(id) {
    setTarefas(tarefas.map(tarefa => 
      tarefa.id === id ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
    ));
  }

  // Função para remover tarefa
  function removerTarefa(id) {
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
  }

  // Filtrar tarefas baseado no filtro selecionado
  const tarefasFiltradas = tarefas.filter(tarefa => {
    if (filtro === 'pending') return !tarefa.concluida;
    if (filtro === 'completed') return tarefa.concluida;
    return true; // 'all'
  });

  return (
    <div className="app">
      <h1>Gerenciador de Tarefas Dinâmico</h1>
      <p>Veja e gerencie suas tarefas de forma simples e eficiente.</p>

      <TaskInput 
        value={texto} 
        onChange={(e) => setTexto(e.target.value)} 
        onAdd={adicionarTarefa} 
      />
      
      <div className="filtros">
        <button onClick={() => setFiltro('all')} className={filtro === 'all' ? 'ativo' : ''}>Todas</button>
        <button onClick={() => setFiltro('pending')} className={filtro === 'pending' ? 'ativo' : ''}>Pendentes</button>
        <button onClick={() => setFiltro('completed')} className={filtro === 'completed' ? 'ativo' : ''}>Concluídas</button>
      </div>

      {/* Lista de tarefas */}
      <ul className="lista-tarefas">
        {tarefasFiltradas.map(tarefa => (
          <TaskItem 
            key={tarefa.id} 
            tarefa={tarefa} 
            onToggle={toggleConcluida} 
            onDelete={removerTarefa} 
          />
        ))}
      </ul>
    </div>
  )
}

export default App