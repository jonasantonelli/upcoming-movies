
const UPCOMING_URL = 'api/v1/movies/upcoming';

class UpcomingService {
    get() {
        return new Promise((resolve, reject) => {
            fetch(`${window.API_URL}${UPCOMING_URL}`, {
                method: 'GET',
            }).then((res) => {
                if(!res.ok){
                    reject({
                        status: res.status,
                        statusText: res.statusText
                    });
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