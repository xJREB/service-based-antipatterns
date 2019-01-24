# Contributing to Service-Based Antipatterns
Any contributers need to clone the project, create a new branch where they commit their changes and afterwards create a pull request to get their changes merged into the master branch.
The following commands can be executed in a command shell once the git client has been installed.
## Clone the project
Create a new directory with a working copy of the master branch
````bash
git clone https://github.com/xJREB/service-based-antipatterns.git
````

## Checkout new branch
````bash
git checkout -b your-branch-name
````

# Contributing Antipatterns
Follow these six easy steps to contribute a new antippatern to the knowledge base of Service-Based Antipatterns.
1. **[Clone](#clone-the-project) the projcet**
2. Create a **[new branch](#checkout-new-branch)**
3. **Copy our antipattern skeleton** `./antipatterns/default_antipattern.json`, name it according to your antipattern and make sure to place it in the `antipatterns` folder in the project root
4. **Fill out** as many fields of the skeleton as you can but make sure the fields `name`, `description` and `sources` are filled out
5. If a new source has been added, you need to add the BibTeX key and its "cited by" count from [Google Scholar](https://scholar.google.com) to the file `./assets/sources.json`
6. Each antipattern should also be tagged with one of the following **categories** `business`, `architecture`, or `application` (mandatory, single tag only) and with an **architectural style** `soa` and/or `microservices` (optional, multiple tags allowed)
7. If you want to relate your antipattern to existing ones, you may want to use one of the following default relations `precedes`, `relates`, or `follows`. You are also free to add a new relation type
8. **Commit** your changes
9. Create a **pull request** on the [Service-Based Antipatterns GitHub Repo](https://github.com/xJREB/service-based-antipatterns)

Once all the checks on the changes of the pull request have passed, one of the maintainers will merge your changes and they will be available on the [website](https://xjreb.github.io/service-based-antipatterns) shortly afterwards.

# Contributing Code
You can execute the following commands on the command line after you cloned the project.

## Install dependencies
Installs any dependencies to run and build the project.
```bash
npm install
```

## Compiles and hot-reloads for development
Use this to have a live preview for any changes you make to the code.
```bash
npm run serve
```

## Compiles and minifies for production
Run this after you have finalized your changes and make sure there are no errors, otherwise it can not be deployed.
```bash
npm run build
```

## Lints and fixes files
This runs a static code analysis and you should make sure there are no warnings or errors.
```bash
npm run lint
```
