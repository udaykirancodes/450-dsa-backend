# Backend for 450dsa.com

### How to install ?

- Step 1 : Clone/Download the repo

- Step 2 : Go to the Directory (teminal)

- Step 3 : Install the dependencies with below command

  ```bash
  npm install
  ```

- Step 4 : add `.env` file in root directory

  ```bash
  MONGO_URL=mongodb://localhost:27017/450dsa
  PORT=8081
  JWT_SECRET=some_secret_key
  EMAIL=your_mail_id
  APP_PASSWORD=app_password_of_mail_id (used for sending mails to verify user)
  BASE_URL=http://localhost:8081/ (backend base url)
  FRONTEND_URL=http://localhost:3000/ (frontend base url)
  ```

- Step 5 : Start the Project

  - In Development

    ```bash
    npm run dev
    ```

  - Normal

    ```bash
    npm run start
    ```
