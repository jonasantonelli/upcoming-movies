import { FETCHING, ERROR, FETCH_COMPLETE }  from '../constants/upcoming';
import UpcomingService from '../api/Upcoming';

const Upcoming = new UpcomingService();

export const fetching = ({
    type: FETCHING
});

const error = ({
    type: ERROR
});

const fetchComplete = (data, page = 1, search = '') => {
    return {
        type: FETCH_COMPLETE,
        payload: data,
        page,
        search
    }
};

export const fetchingUpcoming = (page) => (dispatch) => {
    dispatch(fetching);

    Upcoming.get(page).then((response) => {

        if(!response) {
            dispatch(error);
            return;
        }

        dispatch(fetchComplete(response, page));
    }).catch(() => dispatch(error));
};

export const fetchSearch = (title, page) => (dispatch) => {

    dispatch(fetching);

    Upcoming.search(title, page).then((response) => {
        if(!response) {
            dispatch(error);
            return;
        }
        dispatch(fetchComplete(response, page, title));
    }).catch(() => dispatch(error));
};
