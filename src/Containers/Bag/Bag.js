import React, { Component } from 'react';
// import OnScroll from 'react-on-scroll';
// import LoadingSpinner from '../FullView/LodingSpinner';
import * as actionTypes from '../store/actions';
import { connect } from 'react-redux';

class Bag extends Component{
    state = {

    }

    render(){
        // eslint-disble-next-line
        /* eslint-disable */
        return(
            <div className="row">
                <div className="col-sm-2 col-md-2 col-lg-2">
                </div>
                <div className="col-sm-8 col-md-8 col-lg-8" >
                    <h3><span style={{textAlign: 'center', color: 'grey'}}>You have selected {this.props.ctr} items : </span></h3>
                    <div >
                        {this.props.storedResults.map((itr, index = 0) => {
                            index++;
                            return <div className="row" style={{border: '1px solid red', margin : '15px'}} key={index} >
                                <div className="col-sm-6 col-md-4 col-lg-4"><img src={itr.value[0].tempArrImage[0]}/></div>
                                <div className="col-sm-6 col-md-8 col-lg-8">
                                    <input id="button"
                                           type="button"
                                           value="X"
                                           style={{float: 'right'}}
                                           onClick={() => {
                                               this.props.onDeleteResult(itr.value[0].proName);
                                               this.props.onDeleteCounter(itr.value[0].count)
                                           }}
                                    />
                                    <div >No. of items : {itr.value[0].count}</div>
                                    <div className="smallFont"><h5>{itr.value[0].proName}</h5></div>
                                    <div>{itr.value[0].proMarkPrice}</div>
                                    <div>{itr.value[0].discount}</div>
                                </div>
                                {/*{console.log('this.props.ctr : ',this.props.ctr)}*/}
                            </div>
                        })}
                    </div>
                </div>
                <div className="col-sm-2 col-md-2 col-lg-2">
                </div>
            </div>

        )

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
        onDeleteResult: (name) => dispatch({type: actionTypes.DELETE_RESULT, name:name}),
        onDeleteCounter: (count) => dispatch({type: actionTypes.REMOVE_COUNTER, releaseCount:count})
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(Bag);