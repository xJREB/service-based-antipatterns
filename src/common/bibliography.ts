export enum BibliographyTemplate {
    // Key should be the name of any of template of https://github.com/citation-style-language/styles
    // where '-' has to be replaced by '_'. The value is the display name of the style and is printed on the html
    IEEE = 'IEEE',
    SPRINGER_LECTURE_NOTES_IN_COMPUTER_SCIENCE = 'LNCS',
    APA = 'APA',
    HARVARD1 = 'Harvard',
    VANCOUVER = 'Vancouver',
    BIBTEX = 'BibTeX',
}

export enum BibliographyFormat {
    TEXT = 'text',
    HTML = 'html',
}

export interface Source {
    citeKey: string;
    citedBy: number;
}
