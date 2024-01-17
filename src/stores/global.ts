import { ref } from "vue";
import { defineStore } from "pinia";
import { useIpcRenderer } from "@/hooks/useIpcRenderer";
const { sendEvent } = useIpcRenderer();
import type { userInfo } from '@/types/global'
export const useGlobalStore = defineStore("global", () => {
  const authorization = ref("");
  const setAuthorization = (value: string) => {
    authorization.value = value;
    sendEvent("setStore", {
      key: "authorization",
      value: value,
    });
  };

  const userInfo = ref<Partial<userInfo>>({});
  const setUserInfo = (value: userInfo) => {
    userInfo.value = value;
    sendEvent("setStore", {
        key: "userInfo",
        value,
      });
  };
  return { authorization, setAuthorization, userInfo, setUserInfo };
});
