// Import all the necessary dependencies here
import React from 'react';
import "../../styles/components/VideoFilters.css";
import { countries, RootState, VideoFiltersProps } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { addAge, addCountry, addGender, resetFilters } from '../../features/videoFilter/videoFilter';
import { useAuth } from '../../hooks';
import Button from '../Button/Button';
import { RefreshCw } from 'lucide-react';

const VideoFilters: React.FC<VideoFiltersProps> = ({ showFilters }) => {
    const dispatch = useDispatch();
    const filter = useSelector((state: RootState) => state.videoFilters);
    const { user } = useAuth();

    // Use user data if available; otherwise fallback to Redux filter
    const selectedAge = (filter.age && filter.age !== "any") ? filter.age : user?.age || "";
    const selectedCountry = (filter.country && filter.country !== "any") ? filter.country : user?.country || "";
    const selectedGender = (filter.gender && filter.gender !== "any") ? filter.gender : user?.gender || "";



    return (
        <div className={`chime-filter-panel ${showFilters ? 'chime-filter-panel-visible' : ''}`}>
            <div className="chime-filter-form-child">

                {/* Age filter dropdown */}
                <div className="chime-form-group">
                    <label htmlFor="age-select">
                        My age:{" "}
                        <span className='chime-imp-details'>
                            {selectedAge ? `${selectedAge}+` : "Not set"}
                        </span>
                    </label>
                    <select
                        name="age"
                        id="age-select"
                        className='chime-select'
                        onChange={(e) => dispatch(addAge(e.target.value))}
                        value={filter.age || ""}
                    >
                        <option value="">-- Select Age --</option>
                        <option value={18}>18 - 25</option>
                        <option value={26}>26 - 40</option>
                        <option value={41}>40+</option>
                    </select>
                </div>

                {/* Country filter dropdown */}
                <div className="chime-form-group">
                    <label htmlFor="country">
                        I'm from:{" "}
                        <span className="chime-imp-details">
                            {selectedCountry || "Not set"}
                        </span>
                    </label>
                    <select
                        id="country"
                        className="chime-select"
                        onChange={(e) => dispatch(addCountry(e.target.value))}
                        value={filter.country || ""}
                        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    >
                        <option value="">-- Choose a country --</option>
                        {countries.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Gender filter dropdown */}
                <div className="chime-form-group">
                    <label htmlFor="gender-select">
                        I am:{" "}
                        <span className="chime-imp-details">
                            {selectedGender || "Not set"}
                        </span>
                    </label>
                    <select
                        name="gender"
                        id="gender-select"
                        className='chime-select'
                        onChange={(e) => dispatch(addGender(e.target.value))}
                        value={filter.gender || ""}
                    >
                        <option value="">-- Select Gender --</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </select>
                </div>


            </div>

            <div className='chime-filter-btns'>
                <Button
                    onClick={() => {
                        dispatch(resetFilters());
                    }}
                >
                    <RefreshCw className="w-4 h-4" />
                    Reset Filters
                </Button>

            </div>

        </div>
    );
};

export default VideoFilters;
