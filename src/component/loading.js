import React from 'react';
import {Background, LoadingText} from './loadingStyles';
import Spinner from './img/load.gif'

export default function loading(){
  return (
    <Background>
      <LoadingText></LoadingText>
      <img src={Spinner} alt='loading' width="5%"/>
    </Background>
  );
};