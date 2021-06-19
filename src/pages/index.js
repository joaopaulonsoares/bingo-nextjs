import { useState, useEffect } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import styles from './home.module.scss'
import { cardItem } from '../components/CardItem/index';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import BounceLoader from "react-spinners/BounceLoader";


import Image from 'next/image'
import qrCode from '../../public/cartela_qrCode.png';

export default function Home() {

  return (
    <>
      <Head>
        <title>Bingo da Bibi</title>
      </Head>
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <h1>Big Bingo da Bibi</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.box}>
            <h2>Roleta</h2>
            <p>A roleta possui números de 1 a 75. Os números são sorteados de forma aleatória e os números já sorteados estarão marcados na cor verde no painel.</p>
            <Link href="/roleta" passHref>
              <button>Ir para Roleta</button>
            </Link>
          </div>
          <div className={styles.box}>
            <h2>Cartelas</h2>
            <img src={qrCode} alt="Cartela do QRCode" />
            <Link href="/cartela" passHref>
              <button>Abrir uma cartela</button>
            </Link>
          </div>
        </div>

      </div>
    </>
  )
}
