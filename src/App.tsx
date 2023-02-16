import { useEffect, useState } from "react";
import "./App.css";
import UrlShortForm from "./assets/components/url-short-form";

function App() {
  useEffect(() => {
    // Check if the current path is a key in the map of shortened URLs
    const path = window.location.pathname.replace("/", "");
    // get shortened url from localStorage
    const shortenedUrls = JSON.parse(
      localStorage.getItem("shortenedUrls") || "[]"
    );

    // if the current path is a key in the map of shortened URLs
    if (shortenedUrls[path]) {
      // redirect to the URL value
      window.location.href = shortenedUrls[path];
    }
    if (shortenedUrls.hasOwnProperty(path)) {
      // Redirect to the corresponding URL
      window.location.href = shortenedUrls[path];
    }
  }, []);

  return (
    <div className="App">
      <div>
        <UrlShortForm />
      </div>
    </div>
  );
}

export default App;
