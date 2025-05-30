import React from 'react';
import { Calendar, Globe, Plus, Users } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { applyFilters } from '../../features';
import { resetFilters } from '../../features/videoFilter/videoFilter';
import { UserReduxRootState, UserVideoFilterFromProps } from '../../types';
import { toast } from 'react-toastify';

// Define the shape of our form data

interface VideoFiltersProps {
    showFilters: boolean;
}

const VideoFilters: React.FC<VideoFiltersProps> = ({ showFilters }) => {
    const dispatch = useDispatch();
    const userVideoFilter = useSelector((state: UserReduxRootState) => state.videoFilters);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<UserVideoFilterFromProps>({
        defaultValues: {
            country: 'any',
            age: 'any',
            gender: 'any',
            isStrict: "false",
        }
    });

    const onSubmit = (data: UserVideoFilterFromProps) => {
        console.log(typeof data.isStrict);

        dispatch(applyFilters({
            age: data.age, // this is not just the age this is the age range like 20-30;
            country: data.country,
            gender: data.gender,
            isStrict: data.isStrict === "true" ? true : false
        }));
        toast.success("filter applied now you can call.");
    };

    const handleReset = () => {
        reset();
        dispatch(resetFilters());
        toast.success("filter reset.");
    };

    const genders = ["any", "Male", "Female", "Non-binary", "Bubble-tea"]


    return (
        <div className={`chime-filter-panel ${showFilters ? 'chime-filter-panel-visible' : ''}`}>
            <form onSubmit={handleSubmit(onSubmit)} className="chime-filter-content">
                <div className="chime-filter-group">
                    <label htmlFor="country" className="chime-filter-label">
                        <Globe size={16} className="chime-filter-icon" />
                        Country:   <span className='chime-mode'>{userVideoFilter.country}</span>
                    </label>
                    <select id="country" {...register('country')} className="chime-filter-select">
                        <option value="any">Any Country</option>
                        <option value="us">United States</option>
                        <option value="uk">United Kingdom</option>
                        <option value="ca">Canada</option>
                        <option value="au">Australia</option>
                        <option value="de">Germany</option>
                        <option value="fr">France</option>
                        <option value="jp">Japan</option>
                        <option value="br">Brazil</option>
                        <option value="in">India</option>
                    </select>
                </div>

                <div className="chime-filter-group">
                    <label htmlFor="ageRange" className="chime-filter-label">
                        <Calendar size={16} className="chime-filter-icon" />
                        Age Range: <span className='chime-mode'>{userVideoFilter.age}</span>
                    </label>
                    <select id="ageRange" {...register('age')} className="chime-filter-select">
                        <option value="any">Any Age</option>
                        <option value="18-25">18-25</option>
                        <option value="26-35">26-35</option>
                        <option value="36-45">36-45</option>
                        <option value="46-55">46-55</option>
                        <option value="55+">55+</option>
                    </select>
                </div>

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
                    <button type="button" onClick={handleReset} className="chime-filter-reset">
                        Reset
                    </button>
                    <button type="submit" className="chime-filter-apply">
                        Apply Filters
                    </button>
                </div>
            </form>
        </div>
    );
};

export default VideoFilters;
