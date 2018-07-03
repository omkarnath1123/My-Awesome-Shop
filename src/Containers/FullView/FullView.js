import React, { Component } from 'react';
import axios from 'axios';
import './FullView.css';
import ImageGallery from 'react-image-gallery';
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import Coloroptions from '../../Components/Options/ColorOptions';
import Storageoptions from '../../Components/Options/StorageOptions';
import Loader from 'react-loader-spinner'



class FullView extends Component {

        state = {
            loadedPost: null,
            selectedId: null,
            pageLength: 200,
            selectedOptions: [],
            loaded: true
        }
        componentDidMount(){
                if(!this.state.loadedPost|| (this.state.loadedPost && this.state.selectedId!==this.props.match.params.id)){
                    axios.get('https://assignment-appstreet.herokuapp.com/api/v1/products/'+ this.props.match.params.id)
                        .then(response=>{
                                this.setState({loadedPost: response.data, selectedId: this.props.match.params.id, selectedOptions: response.data.selected_option_ids,loaded:false});
                            });
                }   
            
        }

        loadPageHandler=(length)=>{
            this.setState({pageLength:length})
        }


        isEqual(arr1,arr2){

            if ((arr1[0] ===  arr2[0] && arr1[1] === arr2[1]) || (arr1[0] ===  arr2[1] && arr1[1] === arr2[0]) ){
                return true;
            }
                return false;
        }

        isColorId = (id) =>{
            let TempOptions = this.state.loadedPost.options;
            let attrib_id = null;
                TempOptions.map(item=>{
                    if(item._id === id){
                        attrib_id = item.attrib_id
                    }
                })
            let tempAttrArr = this.state.loadedPost.attributes;
            let AttrName = null;
            tempAttrArr.map(i=>{
                if(i._id === attrib_id){
                    AttrName = i.name;
                }
            })

            if(AttrName === "Storage") {
                return false;
            }
            else{
                return true;
            } 
        }

        handleColorButtons = (colorButtonId) =>{
            let tempArr = this.state.selectedOptions;
            ////
            var TempOpt = this.state.loadedPost.options;
            var tempAttrid = null;
            TempOpt.map(findId=>{
                if(findId._id === colorButtonId){
                    tempAttrid = findId.attrib_id;
                }
            })
            var tempAttrArr = this.state.loadedPost.attributes;

            var tempAttrName = null;
            tempAttrArr.map(fId=>{
                if(fId._id === tempAttrid){
                    tempAttrName = fId.name;
                }
            })
            if (tempAttrName === "Colour" ){
                if(this.isColorId(tempArr[1])){
                    var temp = tempArr[0];
                    tempArr[0] = tempArr[1];
                    tempArr[1] = temp
                }
                tempArr[0] = colorButtonId;
                this.setState({selectedOptions: tempArr})
            }
        }

        handleStoreButtons = (storeButtonId) =>{
  
            let tempArr = this.state.selectedOptions;
            ////
            var TempOpt = this.state.loadedPost.options;
            var tempAttrid = null;
            TempOpt.map(findId=>{
                if(findId._id === storeButtonId){
                    tempAttrid = findId.attrib_id;
                }
            })

            var tempAttrArr = this.state.loadedPost.attributes;

            var tempAttrName = null;
            tempAttrArr.map(fId=>{
                if(fId._id === tempAttrid){
                    tempAttrName = fId.name;
                }
            })

            if(tempAttrName === 'Storage'){
                if(!this.isColorId(tempArr[0])){
                    var temp = tempArr[1];
                    tempArr[1] = tempArr[0];
                    tempArr[0] = temp
                }
                tempArr[1] = storeButtonId;
                this.setState({selectedOptions: tempArr})
            }
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
                var proMarkPrice = null;
                var discount = null;
                var proSalePrice = null;
                    proVariations.map(pro=>{
                        if(this.isEqual(pro.sign,this.state.selectedOptions)){
                            tempArrImage = pro.images;
                            proName = pro.name;
                            proMarkPrice= pro.mark_price;
                            discount = pro.sale_msg;
                            proSalePrice  = pro.sale_price;
                        }
                    })



                    //Carousel
                    var newArr = new Array;
                    tempArrImage.map(pics=>{
                            newArr.push(new Object({original:pics,thumbnail:pics}));
                        })
                    //LoadMoreInfo Button
                    var loadMoreButton = <button onClick={()=>this.loadPageHandler(post.length)} className="loadMoreBtn">More!</button>;
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
                    
                    storageButton = <Storageoptions typ= 'Storage' arr={StorageOptions} clickedS = {this.handleStoreButtons} options={this.state.selectedOptions}/>
                    colorButton  =  <Coloroptions typ= 'Colors' arr={ColorOptions} clickedC= {this.handleColorButtons} options={this.state.selectedOptions}/>
                            
            }
            if(this.state.loaded){
                return(
                    <div id="loading">
                        <Loader type="Hearts" color="#somecolor" height={80} width={80} />
                    </div>
                )
            }


            return <div id="full">
                
                    <div className='row'>
                        <div className="col-sm-2 col-md-2 col-lg-2"></div>
                        <div className="col-sm-4 col-md-4 col-lg-4 ">
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
                            <hr/>
                            <h4><p>MRP : <span style={{textDecoration:'line-through'}}><strong>₹{proMarkPrice}</strong> </span> </p></h4>
                            <p>Discount: ₹{discount} </p>
                            <p>Price: ₹{proSalePrice}</p>
                            <hr/>
                                {storageButton}
                                {colorButton}
                        </div>
                        <div className="col-sm-2 col-md-2 col-lg-2"></div>
                    </div>
                </div>
        }
}

export default FullView;
