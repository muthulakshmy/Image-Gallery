import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
// import { worker } from "./api/worker";

// Start MSW in development
// if (process.env.NODE_ENV === "development") {
//   worker.start();
// }

if (typeof window !== "undefined") {
  import("./mocks/browser").then(({ worker }) => {
    worker.start();
  });
}


const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
