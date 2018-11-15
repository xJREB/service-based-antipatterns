export class DefaultSidebar implements Sidebar {
    public drawer = undefined;
    public selection = [];
}

export interface Sidebar {
    drawer: unknown | boolean;
    selection: string[];
}
