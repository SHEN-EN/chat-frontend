import socketInstance from "./index";
import { useIpcRenderer } from '@/hooks/useIpcRenderer'

import { storeToRefs } from "pinia";
import { useGlobalStore } from "@/stores/modules/global";
import { useChatStore } from "@/stores/modules/chat";
const { globalStatus } = storeToRefs(useGlobalStore());
const { getFriendsList } = useGlobalStore();
const { invokeEvent } = useIpcRenderer()
const { setChatData } = useChatStore();
const { chatList } = storeToRefs(useChatStore());
const {chatUser} = storeToRefs(useGlobalStore());

socketInstance.on("private-chat", (message) => {
  const { data, time, senderId, reciverId, username, avatar } = message;
  setChatData(message);

  const item = chatList.value.find((item) => item?.uuid === senderId);

  
  if (item) {
    //聊天列表存在发送人的ID不需要新增列表
    const { uuid } = chatUser.value
    if(item.uuid === uuid) { // 在当前聊天用户的UI 则直接已读
        update('tb_chatList',{
            unreadnums:0
        })
    }
    
    // chatList.value.splice(index, 1);
    // chatList.value.unshift(message); // 置顶
  } else {
    // 新增入数据库
    invokeEvent('rundb', {
        query: `insert into tb_chatlist(lastmessage,lasttime,username,uuid,unreadnums,avatar)
          values(?,?,?,?,?,?)
          `,
        params: [data, time, username, senderId, 1, avatar],
      })
  }
});
socketInstance.on("add-friends", () => {
  globalStatus.value.hasNewFriends = true;
});
socketInstance.on("agree-friend-apply", (message) => {
  getFriendsList();
  chatList.value.unshift(message); // 置顶
  const { data, time, senderId, reciverId, username, avatar } = message;
  invokeEvent('rundb', {
    query: `insert into tb_chatlist(lastmessage,lasttime,username,uuid,unreadnums,avatar)
      values(?,?,?,?,?,?)
      `,
    params: [data, time, username, senderId, 1, avatar],
  })
});
