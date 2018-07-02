import React from 'react';

const ColorButton = props=>{

    return (
        <div>
        <h3>{props.typ}:</h3>
        <div>
        {props && props.arr && props.arr.map(items=>{
            return <button onClick={() => props.clickedC(items._id)} key={items._id} className={ (items._id === props.options[0] || items._id === props.options[1]) ? "btn btn-primary active" : ""}>{items.name}</button>

        })}
        </div>
        </div> 
    )
}

export default ColorButton;