import createNextState from 'immer'

export const createReducer = (initialState, actionsMap) => {
    return (state = initialState, action) => {
        return createNextState(state, (draft) => {
            const caseReducer = actionsMap[action.type];
            if (caseReducer) {
                return caseReducer(draft, action);
            }
            return draft;
        });
    };
};