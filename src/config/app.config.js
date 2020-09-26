import config from "./../config.json";

export const appConfig = {
    API_GITHUB_SEARCH: config.api_github_search || "https://api.github.com/users/{username}/gists",
    MIN_SEARCH_CHARACTERS: config.min_search_characters || 2,
    MAX_SEARCH_CHARACTERS: config.max_search_characters || 50,
    LOCAL_STORAGE_KEY: config.local_storage_key || "gistresentsearch"
};
