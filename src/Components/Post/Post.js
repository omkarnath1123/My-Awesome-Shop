import React from 'react';
import './Post.css';

const Post = props =>(
    <article className="Post" onClick={props.clicked}>
    {/* <article className="Post" >   */}
        
            {/* {props.pic.map(photos =>{
                return <img src={photos} key ={photos}   />
            })} */}
            <div>
                <img src={props.pic[0]} className="imageThumb img-fluid" alt="props.title"/>
            </div>
            <div className="caption">
                <h6>{props.title}</h6>
                <p>Sale Price: ₹ {Math.trunc(props.salePrice)}</p>
                <br/>
            </div>
    </article>
)

export default Post;