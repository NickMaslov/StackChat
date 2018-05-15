import React, { Component } from 'react';
import store, { writeMessage, gotNewMessageFromServer } from '../store';
import axios from 'axios';

export default class NewMessageEntry extends Component {
  constructor(){
    super()
    this.state = store.getState();

    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    const action = writeMessage(evt.target.value);
    store.dispatch(action);
  }

  handleSubmit(evt) {
    evt.preventDefault(); // don't forget to preventDefault!

    // our message content is on our state, which we're getting from our Redux store
    const content = this.state.newMessageEntry;

    // our channelId is available from the props sent by MessagesList, which it receives as props from the Route!
    const channelId = this.props.channelId;
    //console.log('submit', channelId, content)

    axios.post('/api/messages', { content: content, channelId: channelId })
      .then(res => res.data)
      .then(message => {
        console.log("**",message)
        return store.dispatch(gotNewMessageFromServer(message))});
  }


  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render () {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
            onChange={this.handleChange}
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
