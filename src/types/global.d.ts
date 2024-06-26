export type userInfo = {
    uuid: string;
    account: string;
    username: string;
    avatar:string;  
    birthday:number;
    description:string;
    sex:string;
};
export type fileInfo {
    name:string;
    size:number;
    type:string;
}
export type chatDataType = {
    data: any,
    time: number,
    uuid: string,
    messageType:'file' | 'text'
    fileInfo?:fileInfo
}
export type chatListType = {
    time: number,
    uuid:string,
    username:string,
    data:any
    avatar:string
    unreadnums:number
    uuid:string
}
export type menuItem={
    name: string
    icon:? string
    callback:?Function
    args: any
}