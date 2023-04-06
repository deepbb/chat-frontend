import axios from 'axios'
import { Link } from 'react-router-dom'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import "./Chat.css"
import Conversation from './Conversation'
import LogoSearch from './LogoSearch'
import Noti from "../img/noti.png"
import Comment from "../img/comment.png"
import Home from "../img/home.png"
import { UilSetting } from '@iconscout/react-unicons'
import ChatBox from './ChatBox'
import {io} from "socket.io-client"

const Chat = () => {

  const {user} = useContext(AuthContext)

  const [chats ,setChat] = useState()
  const[currentChat,setCurrentchat] = useState(null)
  const [onlineUsers , setOnlineusers] = useState([])
  const[sendMessage,setSendmessage] = useState(null)
  const[receiveMessage,setReceivemesage] = useState(null)
 
  const socket = useRef()


  useEffect(()=> {
    const getchats = async ()=> {
      const res = await axios.get(`/chat/${user._id}`)
      console.log(res);
      setChat(res.data)
    };
     getchats()
  },[user])



  useEffect(()=> {
    socket.current = io("http://localhost:8800")
    socket.current.emit("new-user-add",user?._id)
    socket.current.on("get-users",(users)=> {
      setOnlineusers(users)
      console.log(onlineUsers);
    })
  },[user])

  //send message to socket server
  useEffect(()=> {
    if(sendMessage !== null) {
      socket.current.emit("send-message",sendMessage)
    }
  },[sendMessage])

  //receive message from socket server

useEffect(()=> {
  socket.current.on("receive-message",(data)=> {
    setReceivemesage(data)
  })
},[])

const checkOnlineStatus = (chat)=> {
  const chatMember = chat.members.find((member)=> member!==user._id)
  const online = onlineUsers.find((user)=>user.userId === chatMember)
  return online? true : false
}






  return (
    <>
    <div className='Chat'>
        <div className='Left-side-chat'>
       <LogoSearch />
       <div className='Chat-container'>
          <h2>Chats</h2>
            <div className='Chat-list'>
             {chats?.map((chat,id)=>(
              <div key={id} onClick={()=>setCurrentchat(chat)}>
              <Conversation data={chat} currentuser={user._id} key={id} online={checkOnlineStatus(chat)}/>
              </div>
             ))}
            </div>
       </div>
        
       

        </div>
        <div className='Right-side-chat'>
                <div style={{width:"20rem",alignSelf:"flex-end"}}>
                  <div className='navIcons'>
                   <Link to="/">
                        <img className='logo' src={Home} alt="" style={{width:"20px",height:"20px"}}/>
                   </Link>
                    <UilSetting className='logo'  style={{width:"20px",height:"20px"}}/>
                    <img className='logo' src={Noti} alt="" style={{width:"20px",height:"20px"}} />
                    <Link to="/chat">
                    <img className='logo' src={Comment} alt="" style={{width:"20px",height:"20px"}} />
                    </Link>
                  </div>
                </div>
        <ChatBox chat={currentChat} currentuser={user?._id} setSendmessage={setSendmessage} receiveMessage={receiveMessage} />

        </div>

    </div>
    </>
  )
}

export default Chat