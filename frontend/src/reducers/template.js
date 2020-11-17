const template = (state = '', action) => {
    switch (action.type) {
      case 'ADD_POST':
        state = action.template;
        return state;
      default:
        return state;
    }
  }
  
  export default template;
  