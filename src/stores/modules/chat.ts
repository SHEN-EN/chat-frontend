import { ref } from "vue";
import type { chatDataType, chatListType } from "@/types/global";
import { defineStore } from "pinia";
export const useChatStore = defineStore("chat", () => {
  const chatData = ref<Partial<chatDataType[]>>([]);
  const setChatData = (value: chatDataType) => {
    chatData.value.push(value);
  };

  const chatList = ref<Partial<chatListType[]>>([]);
  const setChatList = (value:chatListType) => {
    chatList.value.push(value);
  };
  return { chatData, setChatData, chatList, setChatList };
});
