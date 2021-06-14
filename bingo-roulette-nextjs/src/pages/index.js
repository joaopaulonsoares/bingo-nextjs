import { useState, useEffect } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from './home.module.scss'
import { cardItem } from '../components/CardItem/index';

export default function Home() {
  const numbersOfRoulette = Array.from(Array(75).keys())
  const [drawNumbers, setDrawNumbers] = useState([])
  const [numbersToBeDraw, setNumbersToBeDraw] = useState(numbersOfRoulette);
  const [lastNumberDraw, setLastNumberDraw] = useState(null);

  //const sortedNumbers = [1, 5, 6, 24, 76, 23, 65, 65, 76];
  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  async function drawRandomNumberAvailable(e){
    const arrayPositionDraw = random(0, numbersToBeDraw.length);
    const drawNumber = (numbersToBeDraw[arrayPositionDraw]);
    await setLastNumberDraw(drawNumber);
    // Update drawn numbers
    const updateDrawedNumbers = [...drawNumbers, drawNumber];
    await setDrawNumbers(updateDrawedNumbers);
    // Remove number from availables and update list;
    const availableNumbersToDrawn = [...numbersToBeDraw]
    const updateAvailableNumbersToDrawn = availableNumbersToDrawn.filter(item => item !== drawNumber)
    await setNumbersToBeDraw(updateAvailableNumbersToDrawn);

    await updateLocalStorageData(updateDrawedNumbers);
  }

  // Get data from local storage for the first time
 /* useEffect(async () => {
    const dataFromLocalStorage = await getLocalStorageData();
    setDrawNumbers(dataFromLocalStorage);
  },[]);*/

  useEffect(() => {
  },[drawNumbers]);

  async function getLocalStorageData(){
    // Atualizar LocalStorage
    const data = localStorage.getItem('@bingoRoulette/drawedNumbers');
    return data;
  }

  async function updateLocalStorageData(updateAvailableNumbersToDrawn){
    // Atualizar LocalStorage
    localStorage.setItem('@bingoRoulette/drawedNumbers', updateAvailableNumbersToDrawn);
  }

  async function cleanLocalStorageData() {
    // Limpar LocalStorage
    localStorage.removeItem('@bingoRoulette/drawedNumbers');
    setDrawNumbers([])
    setNumbersToBeDraw(numbersOfRoulette)
    setLastNumberDraw(null);
  }


  return (
      <div className={styles.contentContainer}>
        <div className={styles.rouletteContainer}>
            <div className={styles.rouletteHeader}>
              <div className={styles.sort}>
                <div className={styles.sortedNumber}>
                  {lastNumberDraw === null ? '-' : (lastNumberDraw + 1)}
                </div>
                <div className={styles.lastDraws}>
                  {
                    ((drawNumbers.slice(-3)).reverse()).map((numberDrawed) =>
                      <div className={styles.lastNumbersDraw}>
                        {numberDrawed + 1}
                      </div>
                    )
                  }
                </div>
              </div>

              <div className={styles.buttonsPanel}>
                <button onClick={drawRandomNumberAvailable}>Sortear número</button>
                <button onClick={cleanLocalStorageData}>Reiniciar sorteio</button>
              </div>


            </div>
            <div className={styles.rouletteCardNumbers}>
                {
                  numbersOfRoulette.map((number) =>
                    cardItem(number, drawNumbers)
                  )
                }
            </div>
        </div>
      </div>
  )
}
