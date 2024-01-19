import socketInstance from "./index";
import { useChatStore } from "@/stores/modules/chat";
const { setChatData, setChatList } = useChatStore();
socketInstance.on("private-chat", (data) => {
  setChatData(data);
});
