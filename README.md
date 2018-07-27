# A case-study in Angular

A case study in Angular(version 4+) which involves creation of a "Trustee management" app. 
No back-end will be created for this application as a lightweight NPM package called json-server will be used instead.
Data that is to be stored/retrieved will be handled by using a db.json file which will act as a substitute for a database(for e.g. MongoDB).
The json-server package mentioned above will provide us with the common REST endpoints that allow us to perform CRUD operations on the data using the Angular app.

## Pre-requisites

- Node(with npm) and Angular CLI should be installed.

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

## Using json-server to quickly setup REST API endpoints

- Install json-server with the --save option(this is temporary as we would use an actual backend in production)
    
    > npm install json-server --save

- In the `src` folder create a file named `db.json` with the below contents:

```javascript
    {
      "users": [
        {
          "id": 1,
          "full_name": "Mr Charles Stewart",
          "short_name": "Charles Stewart",
          "ssn": "11-22-3333",
          "dob": "10-10-1968",
          "gender": "Male",
          "marital_status": "Married",
          "citizenship": "United States",
          "country_of_residence": "Australia",
          "passport": "H1234567",
          "country_of_issuance": "Australia",
          "issuance_date": "15-04-2010",
          "expiration_date": "15-04-2020",
          "no_of_dependents": 2
        },
        {
          "id": 2,
          "full_name": "Ms Diana Stewart",
          "short_name": "Diana Stewart",
          "ssn": "44-55-6666",
          "dob": "21-12-1977",
          "gender": "Female",
          "marital_status": "Married",
          "citizenship": "United States",
          "country_of_residence": "Australia",
          "passport": "M2231626",
          "country_of_issuance": "Australia",
          "issuance_date": "11-07-2012",
          "expiration_date": "11-07-2022",
          "no_of_dependents": 1
        },
        {
          "id": 3,
          "full_name": "Mr Phillip Stewart",
          "short_name": "Phil Stewart",
          "ssn": "55-66-7777",
          "dob": "09-04-1975",
          "gender": "Male",
          "marital_status": "Married",
          "citizenship": "United States",
          "country_of_residence": "Australia",
          "passport": "H2345678",
          "country_of_issuance": "Australia",
          "issuance_date": "25-03-2010",
          "expiration_date": "25-03-2020",
          "no_of_dependents": 3
        }
      ]
    }
```

- Now run the below command that allows us to use the db.json file as our data store to save/retrieve user data:

    > json-server --watch src/db.json
    
- This should start a local server at http://localhost:3000 with the basic REST HTTP endpoints setup for us.
- Accessing the endpoints such as GET - /users, /users/1, etc. should give us appropriate JSON response.
