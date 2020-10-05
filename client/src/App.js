import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App () {

  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState('');
  const [inputValue, setInputValue] = useState('')

  useEffect(()=> {
    const randomNumber = Math.floor(Math.random() * 2000);
    setUser("Guest#" + randomNumber)
    setInterval( async () => {
      const { data } = await axios.get('/messages')
      setMessages(data)
      console.log(data)
    }, 1500);
  },[])

  async function postMessage (e) {
    e.preventDefault()
    const newMessage = {body: inputValue, user: user}
    await axios.post('/messages', newMessage);
    setInputValue('')
  }

  return (
    <div>
      <form onSubmit={postMessage}>
        <input 
          id='messageInput' 
          onChange={e => setInputValue(e.target.value)}
        />
        <button id="sendButton" type="submit">Send</button>
      </form>
      <input  id="changeUserInput" value={user} onChange={e => setUser(e.target.value)}/>
      <div class="messageContainer">
        {messages.map((message, i) => 
          <div key={i} className={message.user === user ? 'my-msg msg' : 'other-msg msg'}>
            <strong>{message.user}</strong> {message.body}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;