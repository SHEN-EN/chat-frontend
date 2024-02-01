import { ref } from "vue";
import { defineStore } from "pinia";
import { useIpcRenderer } from "@/hooks/useIpcRenderer";
const { sendEvent, invokeEvent } = useIpcRenderer();
import type { userInfo } from "@/types/global";
export const useGlobalStore = defineStore("global", () => {
  const authorization = ref("");

  const setAuthorization = (value: string) => {
    authorization.value = value;
    sendEvent("setStore", {
      key: "authorization",
      value: value,
    });
  };

  const user = ref<Partial<userInfo>>({});

  const setUserInfo = (value: userInfo) => {
    user.value = value;
    localStorage.setItem('userInfo', JSON.stringify(value))

    // sendEvent("setStore", {
    //   key: "userInfo",
    //   value,
    // });
  };

  const getUserInfo =  (): userInfo => {
    const userInfo = localStorage.getItem('userInfo')
    return JSON.parse(userInfo!)
    // return await invokeEvent("getStore", "userInfo");
  };

  const globalModal = ref({
    addFriends:false,
    editInfo:false
  });

  const setGlobalModal = <T extends keyof typeof globalModal.value>(key:T,value:boolean) => {
    globalModal.value[key] = value;
  }
  
  const globalStatus = ref({
    hasNewFriends:false,
    notificationNum:0,
  })

  return {
    authorization,
    setAuthorization,
    user,
    setUserInfo,
    getUserInfo,
    globalModal,
    setGlobalModal,
    globalStatus
  };
});
