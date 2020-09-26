import React from 'react';

import SearchItem from './SearchItem';

const SearchList = ({searchResults, errorMessage}) => {

    return (
        <div className="wrap" data-testid="searchListWarp">
            <div className="container">
            {!errorMessage && searchResults.length > 0 ? 
                <ul className="flex-list" data-testid="searchList">
                {searchResults.map((item, index) => {
                    return (
                    <div key={index}>
                        <SearchItem item={item}/> 
                        <br/><hr/>
                    </div>
                    );
                })}
                </ul> 
                : 
                <div className="row d-flex justify-content-center alert">
                {errorMessage}
                </div> 
            }
            </div>
      </div>
    );
    
};

export default SearchList;