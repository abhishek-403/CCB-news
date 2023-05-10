import { configureStore } from "@reduxjs/toolkit";
import utilsReducer from './slices/UtilsSlice'

export default configureStore({
    reducer:{
        utilsReducer
        
    }
})