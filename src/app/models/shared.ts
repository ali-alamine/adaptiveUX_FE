import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
export const BASE_URL = environment.baseURL;

export enum HttpMethod {
    GET,
    POST,
    DELETE
}

export enum ATTR_TYPE {
    BTN = 'button',
    CHECKBOX = 'checkbox',
    COLOR = 'color',
    DATE = 'date',
    EMAIL = 'email',
    FILE = 'file',
    IMAGE = 'image',
    MONTH = 'month',
    NUMBER = 'number',
    PASS = 'password',
    RADIO = 'radio',
    RANGE = 'range',
    RESET = 'reset',
    SUBMIT = 'submit',
    TEL = 'tel',
    TEXT = 'text',
    TIME = 'time',
    URL = 'url',
    WEEK = 'week',
    SEARCH = 'search',
    SELECT = 'select',
    DATA_LIST = 'datalist',
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

export function getAttrFetchValue(attribute: any): any {
    return attribute?.attr_fetch_value?.fetch_criteria?.fetch_value;
}

export function getAttrFetchableContentIDsValues(item: any, attr: any): any {
    let contentIDs: any = attr?.attr_fetch_value?.fetch_criteria?.content_attr_ids;
    // console.log(contentIDs, "contentIDs")
    let displayedValue = '';
    for (let i = 0; i < contentIDs.length; i++) {
        if(item[contentIDs[i]]){
            displayedValue += item[contentIDs[i]] + ' ';
        }
    }
    return displayedValue;
}

export function setDataListID(attr: any): any {
   return attr?.attr_fetch_value?.fetch_criteria?.fetch_value;
}

export function restructureDataForList(param: any): Array<any> {
    const grouped: any = {};

    param.forEach((item: any) => {
        const contentId = item.content_id;
        const attrValues = item.attr_values;

        if (!grouped[contentId]) {
            grouped[contentId] = [];
        }

        const entityMap: any = {};

        attrValues.forEach((attrValue: any) => {
            const entityId = attrValue.entity_id;
            const attrKey = attrValue.attr_key;
            const attrID = attrValue.attr_id;
            const fieldValue = attrValue.field_value;

            if (!entityMap[entityId]) {
                entityMap[entityId] = { entity_id: entityId, attr_id: attrID };
                grouped[contentId].push(entityMap[entityId]);
            }

            entityMap[entityId][attrID] = fieldValue;
        });
    });

    return grouped;
}

export function setAttributePlaceholder(attr: any): string {
    return attr.attr_custom_placeholder !== null ? attr.attr_custom_placeholder : attr.attr_type_placeholder !== null ? attr.attr_type_placeholder : attr.attr_title !== null ? attr.attr_title : '';
}

export function copyToClipboard(value: string): boolean {
    const textArea = document.createElement('textarea');
    textArea.value = value == null ? 'No value to copy' : value;

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