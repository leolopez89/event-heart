# Event Heart App

## Live Demo

The application is developed with Spring Boot in the backend and React JS in the frontend.

## Steps to Setup the Spring Boot Back end app (event-heart-back)

1. **Clone the application**

    ```bash
    git clone https://github.com/leolopez89/event-heart.git
    cd event-heart-back
    ```

2. **Create MySQL database**

    ```bash
    create database event_heart
    ```

3. **Change MySQL username and password as per your MySQL installation**

    + open `src/main/resources/application.properties` file.

    + change `spring.datasource.username` and `spring.datasource.password` properties as per your mysql installation

4. **Run the app**

    You can run the spring boot app by typing the following command:

    ```bash
    mvn spring-boot:run
    ```

    The server will start on port 8080. The spring boot app includes the front end build also, so you'll be able to access the complete application on `http://localhost:8080`.

    You can also package the application in the form of a `jar` file and then run it like so:

    ```bash
    mvn package
    java -jar target/eventheart-0.0.1-SNAPSHOT.jar
    ```

## Steps to Setup the React Front end app (event-heart-front)

1. First go to the `event-heart-front` folder:

    ```bash
    cd event-heart-front
    ```

2. Type the following command to install the dependencies and start the application -

    ```bash
    npm install && npm start
    ```

    also you can use

    ```bash
    yarn install && yarn start
    ```

3. The front-end server will start on port `3000`.
