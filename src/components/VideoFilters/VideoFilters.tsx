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




/**
 * For the future use
 */
/**
 *  <form onSubmit={handleSubmit(onSubmit)} className="chime-filter-content">
                <div className="chime-filter-group">
                    <label htmlFor="gender" className="chime-filter-label">
                        <Users size={16} className="chime-filter-icon" />
                        Gender: <span className='chime-mode'>{userVideoFilter.gender}</span>
                    </label>
                    <select id="gender" {...register('gender')} className="chime-filter-select">
                        {genders.map((gender) => (
                            <option key={gender} value={gender}>
                                {gender}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="chime-filter-group">
                    <label htmlFor="gender" className="chime-filter-label">
                        <Plus size={16} className="chime-filter-icon" />
                        Mode: <span className='chime-mode'>{userVideoFilter.isStrict ? "Strict" : "Non-strict"}</span>
                    </label>
                    <select id="gender" {...register('isStrict')} className="chime-filter-select">
                        <option value='false'>Non-strict</option>
                        <option value='true'>Strict</option>
                    </select>
                </div>

                <div className="chime-filter-actions">
                    <Button type="button" onClick={handleReset} className="chime-filter-reset">
                        Reset
                    </Button>
                    <Button type="submit" className="chime-filter-apply">
                        Apply Filters
                    </Button>
                </div>
            </form>
 */