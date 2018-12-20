import {MarkdownFile} from "@/common/markdown-file";
import {AntiPattern, RelatedAntiPattern} from "@/common/anti-pattern";

export default class Utils {

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

}

