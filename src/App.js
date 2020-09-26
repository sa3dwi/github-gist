import React, { useState, useEffect, useCallback, useMemo } from 'react';

import { appConfig } from "./config/app.config";
import searchAction from "./actions/searchAction";
import useLocalStorage from "./hooks/useLocalStorage";

import SearchList from './components/search/SearchList';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [submitAction, setSubmitAction] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('No Results found');

  // use custom local storage hook to save resent search queries 
  const [resentSearch, setResentSearch, clearResentSearch] = useLocalStorage(appConfig.LOCAL_STORAGE_KEY,'');

  // input form handles 
  const handleChange = text => setSearchQuery(text);
  const handleClearResent = e => {
    e.preventDefault();
    clearResentSearch()
  };
  const handleSubmit = () => {
      setSubmitAction(true)
  };

  // submit when onKeyPress enter 
  const handleKeyPress = e => {
    if (e.key === 'Enter' && searchQuery.length > appConfig.MIN_SEARCH_CHARACTERS)
      setSubmitAction(true)
  }

  // search action
  const searchAct = useCallback(searchQuery => searchAction.getGistByUserName(searchQuery),[]);

  useEffect(() => {
    // check min search characters
    if(submitAction && searchQuery.length > appConfig.MIN_SEARCH_CHARACTERS) {
      // show loding msg 
      setErrorMessage('Loading...');
      // call search action with query 
      searchAct(searchQuery).then((res) => {
        // set serach results or show error msg
        if (res.message) {
          setErrorMessage(res.message);
        } else {
          setSearchResults(res);
          setErrorMessage(false);
        }
      }).finally( () => {
        // clear the side effects 
        setResentSearch(searchQuery);
        setSubmitAction(false);
      });
    }
  }, [submitAction, searchQuery, searchAct, setResentSearch])

  // memoizing search List Component
  const searchListComponant = useMemo(() => {
    return (<SearchList searchResults={searchResults} errorMessage={errorMessage} />)
  }, [searchResults, errorMessage])

  return (
    <>
      <header>
          <div className="container">
              <div className="MainLogo">
                <h3>
                  <img alt="gitHub_logo" width="64" height="64" src="images/gitHub_logo.png"/>
                  GitHub Gist Search
                </h3>
                <h6>Search with username below</h6>
              </div>
              <div className="mainSearch">
                      <input type="search" className="MainInput" name="q" id="q"
                      placeholder="Start typing to search .." 
                      autoComplete="off"
                      onChange={e => handleChange(e.target.value)}
                      onKeyPress={e => handleKeyPress(e)}
                      maxLength={appConfig.MAX_SEARCH_CHARACTERS}
                      data-testid="searchInput"/>
                      <button type="submit" data-testid="submitSearchBtn" className="MainInput" onClick={handleSubmit}>Search</button>
              </div>
              <div data-testid="resentSearch">
                {typeof(resentSearch) !== 'undefined' && resentSearch.length > 0 && 
                  <p>
                    <span className="strong7">ResentSearch:</span> {resentSearch.join(',')} <a href="/" className="clear_link" onClick={e => handleClearResent(e)}>Clear resent</a>
                  </p>
                }
              </div>
          </div>
      </header>

      {searchListComponant}
    </>
  );
}

export default App;
