import React from 'react';
import './Post.css';

const Post = props =>(
    <article className="Post" onClick={props.clicked}>
    {/* <article className="Post" >   */}
        <h1>{props.title}</h1>
            {/* {props.pic.map(photos =>{
                return <img src={photos} key ={photos}   />
            })} */}

            <p>Market Price: ₹ {Math.trunc(props.MarkPrice)}</p>
            <p>Sale Price: ₹ {Math.trunc(props.salePrice)}</p>
            <br/>
            <img src={props.pic[0]} />
            

    </article>
)

export default Post;