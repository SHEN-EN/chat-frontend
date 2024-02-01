import socketInstance from "./index";
import { storeToRefs } from "pinia";
import { useGlobalStore } from "@/stores/modules/global";
import { useChatStore } from "@/stores/modules/chat";
const { globalStatus } = storeToRefs(useGlobalStore());

const { setChatData } = useChatStore();
const { chatList } = storeToRefs(useChatStore());

socketInstance.on("private-chat", (data) => {
  const { senderId } = data;
  setChatData(data);

  const index = chatList.value.map((item) => item?.uuid).indexOf(senderId);

  if (index !== -1) {
    //聊天列表存在发送人的ID不需要新增列表
    chatList.value.splice(index, 1);
    chatList.value.unshift(data); // 置顶
  } else {
  }
});
socketInstance.on("add-friends", () => {
  globalStatus.value.hasNewFriends = true;
});
