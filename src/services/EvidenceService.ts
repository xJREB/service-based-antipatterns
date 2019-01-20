import {AntiPattern} from "@/common/anti-pattern";
import CrossRef from 'crossref';
import Cite from 'citation-js';
import Math from 'mathjs';
import Color from 'color';

export default class EvidenceService {

    public static evidenceLabel: { [s: number]: [number, string]; } = {
        0: [-1, "not set"],
        1: [0, "low"],
        2: [30, "medium"],
        3: [100, "high"],
    };

    public static addReferenceCount(antiPattern: AntiPattern): Promise<AntiPattern> {
        if (antiPattern.sources) {
            antiPattern.sourcesReferences = new Map<number, number>();
            const listOfPromise: Array<Promise<AntiPattern>> = [];
            antiPattern.sources.forEach(async (value, key) => {
                    const doi = new Cite(value).get()[0].DOI;
                    if (doi) {
                        listOfPromise.push(this.callRefCross(doi, antiPattern, key));
                    }
                },
            );
            return Promise.all(listOfPromise)
                .then(() => (this.addReferenceMedian(antiPattern)));
        } else {
            return new Promise<AntiPattern>((resolve) => resolve(antiPattern))
                .then((pattern: AntiPattern) => (this.addReferenceMedian(pattern)));
        }
    }

    public static getReferenceMedianColor(antiPattern: AntiPattern, color: string): string {
        if (antiPattern.median) {
            const alphaValue = antiPattern.median / 100 + 0.3;
            return new Color(color).alpha(alphaValue).string();
        }
        return "lightgrey";
    }

    public static getReferenceMedianLabel(antiPattern: AntiPattern): string {
        if (antiPattern.median) {
            const size = 3;
            for (const i in this.evidenceLabel) {
                if (antiPattern.median > this.evidenceLabel[size - +i][0]) {
                    return this.evidenceLabel[size - +i][1];
                }
            }
        }
        return this.evidenceLabel[0][1];
    }

    private static callRefCross(doi: string, antiPattern: AntiPattern, key: number): Promise<AntiPattern> {
        return new Promise((resolve) => {
            CrossRef.work(doi, (err: any, response: any) => {
                    if (antiPattern.sourcesReferences) {
                        antiPattern.sourcesReferences.set(key, response['is-referenced-by-count']);
                    }
                    resolve(antiPattern);
                },
            );
        });
    }

    private static addReferenceMedian(antiPattern: AntiPattern): Promise<AntiPattern> {
        if (antiPattern.sourcesReferences) {
            const array: number[] = [...antiPattern.sourcesReferences.values()];
            array.sort();
            const lowMiddle = Math.floor((array.length - 1) / 2);
            const highMiddle = Math.ceil((array.length - 1) / 2);
            antiPattern.median = (array[lowMiddle] + array[highMiddle]) / 2;
        }
        return new Promise((resolve) => resolve(antiPattern));
    }
}
