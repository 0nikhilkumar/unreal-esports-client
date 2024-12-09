import { configureStore } from "@reduxjs/toolkit";
import loggedInReducer from './loggedUser'

const store = configureStore(
    {
        reducer:{
            isLogged : loggedInReducer
        }
    }
)

export default store