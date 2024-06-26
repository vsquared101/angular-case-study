# A case-study in Angular

A case study in Angular(version 17, recently updated from version 6.1) which involves creation of a sample front-end application. 
No back-end will be created for this application as a lightweight NPM package called json-server will be used instead.
Data that is to be stored/retrieved will be handled by using a db.json file which will act as a substitute for a database.
The json-server package mentioned above will provide us with the common REST endpoints that allow us to perform CRUD operations on the data using the Angular app.

## Pre-requisites

- Node(with npm) and Angular CLI should be installed.
- Visual Studio Code IDE should be installed.

## Tech-stack used

- Node JS(version 20.12.1)
- Angular(version 17.3)
- Bootstrap(version 5.3)

## Application Architecture
```mermaid
flowchart LR
  FE["Angular 17( Front-End<br>with styling using Bootstrap JS)<br><br>"]:::orange <--> BE["Node JS(Backend and server support)"]:::green
  BE <--> DB["Database<br>(Created with JSON file<br>using json-server NPM package)<br><br>"]:::brown
  
  classDef orange fill:orange;
  classDef green fill:green;
  classDef brown fill:brown;
```

## Adding Bootstrap v5+ to an Angular application

- Install `bootstrap` and `bootstrap-icons` npm libraries with the --save option(production dependencies in package.json)

    > npm install bootstrap bootstrap-icons --save

- Once the above packages are installed add the below import to the global `styles.scss` file under the src/ folder:

```css

    @import '~bootstrap/dist/css/bootstrap.min.css';

```

- Above step will allow us to use _only_ the css portion of bootstrap.
To use bootstrap in all its entirety(including javascript handlers, popper.js, etc.) along with adding the above import,
we can add the below statements to the `styles` and `scripts` arrays in angular.json(version 17 of Angular):

```json
{
  "styles": [
    "./node_modules/bootstrap/scss/bootstrap.scss",
    "./node_modules/bootstrap-icons/font/bootstrap-icons.css",
    "src/styles.scss"
  ],
  "scripts": [
    "./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
  ]
}
```

- Now install the @ng-bootstrap/ng-bootstrap library which contains native Angular support:

> npm install @ng-bootstrap/ng-bootstrap@next

- After install, import the `NgbModule` module. Change the `app.module.ts` file and add the lines as below:

```ts
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

imports: [
  BrowserModule,
  NgbModule,
  AppRoutingModule,
]
```

- In `src/app/app.component.ts` file, import the `NgbModal` service and create the open method to open a modal as below:

```ts
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  constructor(private modalService: NgbModal) {
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

}
```

- In `src/app/app.component.html` start using the classes available in bootstrap 5 to style your page(s).

Now run the application using `ng serve`(for local machine) and navigate to the home page.
If bootstrap was installed and setup correctly we should see the application home page styled differently.

## Using json-server to quickly setup REST API endpoints

- Install json-server globally on the system(this is temporary as we would use an actual backend in production)
    
> npm install -g json-server

- In the `src` folder create a file named `db.json` with the below contents:

```json
    {
      "trustees": [
        {
          "id": 1,
          "prefix": "Mr.",
          "firstName": "Charles",
          "middleName": "Edwards",
          "lastName": "Stewart",
          "shortName": "Charles Stewart",
          "ssn": "111222333",
          "dob": "10-10-1968",
          "gender": "Male",
          "maritalStatus": "Married",
          "countryOfResidence": "Australia",
          "passport": "H1234567",
          "countryOfIssuance": "Australia",
          "issuanceDate": "15-04-2010",
          "expirationDate": "15-04-2020",
          "noOfDependents": 2
        },
        {
          "id": 2,
          "prefix": "Mrs.",
          "firstName": "Diana",
          "middleName": "Henry",
          "lastName": "Stewart",
          "shortName": "Diana Stewart",
          "ssn": "444555666",
          "dob": "21-12-1977",
          "gender": "Female",
          "maritalStatus": "Married",
          "countryOfResidence": "Australia",
          "passport": "M2231626",
          "countryOfIssuance": "Australia",
          "issuanceDate": "11-07-2012",
          "expirationDate": "11-07-2022",
          "noOfDependents": 1
        },
        {
          "id": 3,
          "prefix": "Mr.",
          "firstName": "Phillip",
          "middleName": "Matt",
          "lastName": "Stewart",
          "shortName": "Phil Stewart",
          "ssn": "555666777",
          "dob": "09-04-1975",
          "gender": "Male",
          "maritalStatus": "Married",
          "countryOfResidence": "Australia",
          "passport": "H2345678",
          "countryOfIssuance": "Australia",
          "issuanceDate": "25-03-2010",
          "expirationDate": "25-03-2020",
          "noOfDependents": 3
        }
      ]
    }
```

- Now run the below command that allows us to use the db.json file as our data store to save/retrieve trustee data:
- On local machine
    
> json-server --watch src/db.json
    
- This should start a local server at http://localhost:3000 with the basic REST HTTP endpoints setup for us.

- Accessing the endpoints such as GET - /trustees, /trustees/1, etc. should give us appropriate JSON response.

## Creating a service to load data exposed by json-server endpoints(setting up the backend)

- Create a new service using Angular CLI

  > ng generate service trustee

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

- To make our application more robust we can first create an interface/model that can be used to load/save trustee data via the different REST API endpoints. 
- To implement this we can copy a single trustee object from `db.json` file and then go to [jsonToTS](http://json2ts.com/) to generate the model for the provided data. 
- Save the same in trustee.model.ts file:

```typescript

    export interface Trustee {
        id: number;
        prefix: string;
        firstName: string;
        middleName: string;
        lastName: string;
        shortName: string;
        ssn: string;
        dob: string;
        gender: string;
        maritalStatus: string;
        countryOfResidence: string;
        passport: string;
        countryOfIssuance: string;
        issuanceDate: string;
        expirationDate: string;
        noOfDependents: number;
    }

```

- Now open the trustee.service.ts file and use DI to inject and use the HttpClient to make REST API calls:

```typescript

    import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { Trustee } from './trustee.model';
    import { HttpHeaders } from '@angular/common/http';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    @Injectable({
      providedIn: 'root'
    })
    export class TrusteeService {

      private url: string = 'http://localhost:3000/trustees'; // For LOCAL MACHINE

      constructor(private http: HttpClient) { }

      getTrustees() {
        return this.http.get<Trustee[]>(this.url);
      }

      getTrusteeById(id: number) {
        return this.http.get<Trustee>(this.url + '/' + id);
      }

      deleteTrustee(id: number) {
        return this.http.delete(this.url + '/' + id);
      }

      createTrustee(data: Trustee){
        return this.http.post<Trustee>(this.url, JSON.stringify(data), httpOptions);
      }

      updateTrustee(id: number, data: Trustee) {
        return this.http.put<Trustee>(this.url + '/' + id, JSON.stringify(data), httpOptions)
      }
    }

```

- To allow the usage of this service throughout our application(all the modules, components, etc.) add the service to the  `providers` array in app.module.ts:

```typescript

  import { TrusteeService } from './trustee.service';
  ...
  ...
  providers: [TrusteeService]

```

- Now our `TrusteeService` is ready to be used within any component associated with the app module.(more on this later)

## Following component-based approach to design the application UI

- With Bootstrap v5 added and the backend setup we can now proceed with designing the UI screens for the application.
- As with any Single Page Application we have to think in terms of 'components' that will make up the views.
- For this case study we can create the below components:
  - Header
  - Sidebar
  - TrusteeList
  - CreateTrustee
  - EditTrustee
  - ViewTrustee
- Use below commands to create the components:

  > ng generate component header

  > ng generate component sidebar

  > ng generate component trustee-list

  > ng generate component create-trustee

  > ng generate component view-trustee

  > ng generate component edit-trustee

- To speed up the process of creating the screens we can make use of the Dashboard example available in bootstrap.
- Go to [Bootstrap Dashboard](https://getbootstrap.com/docs/4.1/examples/dashboard/) to view the Dashboard and get the source code.
- Of the above components the `Header` and `Sidebar` components will be visible for all the views.
- The remaining components `TrusteeList`, `CreateTrustee`, `EditTrustee` and `ViewTrustee` will be switched based on the route we navigate to.
- Demonstrating **_all_** the code changes that need to be made to create the different screens as part of _this_ document is **_out-of-scope_**.

## Loading data within the components using the service that was created earlier

- Open trustee-list.component.ts and add below imports to it:

```typescript

  import { TrusteeService } from '../trustee.service';
  import { Trustee } from '../trustee.model';

```

- Now create a private property for the service by updating the constructor. Also create a property called `trustees` that we can use later to store the data retrieved.

```typescript

  trustees: Trustee[];

  constructor(private service: TrusteeService) { }

```

- Angular will take care of injecting the service into our component and we can starting making use of the methods available within the service.
- The call to the service methods to load data may take up some time so it is recommended that we call such methods inside the ngOnInit method.

```typescript

  ngOnInit() {
    this.service.getTrustees()
      .subscribe((data: Trustee[]) => {
        this.trustees = data;
      });
  }

```

- In the HTML template for our component we can make use of the *ngFor directive and loop through and print the trustees data by using string interpolation.

```html

  <div *ngFor="let trustee of trustees">
    <h3>{{ trustee.firstName }}</h3>
    <h4>{{ trustee.lastName }}</h3>
  </div>

```

## Steps to run the application(on local machine)

1. Go to the project's [GitHub Repo](https://github.com/vsquared101/angular-case-study) and clone/download the code to local machine.
2. In the project root open the command prompt and run `npm install` to install all the dependencies for the application.
3. Once the above step is completed(it may take some time) run the `json-server --watch src/db.json` command to make the REST endpoints such as GET /trustees, GET /trustees/:id, etc. available. The default port for json-server is _3000_.
4. Open another command window and run `ng serve` to start the Angular application. The application runs on port _4200_ by default.
5. In the browser open http://localhost:4200 to view the application.
