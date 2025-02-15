# Online Code Compiler

Online Code Compiler is a web application that allows users to compile and execute code written in various programming languages including C++, C, Python, and Java. This project consists of a front-end interface built with React and a back-end server built with Node.js and Express.

## Features

- Supports multiple programming languages: C++, C, Python, and Java.
- Compile and execute code online without requiring any local setup.
- User-friendly interface for code input and output display.
- Real-time feedback on compilation errors, if any.
- Easy to extend with support for more programming languages.

## Prerequisites

- Node.js (v14 or higher)
- NPM (v6 or higher)

## Installation

1. Clone the repository to your local machine: <br>
   git clone https://github.com/shivamg5501/Online-Judge.git <br>
cd online-code-compiler

2. Install the required dependencies for both the client (React) and server (Node.js) applications:  <br>
   cd client <br>
   npm install  <br>

   cd ../server  <br>
   npm install  <br>


## Usage

1. Start the client (React) application:
   
   cd client <br>
   npm start <br>
   
The client application will run on `http://localhost:3000`.

2. Start the server (Node.js) application:
 
   cd server <br>
   npm start <br>


The server will run on `http://localhost:5000`.

3. Open your web browser and go to `http://localhost:3000` to access the Online Code Compiler.

## Adding Support for Additional Languages

To add support for additional programming languages, follow these steps:

1. Create a new module in the `server` directory to handle the compilation and execution of the new language. For example, you can create a module named `executePython.js` for Python support.

2. Implement the necessary logic inside the new module to compile and execute code for the chosen language. Refer to existing modules (e.g., `executeCpp.js`, `executeC.js`) for guidance.

3. Import the new module in `index.js` and add a corresponding route handler to execute code for the new language.

4. Update the front-end UI (`App.js`) to include the new language option in the language selection dropdown.

## Contributing

Contributions to the Online Code Compiler are welcome! If you find any issues or want to add new features, feel free to submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.






