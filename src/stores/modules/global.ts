import { ref } from "vue";
import { pinyin } from "pinyin-pro";
import { defineStore } from "pinia";
import friendRequestModel from "@/api/modules/friends";
import userRequestModel from "@/api/modules/user";
import type { userInfo } from "@/types/global";
export const useGlobalStore = defineStore("global", () => {
  const authorization = ref("");

  const setAuthorization = (value: string) => {
    authorization.value = value;
    localStorage.setItem("authorization", value);
  };

  const user = ref<Partial<userInfo>>({});

  const setUserInfo = (value: userInfo) => {
    user.value = value;
    localStorage.setItem("userInfo", JSON.stringify(value));
  };

  const getUserInfo = (): userInfo => {
    const userInfo = localStorage.getItem("userInfo");
    return JSON.parse(userInfo!);
  };

  const fetchUserInfo = async (): Promise<userInfo> => {
    const res = await userRequestModel.getInfo();
    setUserInfo(res.data);

    return res.data;
  };
  
  const globalModal = ref({
    addFriends: false,
    editInfo: false,
  });

  const setGlobalModal = <T extends keyof typeof globalModal.value>(
    key: T,
    value: boolean
  ) => {
    globalModal.value[key] = value;
  };

  const globalStatus = ref({
    hasNewFriends: false,
    notificationNum: 0,
  });

  const friendsList = ref<
    Partial<
      {
        uuid: string;
        username: string;
        avatar: string;
        account: string;
      }[]
    >
  >([]);

  const characterMap = ref({}) as any;

  const classifyCharacters = () => {
    characterMap.value = {};
    for (const character of friendsList.value) {
      const firstLetter = pinyin(character!.username)[0][0].toUpperCase();

      if (/^[A-Z]$/.test(firstLetter)) {
        if (characterMap.value[firstLetter]) {
          characterMap.value[firstLetter].push(character);
        } else {
          characterMap.value[firstLetter] = [character];
        }
      }
    }
  };

  const getFriendsList = async () => {
    const res = await friendRequestModel.getList(1);
    friendsList.value = res.data;
    classifyCharacters();
  };

  return {
    authorization,
    setAuthorization,
    user,
    setUserInfo,
    getUserInfo,
    globalModal,
    setGlobalModal,
    globalStatus,
    friendsList,
    getFriendsList,
    characterMap,
    fetchUserInfo,
  };
});
