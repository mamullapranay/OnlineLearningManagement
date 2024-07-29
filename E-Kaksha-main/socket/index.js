const io = require("socket.io")(8900, {
    cors: {
      origin: "http://localhost:3000",
    },
  });

//everytime we refresh socketId changes
let users=[];

const addUserInArray=(userId,socketId)=>{
        if(!users.some(user=>user.userId=== userId)){
            users.push({userId,socketId});
        }
}
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection",(socket)=>{
    console.log("a user connected: "+socket.id);
    //take socketId from user
    socket.on("addUser",userId=>{
            addUserInArray(userId,socket.id);
            io.emit("getUsers",users);//send users who are assigned socketId to all clients
    });

    //conversation: send and get msgs
    socket.on("sendMessage",({senderId,receiverId,text}) =>{
          const receiver=getUser(receiverId);
          io.to(receiver.socketId).emit("getMessage",{
            senderId,
            text,
          });
    });


    //when user disconnects
    socket.on("disconnect",()=>{
      console.log("user disconnected");
      removeUser(socket.id);
      io.emit("getUsers",users);
    })
})
