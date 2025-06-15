
// Import all the necessary dependencies here
import React from 'react';
import "../../styles/components/VideoFilters.css";


// Define the shape of our form data
interface VideoFiltersProps {
    showFilters: boolean;
}

const VideoFilters: React.FC<VideoFiltersProps> = ({ showFilters }) => {
    // const dispatch = useDispatch();
    // const userVideoFilter = useSelector((state: UserReduxRootState) => state.videoFilters);
    return (
        <div className={`chime-filter-panel ${showFilters ? 'chime-filter-panel-visible' : ''}`}>
           <span className='chime-comming-soon'>🚧 <strong>Coming soon</strong></span>
        </div>
    );
};

export default VideoFilters;


