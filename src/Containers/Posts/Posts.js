import React, { Component } from 'react';
import Post from '../../Components/Post/Post';
import axios from 'axios';
import './Posts.css';

// import {Link} from 'react-router-dom';


class Posts extends Component{
    state = {
        Posts: [],
        viewShow: 4,
        // selectedId: null,
        CurrentPage : 1,
        NextPage : 2,
        onCurrentPage: true
    }



    componentDidMount(){
        // console.log(this.props);
        axios.get('https://assignment-appstreet.herokuapp.com/api/v1/products?page='+ this.state.CurrentPage)
        .then(response=>{
            const temp = response.data.products;
            this.setState({Posts: temp});
            //console.log(response);
        })
    }

    componentDidUpdate(){

        if(this.state.CurrentPage === this.state.NextPage){
            axios.get('https://assignment-appstreet.herokuapp.com/api/v1/products?page='+ this.state.CurrentPage)
            .then(response=>{
            const temp = response.data.products;
                var np = null
            if(this.state.CurrentPage === 1){
                np = 2;
            }else{
                np = 1;
            }
            this.setState({Posts: temp,NextPage: np});
            })
        }
    }

    ChangeViewHandler(){
        var temp = this.state.viewShow;
        temp += 4;
        this.setState({viewShow: temp})
    }

    postSelectedHandler =(id)=>{
        // this.setState({selectedId: id})
        this.props.history.push('/'+ id);
    }

    ChangePageHandler(){
        if(this.state.CurrentPage === 1){
            this.setState({CurrentPage: 2});
        }else{
            this.setState({CurrentPage: 1});
        }
    }

    render(){

        var tempArr = this.state.Posts.slice(0,this.state.viewShow);

        var posts = tempArr.map(post =>{
            return <Post title = {post.name} 
                            salePrice ={post.sale_price}
                            MarkPrice = {post.mark_price}
                            pic = {post.images} 
                            key={post._id}
                            clicked ={()=>this.postSelectedHandler(post._id)} 
                            />
        });

        return(
            <div>

                <section className = "Posts">
                    {posts}
                </section>
                <button onClick={this.ChangeViewHandler.bind(this)} style={{margin:'auto', display:'block'}} > Load More </button>
                <button onClick={this.ChangePageHandler.bind(this)} style={{margin:'auto', display:'block'}}>Page {this.state.NextPage}</button>
        
            </div>
        )
       
    }
}
export default Posts;