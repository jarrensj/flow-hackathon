import Head from 'next/head'
import { Roboto } from '@next/font/google'
import styles from '@/styles/Login.module.css'
import AuthContext from '../context/AuthContext'
import Home from '../pages/index'
import Dashboard from '../pages/dashboard'
import { useState, useEffect, useContext } from 'react'
import "../flow/config";
import * as fcl from "@onflow/fcl";
import Link from 'next/link'
import Layout from '../components/Layout'

const roboto = Roboto({ weight: '700', subsets: ['latin'] })

export default function Login() {
  const [flowUser, setFlowUser] = useState({ loggedIn: null, addr: null, bio: null })
  const { user, login, logout, checkUserLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    fcl.currentUser.subscribe(setFlowUser)
    login(flowUser)
  }, [])

  const AuthedState = () => {
    return (
      <div>
        {/* <Dashboard /> */}
        you are logged in now to go to <Link href="/dashboard">dashboard</Link>
      </div>
    )
  }

  const UnauthenticatedState = () => {
    return (
      // <div>
      //   <Home />
      // </div>
      <div className={`${styles.loginModal} ${roboto.className}`}>
        <h3 className="text-[20px]">Sign in to<br /><span className="uppercase tracking-[.35em] font-extrabold">Flower Ronin</span></h3>
        <button onClick={fcl.logIn}>Login</button>
        <h4>Don&apos;t have an account, contact us?</h4>
        {/* <button onClick={fcl.signUp}>Sign Up</button> */}
      </div>
    )
  }
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        {user?.loggedIn
          ? <AuthedState />
          : <UnauthenticatedState />
        }
      </Layout>
    </>
  )
}