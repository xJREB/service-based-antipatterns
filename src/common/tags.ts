export class DefaultTags implements Tags {
    public selection = [];
    public selectionCategory = [];
    public selectionContext = [];
}

export interface Tags {
    selection: string[];
    selectionContext: string[];
    selectionCategory: string[];
}
