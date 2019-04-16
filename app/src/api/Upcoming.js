
const UPCOMING_URL = 'api/v1/movies/upcoming';
const SEARCH_URL = 'api/v1/movies';

class UpcomingService {
    get() {
        return new Promise((resolve, reject) => {
            fetch(`${window.API_URL}${UPCOMING_URL}`, {
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

    search(title = '') {
        return new Promise((resolve, reject) => {
            fetch(`${window.API_URL}${SEARCH_URL}?query=${title}`, {
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