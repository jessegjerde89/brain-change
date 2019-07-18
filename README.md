# BRAIN CHANGE

Brain Change is a digital version of an assessment activity called Positive Attitude Development by Lyle Wildes.  The purpose of the application is to help people identify their core values so they can make more informed choices about their behavior and to collect data such as core values, violator values, order of value words eliminated, and the time of completion of the assessment. This version uses React, Redux, Express, Passport, PostgreSQL, Material UI and SweetAlert2  (a full list of dependencies can be found in `package.json`).



## PREREQUISITES

Before you get started, make sure you have the following software installed on your computer:

* An IDE [VSCode is recommended](https://code.visualstudio.com/)
* [Node.js](https://nodejs.org/en/)
* [PostgreSQL](https://www.postgresql.org/)
* [Nodemon](https://nodemon.io/)

## CREATE DATABASE AND TABLE

Create a new database called `brain_change` and create the following tables:

```
CREATE TABLE "admin" (
  "id" SERIAL PRIMARY KEY, 
  "username" VARCHAR UNIQUE NOT NULL,
  "password" VARCHAR NOT NULL,
  "level" INT
  );
  
CREATE TABLE "admin_contact"(
  "id" SERIAL PRIMARY KEY,
  "admin_id" INT REFERENCES "admin",
  "first_name" VARCHAR NOT NULL,
  "last_name" VARCHAR NOT NULL,
  "title" VARCHAR,
  "organization" VARCHAR,
  "phone_number" VARCHAR,
  "email_address" VARCHAR,
  "street_address" VARCHAR,
  "street_address2" VARCHAR,
  "city" VARCHAR,
  "state" VARCHAR,
  "zipcode" VARCHAR
);

CREATE TABLE "category" (
"id" SERIAL PRIMARY KEY,
"category" VARCHAR(50)
);

CREATE TABLE "participant" (
  "id" SERIAL PRIMARY KEY,
  "first_name" VARCHAR,
  "last_name" VARCHAR,
  "admin_id" INT REFERENCES "admin",
  "age" INT,
  "gender" VARCHAR,
  "category_id" INT REFERENCES "category",
  "state" VARCHAR,
  "email" VARCHAR,
  "phone_number" VARCHAR
);

CREATE TABLE "offender_system" (
  "id" SERIAL PRIMARY KEY,
  "system" VARCHAR
);

CREATE TABLE "offender_population" (
  "id" SERIAL PRIMARY KEY,
  "population" VARCHAR
);

CREATE TABLE "offender" (
  "id" SERIAL PRIMARY KEY,
  "participant_id" INT REFERENCES "participant",
  "offender_system_id" INT REFERENCES "offender_system",
  "system_id" INT,
  "violent_offender" BOOLEAN,
  "felon" BOOLEAN,
  "population_id" INT REFERENCES "offender_population"
);

CREATE TABLE "value" (
  "id" SERIAL PRIMARY KEY,
  "values" VARCHAR
);

CREATE TABLE "result" (
  "id" SERIAL PRIMARY KEY,
  "dates" VARCHAR,
  "participant_id" INT REFERENCES "participant",
  "percent_core" INT,
  "percent_violators" INT
);

CREATE TABLE "result_round" (
  "id" SERIAL PRIMARY KEY,
  "result_id" INT REFERENCES "result",
  "elimination_round" INT,
  "times" VARCHAR

);

CREATE TABLE "result_elimination" (
  "id" SERIAL PRIMARY KEY,
  "result_id" INT REFERENCES "result",
  "value_id" INT REFERENCES "value",
  "order" INT
);

CREATE TABLE "result_core" (
  "id" SERIAL PRIMARY KEY,
  "result_id" INT REFERENCES "result",
  "value_id" INT REFERENCES "value",
  "ranks" INT 
);

CREATE TABLE "result_belief" (
  "id" SERIAL PRIMARY KEY,
  "result_id" INT REFERENCES "result",
  "belief" VARCHAR,
  "challenged" BOOLEAN,
  "type" VARCHAR
);

CREATE TABLE "result_violators"(
  "id" SERIAL PRIMARY KEY,
  "result_id" INT REFERENCES "result",
  "value_id" INT REFERENCES "value",
  "order" INT
);

CREATE TABLE "url" (
  "id" SERIAL PRIMARY KEY,
  "url" VARCHAR(20),
  "expiration_date" DATE,
  "participant_id" INT REFERENCES "participant",
  "admin_id" INT REFERENCES "admin"
);

INSERT INTO "category" ("category")
VALUES ('Offender'), ('General Public'), ('Student'), ('Other');

INSERT INTO "value" ("values")
VALUES ('Accountability'), ('Adventure'), ('Being Right'), ('Communication'), ('Community'), 
('Compassion'), ('Confidentiality'), ('Control'), ('Courage'), ('Creativity'), ('Diversity'), 
('Empathy'), ('Flexibility'), ('Forgiveness'), ('Fun'), ('Greed'), ('Happiness'), ('Humor'), 
('Independence'), ('Instant Gratification'), ('Integrity'), ('Justice'), ('Loyalty'), ('Money'), 
('Nonjudgmental'), ('Order'), ('Patience'), ('Perfection'), ('Persistence'), ('Power'), ('Privacy'), 
('Relationships'), ('Respect'), ('Security'), ('Status'), ('Structure'), ('Transparency'), ('Wellness');

INSERT INTO "offender_system" ("system")
VALUES ('State Prison'), ('Federal Prison'), ('DAIP'), ('Juvenile System');

INSERT INTO "offender_population" ("population")
VALUES ('General Population'), ('Release'), ('Parole'), ('Other Program');
```

## DEVELOPMENT SETUP

* Run `npm install`
* Create a `.env` file at the root of the project and paste this line into the file, changing the key to a new random string:
    ```
    SERVER_SESSION_SECRET=(random string longer than 8 characters)
    ```
* Start postgres if not running already by using `brew services start postgresql`
* Run `npm run server`
* Run `npm run client`
* Navigate to `localhost:3000`

## OWNER ACCOUNT SETUP

There are two options for the initial Owner account set up. We recommend first registering an account to associate with ‘Unassigned’ participants. Enter ‘NA’ or ‘Unassigned’ into all fields in the registration form as needed.

Then, log out and register your actual Owner account to use on a regular basis. 

This setup will allow admins to remove / disassociate from their participants and reassign those participants to that Unassigned admin. To have those participants reassigned to the actual Owner instead, make the first created account your actual Owner account and do not create one for Unassigned.

Once these accounts are created, they will need to be manually changed in the database so that they are permanently locked at the Owner access level (level 5).


## DEBUGGING
To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run client`. Start the debugging server by selecting the Debug button.
   
![alt text](https://github.com/PADgroup/positive-attitude-development/blob/master/public/debug.png)
   
   
   
   
Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.
![alt text](https://github.com/PADgroup/positive-attitude-development/blob/master/public/debugbutton.png)
   
## PRODUCTION BUILD

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

* Run `npm start`
* Navigate to `localhost:5000`


## LAY OF THE LAND

* `src/` contains the React application
* `public/` contains static assets for the client-side
* `server/` contains the Express App

The code is also heavily commented. We recommend reading through the comments, getting a lay of the land, and becoming comfortable with how the code works before you start making any changes. If you're wondering where to start, consider reading through component file comments in the following order:

* src/components
    * App/App
    * App/QuizRoutes
    * ProtectedRoute/ProtectedRoute
    * Nav/Nav
    * Admin/Admin
    * IndividualParticipant/IndividualParticipant
    * IndividualParticipant/SnapShot
    * MyParticipants/MyParticipants
    * MyParticipants/MyParticipantsTable
    * QuizViews
    * LoginPage/LoginPage
    * LogOutButton/LogOutButton

## DEPLOYMENT

1. Create a new Heroku project
2. Link the Heroku project to the project GitHub Repo
3. Create an Heroku Postgres database
4. Connect to the Heroku Postgres database from Postico
5. In the deploy section, select manual deploy

Deployed on Heroku here https://team-brain-change.herokuapp.com/#/home

## Screenshot 
![](documentation/images/Digital_Brain_Coach.png)


## Authors

* **Bobby Khounphinith** - *Initial work* - (https://github.com/koop212)
* **Jesse Gjerde** - *Initial work* - (https://github.com/jessegjerde89)
* **Rachel Schoenmann** - *Initial work* - (https://github.com/rschoenmann)
* **Thomas Roselyn** - *Initial work* - (https://github.com/tgroselyn)

