// frontend/src/react-app-env.d.ts
/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_USE_MOCK_DATA: string;
    REACT_APP_API_BASE_URL: string;
  }
}
