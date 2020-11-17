let attributes = {
    modeSave:{
      type: "boolean",
      default:false
    },
    imgs:{
      type:"string",
      default:window.localStorage.getItem("imagesMedia")
    },
    videos:{
      type:"string",
      default:window.localStorage.getItem("videosMedia")
    }
  }
  
  export default attributes;