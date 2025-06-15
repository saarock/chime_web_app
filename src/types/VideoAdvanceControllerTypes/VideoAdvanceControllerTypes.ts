export interface VideoAdvanceControllerProps {
    toggleMaximize: () => void;
    isMaximized: boolean;
    increaseZoom: () => void;
    decreaseZoom: () => void;
    cycleLayout: () => void;
    layout: string;
}