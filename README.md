# Logistics API Testing Project

This project uses **JUnit** and **Supertest** to perform API testing for various processes in a logistics system. The primary scripts include testing the following core logistics operations:

- Creating an operation
- Uploading a booking
- Assigning bookings to a driver

Additionally, the project includes utility functions such as generating random UUIDs and fetching the current date, both of which are crucial in the logistics workflow.

## Project Setup

To set up the project, follow these steps:

1. Initialize the project:

   ```bash
   npm init -y
   ```

2. Install the necessary dependencies:
   ```bash
   npm install
   npm install --save-dev jest
   npm install --save-dev supertest
   npm install @types/jest
   npm install @types/supertest
   ```

## How to Run

To run the tests or start the sample execution:

```bash
npm run start:sample
```
