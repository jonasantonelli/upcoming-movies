import { FETCHING, ERROR, FETCH_COMPLETE }  from '../constants/upcoming';

const schema = {
    isLoading: false,
    isError: false,
    totalResults: 0,
    totalPages: 0,
    result: []
};

export default (state = schema, action) => {
    switch (action.type) {
        case FETCHING:
            return {
                ...state,
                isLoading: true
            };

        case ERROR:
            return {
                ...state,
                isError: true,
                isLoading: false
            };

        case FETCH_COMPLETE:
            return {
                ...state,
                isLoading: false,
                isError: false,
                result: action.payload.result,
                totalPages: +action.payload.totalPages,
                totalResults: +action.payload.totalResults,
            };

        default:
            return state
    }
}