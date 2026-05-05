import { useState } from 'react';

function TaskInput({ value, onChange, onAdd }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onAdd();
    }
  };

  return (
    <section className="input-section">
      <input 
        type="text" 
        placeholder="Digite uma tarefa" 
        value={value} 
        onChange={onChange}
        onKeyPress={handleKeyPress}
      />
      <button onClick={onAdd}>Adicionar</button>
    </section>
  )
}

export default TaskInput;