import Link from 'next/link'
import Layout from '../components/Layout'
import AuthContext from '../context/AuthContext'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios';
import EditProfile from '../components/EditProfile'

export default function Profile() {
  const { user, jwt, bio } = useContext(AuthContext);
  console.log(user.jwt)
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get('http://localhost:8000/status%27);
  //     setData(response.data);
  //     console.log(response.data)
  //   };

  //   fetchData();
  // }, []);

  useEffect(() => {
    console.log(jwt)
    var config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:8000/api/users/me',
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    };
    // axios({
    //   method: 'put',
    //   maxBodyLength: Infinity,
    //   url: 'http://localhost:8000/api/users/me',
    //   headers: {
    //     'Authorization': `Bearer ${jwt}`,
    //     'Content-Type': 'application/json'
    //   },
    //   data: {
    //     "bio": "This is le bio"
    //   }
    // });

    axios(config)
      .then(function (response) {
        console.log(response)
        console.log('Getting!')
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [jwt, bio])

  return (
    <Layout>
      <h1>Profile</h1>
      welcome to the inbox page
      go <Link href="/">home page</Link> <br />
      {user.loggedIn ?
        <>
          <h1>logged in as {user?.addr}</h1>
          <p>here is your profile</p>
          <p>wallet: {user?.addr}</p>
          <p>bio: {bio}</p>
          <EditProfile />
        </> : 
        <>
          <h2>not logged in</h2>
          <p> go <Link href="/login">log in</Link></p>
        </>
      }

    </Layout>
  )
}