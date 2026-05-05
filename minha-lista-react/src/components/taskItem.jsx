function TaskItem({ tarefa, onToggle, onDelete }) {
  return (
    <li className={`tarefa-item ${tarefa.concluida ? 'concluida' : ''}`}>
      <input 
        type="checkbox" 
        checked={tarefa.concluida} 
        onChange={() => onToggle(tarefa.id)} 
      />
      <span onClick={() => onToggle(tarefa.id)}>{tarefa.texto}</span>
      <button onClick={() => onDelete(tarefa.id)}>Excluir</button>
    </li>
  );
}

export default TaskItem;