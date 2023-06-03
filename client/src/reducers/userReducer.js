export const userReducer=(state=null,action)=>{
    switch(action.type){
        case "LOGGED_IN_USER":
            return action.payload;
        case "LOGOUT":
            return action.payload;
        default:
            return state;
    }
}

// user finishe the registeration you will get the user name and its token::