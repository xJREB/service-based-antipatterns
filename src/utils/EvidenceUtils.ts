import {AntiPattern} from "../common/anti-pattern";
import Color from 'color';

export default class EvidenceUtils {

    public static evidenceLabels: string[] = ["low", "medium", "high", "very high"];

    public static evidenceModel: { [s: number]: [number, string]; } = {
        0: [1, EvidenceUtils.evidenceLabels[0]],
        1: [3, EvidenceUtils.evidenceLabels[1]],
        2: [10, EvidenceUtils.evidenceLabels[2]],
        3: [20, EvidenceUtils.evidenceLabels[3]],
    };

    public static getReferenceEvidenceColor(antiPattern: AntiPattern, color: string): string {
        if (antiPattern.evidence && antiPattern.evidence > 0) {
            const alphaValue = antiPattern.evidence / 20 + 0.15;
            return new Color(color).alpha(alphaValue).string();
        }
        return "lightgrey";
    }

    public static getReferenceEvidenceLabel(antiPattern: AntiPattern): string {
        if (antiPattern.evidence) {
            const size = 3;
            for (const i in this.evidenceModel) {
                if (antiPattern.evidence >= this.evidenceModel[size - +i][0]) {
                    return this.evidenceModel[size - +i][1];
                }
            }
        }
        return "not set";
    }
}
