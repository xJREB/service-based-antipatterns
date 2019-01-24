# SLR Review Protocol
This document outlines the protocol for our SLR.

## Research Question
In line with the objective to further the understanding of bad smells and antipatterns in service- and microservice-based systems, our research question can be defined as follows:
> What service- and microservice-based antipatterns exist in the literature and how can they be uniformly documented?

## Search Strategy

Key Words (ranked):
* antipattern 
* bad smells 
* microservices 
* services 
* web services 
* service oriented architecture 
* soa 
* service oriented computing
* pattern

Search Terms:
* antipattern microservices
* antipattern services
* antipattern web services
* antipattern service oriented architecture
* antipattern soa
* antipattern service oriented computing
* bad smells microservices
* bad smells services
* bad smells web services
* bad smells service oriented architecture
* bad smells soa
* pattern service oriented computing
* pattern microservices
* pattern services
* pattern web services
* pattern service oriented architecture
* pattern soa
* pattern service oriented computing

Digital Libraries and Search Engines:
* Google Scholar: https://scholar.google.com
* IEEE Xplore: http://ieeexplore.ieee.org
* ACM Digital Library: https://dl.acm.org
* Springer Link: https://link.springer.com
* Science Direct: https://www.sciencedirect.com

## Filtering Criteria
### Content-Based Inclusion
Only include articles that match the following criteria:

1. one of the terms `antipattern`, `anti-pattern`, `bad smell` or `pattern` must appear in the title. If only `pattern` occurs in the title, the title also has to contain any of `service`, `microservice`, `web service`, `service oriented architecture`, `soa`, `service oriented computing` additionally
2. one of the terms `antipattern`, `anti-pattern` or `bad smell` must occur in abstract, conclusion or ToC

### Quality-Based Exclusion
Exclude any articles that do not match the following criteria:

1. consistent pattern schema
2. title+ [description|context] (example)*  [(solution)|(detection)|(cause)]

## Final Results

The articles meeting our criteria have been read thoroughly and any information about service- and microservice-based antipatterns has been extracted and documented in our defined [template](https://github.com/xJREB/service-based-antipatterns/blob/master/antipatterns/default_anitpattern.json). At least one additional researcher has then reviewed the information about the antipattern before it was merged into this repository. Lastly, the repository was analyzed as a consistent whole and additional merging and refining of antipatterns took place.

| SLR Phase | Description | Number of articles |
|:---|:---|---:|
| Initial Search Results | Initial results retrieved by entering each search term into each search engine | **757** |
| Phase 1 | Filter by first inclusion criterion - All articles have been automatically filtered by their title to match our first inclusion criteria | **239** |
| Phase 2 | Filter by second inclusion criterion - The abstract, conclusion, and ToC of the remaining articles have been manually scanned for the second inclusion criteria | **45** |
| Phase 3 | Filter by exclusion criteria - The remaining articles have been thoroughly read and only the ones surviving our defined exclusion criteria have been kept | **13** |
| Phase 4 | Snowballing - We used forward and backward citation search and found one additional article | **14** |


