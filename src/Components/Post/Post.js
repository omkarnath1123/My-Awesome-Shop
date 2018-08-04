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
                <h6 style={{color: 'grey'}}>{props.title}</h6>
                <strong><p style={{color: 'grey',textAlign: 'center',fontSize: '1.1em',}}>    Sale Price:
                    ₹&nbsp;
                    {
                        Number(parseFloat(Math.trunc(props.salePrice)).toFixed(2)).toLocaleString('en', {
                            minimumFractionDigits: 2
                        })
                    }
                    {/*{Math.trunc(props.salePrice)}*/}
                    </p></strong>
                <br/>
            </div>
    </article>
)

export default Post;