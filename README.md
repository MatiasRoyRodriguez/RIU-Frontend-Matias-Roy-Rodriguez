# RiuFrontend


## 🛠️ Stack

- Angular 19 (Standalone APIs)
- Angular Signals
- Angular Material
- Jest for unit testing
- Docker + Nginx
- RxJS
- Feature-based architecture with clean practices

---

## 🚀 Getting Started

### Development Server

```bash
npm install
npm start
```

Navigate to [http://localhost:4200](http://localhost:4200). The app will auto-reload on file changes.

---

## 🏗️ Production Build

```bash
npm run build
```

Build output is stored in `dist/riu-frontend/browser`.

---

## 🧪 Running Unit Tests

This project uses **Jest** instead of Karma.

```bash
npm test
```

To check coverage:

```bash
npm run test:coverage
```

The report will be generated in `coverage/riu-frontend/`.

---

## 🐳 Docker Support

You can build and run the app with Docker and Docker Compose.

### Build the image

```bash
docker build -t angular-heroes-app .
```

### Run with Docker Compose

```bash
docker-compose up --build
```

App will be available at: [http://localhost:4200](http://localhost:4200)

---

## 📌 Notes

- `withFakeLoading` is used to simulate HTTP requests and trigger the loading interceptor.
- The UI shows a global loading spinner while editing or deleting entities.
- Feature modules follow a clean separation of logic between pages, components, services, and shared utilities.

Enjoy 🚀
