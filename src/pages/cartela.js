import { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from './home.module.scss'
import { PlayerCardItem } from '../components/Card/PlayerCardItem/index';

export default function Cartela() {
  const sizeOfNumbersInRoulette = 75;
  const amountOfNumbersInCard = 25;


  const numbersOfRoulette = Array.from(Array(sizeOfNumbersInRoulette).keys())
  const [drawNumbers, setDrawNumbers] = useState([])
  const [numbersToBeDraw, setNumbersToBeDraw] = useState(numbersOfRoulette);

  const [cardNumbers, setCardNumbers] = useState([]);

  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  async function drawRandomNumberAvailable(){
    const arrayPositionDraw = random(0, numbersToBeDraw.length);
    const drawNumber = (numbersToBeDraw[arrayPositionDraw]);
    const updateDrawedNumbers = [...drawNumbers, drawNumber];
    await setDrawNumbers(updateDrawedNumbers);
    const availableNumbersToDrawn = [...numbersToBeDraw]
    const updateAvailableNumbersToDrawn = availableNumbersToDrawn.filter(item => item !== drawNumber)
    await setNumbersToBeDraw(updateAvailableNumbersToDrawn);
    // await updateLocalStorageData(updateDrawedNumbers);

    return drawNumber;
  }

 useEffect(async () => {
     /*
    const dataFromLocalStorage = await getLocalStorageData();
    setDrawNumbers(dataFromLocalStorage);
    if(dataFromLocalStorage.length > 0) {
      setLastNumberDraw(([...dataFromLocalStorage].slice(-1))[0]);
    }*/
    buildNewCardForPlayer();
  },[]);


async function buildNewCardForPlayer(){
    const newCardNumbers = [];
    setCardNumbers([]);

    for(let i = 0; i < amountOfNumbersInCard ; i++){
        const randomNumber = await drawRandomNumberAvailable();
        newCardNumbers.push(randomNumber);
    }

    setCardNumbers(newCardNumbers);
}

  async function getLocalStorageData(){
    const localStorageData = localStorage.getItem('@bingoRoulette/cardNumbers');
    if(localStorageData){
      return localStorageData.split(',').map(Number);
    }

    return [];
  }

  return (
      <div className={styles.playerCardContainer}>
            <div className={styles.playerCardNumbers}>
                {
                  cardNumbers.map((number) =>
                    <div key={`numbersOfRoulette-${number}`}>
                      <PlayerCardItem number={number}/>
                    </div>
                  )
                }
            </div>
      </div>
  )
}
