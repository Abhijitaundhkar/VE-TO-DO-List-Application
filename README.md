# VE3-TO-DO-List-Application

# Setup

Clone the Repository:

Open your terminal or command prompt.

Navigate to the directory where you want to clone the project.

Run the following command to clone the repository:

git clone https://github.com/Abhijitaundhkar/VE-TO-DO-List-Application.git

Navigate to the Project Directory:

cd VE-TO-DO-List-Application

Open the Project in Visual Studio Code:

In the terminal, run the following command to open the project in Visual Studio Code.

code .

# Install Dependencies

npm install

# Create/update env file add all your configuration

# Run Application

start application using nodemon:npm run dev

start application using without nodemon:npm run start

# Folder Structure

src->config->database connections and authentication configurations like JWT and swagger configuration

src->controller->handling all your business logic of task and user.

src->routes->all routes of user and tasks

Task API:

GET /tasks : Fetch all tasks.

GET /tasks/:id : Fetch a single task by its ID.

POST /tasks : Add a new task.

PUT /tasks/:id : Update an existing task by its ID.

DELETE /tasks/:id : Delete a task by its ID.

User API:

POST /auth/register : Register a new user.

POST /auth/login : Log in and return a JWT token.

DELETE /auth/logut : logut user and delete a JWT token.

GET /allUser : Fetch all User.


src->middleware->protect Api for not authentication user

src->models->all database schema

src->validation-> added jio validation for Api data

server.js file for run the server and other main configurations are added
