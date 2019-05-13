
const DETAILS_URL = '/movies/';

class DetailsService {
    get(id) {
        return new Promise((resolve, reject) => {
            fetch(`${window.API_URL}${DETAILS_URL}${id}`, {
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

export default DetailsService;