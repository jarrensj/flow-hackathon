import { createContext, useState, useEffect } from 'react'
import "../flow/config";
import * as fcl from "@onflow/fcl";
import axios from 'axios'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ loggedIn: null, addr: null })
  const [jwt, setJwt] = useState("");
  const [bio, setBio] = useState("");

  const [error, setError] = useState(null)

  useEffect(() => fcl.currentUser.subscribe(setUser), [])

  // log in user
  const login = async () => {
    console.log('log in')
    setUser(user?.addr)
    axios({
      method: 'post',
      url: 'http://localhost:8000/api/users/login',
      data: {
        walletAddress: user?.addr,
      }
    })
    .then(response => {
      // if user there, get the auth token
      // else user is not there, register the user and get the auth token

      let token = response.data.token;
      setJwt(token);
      console.log('Token set:', token);
    })

    .catch(error => console.log(error));
  }

  // POST method to grab token and store in variable jwt
  const setAuthToken = (token) => {
  }

  axios({
    method: 'post',
    url: 'http://localhost:8000/api/users/login',
    data: {
      walletAddress: user?.addr,
      "bio": "This is le bio"
    }
  })
    .then(response => {
      let token = response.data.token;
      setJwt(token);

      let bio = response.data.bio;
      setBio(bio)
      // setAuthToken(jwt);
      console.log('Bio set:', bio)
      console.log('Token set:', token);
    })
    .catch(error => console.log(error));

  // POST bio
  // axios({
  //   method: 'post',
  //   url: 'http://localhost:8000/api/users/me',
  //   headers: {
  //     'Authorization': `Bearer ${jwt}`,
  //     'Content-Type': 'application/json'
  //   },
  //   data: {
  //     "bio": "This is the bio"
  //   }
  // })
  //   .then(response => {
  //     let bio = response.data.bio;
  //     setBio(bio)
  //     console.log('Bio set:', bio)
  //   })
  //   .catch(error => console.log(error));

  // log out a user
  const logout = async () => {
    console.log('log out')
  }

  // check if a user is logged in 
  const checkUserLoggedIn = async () => {
    console.log('check if logged in')
    console.log(!!user)
    user && console.log(user)
  }

  return (
    <AuthContext.Provider value={{ user, error, login, logout, checkUserLoggedIn, jwt, bio }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext