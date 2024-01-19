import socketInstance from "@/socket/index";
import type { userInfo } from "@/types/global";
import { useGlobalStore } from "@/stores/modules/global";
const { getUserInfo } = useGlobalStore();
let user: Partial<userInfo> = {};
getUserInfo().then((data: userInfo) => {
  user = data;
});

export const useEmitSocket = () => {
  const emitPrivateSocket = (data: string, reciverId: string) => {
    const message = {
      data,
      reciverId,
      senderId: user.uuid,
    };
    socketInstance.emit("private-chat", message);
  };
  const emitJoinSocket = () => {
    socketInstance.emit("join", {
        uuid:user.uuid,
        username:user.username
    });
  };
  return {
    emitPrivateSocket,
    emitJoinSocket,
  };
};