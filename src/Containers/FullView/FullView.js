import React, { Component } from 'react';
import axios from 'axios';
import './FullView.css';
import ImageGallery from 'react-image-gallery';
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import Coloroptions from '../../Components/Options/ColorOptions';
import Storageoptions from '../../Components/Options/StorageOptions';


class FullView extends Component {

        state = {
            loadedPost: null,
            selectedId: null,
            pageLength: 200,
            selectedOptions: []
        }
        componentDidMount(){
                if(!this.state.loadedPost|| (this.state.loadedPost && this.state.selectedId!==this.props.match.params.id)){
                    axios.get('https://assignment-appstreet.herokuapp.com/api/v1/products/'+ this.props.match.params.id)
                        .then(response=>{
                                this.setState({loadedPost: response.data, selectedId: this.props.match.params.id, selectedOptions: response.data.selected_option_ids});
                            });
                }   
            
        }

        loadPageHandler=(length)=>{
            this.setState({pageLength:length})
        }

        // isEqual(Arr1,Arr2){
        //     if(Arr1.length !== Arr2.length) return false;
        //     var i=0;
        //     while(i < Arr1.length){
        //         if(Arr1[i]===Arr2[i]) {
        //             i++;
        //         }
        //         else return false;
        //     }
        //     return true;
        // }
        
        // isEqual1(Arr1,Arr2){
        //     if(Arr1.length !== Arr2.length) return false;
        //     var i = 0;
        //     const set1 = new Set();  
        //     Arr1.map(id=>{
        //         set1.add(id)
        //     })

        //     while(i < Arr2.size){
        //         if(set1.has(Arr2[i])){
        //             i++;
        //         }
        //         else return false;
        //     }
        //     return true;
        // }

        isEqual(arr1,arr2){

            if ((arr1[0] ===  arr2[0] && arr1[1] === arr2[1]) || (arr1[0] ===  arr2[1] && arr1[1] === arr2[0]) ){
                return true;
            }
                return false;
        }


        handleColorButtons = (colorButtonId) =>{
            let tempArr = this.state.selectedOptions;
            tempArr[1] = colorButtonId;
            this.setState({selectedOptions: tempArr})
            console.log(this.state.selectedOptions)

        }

        handleStoreButtons = (storeButtonId) =>{
            let tempArr = this.state.selectedOptions;
            tempArr[0] = storeButtonId;
            this.setState({selectedOptions: tempArr})
            console.log(this.state.selectedOptions)
        }

        render(){

            let post = <p style={{textAlign:'center'}}>Please select an Item!</p>;
            if(this.props.match.params.id){
                <p style={{textAlign:'center'}}>Loading!!</p>
            }
            var storageButton = null
            var colorButton = null
            if(this.state.loadedPost){

                post = this.state.loadedPost.primary_product.desc;
                var postTemp = post.slice(0,this.state.pageLength);
              


                var proVariations = this.state.loadedPost.product_variations;
                var tempArrImage = [];
                var proName = [];

                    proVariations.map(pro=>{
                        if(this.isEqual(pro.sign,this.state.selectedOptions)){
                            tempArrImage = pro.images;
                            proName = pro.name;
                        }
                    })



                    //Carousel
                    var newArr = new Array;
                    tempArrImage.map(pics=>{
                            newArr.push(new Object({original:pics,thumbnail:pics}));
                        })
                    //LoadMoreInfo Button
                    var loadMoreButton = <button onClick={()=>this.loadPageHandler(post.length)} className="btn btn-info">More!</button>;
                    if(this.state.pageLength === post.length){
                        loadMoreButton = null;
                    }

                    var attributes = this.state.loadedPost.attributes;
                    var StorageOptions = [];//Array for all colour buttons
                    var ColorOptions = [];//Array for all space buttons
                    var StorageId = null;
                    var ColorId = null;
                    attributes.map(attr=>{
                        if(attr.name === 'Storage'){
                            StorageId = attr._id;
                        }
                        if(attr.name === 'Colour'){
                            ColorId = attr._id;
                        }
                    })

                    var TempOptions = this.state.loadedPost.options;
                    TempOptions.map(TempOpt=>{
                        if(TempOpt.attrib_id === StorageId){
                            StorageOptions.push(new Object(TempOpt));
                        }
                        else{
                            ColorOptions.push(new Object(TempOpt))
                        }
                    });
                    
                    storageButton = <Storageoptions typ= 'Storage' arr={StorageOptions} clickedS = {this.handleStoreButtons}/>
                    colorButton  =  <Coloroptions typ= 'Colors' arr={ColorOptions} clickedC= {this.handleColorButtons}/>
                            
            }


            return <div>
                
                    <div className='row'>
                        <div className="col-sm-2 col-md-2 col-lg-2"></div>
                        <div className="col-sm-4 col-md-4 col-lg-4 divCl">
                            <br/>
                            <br/>

                            <div >
                                <ImageGallery items={newArr} showPlayButton={false} showFullscreenButton={false} />
                            </div>
                        </div>
                        <div className="col-sm-4 col-md-4 col-lg-4">
                            <br/>
                        
                            <h1><em><strong>{proName}</strong></em></h1>
                            <br/>
                            <p>{postTemp} {loadMoreButton}</p>
                                {storageButton}
                                {colorButton}
                        </div>
                        <div className="col-sm-2 col-md-2 col-lg-2"></div>
                    </div>
                </div>
        }
}

export default FullView;
