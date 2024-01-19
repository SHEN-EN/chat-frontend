export type userInfo = {
    uuid: string;
    account: string;
    username: string;
};
export type chatDataType = {
    data: any,
    time: number,
    senderId: string,
}
export type chatListType = {
    time: number,
    uuid:string,
    username:string,
    data:any
    avatar:string
}