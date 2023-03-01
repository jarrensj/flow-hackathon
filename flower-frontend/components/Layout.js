
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import styles from '../styles/Layout.module.css';
import { Roboto } from '@next/font/google'
const roboto = Roboto({ weight: '400', subsets: ['latin'] })

export default function Layout({title, keywords, description, children}) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description} />
                <meta name='keywords' content={keywords} />
            </Head>
            <Header />
            <div className={`${styles.container} ${roboto.className}`}>
                {children}
            </div>
            <Footer />
        </div>
    )
}

Layout.defaultProps = {
    title: 'flower',
    description: 'flower',
    keywords: 'flower'
}