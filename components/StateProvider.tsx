import { createContext, useContext, useReducer } from "react";
import { eventsReducer } from "../reducers/events.reducer";
import { ShowtimeEvent, Action as ShowtimeEventAction } from "../types/Event";

export const AppContext = createContext(undefined);
AppContext.displayName = "AppContext";

type LocalStorageEvent = Pick<ShowtimeEvent, "id" | "name"> & {
    startDate: string;
    endDate: string;
};

const mapEventDateStringsToJsDates = (events: LocalStorageEvent[] | undefined) => {
    if (!events) return [];
    return events.map((event) => ({
        ...event,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate),
    }));
};

type AppState = {
    events: ShowtimeEvent[];
};

type LocalStorageState = {
    events: LocalStorageEvent[] | undefined;
};

const getLocalStorage = (): AppState | undefined => {
    if (typeof localStorage === "undefined") return;

    const state: LocalStorageState = JSON.parse(localStorage.getItem("showtimeState"));

    if (!state) return;

    return {
        ...state,
        events: mapEventDateStringsToJsDates(state.events),
    };
};

const mainReducer = ({ events }, action: ShowtimeEventAction) => ({
    events: eventsReducer(events, action),
});

const initialState = getLocalStorage() || {
    events: [],
};

const StateProvider: React.FunctionComponent = ({ children }) => {
    const [state, dispatch] = useReducer(mainReducer, initialState);

    return <AppContext.Provider value={[state, dispatch]}>{children}</AppContext.Provider>;
};

export const useAppContext = (): [AppState, React.Dispatch<ShowtimeEventAction>] =>
    useContext(AppContext);

export const LocalStoragePersistor: React.FunctionComponent = () => {
    if (typeof localStorage === "undefined") return null;

    const updateLocalStorage = ([state]): React.ReactNode => {
        localStorage.setItem("showtimeState", JSON.stringify(state));
        return null;
    };
    return <AppContext.Consumer>{updateLocalStorage}</AppContext.Consumer>;
};

export default StateProvider;
