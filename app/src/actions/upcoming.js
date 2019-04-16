import UpcomingService from '../api/Upcoming';

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

    debugger;

    dispatch(fetching);

    const Upcoming = new UpcomingService();

    Upcoming.get().then((response) => {

        if(!response) {
            dispatch(error);
            return;
        }
        dispatch(fetchComplete(response));
    }).catch(() => dispatch(error));
};
