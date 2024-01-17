import socketInstance from "./index";
socketInstance.on('private-chat',(data)=>{
    console.log(data);
})