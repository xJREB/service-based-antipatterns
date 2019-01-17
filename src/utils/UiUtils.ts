export default class UiUtils {

    public static getIconForSources(sourceCount: number) {
        if (!sourceCount || sourceCount === 0) {
            return "warning";
        } else if (sourceCount < 9) {
            return "filter_" + sourceCount;
        } else {
            return "filter_9_plus";
        }
    }

}
