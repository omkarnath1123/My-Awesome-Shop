import React from 'react';
import './Options.css'

const ColorButton = props=>{

    return (
        <div>
        <h6 style={{color: 'grey'}}>{props.count} {props.typ} types available</h6>
        <div>
        {props && props.arr && props.arr.map(items=>{
            return <button style={{color: "grey"}} onClick={() => props.clickedC(items._id)} key={items._id}
                           className={ (items._id === props.options[0] || items._id === props.options[1]) ? "btn btn-info active" : "btn btn-light"}>{items.name}</button>

        })}
        </div>
        </div> 
    )
}

export default ColorButton;