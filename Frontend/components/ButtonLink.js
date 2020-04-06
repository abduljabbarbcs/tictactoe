import React from 'react';
import { request } from '../utils/helpers';
import { withRouter } from 'react-router-dom';
const ButtonLink = (props) => {
  const sendRequest = async () => {
    const intialState = { "game": { "id": "", "board": "=========", "status": "RUNNING" } };
    const payload = await request.post('/startgame', intialState);
    props.history.push(`/start-game/${payload.data.game.id}`)
  }
  return (
    <button onClick={() => sendRequest()}>{props.title}</button>
  )
}
export default withRouter(ButtonLink);