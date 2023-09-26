import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
export const BASE_URL = environment.baseURL;

export enum HttpMethod {
    GET,
    POST,
    DELETE
}


@Injectable()
export abstract class PUObject implements OnDestroy {
    ngUnsubscribe: Subject<void> = new Subject<void>();

    ngOnDestroy() {
        console.log('unsubscribe');
        // Simple way to unsubscribe from all subscriptions
        // https://stackoverflow.com/questions/38008334/angular-rxjs-when-should-i-unsubscribe-from-subscription
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }
}
export function copyToClipboard(value: string): boolean {
    const textArea = document.createElement('textarea');
    textArea.value = value;

    // Make the textarea invisible
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';

    document.body.appendChild(textArea);
    textArea.select();

    try {
        const success = document.execCommand('copy');
        if (success) {
            console.log('Value copied to clipboard:', value);
        } else {
            console.error('Copying to clipboard failed.');
        }
        return success;
    } catch (error) {
        console.error('Error copying to clipboard:', error);
        return false;
    } finally {
        document.body.removeChild(textArea);
    }
}