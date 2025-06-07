// Import all the necessary dependencies here

import { Layout, Maximize2, Minimize2, ZoomIn, ZoomOut } from "lucide-react";
import React from "react";
import "../../styles/components/VideoAdvanceController.css";
import Button from "../Button/Button";
import { VideoAdvanceControllerProps } from "../../types";



const VideoAdvanceController: React.ComponentType<
  VideoAdvanceControllerProps
> = ({
  toggleMaximize,
  isMaximized,
  increaseZoom,
  decreaseZoom,
  cycleLayout,
}) => {
    return (
      <div className="chime-advanced-controls">
        <Button
          onClick={toggleMaximize}
          className="chime-advanced-control-button"
          aria-label={isMaximized ? "Minimize" : "Maximize"}
        >
          {isMaximized ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
        </Button>

        <Button
          onClick={increaseZoom}
          className="chime-advanced-control-button"
          aria-label="Zoom in"
        >
          <ZoomIn size={20} />
        </Button>

        <Button
          onClick={decreaseZoom}
          className="chime-advanced-control-button"
          aria-label="Zoom out"
        >
          <ZoomOut size={20} />
        </Button>

        <Button
          onClick={cycleLayout}
          className="chime-advanced-control-button"
          aria-label="Change layout"
        >
          <Layout size={20} />
          {/* <span className="chime-layout-name">{layout.replace(/-/g, " ")}</span> */}
        </Button>
      </div>

    );
  };

export default VideoAdvanceController;
