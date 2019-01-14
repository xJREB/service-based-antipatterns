export class DefaultSidebar implements Sidebar {
    public drawer = undefined;
    public selection = [];
    public evidence = 0;
    public sorting = [];
}

export interface Sidebar {
    drawer: unknown | boolean;
    selection: string[];
    evidence: number;
    sorting: string[];
}
