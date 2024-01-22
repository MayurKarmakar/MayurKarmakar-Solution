# Onito React Challenge App

This repository is dedicated to the Onito React Challenge app, a web application developed using Next.js. The app showcases a user details form and a feature-rich datatable. Below, you'll find an overview of the main functionalities and the technologies employed in this project.

## Features

### User Details Form

- The app incorporates a user details form, leveraging the capabilities of the `react-hook-form` library.
- Form fields undergo validation through the `yup` validation library, ensuring data integrity with clear and user-friendly error messages.

### DataTable

- The datatable within the app is powered by the `datatable.net-dt` library.
- It provides a user-friendly interface for viewing and interacting with tabular data.
- Additional features include the ability to export datatable data as an Excel file and print datatable values.

### Styling

- Material UI is used to style the layout and form input fields, resulting in a clean and responsive design.

### Global State Management

- Redux Toolkit serves as the store for managing the global state of the application.
- This choice ensures efficient state management and facilitates seamless communication between different components.

## Technologies Used

- [Next.js](https://nextjs.org/): A React framework for building server-side rendered and statically generated web applications.
- [React Hook Form](https://react-hook-form.com/): A library for managing form state and validation in React applications.
- [Yup](https://github.com/jquense/yup): A JavaScript schema builder for value parsing and validation.
- [Material-UI](https://material-ui.com/): A popular React UI framework for designing responsive and visually appealing user interfaces.
- [Redux Toolkit](https://redux-toolkit.js.org/): An opinionated, batteries-included toolset for efficient Redux development.

## Getting Started

Follow these steps to set up and run the app using `pnpm`:

1. Clone the repository:

   ```bash
   git clone https://github.com/MayurKarmakar/MayurKarmakar-Solution.git

2. Install pnpm:
    If you don't have pnpm installed globally, you can install it using:
    npm install -g pnpm

2. Navigate to the project directory:
    cd onito-react-challenge

3. Install dependencies using pnpm:
    pnpm install

4. Run the development server:
    pnpm run dev