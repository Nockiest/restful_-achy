import express from "express"
import cors from "cors";
import { StreamChat } from "stream-chat";
import {v4 as uuidv4} from "uuid"
import bcrypt from "bcrypt"
const app = express()
app.use(cors());
app.use(express.json())
const api_key="5c8mj9863g46";
const api_secret="m54sjjj8uhdba4pzdbgutkparc3emgn8ykq59cg8kjn8kpcj28agdrj768zsn334";
const serverClient = StreamChat.getInstance(api_key, api_secret)

app.post("/signup", async (req, res) => {
 
    try {
      const { firstName, lastName, username, password } = req.body;
      console.log( firstName, lastName, username, password )
      const userId = uuidv4();
      const hashedPassword = await bcrypt.hash(password, 10);
      const token = serverClient.createToken(userId);
      res.json({ token, userId, firstName, lastName, username, hashedPassword });
    } catch (error) {
      res.json(error);
    }
  });
  
  app.post("/login", async (req, res) => {
    
    try {
      const { username, password } = req.body;
   console.log(username, password )
   const { users } = await serverClient.queryUsers({ name: username });
   console.log(users, "users")
      if (users.length === 0) return res.json({ message: "User not found" });
      console.log(users)
      const token = serverClient.createToken(users[0].id);
      const passwordMatch = await bcrypt.compare(
        password,
        users[0].hashedPassword
      );
  console.log (passwordMatch)
      if (passwordMatch) {
        res.json({
          token,
          firstName: users[0].firstName,
          lastName: users[0].lastName,
          username,
          userId: users[0].id,
        });
      }
    } catch (error) {
      res.json(error);
    }
  });
 

app.listen(3001, () => {
    console.log("I work")
})