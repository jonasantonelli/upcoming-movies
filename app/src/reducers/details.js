const schema = {
    isLoading: false,
    isError: false,
    movie: {}
};

export default (state = schema, action) => {
    switch (action.type) {
        case 'DETAILS:FETCHING':
            return {
                ...state,
                isLoading: true
            };

        case 'DETAILS:ERROR':
            return {
                ...state,
                isError: true,
                isLoading: false
            };

        case 'DETAILS:FETCH_COMPLETE':
            return {
                ...state,
                movie: action.payload,
                isLoading: false,
                isError: false,
            };

        default:
            return state
    }
}