import { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { ToastContainer, toast } from 'react-toastify';
import { PlayerCardItem, CenterPlayerCardItem } from '../components/Card/PlayerCardItem/index';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import 'react-toastify/dist/ReactToastify.css';
import styles from './home.module.scss'

export default function Cartela() {
  const sizeOfNumbersInRoulette = 75;
  const amountOfNumbersInCard = 25;

  const numbersOfRoulette = Array.from(Array(sizeOfNumbersInRoulette).keys())
  const [cardNumbers, setCardNumbers] = useState([]);

  const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

  async function drawPlayerCard(){
    let availableNumbers = numbersOfRoulette;
    let numbersAtCard = [];

    for(let i = 0; i < amountOfNumbersInCard ; i++){
      const arrayPositionDraw = await random(0, availableNumbers.length);
      const numberDrawed = (availableNumbers[arrayPositionDraw]);
      await numbersAtCard.push(numberDrawed)
      const updateAvailableNumbers = await availableNumbers.filter(item => item !== numberDrawed);
      availableNumbers = [...updateAvailableNumbers];
    }

    return numbersAtCard;
  }

  async function buildNewCardForPlayer(){
      await setCardNumbers([]);
      const playerCardNumbers = await drawPlayerCard()
      await setCardNumbers(playerCardNumbers);
      await updateLocalStorageData(playerCardNumbers);
      await toast.success('Uma nova cartela foi gerada com sucesso!', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0,
      });
  }

  function confirmToCreateNewCard(){
    confirmAlert({
      title: 'Opaaa',
      message: 'Você confirma que deseja uma nova cartela?',
      buttons: [
        {
          label: 'Sim',
          onClick: () => buildNewCardForPlayer()
        },
        {
          label: 'Não',
        }
      ]
    });
  }

  async function askIfPlayerWantNewCard(){
    confirmAlert({
      title: 'Cartela existente!',
      message: 'Existe uma cartela salva, deseja continuar a jogar com a cartela antiga? Caso não deseje uma nova será gerada.',
      buttons: [
        {
          label: 'Sim',
        },
        {
          label: 'Não',
          onClick: () => buildNewCardForPlayer()
        }
      ]
    });
  }

  async function getLocalStorageData(){
    const localStorageData = localStorage.getItem('@bingoRoulette/cartela');
    if(localStorageData){
      return localStorageData.split(',').map(Number);
    }

    return [];
  }

  async function updateLocalStorageData(updateCardNumbers){
    localStorage.setItem('@bingoRoulette/cartela', updateCardNumbers);
  }

  useEffect(async () => {
    const dataFromLocalStorage = await getLocalStorageData();
   
    if(dataFromLocalStorage.length > 0){
      await setCardNumbers(dataFromLocalStorage);
      await askIfPlayerWantNewCard();
    } else {
      buildNewCardForPlayer();
    }
  },[]);


  return (
      <div className={styles.playerCardContainer}>
          <div className={styles.playerCardContent}>
            <div className={styles.playerCardHeader}>
              <h1>Bingo</h1>
            </div>
            <div className={styles.playerCardNumbers}>
                {
                  cardNumbers.map((number, index) =>
                      (index === 12) ? 
                      <CenterPlayerCardItem />
                      :
                      <PlayerCardItem number={number} key={`numbersOfRoulette-${number}`} />
                  )
                }
            </div>
            <div className={styles.playerCardFooter}>
              <button onClick={confirmToCreateNewCard}>Gerar nova cartela</button>
            </div>
            <ToastContainer
              position="bottom-center"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover
            />
          </div>
      </div>
  )
}
