# AuthECClient

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


1. angular frontend project added on github using gitpages
githug pages link: https://aniruddhkadia.github.io/angularUserManage/signin
2. .netweb api backend project added on monster asp.net website
monster asp.net website link: https://managementangular.runasp.net/swagger/index.html


## Following steps need to add Angular project on gitHub using github pages.


Step 1 => install github pages on the project folder

ng add angular-cli-ghpages

Step 2 => push code to githubRepo

git status
git add .
git commit -m "initial angular project commit"
git push


Step 3 => got to repo setting and select branch and save

Step 4 => build application using below cmd

ng build --base-href "https://aniruddhkadia.github.io/angularUserManage/"

Step 5 =>

npx angular-cli-ghpages --dir=dist/auth-ecclient/browser

==========================

