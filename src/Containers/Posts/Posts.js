import React, { Component } from 'react';
import Post from '../../Components/Post/Post';
import axios from 'axios';
import './Posts.css';
import ScrollEvent from 'react-onscroll';

// import {Link} from 'react-router-dom';


class Posts extends Component{
    state = {
        Posts: [],
        viewShow: 4,
        // selectedId: null,
        CurrentPage : 1,
        NextPage: 2
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
            var newPosts = [...this.state.Posts];
            // console.log(newPosts);
            var newPosts1 = newPosts.concat(temp);
            // console.log(newPosts);
            // console.log(temp)
            const newNext = this.state.CurrentPage + 1;
            this.setState({Posts: newPosts1,NextPage:newNext});
            })
        }
    }

    ChangeViewHandler(){
        // if(Posts.size){
        //     var temp = this.state.viewShow;
        //     temp += 4;
        //     this.setState({viewShow: temp})
        // }
        var newPage = this.state.NextPage;
        this.setState({CurrentPage: newPage});
    }

    postSelectedHandler =(id)=>{
        // this.setState({selectedId: id})
        this.props.history.push('/'+ id);
    }


    render(){

        var tempArr = this.state.Posts;

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
                {/* <ScrollEvent handleScrollCallback={this.ChangeViewHandler.bind(this)} /> */}
                {/* <button onClick={this.ChangePageHandler.bind(this)} style={{margin:'auto', display:'block'}}>Page {this.state.NextPage}</button> */}
        
            </div>
        )
       
    }
}
export default Posts;