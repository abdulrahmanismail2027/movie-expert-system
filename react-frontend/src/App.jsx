import { useState } from "react";
import "./App.css";

export default function MovieRecommender() {
  const [formData, setFormData] = useState({
    ratemin: "7",
    ratemax: "10",
    titleType: "movie",
    familyFriendly: false,
    startYear: "2010",
    endYear: "2023",
    runningTimemin: "120",
    runningTimemax: "300",
    genre: [],
    releaseEra: "new"
  });
  
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRatingRange, setIsRatingRange] = useState(false);
  const [isRuntimeRange, setIsRuntimeRange] = useState(false);

  const genres = [
    "action", "adventure", "animation", "biography", 
    "comedy", "crime", "documentary", "drama", 
    "family", "fantasy", "film-noir", "game-show",
    "history", "horror", "music", "musical", 
    "mystery", "news", "romance", "sci-fi","sport",
    "thriller","talk-show", "war", "western"
  ];
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => {
      const newData = {
        ...prevData,
        [name]: type === "checkbox" ? checked : value
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

  const handleSubmit = () => {
    console.log(formData);
    setIsLoading(true);
    
    ////////////////////////////////////// call backend ////////////////////////////////
    setTimeout(() => {
      // the formate of the response data
      const mockRecommendations = [
        {
          id: 1,
          title: "The Dark Knight",
          year: 2008,
          rating: 9.0,
          runtime: 152,
          genres: ["Action", "Crime", "Drama"],
          poster: "/api/placeholder/300/450"
        },
        {
          id: 2,
          title: "Inception",
          year: 2010,
          rating: 8.8,
          runtime: 148,
          genres: ["Action", "Sci-Fi", "Adventure"],
          poster: "/api/placeholder/300/450"
        }
      ];
      
      setRecommendations(mockRecommendations);
      setIsLoading(false);
    }, 500);
  };
  
  const handleGenreToggle = (genre) => {
    const isActive = formData.genre.includes(genre);
    const updatedGenres = isActive
      ? formData.genre.filter(g => g !== genre)
      : [...formData.genre, genre];
    setFormData({ ...formData, genre: updatedGenres });
  };
  
  return (
    <div className="movie-recommender">
      <div className="content-container">
        <header className="header">
          <h1 className="app-title">🎬 Movie Recommender</h1>
        </header>
        
        <div className="form-panel">
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
                        name="ratemin" 
                        min="1" 
                        max="10" 
                        step="0.1" 
                        value={formData.ratemin} 
                        onChange={handleChange} 
                        className="number-input" 
                      />
                      <span className="range-separator">to</span>
                      <input 
                        type="number" 
                        name="ratemax" 
                        min="1" 
                        max="10" 
                        step="0.1" 
                        value={formData.ratemax} 
                        onChange={handleChange} 
                        className="number-input" 
                      />
                    </>
                  ) : (
                    <input 
                      type="number" 
                      name="ratemin" 
                      min="1" 
                      max="10" 
                      step="0.1" 
                      value={formData.ratemin} 
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
                  name="startYear"
                  placeholder="From"
                  min="1900"
                  max="2025"
                  value={formData.startYear}
                  onChange={handleChange}
                  className="number-input"
                />
                <span className="range-separator">to</span>
                <input
                  type="number"
                  name="endYear"
                  placeholder="To"
                  min="1900"
                  max="2025"
                  value={formData.endYear}
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
                        name="runningTimemin" 
                        min="1" 
                        max="300" 
                        value={formData.runningTimemin} 
                        onChange={handleChange} 
                        className="number-input" 
                      />
                      <span className="range-separator">to</span>
                      <input 
                        type="number" 
                        name="runningTimemax" 
                        min="1" 
                        max="300" 
                        value={formData.runningTimemax} 
                        onChange={handleChange} 
                        className="number-input" 
                      />
                    </>
                  ) : (
                    <input 
                      type="number" 
                      name="runningTimemin" 
                      min="1" 
                      max="300" 
                      value={formData.runningTimemin} 
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
                  name="familyFriendly"
                  checked={formData.familyFriendly}
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
                    name="releaseEra" 
                    value="new" 
                    checked={formData.releaseEra === "new"} 
                    onChange={handleChange} 
                  />
                  <span className="radio-label">New</span>
                </label>
                <label className="radio-container">
                  <input 
                    type="radio" 
                    name="releaseEra" 
                    value="classic" 
                    checked={formData.releaseEra === "classic"} 
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
                  const isActive = formData.genre.includes(genre);
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
                  🎬 Find Recommendations
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="results-panel">
            <h2 className="results-title">Recommended Movies</h2>
            
            <div className="movie-grid">
              {recommendations.map(movie => (
                <div key={movie.id} className="movie-card">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="movie-poster"
                  />
                  <div className="movie-info">
                    <h3 className="movie-title">{movie.title} ({movie.year})</h3>
                    <div className="movie-stats">
                      <div className="movie-rating">
                        <span className="star-icon">⭐</span>
                        <span>{movie.rating.toFixed(1)}</span>
                      </div>
                      <div className="runtime">
                        <span className="clock-icon">⏱️</span>
                        <span>{movie.runtime} min</span>
                      </div>
                    </div>
                    <div className="genre-tags">
                      {movie.genres.map(genre => (
                        <span
                          key={genre}
                          className="genre-tag"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}