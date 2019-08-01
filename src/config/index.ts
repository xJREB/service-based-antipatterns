// configuration variables
export default {
    // path to static asset files (the GitHub pages production path is different)
    assetPath:
        window.location.hostname === "localhost"
            ? "/assets"
            : "/service-based-antipatterns/assets"
};
