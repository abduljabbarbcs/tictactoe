import React, { useEffect, useState } from 'react';
import Flex from './Flex';
import { withRouter } from 'react-router-dom';
import { parseStringToArray, parseArrayToString } from '../utils/helpers';
import { request } from '../utils/helpers';
import '../assets/styles/Board.css'

const Board = (props) => {
  const [board, setBoard] = useState([[]]);
  const [gameStatus, setGameStatus] = useState("RUNNING");

  useEffect(() => {
    const fetchData = async () => {
      const payload = await request.get(`/game/${props.match.params.id}`);
      const { board, status } = payload.data.game[0]
      setBoard(parseStringToArray(board || "=========", 3))
      status ? setGameStatus(status) : null;
    }
    fetchData();
  }, []);

  const updateBoard = async (arr, index) => {
    if (board[arr][index] === '=') {
      const { id } = props.match.params;
      const temp = [...board];
      temp[arr][index] = 'X';
      const payload = { "game": { "uuid": id, "board": parseArrayToString(temp), status: "RUNNING" } }
      setBoard(temp);
      const { data } = await request.put('/move', payload);
      setBoard(parseStringToArray(data.board, 3));
      setGameStatus(data.status);
    }
  }

  const renderTileValue = (tile) => {
    if (tile === '=') return null;
    else return <Flex center><h1>{tile}</h1></Flex>
  }
  const goHome = () => {
    props.history.push('/')
  }
  return (
    <>
      <button onClick={() => goHome()}>← Back</button>
      {gameStatus !== "RUNNING" ? <Flex center>{gameStatus}</Flex> : null}
      <table style={{ pointerEvents: gameStatus === "RUNNING" ? "auto" : "none" }}>
        <tbody>
          {

            board.map((row, rowIndex) => {
              return <tr key={`row${rowIndex}`}>
                {
                  row.map((col, colIndex) => {
                    return <td key={`row${colIndex}`} onClick={() => updateBoard(rowIndex, colIndex)}>
                      {renderTileValue(board[rowIndex][colIndex])}
                    </td>
                  })
                }
              </tr>
            })
          }
        </tbody>
      </table>
      <h3>{gameStatus !== "RUNNING" ? alert(gameStatus) : ""}</h3>
    </>
  )
}
export default withRouter(Board);