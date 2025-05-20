import { use, useContext } from 'react'
import { PeerContext } from '../providers'

const usePeer = () => {
    const chimePeerSyncContext = useContext(PeerContext);
    if (chimePeerSyncContext) {
        const { peer, createAnswer, createOffer, handleTrackEvent, remoteStream, sendStream, setRemoteAns } = chimePeerSyncContext;
        return { peer, createAnswer, createOffer, handleTrackEvent, remoteStream, sendStream, setRemoteAns }
    } else {
        return null;

    }
}

export default usePeer