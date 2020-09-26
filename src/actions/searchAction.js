
import { appConfig } from "./../config/app.config";
import apis from "./../helpers/apis";

const searchAction = {
    /**
     * Get gistList by username
     * @param searchQuery 
     */
    getGistByUserName: async (searchQuery) => {
        const url = searchAction.__replacePlaceholderParams(appConfig.API_GITHUB_SEARCH, {username: searchQuery});
          try {
            const response = await apis.callApi(url);
            if (response.length > 0 && !response.message) {
                const gistList = apis.getTransformedGistList(response);
                return await apis.getTransformedForksLists(gistList); 
                // return gistList; 
            } else if (response.message) {
              return {'message': response.message};
            }
            return {'message': 'No Results found'};
          } catch (error) {
            console.log(error.message);
          }
    },
    
    /**
     * Replace url placeholder params
     * @param url 
     * @param params 
     */
    __replacePlaceholderParams(url, params) {
      let placeholderParams = url.match(/\{[a-z_A-Z\-0-9]+\}/g);
      if (placeholderParams) {
          for (let i in placeholderParams) {
              let paramsKey = placeholderParams[i].replace(/\{|\}/g, "");
              url = url.replace(placeholderParams[i], params[paramsKey]);
              Reflect.deleteProperty(params, paramsKey);
          }
      }
      return url;
  },
}

export default searchAction;