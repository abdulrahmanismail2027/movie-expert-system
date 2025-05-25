import classes from './MovieGrid.module.css';
import { FaStar } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";

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
                                <FaStar className={classes.starIcon}></FaStar>
                                <span>{movie.rating}</span>
                            </div>
                            <div className={classes.runtime}>
                                <MdAccessTimeFilled className={classes.clockIcon}></MdAccessTimeFilled>
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
                          className={classes.linkButton}
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