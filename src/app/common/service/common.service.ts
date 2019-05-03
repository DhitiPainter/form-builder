import { Injectable } from '@angular/core';
import { Utilities } from '../utilities';

@Injectable({ providedIn: 'root' })
export class CommonService {
    constructor() { }

    getLocalStorageString(key: string): any {
        return window.localStorage.getItem(key);
    }

    setLocalStorageObject(key: string, value: Object): void {
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    setLocalStorageString(key: string, value: string): void {
        window.localStorage.setItem(key, value);
    }

    getLocalStorageObject(key: string): any {
        let temp = window.localStorage.getItem(key);
        if (Utilities.isNull(temp)) {
            return null;
        }
        return JSON.parse(temp);
    }

    setSessionStorageObject(key: string, value: Object): void {
        window.sessionStorage.setItem(key, JSON.stringify(value));
    }

    getSessionStorageObject(key: string): any {
        let object = window.sessionStorage.getItem(key);
        if (Utilities.isNull(object)) {
            return null;
        }
        return JSON.parse(object);
    }

    clearLocalStorage() {
        window.localStorage.clear();
    }

    checkBrowser(): boolean {
        let trident = !!navigator.userAgent.match(/Trident\/7.0/);
        let net = !!navigator.userAgent.match(/.NET4.0E/);
        let edge = !!navigator.userAgent.match(/Edge\//);
        let IE11 = trident && net;

        if (IE11) {
            return true;
        } else {
            return false;
        }
    }
    checkBrowserIsEdge(): boolean {
        let edge = !!navigator.userAgent.match(/Edge\//);

        if (edge) {
            return true;
        } else {
            return false;
        }
    }
    checkBrowserIsFireFox(): boolean {
        let firefox = !!navigator.userAgent.match(/Firefox\//);

        if (firefox) {
            return true;
        } else {
            return false;
        }
    }
    checkIsMobileDevice(): boolean {
        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
        ) {
            return true;
        } else {
            return false;
        }
    }
}
