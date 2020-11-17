import * as types from '../constants/ActionTypes.js'

export const openPreview = () =>{
    console.log("Enable mode preview");
    return {
        type: types.OPEN_PREVIEW
    }
}

export const closePreview = () =>{
    console.log("Unenable mode preview");
    return {
        type: types.CLOSE_PREVIEW
    }
}

export const publishTemplate = () =>{
    console.log("publish template");
    return {
        type: types.PUBLISH_TEMPLATE
    }
}

export const isPublished = () =>{
    console.log("template is published");
    return {
        type: types.IS_PUBLISHED
    }
}

export const editPost = () =>{
    console.log("editPost");
    return {
        type: types.EDIT_POST
    }
}

export const preview = () =>{
    return {
        type: types.PREVIEW
    }
}

export const publicPost = () =>{
    return {
        type: types.PUBLIC_POST
    }
}

export const addPost = (template) =>{
    console.log('add post');
    return {
        type: types.ADD_POST,
        template
    }
}

export const changeModel = (model) =>{
    console.log('change model');
    return {
        type: types.CHANGE_MODEL,
        model
    }
}

export const changeMedias = (medias) =>{
    console.log('change medias');
    return {
        type: types.CHANGE_MEDIAS,
        medias
    }
}

export const changeCertificat = (certificat) =>{
    console.log('change certificat');
    return {
        type: types.CHANGE_CERTIFICAT,
        certificat
    }
}

export const changeHtmlMedia = (htmlMedia) =>{
    // console.log('change list blob');
    // console.log("Show list blob in action");
    console.log("ACTION: ",htmlMedia);
    return {
        type: types.CHANGE_HTML_MEDIA,
        htmlMedia
    }
}

export const changeStoredBlocksHtml = (storedBlocksHTML) =>{
    // console.log('change list blob');
    // console.log("Show list blob in action");
    console.log("ACTION: ",storedBlocksHTML);
    return {
        type: types.CHANGE_STORED_BLOCKS_HTML,
        storedBlocksHTML
    }
}

