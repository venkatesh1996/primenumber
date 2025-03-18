import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await axios.get(`http://localhost:7071/api/primeCheck?number=${number}`);
      setResult(response.data);
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Prime Number Checker</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Enter a number:
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </label>
        <button type="submit">Check</button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {result && (
        <div>
          <p>
            The number <strong>{result.number}</strong> is{" "}
            {result.isPrime ? "Prime" : "Not Prime"}.
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
