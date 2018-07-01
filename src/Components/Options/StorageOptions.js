import React from 'react';

const StorageOptions = props=>{

    return (
        <div>
        <h3>{props.typ}:</h3>
        <div>
        {props && props.arr && props.arr.map(items=>{
            return <button onClick={()=>props.clickedS(items._id)} key={items._id}>{items.name}</button>
            // console.log(items);
        })}
        </div>
        </div> 
    )
}

export default StorageOptions;