import { useState, useEffect } from 'react';
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