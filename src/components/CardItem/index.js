import { useState, useEffect } from 'react';
import styles from './home.module.scss'

export function cardItem(number, isNumberDrawed){
    const isNumberSorted = isNumberDrawed;
    // console.log(`Número: ${number} / Foi sorteado: ${isNumberSorted}`)


    return(
      <div key={number} className={styles.cardItem} >
        <div className={styles.cardItemContainer} style={{backgroundColor: (isNumberSorted ? '#00FF7F' : '' ) }}>
          {number + 1}
        </div>
      </div>
    )
  }