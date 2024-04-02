import socketInstance from "./index";
import { insert } from "@/indexDB";

import { storeToRefs } from "pinia";
import { useGlobalStore } from "@/stores/modules/global";
import { useChatStore } from "@/stores/modules/chat";
const { globalStatus } = storeToRefs(useGlobalStore());
const { getFriendsList } = useGlobalStore();

const { setChatData } = useChatStore();
const { chatList } = storeToRefs(useChatStore());
console.log(socketInstance);

socketInstance.on("private-chat", (message) => {
  const { data, time, senderId, reciverId, username, avatar } = message;
  setChatData(message);

  const index = chatList.value.map((item) => item?.uuid).indexOf(senderId);

  if (index !== -1) {
    //聊天列表存在发送人的ID不需要新增列表
    // chatList.value.splice(index, 1);
    // chatList.value.unshift(message); // 置顶
  } else {
    // 新增入数据库
    insert("tb_chatList", {
      lastmessage: data,
      lasttime: time,
      username,
      uuid: senderId,
      unreadnums: 1,
      avatar
    });
  }
});
socketInstance.on("add-friends", () => {
  globalStatus.value.hasNewFriends = true;
});
socketInstance.on("agree-friend-apply", (message) => {
  getFriendsList();
  chatList.value.unshift(message); // 置顶
  const { data, time, senderId, reciverId, username, avatar } = message;
  insert("tb_chatList", {
    lastmessage: data,
    lasttime: time,
    username,
    uuid: reciverId,
    unreadnums: 1,
    avatar
  });
});
