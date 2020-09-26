import config from "./../config.json";

export const appConfig = {
    API_GITHUB_SEARCH: config.api_github_search,
    MIN_SEARCH_CHARACTERS: config.min_search_characters,
    MAX_SEARCH_CHARACTERS: config.max_search_characters,
    LOCAL_STORAGE_KEY: config.local_storage_key
};
