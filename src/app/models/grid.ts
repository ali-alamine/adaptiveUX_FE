import * as _ from "lodash";

export enum GRID_CONTEXTMENU {
    DELETE = "delete",
    COPY = "copy",
    EDIT = "edit",
    PIN = "pin",
    UNPIN = "unpin",
}

export const gridItemPerPageOpt: Array<number> = [
    5, 10, 15, 20, 30, 40, 50, 70, 90, 120
]

export function extractGridAttributes(attributes: any[] = []): any[] {
    if (attributes.length === 0) return [];
    const data: any = _.cloneDeep(attributes);

    const gridAttributes: Array<any> = data.map((attr: any) => {
        // if (typeof attr.attr_value === 'string' && attr.attr_value.startsWith('[') && attr.attr_value.endsWith(']')) {
        //     attr.attr_value = attr.attr_value.slice(1, -1).split(',').map((item: any) => item.trim().replace(/'/g, ''));
        // }
        return {
            ...attr,
            ...attr.attr_meta,
        };
    });

    return gridAttributes;
}

function sortRecordsByAttrOrder(inputData: any) {
    // Define a function to extract the 'attr_order' value from the 'attr_meta' object
    function getAttrOrder(record: any) {
        return parseInt(record.attr_meta.attr_order);
    }

    // Iterate through each item in the input data
    for (const item of inputData) {
        // Sort the 'record' array within each item based on 'attr_order'
        item.record.sort((a: any, b: any) => getAttrOrder(a) - getAttrOrder(b));
    }

    return inputData;
}

export function getContextMenuActions(actions: any[] = []) {

    if (actions.length === 0) return [];

    return actions.filter((action: any) => { return action.action_content_meta.location === 'context_menu' }).
        sort((a: any, b: any) => a.action_content_meta.order - b.action_content_meta.order);

    // [
    //     {
    //         "action_id": 1,
    //         "action_key": "delete",
    //         "action_title": "Delete",
    //         "action_icon": null,
    //         "action_desc": null,
    //         "action_content_meta": {
    //             "order": "1",
    //             "location": "context_menu"
    //         }
    //     },
    //     {
    //         "action_id": 2,
    //         "action_key": "copy",
    //         "action_title": "Copy",
    //         "action_icon": null,
    //         "action_desc": null,
    //         "action_content_meta": {
    //             "order": "2",
    //             "location": "context_menu"
    //         }
    //     },
    //     {
    //         "action_id": 3,
    //         "action_key": "edit",
    //         "action_title": "Edit",
    //         "action_icon": null,
    //         "action_desc": null,
    //         "action_content_meta": {
    //             "order": "3",
    //             "location": "context_menu"
    //         }
    //     }
    // ]
}
export function restructureGridData(data: any[] = []): any[] {
    if (data.length === 0) {
        return [];
    }

    const resultMap = new Map();

    data.forEach((obj: any) => {
        const { entity_id, ...rest } = obj;

        if (!resultMap.has(entity_id)) {
            resultMap.set(entity_id, []);
        }

        // Create a new object with the combined key-value pair
        const newItem = { entity_id, ...rest };
        newItem[rest.attr_key] = rest.attr_value_opt_value !== null ? rest.attr_value_opt_value : rest.field_value;

        resultMap.get(entity_id).push(newItem);
    });
    const restructuredArray: any = Array.from(resultMap, ([entity_id, records]) => ({ record: records }));

    // console.log(restructuredArray, " restructuredArray ")

    return restructuredArray;
}



export function fillFiltersValue(attributes: any, preservedQueries: any) {
    const searchQueries = preservedQueries[0]?.queries || [];
    const attrMap = new Map(attributes.map((attr: any) => [attr.attr_key, attr]));
    searchQueries.forEach((searchQuery: any) => {
        const attr: any = attrMap.get(searchQuery.field_key);
        if (attr) {
            attr.filterValue = searchQuery.query;
        } else {
            // Set filterValue to '' if attr_key doesn't exist
            attributes.push({ attr_key: searchQuery.field_key, filterValue: searchQuery.query });
        }
    });

    return attributes;
}
