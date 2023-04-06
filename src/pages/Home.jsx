import React, { useContext } from 'react'
import Chat from "../Components/Chat"
import { AuthContext } from '../Context/AuthContext';


const Home = () => {
  const {user} = useContext(AuthContext)
  console.log(user);
  return (
    <div>
        <Chat />
    </div>
  )
}

export default Home