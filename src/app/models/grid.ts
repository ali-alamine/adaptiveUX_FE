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

export function fillFiltersValue(columnNames: any, preservedQueries: any) {
    const searchQueries = preservedQueries[0]?.queries || [];
    const colMap = new Map(columnNames.map((col: any) => [col.field_key, col]));

    searchQueries.forEach((searchQuery: any) => {
        const col: any = colMap.get(searchQuery.field_key);
        if (col) {
            col.filterValue = searchQuery.query;
        } else {
            // Set filterValue to '' if field_key doesn't exist
            columnNames.push({ field_key: searchQuery.field_key, filterValue: searchQuery.query });
        }
    });

    return columnNames;
}
