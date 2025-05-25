import { useContext } from "react";
import { AppContext } from "/src/contexts/AppContext.jsx";

export const useAppContext = () => useContext(AppContext);
