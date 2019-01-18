import {DefaultTags, Tags} from "@/common/tags";

export class DefaultSidebar implements Sidebar {
    public drawer = undefined;
    public tags = new DefaultTags();
    public selectionContext = [];
    public selectionCategory = [];
    public evidence = 0;
    public sorting = [];
}

export interface Sidebar {
    drawer: unknown | boolean;
    tags: Tags;
    evidence: number;
    sorting: string[];
}
