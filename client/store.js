import { createStore } from "redux";




// ACTION TYPES
const GOT_MESSAGES_FROM_SERVER = "GOT_MESSAGES_FROM_SERVER";
const WRITE_MESSAGE = "WRITE_MESSAGE";
const GOT_NEW_MESSAGE_FROM_SERVER = "GOT_NEW_MESSAGE_FROM_SERVER";

// ACTION CREATORS
export function gotMessagesFromServer(messages) {
  return {
    type: GOT_MESSAGES_FROM_SERVER,
    messages
  };
}
export function writeMessage(inputContent) {
  return {
    type: WRITE_MESSAGE,
    newMessageEntry: inputContent
  };
}
export function gotNewMessageFromServer(messages) {
  console.log('***',messages)
  return {
    type: GOT_NEW_MESSAGE_FROM_SERVER,
    messages
  };
}

// INITIAL STATE
const initialState = {
  messages: [{}],
  newMessageEntry: ""
};

// REDUCER
function reducer(state = initialState, action) {
  switch (action.type) {
    case GOT_MESSAGES_FROM_SERVER:
      return Object.assign({}, state, {
        messages: state.messages.concat(action.messages)
      });
    case WRITE_MESSAGE:
      return { ...state, newMessageEntry: action.newMessageEntry };
    case GOT_NEW_MESSAGE_FROM_SERVER:
    console.log("*",action)
      return { ...state, messages: [...state.messages, action.message] };
    default:
      return state;
  }
}

// STORE
const store = createStore(reducer);
export default store;
