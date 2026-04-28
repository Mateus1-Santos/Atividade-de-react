import { useState } from 'react';

function InputAdicionar (props){
    return(
        <section className="input">
            <input type="text" placeholder="Digite uma tarefa" value={props.value} onChange={props.onChange}/>


        </section>
    )
}

export default InputAdicionar;