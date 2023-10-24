# backendAuthApp

A backend authentication app with the backend made using Node.js, Express, and MongoDB, and the frontend made with React and Redux.

## Backend Setup

1. Clone the repository to your local machine.

2. Navigate to the "server" directory in your terminal:

   ```bash
   cd server
3. Install all dependencies by running:
   npm ci
4. Create a config.js file in your "server" directory and paste the following code, replacing "your secret(you can put anything here)" with your desired secret:
   `module.exports = {
    secret: "your secret(you can put anything here)",
   };`
5. Make sure you have MongoDB installed and running on your machine. If not, you can follow the installation instructions in the [MongoDB Documentation](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/).
6. Update the database connection in the index.js file inside the "server" folder. The default connection is:
   `mongodb://localhost:27017/auth` You can change it to your MongoDB URI.
7. Start the backend server by running:
   `npm run dev` Your backend will be running at the specified port.

## Frontend Setup

1. Navigate to the "client" directory in your terminal:
   `cd client`
2. Install all dependencies by running:
   `npm i --legacy-peer-deps`
3. Update the API endpoint URL in the `client/src/actions/index.js` file to match your backend server's URL. Replace `"localhost:port"` with your server's address.
4. Start the frontend by running:
   `npm run start`

Your frontend will be up and running.

That's it! You've successfully set up and configured the backend and frontend for your authentication app. Enjoy using your application.
