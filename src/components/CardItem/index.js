import { useState, useEffect } from 'react';
import styles from './home.module.scss'

export function cardItem(number, drawNumbers){
    const isNumberSorted = drawNumbers.includes(number);
    // console.log(`Número: ${number} / Foi sorteado: ${isNumberSorted}`)

    useEffect(() => {
    },[drawNumbers]);

    return(
      <div key={number} style={{backgroundColor: (isNumberSorted ? '#4cbb17' : '' ) }} className={styles.cardItem} >
          {number + 1}
      </div>
    )
  }