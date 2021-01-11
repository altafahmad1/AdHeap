import React from 'react';
import HeroSection from '../../HeroSection';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data.js';
// import Pricing from '../../Pricing';

function Home() {
  return (
    <>
      <HeroSection {...homeObjOne} />
      <HeroSection {...homeObjThree} />
      <HeroSection {...homeObjTwo} />
      {/* <Pricing /> */}
      <HeroSection {...homeObjThree} />
    </>
  );
}

export default Home;