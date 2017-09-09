export const initialState = {
    open: false,
    mode: null
};

const modal = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_MODAL_MODE':
            return Object.assign({}, state, {
                open: true,
                mode: action.mode
            });
        case 'UPDATE_TRACK_NAME':
        case 'UPDATE_TRACK_COLOR':
        case 'DELETE_TRACK':
        case 'CLOSE_MODAL':
            return Object.assign({}, state, {
                open: false
            });
        default:
            return state;
    }
};

export { modal as default };
