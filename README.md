1. Project Name: Riferral riddle
2. Project Description: The Referral Program System is a web application designed to facilitate user referrals and incentivize participation through rewards. The system allows users to register, generate unique referral codes, track successful referrals, and potentially earn rewards for their referrals. This project aims to implement a robust referral program mechanism akin to those utilized by companies like Uber, where both the referrer and the new user benefit from the referral process.

--Technologies Used--
Frontend :-
 
1. React.js: JavaScript library for building user interfaces.
2. Elastic UI: A React UI framework for building beautiful and accessible websites.
3. Superstruct: A library for creating fast and type-safe data structures in JavaScript.
4. Tanstack Query: A data-fetching library for managing asynchronous data in React applications. It's used for asynchronous state management and is preferred over Redux for its avoidance of boilerplate code.
5. TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
6. Chart.js: A JavaScript library for creating charts, including line, bar, and pie charts.
7. React Hook Form: A library for managing form state and validation in React applications.
8. Lint: Used for code clearance and maintaining code quality.

Backend :-
   
1. Node.js: JavaScript runtime environment for building server-side applications.
2. Express.js: Web application framework for Node.js.
3. Mongoose: MongoDB object modeling for Node.js.
4. MongoDB Atlas: Cloud-based MongoDB service.
5. JWT (JSON Web Tokens): Used for user authentication.
6. Bcrypt: Library for hashing passwords.
7. dotenv: Loads environment variables from a .env file into process.env.
8. Cors: Middleware for enabling Cross-Origin Resource Sharing.

Database:
1. MongoDB Atlas (cloud)


--Additional Features--

Implemented a system for retrying MongoDB connections whenever the server goes offline.
Used Tanstack Query to implement refetching with caching for efficient data management.
Server-side state management for handling application data on the backend.

Task Requirements
1. User Registration:
Enable users to register by providing basic information.

2. Referral Code Generation:
Generate a unique referral code for each registered user to facilitate tracking of referrals.

3. Referral Tracking:
Implement a mechanism to track successful referrals, recording both the referrer and the new user.

4. Dashboard:
Create a user dashboard to display referral statistics and details, providing users with insights into their referral activity.

Optional Features:
Reward Functionality: Implement functionality to reward users for successful referrals, such as providing cash incentives.
User Authentication (Login): Enhance security by implementing user authentication mechanisms.

package.json Frontend dependencies:
  "dependencies": {
    "@elastic/datemath": "^5.0.3",
    "@elastic/eui": "^93.5.2",
    "@emotion/css": "^11.11.2",
    "@emotion/react": "^11.11.4",
    "@testing-library/jest-dom": "^5.14.1",
    "@testing-library/react": "^13.0.0",
    "@testing-library/user-event": "^13.2.1",
    "@types/chart.js": "^2.9.41",
    "@types/jest": "^27.0.1",
    "@types/node": "^16.7.13",
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "chart.js": "^4.4.2",
    "moment": "^2.30.1",
    "react": "^18.2.0",
    "react-cookie": "^7.1.4",
    "react-dom": "^18.2.0",
    "react-hook-form": "^7.51.2",
    "react-query": "^3.39.3",
    "react-router-dom": "^6.22.3",
    "react-scripts": "5.0.1",
    "superstruct": "^1.0.4",
    "typescript": "^4.4.2",
    "web-vitals": "^2.1.0"
  },

package.json Backend dependencies:-
"dependencies": {
    "bcrypt": "^5.1.1",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.2.4"
  }


Lets Get Started..

------Installation:-----

1. clone the repository:
   git clone <clone Url>

   Frontend Setup:--
2. Install dependencies: cd referralRiddle/frontend -> yarn install
3. Start Project: yarn start

   Backend Setup:--
4. cd referralRiddle/backend -> npm install
5. Install dependencies: npm install or yarn install
6. create .env file: add below content:

` PORT=4000 `
` MONGO_URI = mongodb+srv://admin:admin@mern.sfmev1b.mongodb.net/?retryWrites=true&w=majority`
` TOKEN_KEY=dfafsfdasfasdf212jkdkma1233kmsdfaf1211n2knkjnk21nkn02989`
 
7. Start Backend Project: yarn start or npm start
8. It will establish mongoDB connection.
9. As I given open ip address in the cloud setup 0.0.0.0/0, So you can able to establish connection.
     

-----Application Usage-------
1. Visit http://localhost:3000 in your web browser to access the frontend of the Referral Program System.
2. Register as a new user, generate referral codes, and explore the referral tracking features

Feel free to adjust the instructions as needed based on your project's specific setup and configuration requirements.

Thank you... Project done by karthikraja
