export type TabAction =
    | { type: 'OPEN_TAB'; payload: string }
    | { type: 'CLOSE_ALL_TABS' }
    | { type: 'CLOSE_ALL_EXCEPT'; payload: string }
    | { type: 'CLOSE_TAB'; payload: string }
    | { type: 'CLOSE_ALL_TABS_ONE_BY_ONE'; };


export interface TabState {
    openTabs: string[];
}

export const tabInitialState: TabState = {
    openTabs: [],
};

export const tabReducer = (state: TabState, action: TabAction): TabState => {
    switch (action.type) {
        case 'OPEN_TAB':
            return state.openTabs.includes(action.payload)
                ? state
                : { openTabs: [...state.openTabs, action.payload] };

        case 'CLOSE_ALL_TABS':
            return { openTabs: [] };

        case 'CLOSE_ALL_EXCEPT':
            return { openTabs: [action.payload] };
        case "CLOSE_TAB":
            return {
                openTabs: state.openTabs.filter(tab => tab !== action.payload)
            }
        case "CLOSE_ALL_TABS_ONE_BY_ONE":
            return {
                openTabs: state.openTabs.slice(1)
            }

        default:
            return state;
    }
};