import { AppContext } from '../contexts/AppContext.jsx';


export default function AppProvider({children}) {
    return (
        <AppContext.Provider value={null}>
            {children}
        </AppContext.Provider>
    )
}

