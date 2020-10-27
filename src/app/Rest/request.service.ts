import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class RequestService {
    constructor(private rest: RestService) {}

    Elasticsearch() {
        return Observable.create((observer: Observer<any>) => {
            this.rest.sendRequest('GET', 'elasticsearch', null).subscribe(
                (value) => {
                    observer.next(value);
                },
                (error1) => observer.error(error1),
            );
        });
    }

    ElasticsearchStatus() {
        return Observable.create((observer: Observer<any>) => {
            this.rest
                .sendRequest('GET', 'elasticsearch_status', null)
                .subscribe(
                    (value) => {
                        observer.next(value);
                    },
                    (error1) => observer.error(error1),
                );
        });
    }

    Valiot() {
        return Observable.create((observer: Observer<any>) => {
            this.rest.sendRequest('GET', 'valiot', null).subscribe(
                (value) => {
                    observer.next(value);
                },
                (error1) => observer.error(error1),
            );
        });
    }

    ValiotStatus() {
        return Observable.create((observer: Observer<any>) => {
            this.rest.sendRequest('GET', 'valiot_status', null).subscribe(
                (value) => {
                    observer.next(value);
                },
                (error1) => observer.error(error1),
            );
        });
    }

    UserData() {
        return Observable.create((observer: Observer<any>) => {
            this.rest
                .sendRequestAPI('GET', 'authenticated_user', null)
                .subscribe(
                    (value) => {
                        observer.next(value);
                    },
                    (error1) => observer.error(error1),
                );
        });
    }

    UserLogout(Token) {
        return Observable.create((observer: Observer<any>) => {
            this.rest
                .sendRequestAPI('POST', 'user/logout', { token: Token })
                .subscribe(
                    (value) => {
                        observer.next(value);
                    },
                    (error1) => observer.error(error1),
                );
        });
    }

    Device() {
        return Observable.create((observer: Observer<any>) => {
            this.rest
                .sendRequestAPI('GET', 'valiot/station', null)
                .subscribe(
                    (value) => {
                        observer.next(value['Station']);
                    },
                    (error1) => observer.error(error1),
                );
        });
    }

    DeviceDelete(ID) {
        return Observable.create((observer: Observer<any>) => {
            this.rest
                .sendRequestAPI('DELETE', 'station/' + ID, null)
                .subscribe(
                    (value) => {
                        observer.next(value);
                    },
                    (error1) => observer.error(error1),
                );
        });
    }

    DeviceData() {
        return Observable.create((observer: Observer<any>) => {
            this.rest
                .sendRequestAPI('GET', 'all_data', null)
                .subscribe(
                    (value) => {
                        observer.next(value['Data']['Server']);
                    },
                    (error1) => observer.error(error1),
                );
        });
    }

    DeviceSMSRestart(Topic) {
        return Observable.create((observer: Observer<any>) => {
            this.rest
                .sendRequestAPI('GET', 'sms_restart_device/' + Topic, null)
                .subscribe(
                    (value) => {
                        observer.next(value);
                    },
                    (error1) => observer.error(error1),
                );
        });
    }

    DeviceMQTTRestart(Topic) {
        return Observable.create((observer: Observer<any>) => {
            this.rest
                .sendRequestAPI('GET', 'mqtt_restart_device/' + Topic, null)
                .subscribe(
                    (value) => {
                        observer.next(value);
                    },
                    (error1) => observer.error(error1),
                );
        });
    }
    // SERVER MAIN

    ValiotRestart() {
        return Observable.create((observer: Observer<any>) => {
            this.rest
                .sendRequest('POST', 'valiot_restart', {
                    request: 'valiot restart',
                })
                .subscribe(
                    (value) => {
                        observer.next(value);
                    },
                    (error1) => observer.error(error1),
                );
        });
    }

    ElasticsearchRestart() {
        return Observable.create((observer: Observer<any>) => {
            this.rest
                .sendRequest('POST', 'elasticsearch_restart', {
                    request: 'els restart',
                })
                .subscribe(
                    (value) => {
                        observer.next(value);
                    },
                    (error1) => observer.error(error1),
                );
        });
    }

    ServerRestart() {
        return Observable.create((observer: Observer<any>) => {
            this.rest
                .sendRequest('POST', 'server_restart', {
                    request: 'server restart',
                })
                .subscribe(
                    (value) => {
                        observer.next(value);
                    },
                    (error1) => observer.error(error1),
                );
        });
    }
}
