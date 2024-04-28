import socketInstance from "@/socket/index";
import type { userInfo } from "@/types/global";
import { useGlobalStore } from "@/stores/modules/global";
const { getUserInfo } = useGlobalStore();
let user: Partial<userInfo> = getUserInfo();
type MessageType = 'file' | 'text';
export const useEmitSocket = () => {
  const emitPrivateSocket = (message: {
    data: string | ArrayBuffer;
    messageType: MessageType;
    time: number;
    senderId: string;
    avatar: string;
    reciverId: string;
    fileInfo?: {
      name: string;
      type: string;
    };
  }) => {
    socketInstance.emit("private-chat", message);
  };

  const emitJoinSocket = () => {
    socketInstance.emit("join", {
      username: user.username,
    });
  };

  const emitAddFriend = (reciverId: string) => {
    socketInstance.emit("add-friends", {
      reciverId,
    });
  };

  const emitAgreeFriendApply = (data: {
    reciverId: string;
    avatar: string;
  }) => {
    socketInstance.emit("agree-friend-apply", data);
  };
  return {
    emitPrivateSocket,
    emitJoinSocket,
    emitAddFriend,
    emitAgreeFriendApply,
  };
};
