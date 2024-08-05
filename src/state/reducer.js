import { combineReducers } from 'redux';
import searchFavorites from './search/searchSlices';


const reducer = combineReducers({
    search: searchFavorites,

});

export default reducer;