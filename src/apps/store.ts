// Import all necessary dependencies from react-redux-toolkit and features folder to maintain the code
import { configureStore } from "@reduxjs/toolkit";
import { socketReducer, userReducer } from "./index";

// Create the store to store all the states
const store = configureStore({
    reducer: {
        // Add the generated reducers [key]: [value]
        auth: userReducer,
        socket: socketReducer,
    }
});


// export the store to provide the provider main.tsx file
export type AppDispatch = typeof store.dispatch
export default store;