import { createContext, useContext, useReducer } from "react";
import { eventsReducer } from "../reducers/events.reducer";

export const StateContext = createContext();
StateContext.displayName = "StateContext";

const mapEventDateStringsToJsDates = (events) =>
  events.map((event) => ({
    ...event,
    startDate: new Date(event.startDate),
    endDate: new Date(event.endDate),
  }));

const getLocalStorage = () => {
  if (typeof localStorage === "undefined") return;

  const state = JSON.parse(localStorage.getItem("showtimeState"));

  if (!state) return;

  return {
    ...state,
    events: mapEventDateStringsToJsDates(state.events),
  };
};

const mainReducer = ({ events }, action) => ({
  events: eventsReducer(events, action),
});

const initialState = getLocalStorage() || {
  events: [],
};

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateValue = () => useContext(StateContext);

export const LocalStoragePersistor = () => {
  if (typeof localStorage === "undefined") return null;

  const updateLocalStorage = ([state]) => {
    localStorage.setItem("showtimeState", JSON.stringify(state));
  };
  return <StateContext.Consumer>{updateLocalStorage}</StateContext.Consumer>;
};

export default StateProvider;
