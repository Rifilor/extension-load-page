/// <reference types="@types/chrome" />

declare global {
    const chrome: typeof chrome;
    interface Window {
      chrome: typeof chrome;
    }
  }
  
  export {};