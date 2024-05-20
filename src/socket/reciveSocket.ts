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
  let { data } = message;
  const { time, senderId, username, avatar, messageType, fileInfo } = message;

  const target = chatList.value.map((item, index) => {
    if (item?.uuid === senderId) return {index, ...item };
  })[0]

  if (messageType === "file") {
    
    invokeEvent("download-file", { fileInfo, data });
    data = fileInfo.name;
  }

  if (target) {
    //聊天列表存在发送人的ID不需要新增列表
    const { uuid } = chatUser.value;
    if (target.uuid !== uuid) {
      invokeEvent("rundb", {
        query: `update tb_chatlist 
        set 
            unreadnums = CAST(unreadnums AS INTEGER) + 1,
            lastmessage = ?,
            lasttime = ?,
            username = ?,
            avatar = ?
        where uuid = ?`,
        params: [data, time, username, avatar, target.uuid],
      });

      // 更新聊天列表
      chatList.value.unshift({
        data,
        time: Number(time),
        uuid: senderId,
        username,
        avatar,
        unreadnums: target.unreadnums++,
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
        params: [0, data, time, username, avatar, target.uuid],
      });
    }
    chatList.value.splice(target.index, 1);

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
