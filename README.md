# rx_restaurant

## Overview
`rx_restaurant` is a Node.js Express API project built with TypeScript and Sequelize ORM. This project serves as a RESTful API for managing restaurant data.

## Features
- TypeScript for type safety and better development experience.
- Sequelize ORM for database interactions.
- Express framework for building the API.
- Jest for unit testing.

## Directory Structure
```
rx_restaurant
├── src
│   ├── app.ts
│   ├── routes
│   │   └── index.ts
│   ├── controllers
│   │   └── index.ts
│   ├── repositories
│   │   └── index.ts
│   ├── models
│   │   └── index.ts
│   ├── tests
│   │   └── app.test.ts
│   └── types
│       └── index.ts
├── package.json
├── tsconfig.json
├── jest.config.js
├── docker-compose.yml
└── README.md
```

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- Docker and Docker Compose

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd rx_restaurant
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Application
To start the application, you can use Docker Compose:
```
docker-compose up
```

### Running Tests
To run the unit tests, use:
```
npm test
```

## Usage
The API provides endpoints to manage restaurant data. You can use tools like Postman or curl to interact with the API.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License
This project is licensed under the MIT License.