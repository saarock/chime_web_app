import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";

interface PeerContextType {
  peer: RTCPeerConnection | null;
  remoteStream: any;
  createOffer: () => Promise<RTCSessionDescriptionInit>;
  createAnswer: any;
  setRemoteAns: (ans: any) => Promise<void>;
  sendStream: any;
  handleTrackEvent: any;
}
export const PeerContext = React.createContext<PeerContextType | null>(null);

export const PeerProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [remoteStream, setRemoteStream] = useState(null);
  const peer = useMemo(
    () =>
      new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:global.stun.twilio.com:3478",
            ],
          },
        ],
      }),
    [],
  );

  const createOffer = async () => {
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);
    return offer;
  };

  const createAnswer = async (offer: any) => {
    await peer.setRemoteDescription(offer);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);
    return answer;
  };

  const setRemoteAns = async (ans: any) => {
    await peer.setRemoteDescription(ans);
  };

  const sendStream = async (stream: any) => {
    const tracks = stream.getTracks();
    for (const track of tracks) {
      peer.addTrack(track, stream);
    }
  };

  const handleTrackEvent = useCallback(
    (ev: any) => {
      const streams = ev.streams;

      setRemoteStream(streams[0]);
    },
    [peer],
  );

  useEffect(() => {
    peer.addEventListener("track", handleTrackEvent);

    return () => {
      peer.removeEventListener("track", handleTrackEvent);
    };
  }, [peer, handleTrackEvent]);

  return (
    <PeerContext.Provider
      value={{
        peer,
        remoteStream,
        createOffer,
        createAnswer,
        setRemoteAns,
        handleTrackEvent,
        sendStream,
      }}
    >
      {children}
    </PeerContext.Provider>
  );
};
