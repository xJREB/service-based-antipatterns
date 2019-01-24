# SLR

## Review Protocol
### Research Question
On the topic "Towards an Understanding of Bad Smells and Antipatterns in Service- and Microservice-Based Systems" our research question can be defined as follows.
> How many service- and microservice-based antipatterns exists in the literature and how can they be uniformly documented

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

Search engines:
* Google Scholar: https://scholar.google.com
* IEEE Xplore: http://ieeexplore.ieee.org
* ACM Digital Library: https://dl.acm.org
* Springer Link: https://link.springer.com
* Science Direct: https://www.sciencedirect.com

## Criteria
### Inclusion
Only include articles that match the following criteria:

1. one of the terms `antipattern`, `anti-pattern`, `bad smell` or `pattern` must appear in the title.
If only `pattern` occurs in the title, the title also has to contain any of `service`, `microservice`, `web service`, `service oriented architecture`, `soa`, `service oriented computing` additionally
2. one of the terms `antipattern`, `anti-pattern` or `bad smell` must occur in abstract, conclusion or ToC

### Exclusion
Exclude any articles that do not match the following criteria:

1. consistent pattern schema
2. title+ [description|context] (example)*  [(solution)|(detection)|(cause)]

## Information obtained

The articles meeting our criteria have been read thoroughly and any information about service- and microservice-based antipatterns has been extracted and documented in our defined [template](https://github.com/xJREB/service-based-antipatterns/blob/master/antipatterns/default_anitpattern.json).
At least one additional researcher has then reviewed the information about the antipattern before it was merged into this repository.

### Results

| SLR Phase | Description | Number of articles |
|:---|:---|---:|
| Initial Search Results | All search results retrieved by entering each search term into each search engine | **757** |
| Phase 1 | Filter by first inclusion criteria - All articles have automatically been filtered by their title to match our first inclusion criteria | **239** |
| Phase 2 | Filter by second inclusion criteria - The abstract, conclusion and ToC of the remaining articles have been manually skimmed for the second inclusion criteria | **45** |
| Phase 3 | Filter by exclusion criteria - The remaining articles have been read thoroughly and only the ones matching our defined exclusion criteria have been kept | **13** |
| Phase 4 | Snowballing - We used forward and backward search and found one additional article while applying the latter search strategy | **14** |


