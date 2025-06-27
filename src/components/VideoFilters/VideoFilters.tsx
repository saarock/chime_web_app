
// Import all the necessary dependencies here
import React from 'react';
import "../../styles/components/VideoFilters.css";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../types';


// Define the shape of our form data
interface VideoFiltersProps {
    showFilters: boolean;
}

const VideoFilters: React.FC<VideoFiltersProps> = ({ showFilters }) => {
    const dispatch = useDispatch();
    const userVideoFilter = useSelector((state: RootState) => state.userVideoFilters);
    return (
        <div className={`chime-filter-panel ${showFilters ? 'chime-filter-panel-visible' : ''}`}>
            <div className="chime-filter-form-child">
                <div className="chime-form-group">
                    <label htmlFor="">age</label>
                    <select name="age" id="chime-select" className='chime-select'>
                        <option value={18}>18 - 25</option>
                        <option value={26}>26 - 40</option>
                        <option value={41}>40+</option>
                    </select>
                </div>

                <div className="chime-form-group">
                    <label htmlFor="">country</label>
                    <select name="age" id="chime-select" className='chime-select'>
                        <option value={18}>18 - 25</option>
                        <option value={26}>26 - 40</option>
                        <option value={41}>40+</option>
                    </select>
                </div>


                <div className="chime-form-group">
                    <label htmlFor="">gender</label>
                    <select name="age" id="chime-select" className='chime-select'>
                        <option value={18}>18 - 25</option>
                        <option value={26}>26 - 40</option>
                        <option value={41}>40+</option>
                    </select>
                </div>

            </div>

        </div>
    );
};

export default VideoFilters;


