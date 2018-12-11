import {AntiPattern, RelatedAntiPattern} from "@/common/anti-pattern";

export default class Utils {

    public static cleanString(stringToClean: string) {
        if (stringToClean) {
            return stringToClean.toLowerCase().replace(/[^a-zA-Z ]/g, "");
        } else {
            return stringToClean;
        }
    }

    public static setRelatedAntiPatterns(antiPatterns: AntiPattern[]) {
        for (const antiPattern of antiPatterns) {
            if (antiPattern.relatedItems) {
                antiPattern.relatedItems.forEach((relatedItem) => {
                    const relatedAntipattern = antiPatterns.filter((item) => item.name === relatedItem.name).pop();
                    if (relatedAntipattern) {
                        if (!antiPattern.relatedAntiPatterns) {
                            antiPattern.relatedAntiPatterns = [];
                        }
                        antiPattern.relatedAntiPatterns.push({
                            relation: relatedItem.relation,
                            name: relatedAntipattern.name,
                            description: relatedAntipattern.description,
                        } as RelatedAntiPattern);
                    }
                });
            }
        }
    }

}

