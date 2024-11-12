
import '../stylesheets/search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

const Search = () => {
    return (
        <div className="search-bar">
            <div className="search-wrapper">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
                <input className="search-box" placeholder="Search" />
            </div>
        </div>
    );
};

export default Search;