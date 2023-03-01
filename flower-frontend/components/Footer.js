import Link from 'next/link'
import styles from '../styles/Footer.module.css'
import { Roboto } from '@next/font/google'
const roboto = Roboto({ weight: '400', subsets: ['latin'] })

export default function Footer() {
  return (
   <footer className={`${styles.footer} ${roboto.className}`}>
     <p>made with love</p>
   </footer>
  )
}