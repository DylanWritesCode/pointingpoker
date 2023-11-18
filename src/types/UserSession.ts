export type UserSession = {
    SocketId: string,
    UserName:string,
    IsSpectator:boolean,
    Vote: string | undefined,
    ShowCards: boolean
}