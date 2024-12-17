# 💡 Usage
---

## E-Commerce Vue 3 + Vite Project

This is an **e-commerce** project developed with **Vue 3** and **Vite**. The project includes a production-optimized build to be run through **Docker** with **Nginx** as the server to serve static files.

### Prerequisites

- **Docker**: Make sure you have Docker installed on your machine. You can download and install it from [here](https://www.docker.com/get-started).

### Running the Project with Docker

Follow these steps to build and run the project using Docker:

#### 1. Clone the repository

```bash
git clone https://github.com/your-username/e-commerce-vue3-vite.git
cd e-commerce-vue3-vite
```

#### 2. Build the Docker image

To build the Docker image for the project, run the following command:

```bash
docker build -t vue-app .
```

This command will create a Docker image using the **Dockerfile**, which contains the instructions to build and run the application.

#### 3. Run the Docker container

To run the project inside a Docker container, use the command:

```bash
docker run -p 8080:80 vue-app
```

This command will run the app on port **8080** of your local machine, served via Nginx.

#### 4. Access the application

Once the container is running, you can access the project in your browser at:

```
http://localhost:8080
```

### Project Structure

- **Dockerfile**: Contains instructions for building and serving the app via Nginx.
- **nginx.conf**: Nginx configuration for routing the SPA (Single Page Application) of Vue.js.
- **src/**: Contains the source code of the Vue 3 application.

### Debugging and Development

If you want to work in development mode, you can use **Vite** directly on your local environment without Docker. In that case, run:

```bash
npm install
npm run dev
```

This will start a local development server at `http://localhost:3000`.

---

### How It Works

1. **Build Phase**: The `node:lts-alpine` image is used to install the dependencies and build the Vue 3 project with Vite. The final files are generated in the `dist` folder.

2. **Production Phase**: The static files generated are copied into an **Nginx** image and served on port **80**.

---

### Starting the Development Server

To start the development server with hot-reload, run the following command. The server will be accessible at [http://localhost:3000](http://localhost:3000):

```bash
npm dev
```


### Building for Production

To build your project for production, use:

```bash
npm build
```


Once the build process is completed, your application will be ready for deployment in a production environment.


