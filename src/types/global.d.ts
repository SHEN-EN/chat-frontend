export type userInfo = {
    uuid: string;
    account: string;
    username: string;
    avatar:string;  
    birthday:number;
    description:string;
    sex:string;
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
export enum SQLiteEvent = INSERT | UPDATE | DELETE | SELECT 