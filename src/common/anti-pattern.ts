export class AntiPattern {
    public name?: string;
    public description?: string;
    public detection?: string;
    public cause?: string;
    public solution?: string;
    public example?: string;
    public source?: string;
    public tags?: string[];

    constructor(name?: string, description?: string, detection?: string, cause?: string, solution?: string,
                example?: string, source?: string, tags?: string[]) {
        this.name = name;
        this.description = description;
        this.detection = detection;
        this.cause = cause;
        this.solution = solution;
        this.example = example;
        this.source = source;
        this.tags = tags;
    }
}
