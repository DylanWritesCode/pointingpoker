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
            IsSpectator: false,
            Vote: undefined,
            ShowCards: false
        }

        store.StoreUser(newPlayer);

        console.log(`Establishing new Poker Session ${sessionName}`);
        socket.emit("RequestNewSession",  sessionName, playerName);
    },

    SendUserVote(vote: string | undefined){
        if(store.CurrentUser != undefined 
            && store.CurrentSession != undefined)
        {
            store.CurrentUser.Vote = vote;
            socket.emit("ServerVote", store.CurrentSession.SessionId, store.CurrentUser.Vote);
            console.log(`You (${store.CurrentUser.UserName}) submitted a vote.`);
        }
    },

    JoinSession(sessionId:string, userName: string, spectate:boolean){
        console.log(`Joining Poker Session id ${sessionId}`);
        socket.emit("JoinSession", sessionId, userName, spectate);
    },

    LeaveSession(){
        if(store.CurrentSession != undefined) {
            console.log(`Leaving poker session ${store.CurrentSession.SessionName}`);
            store.StoreSession(undefined);
            socket.emit("LeaveSession", store.CurrentSession.SessionId);
        }
    },

    RevealCards(){
        if(store.CurrentSession != undefined){
            socket.emit("RevealCardsForPlayers", store.CurrentSession.SessionId);
        }
    },

    ResetVote(){
        if(store.CurrentSession != undefined){
            socket.emit("ResetVoteForPlayers", store.CurrentSession.SessionId);
        }
    }
}

socket.on("EstablishPokerSession", (currentUser:PeerUser, peers:Array<PeerUser>) => {

    const newUser: UserSession = {
        SocketId: socket.id,
        UserName: currentUser.UserName,
        IsSpectator: currentUser.IsSpectator,
        Vote: currentUser.Vote,
        ShowCards: false
    }
    store.StoreUser(newUser);

    const firstUser = peers[0];
    const newSession: PokerSession = {
        SessionId: firstUser.PokerId,
        SessionName: firstUser.PokerName,
        SessionUsers: peers
    }
    
    store.StoreSession(newSession);
    console.log(`Establishing poker session ${firstUser.PokerId}`);
});

socket.on("UserJoinedSession", (peer:PeerUser) => {
    store.AddUserToSession(peer);
    console.log(`peer ${peer.UserName} joined the poker session.`);
});

socket.on("UserLeftSession", (peer:PeerUser) => {
    store.RemoveUserFromSession(peer);
    console.log(`peer ${peer.UserName} left the poker session.`);
})

socket.on("UserVoted", (peer:PeerUser) => {
    store.UpdatePeer(peer);
    console.log(`peer ${peer.UserName} submitted their vote.`);
});

socket.on("RevealVotes", () => {
    store.ShowCards();
    console.log('Cards revealed!');
});

socket.on("ResetVotes", (peers:Array<PeerUser>) => {
    store.UpdateAllPeers(peers);
    store.ResetVotes();
    console.log('Votes Reset');
});