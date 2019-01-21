import {MarkdownFile} from "@/common/markdown-file";
import {AntiPattern, RelatedAntiPattern} from "@/common/anti-pattern";
import {Source} from "@/common/bibliography";

export default class Utils {

    public static get context() {
        return ['microservices', 'soa'];
    }

    public static get category() {
        return ['business', 'application', 'architecture'];
    }

    public static cleanString(stringToClean: string) {
        if (stringToClean) {
            return stringToClean.toLowerCase().replace(/[^a-zA-Z ]/g, "");
        } else {
            return stringToClean;
        }
    }

    public static sortMarkdownFiles(file1: MarkdownFile, file2: MarkdownFile) {
        return file1.position - file2.position;
    }

    public static setRelatedAntiPatterns(antiPatterns: AntiPattern[]) {
        for (const antiPattern of antiPatterns) {
            if (antiPattern.relatedItems) {
                antiPattern.relatedItems.forEach((relatedItem) => {
                    const relatedAntipatternName = antiPatterns.filter((item) => item.name === relatedItem.name).pop();
                    if (relatedAntipatternName) {
                        if (!antiPattern.relatedAntiPatterns) {
                            antiPattern.relatedAntiPatterns = [];
                        }
                        const relatedAntipattern = {
                            relation: relatedItem.relation,
                            name: relatedAntipatternName.name,
                            description: relatedAntipatternName.description,
                        } as RelatedAntiPattern;
                        if (antiPattern.relatedAntiPatterns.filter(
                            (p) => p.name === relatedAntipattern.name).length === 0) {
                            antiPattern.relatedAntiPatterns.push(relatedAntipattern);
                        }
                    }
                });
            }
        }
    }

    public static setEvidence(antiPattern: AntiPattern, sources: Source[]) {
        let evidence = 0;
        if (sources.length > 0) {
            antiPattern.sources!.forEach((source) => {
                const citeKey = source.match(/(?:@\w*{)(\w*\d*),/g);
                if (citeKey) {
                    const filteredSources = sources.filter((sourceKey) => citeKey[0].includes(sourceKey.citeKey));
                    if (filteredSources.length === 1) {
                        if (evidence === 0) {
                            evidence = 1;
                        }
                        evidence += Math.log(filteredSources[0].citedBy);
                    }
                }
            });
        }
        antiPattern.evidence = evidence;
    }
}

