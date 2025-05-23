// Import all the necessary dependencies here

import { Layout, Maximize2, Minimize2, ZoomIn, ZoomOut } from "lucide-react"
import React from "react";


interface VideoAdvanceControllerProps {
    toggleMaximize: () => void;
    isMaximized: boolean;
    increaseZoom: () => void;
    decreaseZoom: () => void;
    cycleLayout: () => void;
    layout: string;
}
const VideoAdvanceController: React.ComponentType<VideoAdvanceControllerProps> = (
    {
        toggleMaximize,
        isMaximized,
        increaseZoom,
        decreaseZoom,
        cycleLayout,
        layout,
    }
) => {
    return (
        <div className={`advanced-controls`}>
            <button
                onClick={toggleMaximize}
                className="advanced-control-button"
                aria-label={isMaximized ? "Minimize" : "Maximize"}
            >
                {isMaximized ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>

            <button onClick={increaseZoom} className="advanced-control-button" aria-label="Zoom in">
                <ZoomIn size={20} />
            </button>

            <button onClick={decreaseZoom} className="advanced-control-button" aria-label="Zoom out">
                <ZoomOut size={20} />
            </button>

            <button onClick={cycleLayout} className="advanced-control-button" aria-label="Change layout">
                <Layout size={20} />
                <span className="layout-name">{layout.replace(/-/g, " ")}</span>
            </button>
        </div>
    )
}

export default VideoAdvanceController