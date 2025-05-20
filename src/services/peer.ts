interface IceServer {
  urls: string | string[];
  username?: string;
  credential?: string;
}

class PeerService {
  private _peer: RTCPeerConnection;
  private iceServers: IceServer[] = [
    { urls: "stun:stun.l.google.com:19302" },
    // Add fallback STUN servers
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
    // Add your TURN servers if available
    // {
    //   urls: "turn:your.turn.server.com",
    //   username: "username",
    //   credential: "password"
    // }
  ];

  constructor() {
    this._peer = this.createPeerConnection();
    this.setupEventListeners();
  }

  private createPeerConnection(): RTCPeerConnection {
    try {
      return new RTCPeerConnection({
        iceServers: this.iceServers,
        iceCandidatePoolSize: 10,
        bundlePolicy: 'max-bundle',
        rtcpMuxPolicy: 'require'
      });
    } catch (error) {
      console.error('Failed to create peer connection:', error);
      throw new Error('Failed to initialize WebRTC connection');
    }
  }

  private setupEventListeners(): void {
    this._peer.onicecandidateerror = (event) => {
      console.error('ICE candidate error:', event);
    };

    this._peer.onconnectionstatechange = () => {
      console.log('Connection state changed:', this._peer.connectionState);
    };

    this._peer.oniceconnectionstatechange = () => {
      console.log('ICE connection state changed:', this._peer.iceConnectionState);
    };

    this._peer.onsignalingstatechange = () => {
      console.log('Signaling state changed:', this._peer.signalingState);
    };
  }

  getPeer(): RTCPeerConnection {
    return this._peer;
  }

  async getOffer(): Promise<RTCSessionDescriptionInit> {
    try {
      const offer = await this._peer.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
        iceRestart: false
      });

      await this._peer.setLocalDescription(offer);
      return offer;
    } catch (error) {
      console.error('Error creating offer:', error);
      throw new Error('Failed to create offer');
    }
  }

  async getAnswer(offer: RTCSessionDescriptionInit): Promise<RTCSessionDescriptionInit> {
    try {
      await this._peer.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await this._peer.createAnswer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true
      });

      await this._peer.setLocalDescription(answer);
      return answer;
    } catch (error) {
      console.error('Error creating answer:', error);
      throw new Error('Failed to create answer');
    }
  }

  async setRemoteDescription(sessionDescription: RTCSessionDescriptionInit): Promise<void> {
    try {
      await this._peer.setRemoteDescription(new RTCSessionDescription(sessionDescription));
    } catch (error) {
      console.error('Error setting remote description:', error);
      throw new Error('Failed to set remote description');
    }
  }

  async addIceCandidate(candidate: RTCIceCandidateInit): Promise<void> {
    try {
      await this._peer.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      console.error('Error adding ICE candidate:', error);
      // Don't throw error as this might be non-fatal
    }
  }

  public resetPeer(): void {
    try {
      // Close existing connection
      this._peer.close();
      
      // Create new connection
      this._peer = this.createPeerConnection();
      this.setupEventListeners();
      
      console.log('Peer connection has been reset');
    } catch (error) {
      console.error('Error resetting peer connection:', error);
      throw new Error('Failed to reset peer connection');
    }
  }

  public async restartIce(): Promise<void> {
    try {
      const offer = await this._peer.createOffer({ iceRestart: true });
      await this._peer.setLocalDescription(offer);
    } catch (error) {
      console.error('Error restarting ICE:', error);
      throw new Error('Failed to restart ICE');
    }
  }
}

// Export a singleton instance
// export default new PeerService();