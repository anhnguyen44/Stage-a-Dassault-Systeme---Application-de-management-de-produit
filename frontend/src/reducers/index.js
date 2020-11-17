import isPreview from './isPreview';
import publish from './publish';
import template from './template';
import modelInfo from './modelInfo';
import {combineReducers} from 'redux';

let appReducer = combineReducers({
    isPreview,
    publish,
    template,
    modelInfo
});

export default appReducer;