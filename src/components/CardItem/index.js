import { useState, useEffect } from 'react';
import styles from './home.module.scss'

export function cardItem(number, isNumberDrawed){
  console.log(isNumberDrawed)
    const isNumberSorted = isNumberDrawed;
    // console.log(`Número: ${number} / Foi sorteado: ${isNumberSorted}`)


    return(
      <div key={number} style={{backgroundColor: (isNumberSorted ? '#4cbb17' : '' ) }} className={styles.cardItem} >
          {number + 1}
      </div>
    )
  }