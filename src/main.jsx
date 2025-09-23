//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CookiesProvider } from "react-cookie";

async function prepare() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    await worker.start();
  }
}

prepare().then(() => {
  createRoot(document.getElementById('root')).render(
    <CookiesProvider>
      <App />
    </CookiesProvider>,
  );
})
