import { reactive } from 'vue'
import type { PokerSession } from './types/PokerSession';
import type { UserSession } from './types/UserSession';
import type { PeerUser } from './types/PeerUser';
import { socket } from '@/socket';


export const store = reactive({
    CurrentSession: undefined as PokerSession | undefined,
    CurrentUser: undefined as UserSession | undefined,

    StoreUser(user:UserSession | undefined){
        this.CurrentUser = user;
    },

    StoreSession(session:PokerSession | undefined){
        this.CurrentSession = session;
    },

    UpdateUserVote(vote:string | undefined){
        if(this.CurrentUser == undefined || this.CurrentSession == undefined) return;

        if(vote?.trim() === "") vote = undefined;
        this.CurrentUser.Vote = vote;
        
        socket.emit("UserVoted", this.CurrentSession.SessionId, this.CurrentUser.Vote);
    },

    AddUserToSession(user:PeerUser){
        if(this.CurrentSession == undefined) return;
        this.CurrentSession.SessionUsers.push(user);
    },
    RemoveUserFromSession(user:PeerUser){
        if(this.CurrentSession == undefined) return;

        for(let i = 0; i < this.CurrentSession.SessionUsers.length; i++){
            const currentUser = this.CurrentSession.SessionUsers[i];
            if(currentUser.UserId == user.UserId) {
                this.CurrentSession.SessionUsers.splice(i);
                console.log(`Spliced ${i}`)
                break;
            }
        }
    },
    UpdatePeer(user:PeerUser) {
        if(this.CurrentSession == undefined) return;
        
        for(let i = 0; i < this.CurrentSession.SessionUsers.length; i++) {
            const peer = this.CurrentSession.SessionUsers[i];

            if(peer.UserId == user.UserId) {
                this.CurrentSession.SessionUsers[i] = user;
                break;
            }
        }
    },
    UpdateAllPeers(peers:Array<PeerUser>) {
        if(this.CurrentSession != null){
            this.CurrentSession.SessionUsers = peers;
        }
    },
    ResetVotes(){
        if(this.CurrentUser != null) {
            this.CurrentUser.ShowCards = false;
            this.CurrentUser.Vote = undefined;
        }
    },
    ShowCards() {
        if(this.CurrentUser != null){
            this.CurrentUser.ShowCards = true;
        }
    }
})