// Import all the necessary dependencies here
import React from "react";
import "../../styles/components/VideoFilters.css";
import { countries, genders, RootState, VideoFiltersProps } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import {
  addAge,
  addCountry,
  addGender,
  resetFilters,
} from "../../features/videoFilter/videoFilter";
import { useAuth } from "../../hooks";
import Button from "../Button/Button";
import { RefreshCw } from "lucide-react";
import Select from "../Select/Select";

const VideoFilters: React.FC<VideoFiltersProps> = ({ showFilters }) => {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.videoFilters);
  const { user } = useAuth();

  // Use user data if available; otherwise fallback to Redux filter
  const selectedAge =
    filter.age && filter.age !== "any" ? filter.age : user?.age || "";
  const selectedCountry =
    filter.country && filter.country !== "any"
      ? filter.country
      : user?.country || "";
  const selectedGender =
    filter.gender && filter.gender !== "any"
      ? filter.gender
      : user?.gender || "";

  return (
    <div
      className={`chime-filter-panel ${showFilters ? "chime-filter-panel-visible" : ""}`}
    >
      <div className="chime-filter-form-child">
        {/* Age filter dropdown */}
        <div className="chime-form-group">
          <label htmlFor="age-select">
            My age:{" "}
            <span className="chime-imp-details">
              {selectedAge ? `${selectedAge}+` : "Not set"}
            </span>
          </label>
          <Select
            name="age"
            id="age-select"
            className="chime-select"
            onChange={(e) => dispatch(addAge(e.target.value))}
            value={filter.age || ""}
            label="Age"
            extraOptions={[
              {
                lable: "18 - 25",
                value: 18,
              },
              {
                lable: "26 - 40",
                value: 26,
              },
              {
                lable: "40+",
                value: 40,
              },
            ]}
          />
        </div>

        {/* Country filter dropdown */}
        <div className="chime-form-group">
          <label htmlFor="country">
            I'm from:{" "}
            <span className="chime-imp-details">
              {selectedCountry || "Not set"}
            </span>
          </label>
          <Select
            id="country-select"
            className="chime-select"
            onChange={(e) => dispatch(addCountry(e.target.value))}
            value={filter.country || ""}
            options={[...countries]}
            label="Country"
          />
        </div>

        {/* Gender filter dropdown */}
        <div className="chime-form-group">
          <label htmlFor="gender-select">
            I am:{" "}
            <span className="chime-imp-details">
              {selectedGender || "Not set"}
            </span>
          </label>
          <Select
            name="gender"
            id="gender-select"
            className="chime-select"
            onChange={(e) => dispatch(addGender(e.target.value))}
            value={filter.gender || ""}
            label="Gender"
            options={[...genders]}
          />
        </div>
      </div>

      <div className="chime-filter-btns">
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
