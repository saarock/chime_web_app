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
        addAge: (state, action) => {
            state.age = action.payload;
        },
        addCountry: (state, action) => {
            state.country = action.payload;
        },
        addGender: (state, action) => {
            state.gender = action.payload;
        },

        resetFilters: (state) => {
            state.age = "any";
            state.country = "any";
            state.gender = "any";
            state.isStrict = false;
        }
    }
});


const { applyFilters, resetFilters, addAge, addCountry, addGender } = videoFilterSlice.actions;
const videoFilterReducer = videoFilterSlice.reducer;
export default videoFilterReducer;
export { applyFilters, resetFilters, addAge, addCountry, addGender }
