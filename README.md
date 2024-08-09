# CitiBike Route Planner

## Project Overview
**Objective**: The original intent of this web application was to recommend exercise, leisure, or sightseeing routes across the city, specifically starting and ending at CitiBike docking stations. The aim was to use Google Maps integrations and APIs to deliver a best-in-class user experience and possibly, integration with their own Google accounts and Google Maps.

## Technologies Used
- **IDE**: VS Code
- **Frontend**: Bootstrap, React
- **Backend**: Node.js, Express
- **Database**: PostgreSQL hosted on Google Cloud Platform
- **APIs**: Google (Maps Javascript, Compute Engine, Cloud SQL Admin)

## User Stories & Requirements
1. As a user, I want to **view a map with biking routes** so that I can plan my route efficiently. ❌
2. As a user, I want to **save preferred routes** so that I can easily access them later. ❌
3. As a user, I want to **see real-time biking directions on the map** - so I can navigate without switching apps. ❌

## Challenges & Limitations
### 1. Google Maps API Key Storage: 
Storing the Google Maps API key in an environment variable proved difficult due to the API's front-end implementation. This challenge limited my ability to secure the key properly.
### 2. MongoDB Integration: 
I initially planned to use MongoDB for storing user routing data. However, I observed some big limitations when it came to integrating Google APIs with database operations. Unfortunately, I was unable to overcome these challenges within the given project timeline. 
### 3. Complex Documentation: 
The documentation for the React Google Maps API was initially confusing. I was therefore unable fully leverage the API's features, delaying key components of the application.


## Source Control
- **GitHub Repository**: [CitiBike-RouteFinder-v3](https://github.com/ss9522/CitiBike-RouteFinder-v3) or http://github.shreyas.nyc

## Cloud Deployment
- **URL**: [Link to web application (bikeroutes.shreyas.nyc)](https://bikeroutes.shreyas.nyc)
- **Subdomain**: https://citibike-router-5aa8781055f0.herokuapp.com/
- **Hosting Platform**: Heroku

### Process flow for deployment:
1. Navigate to front-end directory and `npm build run`
3. Move back to parent folder and `git add .`
4. `git commit -m [message]` to commit changes
5. `git push -u origin main` to push to GitHub.
6. Heroku to automatically deploy GitHub commits to a _Staging_ slot.
7. In Heroku Pipeline, push app from Staging to Production.

## Database Information

My initial plan was to use a database to help users save their route data on my site. However, due to the limitations and time-cost of making this work, I instead opted for a simpler _feedback gathering mechanism_. 

The feedback page can be found [here](https://bikeroutes.shreyas.nyc/contact).

### Tables Overview

Within this schema, there is a table named `feedback` that contains five columns:

1. `id`: A unique identifier for each feedback entry.
2. `name`: The name of the person providing feedback.
3. `email`: The email address of the person.
4. `message`: The feedback message.
5. `created_at`: A timestamp indicating when the feedback was submitted.

I had three main operations in mind for users:
1. Add a record to the feedback table (`INSERT INTO`);
2. Retrieve an existing record using the email address to identify the user (`SELECT`); and
3. Update an existing record using the `unique` property for email addresses.

### Sample Data

Here is a [dashboard](https://console.cloud.google.com/sql/instances/feedback-db/system-insights?hl=en&project=impactful-shard-431810-b6&pageState=(%22sqlMonitoring%22:(%22groupValue%22:%22%22,%22customValue%22:%5B%222024-08-08T03:26:16.596Z%22,%222024-08-09T03:26:16.596Z%22%5D))) that provides some system-related insights on my database. 
  
Referenced **screenshots** from Google Cloud Platform:
* Database Schema.png
* Sample Data.png

### List of API Endpoints for Database Operations:
1.	Test Database Connection:
    * **Endpoint**: `GET /api/test-db`
    * **Description**: 
        * Tests the connection to the PostgreSQL database and returns the current timestamp from the database.
    * **Example Request**: `➜  ~ curl -X GET http://bikeroutes.shreyas.nyc/api/test-db`
    * **Example Response**: `{"success":true,"time":"2024-08-09T04:15:09.887Z"}%`

2.	Submit Feedback:
- **Endpoint**: `POST /api/feedback`
- **Description**: 
        * Submits feedback by inserting a new record **or** updating an existing record based on the email address provided.
    * **Example Request**: `➜  ~ curl -X POST https://bikeroutes.shreyas.nyc/api/feedback \
-H "Content-Type: application/json" \
-d '{"name": "John Doe", "email": "johndoe@example.com", "message": "Great service, thank you!"}'`

    * **Example Response**: `{"id":3,"name":"John Doe","email":"johndoe@example.com","message":"Great service, thank you!","created_at":"2024-08-09T04:18:18.840Z"}%        `
3.	Retrieve All Feedback:
    * **Endpoint**: `GET /api/feedback`
    * **Description**: 
        * Retrieves all feedback records from the database, ordered by creation date.
    * **Example Request**: `➜  ~ curl -X GET https://bikeroutes.shreyas.nyc/api/feedback`
    * **Example Response**: `[{"id":3,"name":"John Doe","email":"johndoe@example.com","message":"Great service, thank you!","created_at":"2024-08-09T04:18:18.840Z"},{"id":2,"name":"Shreyas Test 2","email":"dev1-route-planner@shrsrm.mozmail.com","message":"Testing if update works","created_at":"2024-08-08T22:17:26.576Z"},{"id":1,"name":"test","email":"test@test.com","message":"test","created_at":"2024-08-08T20:03:34.925Z"}]%`
4.	Retrieve Feedback by Email:
    * **Endpoint**: `GET /api/feedback/byEmail`
    * **Description**:
        * Retrieves feedback records associated with a specific email address, ordered by creation date.i/endpoint**: Description of what this endpoint does.
    * **Example Request**: `➜  ~ curl -X GET "https://bikeroutes.shreyas.nyc/api/feedback/byEmail?email=johndoe@example.com"`
    * **Example Response**: `[{"id":3,"name":"John Doe","email":"johndoe@example.com","message":"Great service, thank you!","created_at":"2024-08-09T04:18:18.840Z"}]%`

