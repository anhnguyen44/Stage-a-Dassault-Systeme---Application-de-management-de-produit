let defaultState = {
    model: '',
    listMedias: [],
    certificat: '',
    htmlMedia : '',
    storedBlocksHTML:''
};


let modelInfo = (state = defaultState, action) => {
    switch (action.type) {
        case "CHANGE_MODEL":
            return { ...state, model: action.model };
        case "CHANGE_MEDIAS":
            return { ...state, listMedias: action.medias };
        case "CHANGE_CERTIFICAT":
            return { ...state, certificat: action.certificat };
        case "CHANGE_HTML_MEDIA":
            return { ...state, htmlMedia: action.htmlMedia };
        case "CHANGE_STORED_BLOCKS_HTML":
            return { ...state, storedBlocksHTML: action.storedBlocksHTML };
        default:
            return state;
    }
}

export default modelInfo;