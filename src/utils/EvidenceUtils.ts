import {AntiPattern} from "../common/anti-pattern";

export default class EvidenceUtils {

    public static evidenceLabels: string[] = ["low", "medium", "high", "very high"];

    public static evidenceModel: { [s: number]: [number, string]; } = {
        0: [0, EvidenceUtils.evidenceLabels[0]],
        1: [20, EvidenceUtils.evidenceLabels[1]],
        2: [60, EvidenceUtils.evidenceLabels[2]],
        3: [100, EvidenceUtils.evidenceLabels[3]],
    };

    public static getReferenceEvidenceColor(antiPattern: AntiPattern): string {
        if (antiPattern.evidence) {
            const alphaValue = antiPattern.evidence / 100 + 0.1;
            return "rgba(0, 172, 193, " + alphaValue + ")";
        }
        return "lightgrey";
    }

    public static getReferenceEvidenceLabel(antiPattern: AntiPattern): string {
        if (antiPattern.evidence) {
            const size = 3;
            for (const i in this.evidenceModel) {
                if (antiPattern.evidence > this.evidenceModel[size - +i][0]) {
                    return this.evidenceModel[size - +i][1];
                }
            }
        }
        return this.evidenceModel[0][1];
    }
}
