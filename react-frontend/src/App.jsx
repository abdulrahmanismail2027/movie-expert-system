import { useState } from "react";
import axios from 'axios';

import "./App.css";
import MovieGrid from "./components/MovieGrid/MovieGrid.jsx";

export default function MovieRecommender() {
  const [formData, setFormData] = useState({
    titleType: "movie",
    genres: [],
    minRating: 0,
    maxRating: 10.0,
    minNumVotes: 0,
    maxNumVotes: 1000000,
    adult: false,
    minYear: 0,
    maxYear: 2025,
    minRuntime: 0,
    maxRuntime: 120,
    criteria: []
  });
  
  const [recommendations, setRecommendations] = useState([]);
  const [selectedMoviesIds, setSelectedMoviesIds] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuggestLoading, setIsSuggestLoading] = useState(false);
  const [isRatingRange, setIsRatingRange] = useState(false);
  const [isRuntimeRange, setIsRuntimeRange] = useState(false);
  const [search , setSearch] = useState("");

  const genres = [
    "action", "adventure", "animation", "biography", 
    "comedy", "crime", "documentary", "drama", 
    "family", "fantasy", "film-noir", "game-show",
    "history", "horror", "music", "musical", 
    "mystery", "news", "romance", "sci-fi","sport",
    "thriller","talk-show", "war", "western"
  ];
  
  const handleChange = (e) => {
    console.log(e)
    const { name, value, type, checked } = e.target;
    let newVal ;
    if(type === "checkbox"){
      newVal = checked;
    }else if (type === "radio"){
      newVal = [value];
    }else if (type === "number"){
      newVal = Number(value);
    }else{
      newVal = value;
    }
    setFormData(prevData => {
      const newData = {
        ...prevData,
        [name]: newVal
      };
      console.log(newData);
      return newData;
    });
  };
  
  const handleRatingRangeChange = (e) => {
    setIsRatingRange(e.target.value === "true");
  };

  const handleRuntimeRangeChange = (e) => {
    setIsRuntimeRange(e.target.value === "true");
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = async () => {
    setSuggestions([]);

    console.log(formData);
    setIsLoading(true);

    try {
      const searchResponse = await axios.post('http://localhost:8080/search', { query: search });
      const searchTitles = searchResponse.data.titles;

      console.log("Search titles: ", searchTitles);
      setRecommendations(searchTitles);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onMovieClick = (titleId) => {
    const index = selectedMoviesIds.indexOf(titleId);
    if (index === -1) {
      setSelectedMoviesIds(prev => [...prev, titleId]);
      console.log('Selected movie:', titleId)
    } else {
      const newSelectedMovies = structuredClone(selectedMoviesIds)
      newSelectedMovies.splice(index, 1);
      setSelectedMoviesIds(newSelectedMovies);
      console.log('Deselected movie:', titleId)
    }
  }

  const handleSuggest = async () => {
    if (!selectedMoviesIds || selectedMoviesIds.length === 0) {
      console.warn("No movies selected.");
      return;
    }

    setIsSuggestLoading(true);

    try {
      const suggestionResponse = await axios.post('http://localhost:8080/suggest', {titleIds: selectedMoviesIds});
      const suggestionTitles = suggestionResponse.data.titles;

      console.log("Suggestion titles:", suggestionTitles);
      setSuggestions(suggestionTitles);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsSuggestLoading(false);
    }
  };

  const handleSubmit = async () => {
        setSuggestions([]);
        console.log(formData);
        setIsLoading(true);

        try {

          const findResponse = await axios.post('http://localhost:8080/find', formData);
          const findTitles = findResponse.data.titles;

          console.log("Find titles: ", findTitles);
          setRecommendations(findTitles);
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setIsLoading(false);
        }
        ////////////////////////////////////// call backend ////////////////////////////////
        // setTimeout(() => {
        //   // the formate of the response data
        //   const mockRecommendations = [
        //     {
        //       titleId: "1",
        //       year: 2008,
        //       rating: 9.0,
        //       numVotes: 200,
        //       genres: ["short", "history", "romance"],
        //       titleType: "movie",
        //       primaryTitle: "The Dark Knight",
        //       originalTitle: "Batman",
        //       adult: false,
        //       runtime: 152,
        //
        //       // poster: "/api/placeholder/300/450"
        //     }
        //   ];
        //
        //   setRecommendations(mockRecommendations);
        //   setIsLoading(false);
        // }, 500);
      };
  
  const handleGenreToggle = (genre) => {
    const isActive = formData.genres.includes(genre);
    const updatedGenres = isActive
      ? formData.genres.filter(g => g !== genre)
      : [...formData.genres, genre];
    setFormData({ ...formData, genres: updatedGenres });
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit()
    }
  }
  
  return (
    <div className="movie-recommender">
      <div className="content-container">
        <header className="header">
          <h1 className="app-title">🎬 Movie Recommender</h1>
        </header>
        
        <div className="form-panel">
          <div className="search-container">
            <input type="text" value={search} placeholder="Search Films..."  onChange={handleSearchChange}  onKeyPress={handleKeyPress}/>
            <button onClick={handleSearchSubmit} className="search-submit-button">🔍</button>
          </div>

          <h2 className="panel-title">Find Your Perfect Movie</h2>
          
          <div className="form-grid">
            {/* Rating */}
            <div className="form-group">
              <label className="form-label">⭐ Rating</label>
              <div className="input-container">
                <select 
                  name="ratingType" 
                  value={isRatingRange.toString()} 
                  onChange={handleRatingRangeChange}
                  className="select-field"
                >
                  <option value="false">Minimum</option>
                  <option value="true">Range</option>
                </select>
                
                <div className="input-row">
                  {isRatingRange ? (
                    <>
                      <input 
                        type="number" 
                        name="minRating"
                        min={0.0}
                        max={10.0}
                        step={0.1}
                        value={formData.minRating}
                        onChange={handleChange} 
                        className="number-input" 
                      />
                      <span className="range-separator">to</span>
                      <input 
                        type="number" 
                        name="maxRating"
                        min={0.0}
                        max={10.0}
                        step={0.1}
                        value={formData.maxRating}
                        onChange={handleChange} 
                        className="number-input" 
                      />
                    </>
                  ) : (
                    <input 
                      type="number" 
                      name="minRating"
                      min={0.0}
                      max={10.0}
                      step={0.1}
                      value={formData.minRating}
                      onChange={handleChange} 
                      className="number-input" 
                    />
                  )}
                </div>
              </div>
            </div>
            
            {/* Title Type */}
            <div className="form-group">
              <label className="form-label">🎞️ Title Type</label>
              <select
                name="titleType"
                value={formData.titleType}
                onChange={handleChange}
                className="select-field full-width"
              >
                <option value="movie">Movie</option>
                <option value="tvSeries">TV Series</option>
                <option value="short">Short Film</option>
                <option value="video">Video</option>
                <option value="podcastSeries">Podcast Series</option>
                <option value="podcastEpisode">Podcast Episode</option>
              </select>
            </div>
            
            {/* Year Range */}
            <div className="form-group">
              <label className="form-label">📅 Release Year Range</label>
              <div className="input-row">
                <input
                  type="number"
                  name="minYear"
                  placeholder="From"
                  min={1900}
                  max={2025}
                  value={formData.minYear}
                  onChange={handleChange}
                  className="number-input"
                />
                <span className="range-separator">to</span>
                <input
                  type="number"
                  name="maxYear"
                  placeholder="To"
                  min={1900}
                  max={2025}
                  value={formData.maxYear}
                  onChange={handleChange}
                  className="number-input"
                />
              </div>
            </div>
            
            {/* Running Time */}
            <div className="form-group">
              <label className="form-label">🕒 Runtime</label>
              <div className="input-container">
                <select 
                  name="runtimeType" 
                  value={isRuntimeRange.toString()} 
                  onChange={handleRuntimeRangeChange}
                  className="select-field"
                >
                  <option value="false">Minimum</option>
                  <option value="true">Range</option>
                </select>
                
                <div className="input-row">
                  {isRuntimeRange ? (
                    <>
                      <input 
                        type="number" 
                        name="minRuntime"
                        min={1}
                        max={300}
                        value={formData.minRuntime}
                        onChange={handleChange} 
                        className="number-input" 
                      />
                      <span className="range-separator">to</span>
                      <input 
                        type="number" 
                        name="maxRuntime"
                        min="1"
                        max="300"
                        value={formData.maxRuntime}
                        onChange={handleChange} 
                        className="number-input" 
                      />
                    </>
                  ) : (
                    <input 
                      type="number" 
                      name="minRuntime"
                      min={1}
                      max={300}
                      value={formData.minRuntime}
                      onChange={handleChange} 
                      className="number-input full-width" 
                    />
                  )}
                </div>
              </div>
            </div>
            
            {/* Family Friendly */}
            <div className="form-group">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="adult"
                  checked={formData.adult}
                  onChange={handleChange}
                  className="custom-checkbox"
                />
                <span className="checkbox-label">👪 Family Friendly</span>
              </label>
            </div>

            {/* New or Classic*/}
            <div className="form-group">
              <div className="radio-group">
                <label className="radio-container">
                  <input 
                    type="radio" 
                    name="criteria"
                    value="new" 
                    checked={formData.criteria.includes("new")}
                    onChange={handleChange} 
                  />
                  <span className="radio-label">New</span>
                </label>
                <label className="radio-container">
                  <input 
                    type="radio" 
                    name="criteria"
                    value="classic" 
                    checked={formData.criteria.includes("classic")}
                    onChange={handleChange} 
                  />
                  <span className="radio-label">Classic</span>
                </label>
              </div>
            </div>
            
            {/* Genre */}
            <div className="form-group genre-section">
              <label className="form-label">🔍 Genre</label>
              <div className="genre-grid">
                {genres.map(genre => {
                  const isActive = formData.genres.includes(genre);
                  return (
                    <button
                      key={genre}
                      type="button"
                      onClick={() => handleGenreToggle(genre)}
                      className={`genre-button ${isActive ? 'active' : ''}`}
                    >
                      {genre.charAt(0).toUpperCase() + genre.slice(1).replace('-', ' ')}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="submit-container">
            <button
              onClick={handleSubmit}
              className="submit-button"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="loading-spinner"></div>
                  Finding Movies...
                </>
              ) : (
                <>
                  🎬 Find Movies
                </>
              )}
            </button>
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
            <div className="results-panel">
              <h2 className="results-title">Movies</h2>
              <MovieGrid
                  movies={recommendations}
                  selectedMoviesIds={selectedMoviesIds}
                  onMovieClick={onMovieClick}
              />
            <div className="submit-container">
                <button 
                  onClick={handleSuggest} 
                  className="submit-button"
                  disabled={isSuggestLoading}
                >
                  {isSuggestLoading ? (
                  <>
                    <div className="loading-spinner"></div>
                    Finding Suggestions...
                  </>
                ) : (
                  <>
                    Find similar titles
                </>
                )}
                </button>
              </div>
            </div>
        )}

        {/* Suggestions */}
        {suggestions.length > 0 && (
            <div className="results-panel" style={{marginTop: '30px'}}>
              <h2 className="results-title">Suggestions</h2>
              <MovieGrid
                movies={suggestions}
              />
            </div>
        )}
      </div>
    </div>
  );
}