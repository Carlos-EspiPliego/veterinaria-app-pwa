import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/global.css";

import { NextUIProvider } from "@nextui-org/react";

import { Provider } from 'react-redux'
import { store } from './app/store'

function Index() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  return (
    <React.StrictMode>
      <Provider store={store}>
        <NextUIProvider theme={theme}>
          <main className={`text-foreground bg-background ${theme}`}>
            <App />
          </main>
        </NextUIProvider>
      </Provider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Index />);