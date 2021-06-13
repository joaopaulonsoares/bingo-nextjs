import Head from 'next/head'
import Image from 'next/image'
import styles from './home.module.scss'

export default function Home() {

  const numbersOfRoulette = Array.from(Array(75).keys())

  function cardItem(number){
    return(
      <div key={number} className={styles.cartelGridItem}>
          {number}
      </div>
    )
  }

  return (
      <div className={styles.contentContainer}>
        <div className={styles.rouletteContainer}>
            <div className={styles.rouletteHeader}>
                Roleta
            </div>
            <div className={styles.rouletteNumbers}>
                {
                  numbersOfRoulette.map((number) =>
                    cardItem(number+1)
                  )
                }
            </div>
        </div>
      </div>
  )
}
