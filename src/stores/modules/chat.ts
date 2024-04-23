import { ref } from "vue";
import type { chatDataType, chatListType } from "@/types/global";
import { defineStore } from "pinia";
export const useChatStore = defineStore("chat", () => {
  const chatData = ref<Partial<chatDataType[]>>([]);

  const chatList = ref<Partial<chatListType[]>>([]);

  return { chatData, chatList };
});
