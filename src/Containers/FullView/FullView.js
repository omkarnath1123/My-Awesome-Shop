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
            setColorId: null,
            setStorageId: null,
            CurrentObjectColorId: null,
            CurrentObjectStorageId:null,

        }
        componentDidMount(){
                if(!this.state.loadedPost|| (this.state.loadedPost && this.state.selectedId!==this.props.match.params.id)){
                    axios.get('https://assignment-appstreet.herokuapp.com/api/v1/products/'+ this.props.match.params.id)
                        .then(response=>{
                                this.setState({loadedPost: response.data, selectedId: this.props.match.params.id, CurrentObjectColorId: response.data.selected_option_ids[1],CurrentObjectStorageId: response.data.selected_option_ids[0]});
                            });
                }   
            
        }

        loadPageHandler=(length)=>{
            this.setState({pageLength:length})
        }

        isEqual(Arr1,Arr2){
            if(Arr1.length !== Arr2.length) return false;
            var i=0;
            while(i < Arr1.length){
                if(Arr1[i]===Arr2[i]) {
                    i++;
                }
                else return false;
            }
            return true;
        }

        
        


        handleColorButtons = (colorButtonId) =>{
            console.log(colorButtonId)
            this.setState({setColorId:colorButtonId});
            let tempArr = [];
            tempArr.push(this.state.CurrentObjectStorageId);
            tempArr.push(colorButtonId)
            console.log(tempArr)

            var proDuct_id = this.state.selectedId;

            if(!this.isEqual(tempArr,this.state.loadedPost.selected_option_ids)){
                var proVariations = this.state.loadedPost.product_variations;
                    proVariations.map(pro=>{
                        if(this.isEqual(pro.sign,tempArr)){
                            proDuct_id = pro._id
                        }
                    })
                   
            }
            axios.get('https://assignment-appstreet.herokuapp.com/api/v1/products/'+ proDuct_id)
            .then(response=>{
                    this.setState({loadedPost: response.data, selectedId: proDuct_id, CurrentObjectColorId: colorButtonId});
                });
           
        }

        handleStoreButtons = (storeButtonId) =>{
            console.log(storeButtonId)

            this.setState({setStorageId:storeButtonId});
            let tempArr = [];
            tempArr.push(storeButtonId);
            tempArr.push(this.state.CurrentObjectColorId);
            console.log(tempArr)
            var proDuct_id = null;
            if(!this.isEqual(tempArr,this.state.loadedPost.selected_option_ids)){
                var proVariations = this.state.loadedPost.product_variations;
                    proVariations.map(pro=>{
                        if(this.isEqual(pro.sign,tempArr)){
                            proDuct_id = pro._id
                        }
                    })
                       
            }
            axios.get('https://assignment-appstreet.herokuapp.com/api/v1/products/'+ proDuct_id)
                    .then(response=>{
                            this.setState({loadedPost: response.data, selectedId: proDuct_id,CurrentObjectStorageId: storeButtonId});
                        }); 
            
            // this.setState({IdTobeLoaded:proDuct_id})
            // this.props.history.push('/'+proDuct_id)

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
              

                var selectedOptions = this.state.loadedPost.selected_option_ids;
                var proVariations = this.state.loadedPost.product_variations;
                var tempArrImage = null;
                var proName = null;
                    proVariations.map(pro=>{
                        if(this.isEqual(pro.sign,selectedOptions)){
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
                    //  console.log(StorageOptions);
                    // StorageOptions.map(opt=>{
                    //     console.log(opt)
                    // })
                    // console.log(ColorOptions);
                    
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
