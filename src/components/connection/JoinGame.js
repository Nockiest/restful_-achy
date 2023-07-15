import { useChatContext, Channel } from "stream-chat-react";
import React, { useState, useEffect } from "react";
import Game from "./Game";
import CustomInput from "./CustomInput";
const JoinGame = () => {
  const [rivalUsername, setRivalUsername] = useState("");
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await client.queryUsers({ id: { $ne: client.userID } });
    console.log(client, client?.userID, response.users)
    if (response.users) {
      if (response.users) {
        const filteredUsers = response.users.filter((user) => user.name !== client.user.name);
        setUsers(filteredUsers);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createChannel = async () => {
    if(rivalUsername === client?.user?.name){
      setRivalUsername("")
     return alert("you cant play with yourself!")
     
    }
    const response = await client.queryUsers({ name: { $eq: rivalUsername } });
    if (response.users.length === 0) {
      alert("User not found");
      return;
    }

    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
      player: "white",
    });

    await newChannel.watch();

    await newChannel.watch();
    setChannel(newChannel);
  };

  const handleInputChange = (event) => {
    setRivalUsername(event.target.value);
  };

  const handleUserClick = (username) => {
    setRivalUsername(username);
  };

  return (
    <>
      {channel ? (
        <Channel channel={channel} Input={CustomInput}>
          <Game channel={channel} setChannel={setChannel} client={client} />
        </Channel>
      ) : (
        <div className="joinGame">
          <h1>GAME LOBBY</h1>
          <div className="lobby-body">
            <div className="input-row">
              <input placeholder="Username of rival..." value={rivalUsername} onChange={handleInputChange} />
              <button onClick={createChannel}>Join/Start Game</button>
            </div>
            
            <div className="users-col">
            <h4>Possible oponents</h4>
              {users?.map((user) => (
                <button key={user.id} onClick={() => handleUserClick(user.name)}>
                  {user.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JoinGame;
