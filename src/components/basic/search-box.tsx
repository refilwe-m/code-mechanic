// src/components/SearchBox.tsx
import React, { useState } from "react";

const SearchBox: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    // Simulate fetching data from an API based on the search term
    // Replace this with your actual data fetching logic
    const mockResults = ["Apple", "Banana", "Cherry", "Date"].filter((item) =>
      item.toLowerCase().includes(newSearchTerm.toLowerCase())
    );

    setResults(mockResults);
  };

  const handleClear = () => {
    setSearchTerm("");
    setResults([]);
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for items"
        className="border border-gray-300 px-4 py-2 rounded-md mb-4"
      />
      {results.length > 0 && (
        <div className="flex flex-col items-center space-y-2">
          {results.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border border-gray-300 px-4 py-2 rounded-md w-64"
            >
              <span>{item}</span>
              <button onClick={() => console.log(`Selected: ${item}`)}>
                Select
              </button>
            </div>
          ))}
          <button onClick={handleClear} className="mt-4">
            Clear Results
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
