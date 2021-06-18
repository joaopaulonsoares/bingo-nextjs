import { useState } from 'react';
import Image from 'next/image'
import styles from './home.module.scss'

export function PlayerCardItem({number}){
  const [isNumberMarqued, setIsNumberMarqued] = useState(false);
  //const isNumberMarqued=false;

  return(
    <div key={number} className={styles.cardItem} onClick={() => setIsNumberMarqued(!isNumberMarqued)} >
      <div className={styles.cardItemContainer} style={{backgroundColor: (isNumberMarqued ? '#00FF7F' : '' ) }}>
        {number + 1}
      </div>
    </div>
  )
}

export function CenterPlayerCardItem({number}){

  return(
    <div key={number} className={styles.cardItem} >
        Bingo
    </div>
  )
}