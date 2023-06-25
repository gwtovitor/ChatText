import React, { useRef, useState, useEffect } from 'react'

export default function Chat({ socket }) {
    const [messageList, setMessageList] = useState([])
    const messageRf = useRef()

    useEffect(() => {
        socket.on('reciveMsg', data => {
            setMessageList((current) => [...current, data])
        })
        return () => socket.off('reciveMsg')
    }, [socket])

    const handleSubmit = () => {
        const message = messageRf.current.value
        if (!message.trim()) return

        socket.emit('messageSend', message)
        clearInput()
    }

    const clearInput = () => {
        messageRf.current.value = ''
    }
    return (
        <div>
            <h1>Chat</h1>
            {
                messageList.map((message,index)=>(
                    <p key={index}>{message.author}:{message.text}</p>
                ))
            }
            <input type='text' ref={messageRf} placeholder='Mensagem'></input>
            <button onClick={() => { handleSubmit() }}>Enviar</button>
        </div>
    )

}
