const schema = {
    isLoading: false,
    isError: false,
    totalResults: 0,
    totalPages: 0,
    results: []
};

export default (state = schema, action) => {
    switch (action.type) {
        case 'UPCOMING:FETCHING':
            return {
                ...state,
                isLoading: true
            };

        case 'UPCOMING:ERROR':
            return {
                ...state,
                isError: true,
                isLoading: false
            };

        case 'UPCOMING:FETCH_COMPLETE':
            return {
                ...state,
                isLoading: false,
                isError: false,
                results: action.payload.results,
                totalPages: +action.payload.totalPages,
                totalResults: +action.payload.totalResults,
            };

        default:
            return state
    }
}