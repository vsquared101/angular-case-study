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
  - On local machine
    
    > json-server --watch src/db.json

  - On cloud9(since our application is hosted on port 8080 the only other free ports available in cloud9 are: 8081 and 8082)
    
    > json-server --watch --host 0.0.0.0 --port 8081 --public-host $C9_HOSTNAME src/db.json
    
- This should start a local server at http://localhost:3000(https://workspacename-username.c9user.io:8081) with the basic REST HTTP endpoints setup for us.
- Accessing the endpoints such as GET - /users, /users/1, etc. should give us appropriate JSON response.

## Creating a service to load data exposed by json-server endpoints(setting up the backend)

- Create a new service using Angular CLI

  > ng generate service user

- Before we use the above service we need to first import the HttpClientModule in app.module.ts

```typescript
  import { HttpClientModule } from '@angular/common/http';
  ...
  imports: [
      BrowserModule,
      HttpClientModule
    ]
  ...
```
- Now open the user.service.ts file and use DI to inject and use the HttpClient to make REST API calls:

```typescript

  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';

  @Injectable({
    providedIn: 'root'
  })
  export class UserService {

    constructor(private http: HttpClient) { }

    getUsers() {
      return this.http.get('http://localhost:3000/users');
    }
    
    getUserById(id: number) {
      return this.http.get('http://localhost:3000/users/' + id);
    }
    
    deleteUser(id: number) {
      return this.http.delete('http://localhost:3000/users/' + id);
    }
  }

```

- To allow the usage of this service throughout our application(all the modules, components, etc.) add the service to the  `providers` array in app.module.ts:

```typescript

  import { UserService } from './user.service';
  ...
  ...
  providers: [UserService]

```

- Now our `UserService` is ready to be used within any component associated with the app module.(more on this later)

## Following component-based approach to design the application UI

- With Bootstrap v4 added and the backend setup we can now proceed with designing the UI screens for the application.
- As with any Single Page Application we have to think in terms of 'components' that will make up the views.
- For this case study we can create the below mentioned components:
  - Header
  - Sidebar
  - UserList
  - CreateUser
  - EditUser
  - ViewUser
- Use below commands to create the above components:

  > ng generate component header
  > ng generate component sidebar
  > ng generate component user-list
  > ng generate component create-user
  > ng generate component view-user
  > ng generate component edit-user

- To speed up the process of creating the screens we can make use of the Dashboard example available in bootstrap.
- Go to <https://getbootstrap.com/docs/4.1/examples/dashboard/> to view the Dashboard and get the source code.
- Of the above components the `Header` and `Sidebar` components will be visible for all the views.
- The remaining components `UserList`, `CreateUser`, `EditUser` and `ViewUser` will be switched based on the route we navigate to.

## Loading data within the components using the service that was created earlier

- Open user-list.component.ts and add below import for the UserService in it:

```typescript

  import { UserService } from '../user.service';
  
```

- Now create a private property for the service by updating the constructor. Also create a property called `users` that we can use later to store the data retrieved.

```typescript

  users: any;

  constructor(private service: UserService) { }

```

- Angular will take care of injecting the service into our component and we can starting making use of the methods available within the service.
- The call to the service methods to load data may take up some time so it is recommended that we call such methods inside the ngOnInit method.

```typescript

  ngOnInit() {
    this.service.getUsers()
      .subscribe((data) => {
        this.users = data;
      });
  }

```

- In the HTML template for our component we can make use of the *ngFor directive and loop through and print the users data by using string interpolation.

```html

  <div *ngFor="let user of users">
    <h3>{{ user.firstName }}</h3>
    <h4>{{ user.lastName }}</h3>
  </div>

```
