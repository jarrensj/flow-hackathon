import Link from 'next/link'
import Layout from '../components/Layout'
import AuthContext from '../context/AuthContext'
import { useState, useEffect, useContext } from 'react'
import Ad from '../components/Ad'

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  return (
    <Layout>
      {user?.loggedIn ?
        <>
          <h1>Dashboard</h1>
          Welcome to the dashboard
          go <Link href="/">home page</Link> <br />
          <p>{`Logged in as ${user.addr}`}</p>
          <p className="text-slate-500"><Link href="/inbox">View your messages</Link></p>
          <p className="text-slate-500"><Link href="/profile">View your profile </Link></p>
          <p className="text-slate-500"><Link href="/feed">View community posts</Link></p>
        </> :
        <>
          <h2>Please login</h2>
          {/* <p> go <Link href="/login">log in</Link></p> */}
        </>
      }
      <Ad />

    </Layout>
  )
}