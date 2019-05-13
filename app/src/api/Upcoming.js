
const UPCOMING_URL = '/movies/upcoming';
const SEARCH_URL = '/movies';

class UpcomingService {
    get(page = 1) {
        return new Promise((resolve, reject) => {
            fetch(`${window.API_URL}${UPCOMING_URL}?page=${page}`, {
                method: 'GET',
            }).then((res) => {
                if(!res.ok){
                    reject();
                    return;
                }

                res.json().then((data) => {
                    if(!data){
                        reject();
                        return;
                    }
                    resolve(data);
                });

            }, (err) => {
                reject(err);
            });
        });
    }

    search(title = '', page = 1) {
        return new Promise((resolve, reject) => {
            fetch(`${window.API_URL}${SEARCH_URL}?query=${title}&page=${page}`, {
                method: 'GET',
            }).then((res) => {
                if(!res.ok){
                    reject();
                    return;
                }

                res.json().then((data) => {
                    if(!data){
                        reject();
                        return;
                    }
                    resolve(data);
                });

            }, (err) => {
                reject(err);
            });
        });
    }
}

export default UpcomingService;