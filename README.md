# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Docker & Cloud Run Deployment

This project is optimized for deployment on Google Cloud Run using Nginx.

### 1. Build the Docker Image
To build the production image locally:

```bash
docker build -t frontend-event \
  --build-arg VITE_API_BASE_URL=https://your-api-url.com .
```

### 2. Run Locally
To test the production build locally:

```bash
docker run -p 8080:8080 frontend-event
```
Now open [http://localhost:8080](http://localhost:8080).

### 3. Deploy to Cloud Run
1.  **Build and Push** (using Google Cloud Build):
    ```bash
    gcloud builds submit --tag gcr.io/[PROJECT_ID]/frontend-event --build-arg VITE_API_BASE_URL=[API_URL]
    ```
2.  **Deploy**:
    ```bash
    gcloud run deploy frontend-event \
      --image gcr.io/[PROJECT_ID]/frontend-event \
      --platform managed \
      --region [REGION] \
      --allow-unauthenticated \
      --port 8080
    ```

## Production Features
- **Nginx**: Serving static assets with Gzip compression.
- **Client-side Routing**: Configured to handle React Router (redirects all requests to `index.html`).
- **Security**: Added standard security headers (X-Frame-Options, CSP, etc.).
- **Caching**: Assets are cached for 1 year, while `index.html` is never cached to ensure immediate updates.
- **Small Image**: Uses `node:20-alpine` and `nginx:alpine` for a minimal footprint.
