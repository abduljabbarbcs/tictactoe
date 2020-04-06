import React from 'react';
import AvailableGames from './AvailableGames';
import ButtonLink from './ButtonLink';
import Flex from './Flex';
import Header from './Header';

const Home = () => {
  return (
    <>
      <Header title={"Tic Tac Toe"} />
      <Flex center>
        <ButtonLink title={"Start A Game"} />
      </Flex>
      <AvailableGames />

    </>
  )
}
export default Home;