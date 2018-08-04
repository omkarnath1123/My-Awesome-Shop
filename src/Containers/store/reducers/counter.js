import * as actionTypes from '../actions';

// console.log(localStorage.getItem('myData'));
let counter = localStorage.getItem('myData') === null || localStorage.getItem('myData') === undefined ? 0 : (localStorage.getItem('myData'));
counter = JSON.parse(counter);
// console.log(typeof(counter));
const initialState = {
    counter,
}

/* eslint-disable */

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.INCREMENT:
            localStorage.setItem('myData', JSON.stringify(state.counter + action.val));

            // console.log(typeof(state.counter));
            // console.log(typeof(action.val));

            return{
                ...state,
                counter:state.counter + action.val
            }
        case actionTypes.REMOVE:
            console.log("removing all the elements");
            return{
                ...state,
                counter:state.counter - state.counter
            }
        case actionTypes.REMOVE_COUNTER:
            // let temp = 0;
            // localStorage.setItem('myData', state.counter + action.val); // didn't execute
            // if(state.counter - action.val < 0){
            //     console.log('trying to remove items from the empty cart so count is zero');
            //     return {
            //         ...state,
            //         counter: state.counter - state.counter
            //     }
            // }



            let temp = state.counter - action.releaseCount
            localStorage.setItem('myData', JSON.stringify(temp));
            return{
                ...state,
                counter:state.counter - action.releaseCount
            }
        default:
            return state;
    }
    return state;
}

export default reducer;