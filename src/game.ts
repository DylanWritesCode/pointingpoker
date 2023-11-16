import { store } from '@/store'
import { socket } from '@/socket';
import type { UserSession } from '@/types/UserSession';
import type { PokerSession } from '@/types/PokerSession';
import type { PeerUser } from '@/types/PeerUser';
import { watch } from 'vue';
import router from '@/router';

export default {
    CreateNewPokerSession(sessionName: string, playerName: string) {
        const newPlayer: UserSession = {
            SocketId: socket.id,
            UserName: playerName,
            Vote: undefined
        }

        store.StoreUser(newPlayer);
        socket.emit("RequestNewSession",  sessionName, playerName);
    },

    SendUserVote(vote: string | undefined){
        store.CurrentUser.Vote = vote;
        
        socket.emit("UserVoted", store.CurrentSession.SessionId, store.CurrentUser.Vote);
    },

    JoinSession(sessionId:string, userName: string){
        socket.emit("JoinSession", sessionId, userName);
    },

    LeaveSession(){
        store.StoreSession(undefined);
        socket.emit("LeaveSession", this.CurrentSession.PokerId);
    }
}

socket.on("EstablishPokerSession", (peers:Array<PeerUser>) => {
    const firstUser = peers[0];
    const newSession: PokerSession = {
        SessionId: firstUser.PokerId,
        SessionName: firstUser.PokerName,
        SessionUsers: peers
    }
    store.StoreSession(newSession);
});

socket.on("UserJoinedSession", (peer:PeerUser) => {
    store.AddUserToSession(peer);
});

socket.on("UserLeftSession", (peer:PeerUser) => {
    store.RemoveUserFromSession(peer);
})

socket.on("UserVoted", (peer:PeerUser) => {
    store.UpdatePeer(peer);
});