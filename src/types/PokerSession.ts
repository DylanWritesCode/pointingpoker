import type { UserSession } from "./UserSession"
import type { PeerUser } from "./PeerUser"

export type PokerSession = {
    SessionId:string,
    SessionName:string,
    SessionUsers:Array<PeerUser>
}