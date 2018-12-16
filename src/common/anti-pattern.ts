export class AntiPattern {
    public name?: string;
    public aliases?: string[];
    public description?: string;
    public detection?: string;
    public cause?: string;
    public solution?: string;
    public example?: string;
    public sources?: string[];
    public tags?: string[];
    public median?: number;
    public sourcesReferences?: Map<number, number>;
    public relatedItems?: RelatedItem[];
    public relatedAntiPatterns?: RelatedAntiPattern[];

    constructor(name?: string, aliases?: string[], description?: string, detection?: string, cause?: string,
                solution?: string, example?: string, sources?: string[], tags?: string[],
                relatedItems?: RelatedItem[]) {
        this.name = name;
        this.aliases = aliases;
        this.description = description;
        this.detection = detection;
        this.cause = cause;
        this.solution = solution;
        this.example = example;
        this.sources = sources;
        this.tags = tags;
        this.relatedItems = relatedItems;
    }
}

export interface RelatedItem {
    relation: string;
    name: string;
}

export interface RelatedAntiPattern {
    relation: string;
    name: string;
    description: string;
}
