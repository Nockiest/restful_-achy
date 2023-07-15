 
import Board from './components/Board';  
import './App.css';
import Login from './components/connection/Login';
import SignIn from './components/connection/SignIn';
import {Chat} from "stream-chat-react"
import {StreamChat} from "stream-chat";
import Cookies from "universal-cookie"
 import React, { useState } from 'react';
import JoinGame from './components/connection/JoinGame';

function App() {
  const api_key="5c8mj9863g46";
  const cookies = new Cookies();
  const token = cookies.get("token")
  const client = StreamChat.getInstance(api_key)
  const [isAuth, setIsAuth] = useState(false);

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    setIsAuth(false);
  };

if (token) {
  client
    .connectUser(
      {
        id: cookies.get("userId"),
        name: cookies.get("username"),
        firstName: cookies.get("firstName"),
        lastName: cookies.get("lastName"),
        hashedPassword: cookies.get("hashedPassword"),
      },
      token
    )
    .then((user) => {
       setIsAuth(true);
    });
}
  return (
   <div>
      
      {isAuth ? 
      <div>
        <Chat client={client}>  
         <button onClick={logOut}>LogOUt</button>

         <JoinGame />
        </Chat> 
      </div> 
       :
      <div className="authentication-forms">
      <Login setIsAuth={setIsAuth} />
      <SignIn setIsAuth={setIsAuth}/>
      </div> 
      }
    </div>
  );
}

export default App;


 
// const App = () => {
//   const [curPlayer, setCurPlayer] = useState("white")
  
//   return (
//     <div>
//       <Board  height={8} width={8}     />
//     </div>
//   );
// };

// export default App;
