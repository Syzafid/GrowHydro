
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import './App.css';

// Add a loading indicator to show before React initializes
document.body.innerHTML = `
  <div id="initial-loader" style="
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background: linear-gradient(135deg, #E8F5E9 0%, #FFF8E1 100%);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
  ">
    <div style="text-align: center;">
      <div style="
        width: 60px;
        height: 60px;
        border: 4px solid rgba(46, 125, 50, 0.1);
        border-left-color: #2E7D32;
        border-radius: 50%;
        animation: loader-spin 1s linear infinite;
      "></div>
      <p style="
        margin-top: 16px;
        color: #2E7D32;
        font-family: 'Inter', sans-serif;
        font-size: 16px;
      ">GrowSpace Loading...</p>
    </div>
  </div>
  <style>
    @keyframes loader-spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    body {
      margin: 0;
      padding: 0;
      overflow-x: hidden;
    }
  </style>
  <div id="root"></div>
`;

// Create root and render app
const root = createRoot(document.getElementById('root')!);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Remove the initial loader once React has taken over
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('initial-loader');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.5s ease';
      setTimeout(() => {
        if (loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 500);
    }
  }, 300);
});
