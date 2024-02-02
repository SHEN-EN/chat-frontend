import { io } from 'socket.io-client'

const socket = io('ws://127.0.0.1:3001', {
  transports: ['websocket', 'polling'], // 指定传输方式
  reconnection: true, // 是否自动重新连接
  reconnectionAttempts: 100, // 重新连接尝试次数
  reconnectionDelay: 1000, // 重新连接延迟时间（毫秒）
  auth:{
    'authorization':`Bearer ${localStorage.getItem('authorization')}`,
  }
})
export default socket