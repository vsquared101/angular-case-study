# AngularCaseStudy

A case study in Angular(version 4+) which involves creation of a "Trustee management" app. 
No back-end will be created for this application as a lightweight NPM package called json-server will be used instead.
Data that is to be stored/retrieved will be handled by using a db.json file which will act as a substitute for a database(for e.g. MongoDB).
The json-server package mentioned above will provide us with the common REST endpoints that allow us to perform CRUD operations on the data using the Angular app.

## Tech-stack used

- Angular(version 6.x)
- Bootstrap(version 4.x)
- JSON
- Node basics(incl. addition/removal of npm packages)

## Adding Bootstrap v4+ to an Angular application

- Install bootstrap, jquery and popper.js npm packages with the --save option(production dependencies in package.json)

> npm install bootstrap jquery popper.js --save

- Once the above packages are installed add the below import to the global `styles.css` file under the src/ folder:

```css

@import '~bootstrap/dist/css/bootstrap.min.css';

```

Now run the application using `ng serve`(for local machine) or `ng serve --host 0.0.0.0 --port 8080 --public-host $C9_HOSTNAME`(for cloud9) and navigate to the home page.
If bootstrap was installed and setup correctly we should see the application home page styled differently.

