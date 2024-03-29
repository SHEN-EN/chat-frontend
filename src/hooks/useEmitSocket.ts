import socketInstance from "@/socket/index";
import type { userInfo } from "@/types/global";
import { useGlobalStore } from "@/stores/modules/global";
const { getUserInfo } = useGlobalStore();
let user: Partial<userInfo> = getUserInfo();

export const useEmitSocket = () => {
  const emitPrivateSocket = (data: string, reciverId: string) => {
    const message = {
      data,
      reciverId,
    };
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
