import { useEffect, useState } from "react";
import md5 from "crypto-js/md5";

function UrlShortForm() {
  const [url, setUrl] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState([]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setUrl(event.target.value);
    handleShortenUrl();
  };

  const handleShortenUrl = () => {
    // Generate a new shortened URL key
    const key = md5(url).toString().slice(0, 8);

    // Add the new URL to the map of shortened URLs
    const updatedMap = { ...shortenedUrls, [key]: url };

    setShortenedUrls(updatedMap);

    // Save the updated map to localStorage
    localStorage.setItem("shortenedUrls", JSON.stringify(updatedMap));

    // Clear the input field
    setUrl("");
  };

  useEffect(() => {
    const storedUrls = JSON.parse(
      localStorage.getItem("shortenedUrls") || "[]"
    );
    setShortenedUrls(storedUrls);
  }, []);

  return (
    <>
      <div className="w-full max-w-xs mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="url"
            >
              URL to shorten
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="url"
              type="text"
              placeholder="https://www.example.com"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Shorten
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-3">
        {shortenedUrls &&
          Object.keys(shortenedUrls).map((key) => (
            <div
              className="bg-green-500 text-white font-bold py-2 px-4 rounded m-2"
              key={key}
            >
              <a href={import.meta.env.VITE_APP_BASE_URL + key}>
                {import.meta.env.VITE_APP_BASE_URL + key}
              </a>
              <button
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="url-shortened"
                onClick={() => {
                  navigator.clipboard.writeText(
                    import.meta.env.VITE_APP_BASE_URL + key
                  );
                }}
              >
                Copy
              </button>
            </div>
          ))}
      </div>
    </>
  );
}

export default UrlShortForm;
