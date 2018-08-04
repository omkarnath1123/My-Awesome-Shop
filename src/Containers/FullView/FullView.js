import React, { Component } from 'react';
import axios from 'axios';
import './FullView.css';
import ImageGallery from 'react-image-gallery';
import "../../../node_modules/react-image-gallery/styles/css/image-gallery.css";
import Coloroptions from '../../Components/Options/ColorOptions';
import Storageoptions from '../../Components/Options/StorageOptions';
// import Loader from 'react-loader-spinner';
import LoadingSpinner from './LodingSpinner';
import * as actionTypes from '../store/actions';
import { connect } from 'react-redux';

/* eslint-disable */

class FullView extends Component {

        state = {
            loadedPost: null,
            selectedId: null,
            pageLength: 200,
            selectedOptions: [],
            loaded: true,
            quantity: 0
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

        removeCounter (){
            localStorage.clear();
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

        handleCountQuantityInc = () => {
            this.state.quantity++;
            this.setState({quantity: this.state.quantity});
        }

        handleCountQuantityDec = () => {
            if (this.state.quantity > 0){
                this.state.quantity--;
                this.setState({quantity: this.state.quantity});
            }
        }

        render(){
            let StorageOptionsCount = null;
            let ColorOptionsCount = null;
            let post = <p style={{textAlign:'center'}}>Please select an Item!</p>;
            if(this.props.match.params.id){
                post = <p style={{textAlign:'center'}}>Loading!!</p>
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
                    var newArr = [];
                    tempArrImage.map(pics=>{
                            newArr.push({original:pics,thumbnail:pics});
                        })

                    //LoadMoreInfo Button
                    var loadMoreButton = <button id="more" style={{color: '#00B1A3'}} onClick={()=>this.loadPageHandler(post.length)} className="loadMoreBtn">+MORE</button>;
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
                    StorageOptionsCount = StorageOptions.length;
                    ColorOptionsCount = ColorOptions.length;
                    storageButton = <Storageoptions count={StorageOptionsCount} typ= 'Storage' arr={StorageOptions} clickedS = {this.handleStoreButtons} options={this.state.selectedOptions}/>
                    colorButton  =  <Coloroptions count={ColorOptionsCount} typ= 'Colors' arr={ColorOptions} clickedC= {this.handleColorButtons} options={this.state.selectedOptions}/>
                            
            }
            if(this.state.loaded){
                return(
                    <div id="loading">
                        <LoadingSpinner />
                    </div>
                )
            }
            if (ColorOptionsCount !== null && StorageOptionsCount !== null){
                // console.log(StorageOptionsCount);
                // console.log(ColorOptionsCount);
            }

            /* eslint-disable */

            return <div id="full">
                    <div className='row'>
                        <div className="col-sm-1 col-md-1 col-lg-1">
                        </div>
                        <div className="col-sm-4 col-md-4 col-lg-4 ">
                            <br/>
                            <br/>
                            <div >
                                <ImageGallery items={newArr} showPlayButton={false} showFullscreenButton={false} />
                            </div>
                        </div>
                        <div className="col-sm-6 col-md-6 col-lg-6">
                            <br/>
                            <h3 style={{fontFamily: 'sans-serif'}}><em>{proName}</em></h3>
                            <br/>
                            <p><span style={{color: 'grey'}}>{postTemp}</span> {loadMoreButton}</p>
                            <hr/>
                            <p><strong style={{fontSize:'1.5em'}}>
                                ₹&nbsp;
                                {
                                    Number(parseFloat(Math.trunc(proSalePrice)).toFixed(2)).toLocaleString('en', {
                                        minimumFractionDigits: 2
                                    })
                                }
                                &nbsp;&nbsp;
                                {/*{Math.trunc(proSalePrice)}*/}
                                </strong>
                                <span style={{textDecoration:'line-through' , color: 'grey'}}><strong>
                                    ₹&nbsp;
                                    {
                                        Number(parseFloat(proMarkPrice).toFixed(2)).toLocaleString('en', {
                                            minimumFractionDigits: 2
                                        })
                                    }
                                    {/*{proMarkPrice} */}
                                    </strong> </span>
                            </p>
                            <span className="red"><p>You Save:
                                ₹&nbsp;
                                {
                                    Number(parseFloat(proMarkPrice - Math.trunc(proSalePrice)).toFixed(2)).toLocaleString('en', {
                                        minimumFractionDigits: 2
                                    })
                                }
                                {/*{proMarkPrice - Math.trunc(proSalePrice)}*/}
                                &nbsp;
                                ({discount})</p></span>
                            <span style={{fontSize: '0.8em',color:'grey'}}>Local taxes included (where applicable)</span>
                            <hr/>
                                {storageButton}
                                {colorButton}
                                <br/>
                            <span style={{color: 'grey'}}>Quantity</span><br/>
                            <button onClick={this.handleCountQuantityDec} style={{textDecoration: 'none',color: '#00B1A3',border: '2px solid #00B1A3',marginRight:'0',borderRadius: '4px'}} >-</button>
                            <button  style={{textDecoration: 'none',backgroundColor: '#00B1A3',color: 'white',margin:'0', border: '2px solid #00B1A3'}} >{this.state.quantity}</button>
                            <button onClick={this.handleCountQuantityInc} style={{textDecoration: 'none',color: '#00B1A3',border: '2px solid #00B1A3',marginLeft:'0', borderRadius: '4px'}} >+</button>
                            <br/><span style={{color: 'grey'}}>Your total amount is :</span><br/>₹ <span style={{color : '#00B1A3'}}>
                            {
                                Number(parseFloat(this.state.quantity * Math.trunc(proSalePrice)).toFixed(2)).toLocaleString('en', {
                                    minimumFractionDigits: 2
                                })
                            }
                            {/*{this.state.quantity * Math.trunc(proSalePrice)}*/}
                            </span><br/>
                            <button style={{height: '50px' ,
                                width: '600px' ,
                                backgroundColor: '#00B1A3' ,
                                color: 'white',
                                borderRadius: '4px' ,
                                textAlign: 'center' ,
                                padding: '4px' ,
                                marginTop: '20px',
                                marginBottom: '20px'
                            }}
                                    onClick = {() =>
                                    {this.props.onIncrementCounter(this.state.quantity);
                                    this.props.onStoreResult(proName,proMarkPrice,discount,tempArrImage,this.state.quantity)} }
                                    // onClick={() => }
                                    // onClick={() => }
                            >
                                Add to cart
                            </button>
                            {/*{check}*/}
                            {/*{localStorage.setItem('myData', this.props.ctr)}*/}
                            <br/>
                            <span style={{color: 'grey'}}>Total no. of element in the cart is :
                            <strong style={{color: '#00B1A3'}}>{this.props.ctr}</strong></span>
                            {/*<div>{this.props.ctr}</div>*/}
                            <button style={{height: '50px' , width: '600px' , backgroundColor: '#00B1A3' , color: 'white', borderRadius: '4px' , textAlign: 'center' , padding: '4px' , marginTop: '20px', marginBottom: '20px'}}
                                    onClick = {() => {
                                        this.props.onRemoveCounter(this.props.ctr);
                                        // this.removeCounter;
                                        this.props.onRemoveResults(this.props.results);

                                    }}
                            >
                                clear your cart
                            </button>

                        </div>
                        <div className="col-sm-1 col-md-1 col-lg-1">
                        </div>
                    </div>
                </div>
        }
}

const mapStateToProps = state => {
    return {
        ctr: state.ctr.counter,
        storedResults: state.res.results
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: (quantity) => dispatch({type: actionTypes.INCREMENT, val: quantity}),
        onRemoveCounter: (current) => dispatch({type: actionTypes.REMOVE_COUNTER, val: current}),
        onStoreResult: (proName,proMarkPrice,discount,tempArrImage,counter) => dispatch({type: actionTypes.STORE_RESULT, proName: proName , proMarkPrice : proMarkPrice , discount : discount , tempArrImage : tempArrImage , counter: counter}),
        onDeleteResult: (id) => dispatch({type: actionTypes.DELETE_RESULT, resultElId:id}),
        onRemoveResults: (value) => dispatch({type: actionTypes.REMOVE_RESULTS, currentValue:value})
    }
}

// connect(mapStateToProps, mapDispatchToProps)(Counter)
export default connect(mapStateToProps,mapDispatchToProps)(FullView);