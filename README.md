# Code by Heart

## Introduction
Code By Heart is a full-stack flashcard app that lets users create and save decks of flashcards, then review them at optimally spaced intervals using the SM-2 spaced repetition algorithm ([learn more](https://www.supermemo.com/en/archives1990-2015/english/ol/sm2)). Flashcards can be either plain text or runnable code snippets, supporting 15+ programming languages, including Python, JavaScript, Go, C++, C, C#, Objective C, Ruby, Java, Scala, Swift, Rust, Kotlin, and Elixir.

## Demo 

[https://user-images.githubusercontent.com/71302837/153951055-03ff59a4-f79d-452a-97bd-3f1c5e1f8475.mp4](https://user-images.githubusercontent.com/71302837/173711608-a756059e-da39-4e25-9dcc-ae3c9bf219a9.mp4)

## Installation 

### Backend 

### Firebase Authentication 
1.	Create a Firebase project for Code By Heart.
2.	Enable Google Sign-In and add your local host as an authorized domain.
3.	Update src/firebase/firebase.utils.js with your Firebase API key after cloning the backend repo. Note: Firebase API keys are safe to expose publicly ([reference](https://medium.com/@paulbreslin/is-it-safe-to-expose-your-firebase-api-key-to-the-public-7e5bd01e637b)).

### Backend
1. Clone this [backend repo](https://github.com/rachael-mcbride/code-by-heart-back-end).
2. Create and activate a virtual environment (`python3 -m venv venv` and `source venv/bin/activate`), and install dependencies. 
3. Get a free JDoodle API key (jdoodle.com) and create a .env file with:
```
JDOODLE_CLIENT_ID=your_client_id
JDOODLE_CLIENT_SECRET=your_client_secret
```
4. Create a local PostgreSQL database named code_by_heart and add the connection string to .env: `SQLALCHEMY_DATABASE_URI=postgresql+psycopg2://<user>:<password>@localhost:5432/code_by_heart`
5. Initialize and migrate the database. 
6. Run the backend: `flask run`. 

### Frontend 
1. Clone this frontend repo. 
2. Install dependencies.
3. Create a .env file with your backend URL.
4. Start up the frontend: `yarn start`.  
