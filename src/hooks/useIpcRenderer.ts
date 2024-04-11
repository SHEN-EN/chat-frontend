const { ipcRenderer } = require("electron");
export const useIpcRenderer = () => {
  const sendEvent = <T>(event: string, arg?: T) => {
    if (!event) return;
     ipcRenderer.send(event, arg);
     console.log(ipcRenderer.send(event, arg));
     
  };
  const receiveEvent = (event: string, cb?: Function) => {
    if (!event) return;
    return ipcRenderer.on(event, cb);
  };
  const invokeEvent = <T>(event: string,arg?:T) => {
    if (!event) return;
    return ipcRenderer.invoke(event,arg);
  };
  return { sendEvent, receiveEvent, invokeEvent };
};
