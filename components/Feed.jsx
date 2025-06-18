"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
const Feed = () => {
  const [prompts, setPrompts] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [filteredPrompts, setFilteredPrompts] = useState([]);
  useEffect(() => {
    const fetchPrompts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPrompts(data);
    };
    fetchPrompts();
  }, []);
  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return prompts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tags) ||
        regex.test(item.prompt)
    );
  };
  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setFilteredPrompts(searchResult);
      }, 500)
    );
  };

  const PromptCardList = ({ data }) => {
    return (
      <div className="mt-16 prompt_layout">
        {data.map((prompt) => (
          <PromptCard key={prompt.id} prompt={prompt} />
        ))}
      </div>
    );
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for prompt by tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {searchText ? (
        <PromptCardList data={filteredPrompts} />
      ) : (
        <PromptCardList data={prompts} />
      )}
    </section>
  );
};

export default Feed;
