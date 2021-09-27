import React,{useState} from 'react';
import './Chat.css';
import {Avatar, IconButton} from '@material-ui/core';
import axios from './axios';
import MicIcon from '@material-ui/icons/Mic';
import {AttachFile,InsertEmoticon, Message, MoreVert, Search} from '@material-ui/icons';
function Chat({messages}) {
  console.log('this is '+messages);
    const [input,setinput]=useState('');

  const sendMessage=async (e)=>{
    e.preventDefault();
   await axios.post('/messages/new',{
      message:input,
      name:'manish',
      timestamp:'just now',
      recieved:false 
    })
  }
    return (
        <div className='chat'>
         <div className="chat_header">
             <Avatar/>
             <div className="chat_headerinfo">
                <h3>Room name</h3>
                <p>last seen at...</p>
             </div>
             <div className="chat_headerright">
                    <IconButton>
                    <Search/>
                    </IconButton>
                    <IconButton>
                    <AttachFile/>
                    </IconButton>
                    <IconButton>
                    <MoreVert/>
                    </IconButton>
                    
                </div>
            </div>
            <div className="chat_body">
              {messages.map((message)=>{
                
                <p className={`chat_message ${message.recieved && 'chat_reciever'}`}>
                <span className="chat_name ">{message.name}</span>
                  {message.message}
                  <span className="chat_timestamp">
                      {message.timestamp}
                  </span>
                </p>

              } )}
              
           
            </div>
        <div className='chat_footer'>
            <IconButton>
                <InsertEmoticon/>
            </IconButton>
            <form action="">
                <input type="text"
                value={input}
                onChange={(e)=>setinput(e.target.value)}
                placeholder="Typr a message"

                />
                <button 
                onClick={sendMessage} 
                >submit</button>
                
            </form>
            <IconButton>

            <MicIcon/>
            </IconButton>
        </div>
        </div>
    )
}

export default Chat;
