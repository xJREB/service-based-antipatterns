import {AntiPattern} from "@/common/anti-pattern";
import CrossRef from 'crossref';
import Cite from 'citation-js';
import Math from 'mathjs';

export default class EvidenceService {

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

    public static getReferenceMedianColor(antiPattern: AntiPattern): string {
        if (antiPattern.median) {
            const alphaValue = antiPattern.median / 100 + 0.1;
            return "rgba(255, 0 , 0, " + alphaValue + ")";
        }
        return "lightgrey";
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
