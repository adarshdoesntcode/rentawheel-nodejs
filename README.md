# Rent-A-Wheel (Node.js)

Rent-A-Wheel is a Node.js-based application designed to facilitate the rental of wheels for various vehicles. This repository contains the source code and documentation for the Rent-A-Wheel application.

## Features

- **User Authentication:** Secure user registration and login system.
- **Vehicle Selection:** Users can browse available wheels for different vehicles.
- **Renting Process:** Capability for users to rent wheels for their vehicles.
- **Admin Dashboard:** Admin panel to manage users, vehicles, and rentals.
- **Invoice Generation:** Automatic generation of invoices for rentals.

## Installation

To run the Rent-A-Wheel application locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/adarshdoesntcode/rentawheel-nodejs.git
    ```

2. Navigate to the project directory:

    ```bash
    cd rentawheel-nodejs
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up environment variables:

    Create a `.env` file in the root directory and add the necessary environment variables following the `.env.example` file.

5. Start the application:

    ```bash
    npm start
    ```

6. Access Rent-A-Wheel:

    Open your web browser and visit `http://localhost:3000` to access the Rent-A-Wheel application.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Backend web framework.
- **MongoDB**: Database system for storing application data.
- **Mongoose**: MongoDB object modeling for Node.js.
- **Passport.js**: Authentication middleware for Node.js.
- **Handlebars**: Template engine for UI rendering.

## Usage

- **User Roles:**
  - **Admin:** Manage vehicles, users, and rentals.
  - **User:** Browse vehicles, rent wheels, view rental history.

- **Endpoints:** Explore the API endpoints using tools like Postman or cURL.

- **Database Management:** Utilize MongoDB tools to manage data and perform CRUD operations.

## Contribution

Contributions are welcome! To contribute to Rent-A-Wheel, follow these steps:

1. Fork the repository.
2. Create your branch: `git checkout -b feature/YourFeature`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin feature/YourFeature`.
5. Submit a pull request.

Please ensure your pull request adheres to the project's code style.

## License

This project is licensed under the [MIT License](LICENSE).
