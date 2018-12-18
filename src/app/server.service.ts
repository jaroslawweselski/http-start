import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import 'rxjs/Rx';
import {Observable} from 'rxjs';

@Injectable()
export class ServerService {

    constructor(private http: Http) {
    }

    storeServers(servers: any[]) {
        const headersList = new Headers({
            'Content-Type': 'application'
        });
        // return this.http.post(
        //     'https://projekt-64299.firebaseio.com/data.json',
        //     servers,
        //     {
        //       headers: headersList
        //     }
        // );

        return this.http.put(
            'https://projekt-64299.firebaseio.com/data.json',
            servers,
            {
                headers: headersList
            }
        );
    }

    getServers() {
        return this.http.get('https://projekt-64299.firebaseio.com/data')
            .map(
                (response: Response) => {
                    const data = response.json();
                    for (let item of data) {
                        item.name = 'SERVER_' + item.name;
                    }
                    return data;
                }
            )
            .catch(
                (error: Response) => {
                    console.log(error);
                    return Observable.throw('Something went wrong.');
                }
            );
    }

    getAppName() {
        return this.http.get('https://projekt-64299.firebaseio.com/appName.json')
            .map(
                (response: Response) => {
                    return response.json();
                }
            )
            .catch(
                (error: Response) => {
                    console.log(error);
                    return Observable.throw('Something went wrong.');
                }
            );
    }
}
