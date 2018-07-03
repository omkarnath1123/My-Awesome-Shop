import React, { Component } from 'react';
import Post from '../../Components/Post/Post';
import axios from 'axios';
import './Posts.css';
import OnScroll from 'react-on-scroll';
// import {Link} from 'react-router-dom';
import Loader from 'react-loader-spinner'


class Posts extends Component{
    state = {
        Posts: [],
        // selectedId: null,
        CurrentPage : 1,
        NextPage: 2,
        boolean : true,
        loaded:true
    }



    componentDidMount(){
        // console.log(this.props);
        axios.get('https://assignment-appstreet.herokuapp.com/api/v1/products?page='+ this.state.CurrentPage)
        .then(response=>{
            const temp = response.data.products;
            this.setState({Posts: temp,loaded:false});
            //console.log(response);
        })
    }

    componentDidUpdate(){
        if((this.state.CurrentPage === this.state.NextPage) && this.state.boolean){
            axios.get('https://assignment-appstreet.herokuapp.com/api/v1/products?page='+ this.state.CurrentPage)
            .then(response=>{
            let temp = response.data.products;
            if(temp.length === 0){
                this.setState({boolean: false});
            }
            else{
                let newPosts = this.state.Posts;
                newPosts = newPosts.concat(temp);
                var newNext = this.state.NextPage ;
                newNext++;
                this.setState({Posts: newPosts,NextPage:newNext});
            }
            })
        }
    }

    ChangeViewHandler = () => {
        var newPage = this.state.NextPage;
        this.setState({CurrentPage: newPage});
        console.log(this.state.CurrentPage)
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

        if(this.state.loaded){
            return(
                <div id="loading">
                    <Loader type="Hearts" color="#somecolor" height={80} width={80} />
                </div>
            )
        }



        return(
            <div>
                { tempArr && tempArr.length >0 &&
                <OnScroll
                    triggers={[
                        { top: 50, bottom: -50, callback: visible => this.ChangeViewHandler(visible) },
                    ]}>

                <div className = "Posts" >
                    {posts}
                </div>
        
                </OnScroll>}
            </div>
        )
       
    }
}
export default Posts;