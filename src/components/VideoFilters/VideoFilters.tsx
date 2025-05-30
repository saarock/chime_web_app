import { Calendar, Globe, Users } from 'lucide-react'
import React from 'react'


interface VideoFiltersProps {
    showFilters: boolean
}
const VideoFilters: React.ComponentType<VideoFiltersProps> = ({ showFilters }) => {


    return (
        < div className={`chime-filter-panel ${showFilters ? "chime-filter-panel-visible" : ""}`
        }>
            <div className="chime-filter-content">
                <div className="chime-filter-group">
                    <label className="chime-filter-label">
                        <Globe size={16} className="chime-filter-icon" />
                        Country
                    </label>
                    <select className="chime-filter-select">
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
                    <label className="chime-filter-label">
                        <Calendar size={16} className="chime-filter-icon" />
                        Age Range
                    </label>
                    <select className="chime-filter-select">
                        <option value="any">Any Age</option>
                        <option value="18-25">18-25</option>
                        <option value="26-35">26-35</option>
                        <option value="36-45">36-45</option>
                        <option value="46-55">46-55</option>
                        <option value="55+">55+</option>
                    </select>
                </div>

                <div className="chime-filter-group">
                    <label className="chime-filter-label">
                        <Users size={16} className="chime-filter-icon" />
                        Gender
                    </label>
                    <select className="chime-filter-select">
                        <option value="any">Any Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="chime-filter-actions">
                    <button className="chime-filter-reset">Reset</button>
                    <button className="chime-filter-apply">Apply Filters</button>
                </div>
            </div>
        </div >
    )
}

export default VideoFilters