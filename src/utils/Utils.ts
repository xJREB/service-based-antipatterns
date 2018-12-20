import {MarkdownFile} from "@/common/markdown-file";

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

}

