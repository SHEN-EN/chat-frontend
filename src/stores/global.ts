import { ref } from 'vue'
import { defineStore } from 'pinia'
import {useIpcRenderer} from '@/hooks/useIpcRenderer'
const { sendEvent } = useIpcRenderer()

export const useGlobalStore = defineStore('global', () => {
  const authorization = ref('')
  const setAuthorization = (value:string) => {
    authorization.value = value;
    sendEvent('setStore',{
        key:'authorization',
        value:value
    })
  }
  return {authorization,setAuthorization}
})