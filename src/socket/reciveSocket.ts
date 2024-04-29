import socketInstance from "./index";
import { useIpcRenderer } from "@/hooks/useIpcRenderer";

import { storeToRefs } from "pinia";
import { useGlobalStore } from "@/stores/modules/global";
import { useChatStore } from "@/stores/modules/chat";
const { globalStatus } = storeToRefs(useGlobalStore());
const { getFriendsList } = useGlobalStore();
const { invokeEvent } = useIpcRenderer();
const { chatList, chatData } = storeToRefs(useChatStore());
const { chatUser } = storeToRefs(useGlobalStore());

socketInstance.on("private-chat", async (message) => {
  const { data, time, senderId, username, avatar, messageType, fileInfo } =
    message;

  const item = chatList.value.find((item, index) => {
    if (item?.uuid === senderId) return { ...item, index };
  });

  if (item) {
    //聊天列表存在发送人的ID不需要新增列表
    const { uuid } = chatUser.value;
    if (item.uuid !== uuid) {
      invokeEvent("rundb", {
        query: `update tb_chatlist 
        set 
            unreadnums = CAST(unreadnums AS INTEGER) + 1,
            lastmessage = ?,
            lasttime = ?,
            username = ?,
            avatar = ?
        where uuid = ?`,
        params: [data, time, username, avatar, item.uuid],
      });
    } else {
      // 在当前聊天用户的UI 则直接已读
      invokeEvent("rundb", {
        query: `update tb_chatlist 
        set 
            unreadnums = ?,
            lastmessage = ?,
            lasttime = ?,
            username = ?,
            avatar = ?
        where uuid = ?`,
        params: [0, data, time, username, avatar, item.uuid],
      });
    }
    chatList.value.splice(item.index, 1);
  } else {
    // 新增入数据库
    invokeEvent("rundb", {
      query: `insert into tb_chatlist(lastmessage,lasttime,username,uuid,unreadnums,avatar)
          values(?,?,?,?,?,?)
          `,
      params: [data, time, username, senderId, 1, avatar],
    });
  }

  chatData.value.push({
    data,
    messageType,
    ...(messageType === "file"
      ? {
          fileInfo,
        }
      : {}),
    time,
    uuid: senderId,
  });

  // 更新聊天列表
  chatList.value.unshift({
    data: messageType === "file" ? fileInfo.name : data,
    time: Number(time),
    uuid: senderId,
    username,
    avatar,
    unreadnums: Number(1),
  });
});
socketInstance.on("add-friends", () => {
  globalStatus.value.hasNewFriends = true;
});
socketInstance.on("agree-friend-apply", (message) => {
  getFriendsList();
  chatList.value.unshift(message); // 置顶
  const { data, time, senderId, reciverId, username, avatar } = message;
  invokeEvent("rundb", {
    query: `insert into tb_chatlist(lastmessage,lasttime,username,uuid,unreadnums,avatar)                                                                                                                                                                                                                                                                                                                                                                                                                                                                a into tb_chatlist(lastmessage,lasttime,username,uuid,unreadnums,avatar)
      values(?,?,?,?,?,?)
      `,
    params: [data, time, username, senderId, 1, avatar],
  });
});
