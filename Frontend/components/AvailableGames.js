import React, { useEffect, useState } from 'react';
import { request } from '../utils/helpers'
import { Link, withRouter } from 'react-router-dom';

const AvailableGames = () => {
  const [games, setGames] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const result = await request.get('/games');
      if (result && result.data && Array.isArray(result.data.games)) {
        setGames([...result.data.games]);
      }
    }
    fetchData()
  }, [])

  const deleteGame = async (id) => {
    await request.delete('/delete', { uuid: id });
    const payload = games.filter((item) => item.id !== id)
    setGames([...payload])
  }

  const renderGames = () => {
    if (games.length === 0) return <h5 style={{ textAlign: 'center' }}>No Games Available</h5>
    return games.map((item, key) => (
      <li key={key}>
        <Link to={{ pathname: `start-game/${item.id}`, state: { board: item.board, status: item.status } }}>
          {`Game ${key}`}
        </Link>
        <span onClick={() => deleteGame(item.id)} style={{ marginLeft: "3px", cursor: "pointer" }}><strong>X</strong></span>
      </li>)
    )
  }

  return (
    <>
      <h4 style={{ textAlign: 'center' }}>Available Games Now</h4>
      <ul style={{ textAlign: 'center', listStyle: 'inside' }}>
        {renderGames()}
      </ul>
    </>
  )
}
export default withRouter(AvailableGames);