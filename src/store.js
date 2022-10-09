import { configureStore } from "@reduxjs/toolkit";
import valueManagement from "./screens/TabScreen/valueManagement";

export const store = configureStore({
    reducer: {
        value: valueManagement
    },
})