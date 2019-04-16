import { FETCHING, ERROR, FETCH_COMPLETE }  from '../constants/details';
import DetailsService from '../api/Details';

const Details = new DetailsService();

export const fetching = ({
    type: FETCHING
});

const error = ({
    type: ERROR
});

const fetchComplete = (data) => {
    return {
        type: FETCH_COMPLETE,
        payload: data
    }
};

export const fetchingDetails = (id) => (dispatch) => {
    dispatch(fetching);

    Details.get(id).then((response) => {

        if(!response) {
            dispatch(error);
            return;
        }
        dispatch(fetchComplete(response));
    }).catch(() => dispatch(error));
};
