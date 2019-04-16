import UpcomingService from '../api/Upcoming';

const Upcoming = new UpcomingService();

export const fetching = ({
    type: 'UPCOMING:FETCHING'
});

const error = ({
    type: 'UPCOMING:ERROR'
});

const fetchComplete = (data) => {
    return {
        type: 'UPCOMING:FETCH_COMPLETE',
        payload: data
    }
};

export const fetchingUpcoming = () => (dispatch) => {
    dispatch(fetching);

    Upcoming.get().then((response) => {

        if(!response) {
            dispatch(error);
            return;
        }
        dispatch(fetchComplete(response));
    }).catch(() => dispatch(error));
};

export const fetchSearch = (title) => (dispatch) => {

    dispatch(fetching);

    Upcoming.search(title).then((response) => {
        if(!response) {
            dispatch(error);
            return;
        }
        dispatch(fetchComplete(response));
    }).catch(() => dispatch(error));
};
