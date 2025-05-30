import { createSlice } from "@reduxjs/toolkit";
import { UserVideoFilter } from "../../types";



const initialState: UserVideoFilter = {
    age: "any",
    country: "any",
    gender: "any",
    isStrict: false,
}


const videoFilterSlice = createSlice({
    name: "video-filter",
    initialState,
    reducers: {
        applyFilters: (state, action) => {
            state.age = action.payload.age;
            state.country = action.payload.country;
            state.gender = action.payload.gender;
            state.isStrict = action.payload.isStrict;
        },

        resetFilters: (state) => {
            state.age = "any";
            state.country = "any";
            state.gender = "any";
            state.isStrict = false;
        }
    }
});


const { applyFilters, resetFilters } = videoFilterSlice.actions;
const videoFilterReducer = videoFilterSlice.reducer;
export default videoFilterReducer;
export { applyFilters, resetFilters }
