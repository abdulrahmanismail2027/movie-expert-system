import classes from './MovieGrid.module.css';

export default function MovieGrid({ movies, selectedMoviesIds, onMovieClick}) {
    return (
        <div className={classes.movieGrid}>
            {movies.map(movie => (
                <div key={movie.titleId}
                     className={`${classes.movieCard} ${selectedMoviesIds?.includes(movie.titleId) ? `${classes.movieCardActive}` : ''}`}
                     onClick={onMovieClick ? () => onMovieClick(movie.titleId) : null}
                >
                    <div className={classes.movieInfo}>
                        <span className={classes.movieTitle}>
                            {movie.primaryTitle} ({movie.year})
                        </span>
                        <div className={classes.movieStats}>
                            <div className={classes.movieRating}>
                                <span className={classes.starIcon}>⭐</span>
                                <span>{movie.rating}</span>
                            </div>
                            <div className={classes.runtime}>
                                <span className={classes.clockIcon}>⏱️</span>
                                <span>{movie.runtime} min</span>
                            </div>
                        </div>
                        <div className={classes.genreTags}>
                            {movie.genres.map((g, i) => (
                                <span key={i} className={classes.genreTag}>{g}</span>
                            ))}
                        </div>
                    </div>
                      <a
                          className='submit-button'
                          href={`https://www.imdb.com/title/${movie.titleId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                      >
                          IMDB Link
                      </a>
                </div>
            ))}
        </div>
    )
}