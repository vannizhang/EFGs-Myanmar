import { combineReducers } from 'redux';
// import Map from './Map/reducer';
import UI from './UI/reducer';
import Map from './Map/reducer';

export default combineReducers({
    UI,
    Map,
});
