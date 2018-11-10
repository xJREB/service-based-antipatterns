export default class Utils {

    public static cleanString(stringToClean: string) {
        if (stringToClean) {
            return stringToClean.toLowerCase().replace(/[^a-zA-Z ]/g, "");
        } else {
            return stringToClean;
        }
    }

}

