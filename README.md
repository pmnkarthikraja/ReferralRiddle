1. Project Name: Riferral riddle
2. Project Description: The Referral Program System is a web application designed to facilitate user referrals and incentivize participation through rewards. The system allows users to register, generate unique referral codes, track successful referrals, and potentially earn rewards for their referrals. This project aims to implement a robust referral program mechanism akin to those utilized by companies like Uber, where both the referrer and the new user benefit from the referral process.

--Technologies Used--

1. Frontend :-
 
React.js: JavaScript library for building user interfaces.
Elastic UI: A React UI framework for building beautiful and accessible websites.
Superstruct: A library for creating fast and type-safe data structures in JavaScript.
Tanstack Query: A data-fetching library for managing asynchronous data in React applications. It's used for asynchronous state management and is preferred over Redux for its avoidance of boilerplate code.
TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
Chart.js: A JavaScript library for creating charts, including line, bar, and pie charts.
React Hook Form: A library for managing form state and validation in React applications.
Lint: Used for code clearance and maintaining code quality.

2. Backend :-
   
Node.js: JavaScript runtime environment for building server-side applications.
Express.js: Web application framework for Node.js.
Mongoose: MongoDB object modeling for Node.js.
MongoDB Atlas: Cloud-based MongoDB service.
JWT (JSON Web Tokens): Used for user authentication.
Bcrypt: Library for hashing passwords.
dotenv: Loads environment variables from a .env file into process.env.
Cors: Middleware for enabling Cross-Origin Resource Sharing.


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

-----Application Usage-------
1. Visit http://localhost:3000 in your web browser to access the frontend of the Referral Program System.
2. Register as a new user, generate referral codes, and explore the referral tracking features

Feel free to adjust the instructions as needed based on your project's specific setup and configuration requirements.

Thank you... Project done by karthikraja
