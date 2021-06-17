import { useState, useEffect } from 'react';
import styles from './home.module.scss'

export function PlayerCardItem({number}){
  const [isNumberMarqued, setIsNumberMarqued] = useState(false);
  //const isNumberMarqued=false;

    return(
      <div 
        key={number} 
        style={{backgroundColor: (isNumberMarqued ? '#4cbb17' : '' ) }} 
        className={styles.cardItem} 
        onClick={() => setIsNumberMarqued(!isNumberMarqued)}
      >
          {number + 1}
      </div>
    )
  }