import React, { useRef } from 'react'
import io from 'socket.io-client'


export default function Join({setChatVisibility, setSocket}){

    const userNameRef = useRef()

    const  handleSubmit = async ()=>{
        const username = userNameRef.current.value
        if(!username.trim()) return
     
        const socket = await io.connect('http://localhost:3001')
        socket.emit('set_username', username)
        setSocket(socket)
        setChatVisibility(true)
    }

  
    return (
      <div>
        <h1>Entrar</h1>
        <input type='text' ref={userNameRef} placeholder='Nome do User'></input>
        <button onClick={()=>{handleSubmit()}}>Entrar</button>
      </div>
    )
  
}
