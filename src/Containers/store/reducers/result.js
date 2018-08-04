import * as actionTypes from '../actions';

// console.log(localStorage.getItem('myList'));
let results = localStorage.getItem('myList') === null ? [] : JSON.parse(localStorage.getItem('myList'));
// console.log(results)
const initialState = {
    results
}

function returnVal(array, name) {
    if (array === null){
        return true
    }
    if (array.length === 0){
        return true
    }
    for (let i = 0;i < array.length;i++){
        if (array[i].value[0].proName === name){
            return false;
        }
    }
    return true;
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.STORE_RESULT:

            debugger;
            // it is new element
            let get = returnVal(state.results, action.proName);
            console.log(get? 'new element alert': 'old element');


            if (!get){
                for (let i = 0;i < state.results.length;i++){
                    if (state.results[i].value[0].proName === action.proName){
                        let add = state.results[i].value[0].count + action.counter;
                        // set value of counter
                        console.log(add);
                        state.results[i].value[0].count = add
                    }
                }
                return {...state}
            }
            // if adding 0 items of particular type
            if (action.counter === 0){
                break;
            }

            let newArr = [];
            newArr.push({count: action.counter,proName:action.proName,proMarkPrice:action.proMarkPrice,discount : action.discount,tempArrImage : action.tempArrImage,id: new Date()});
            localStorage.setItem('myList', JSON.stringify([...state.results, {value: newArr}]));
            console.log("local.getItem('myList') : ",[...state.results, {value: newArr}]);
            return{
                ...state,
                results: [...state.results, {value: newArr}]
            }
        case actionTypes.DELETE_RESULT:
            // create copy and deal with it
            // const id = 2;
            // const newArray = [...state.results]
            // newArray.splice(id, 1)

            // add the elements to the new array if the value is true
            // let array = [];
            localStorage.setItem('myList', JSON.stringify(state.results.filter(results => results.value[0].proName !== action.name)))

            const updatedArray = state.results.filter(result => result.value[0].proName !== action.name);
            console.log(updatedArray);
            return {
                ...state,
                results: updatedArray
            }
        case actionTypes.REMOVE_RESULTS:
            localStorage.setItem('myList',JSON.stringify([]));
            return{
                ...state,
                results: []
            }
        default: {
            // console.log(state);
            return state;
        }

    }
    return state;
}

export default reducer;