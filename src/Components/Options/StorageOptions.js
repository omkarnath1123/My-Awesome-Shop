import React from 'react';
import './Options.css'
const StorageOptions = props=>{

    return (
        <div>
        <h3>{props.typ}:</h3>
        <div>
        {props && props.arr && props.arr.map(items=>{
            return <button onClick={()=>props.clickedS(items._id)} key={items._id} className={ (items._id === props.options[0] || items._id === props.options[1]) ? "btn btn-primary active" : "btn btn-light"} >{items.name}</button>
            // console.log(items);
        })}
        </div>
        </div> 
    )
}

export default StorageOptions;