import moment from "moment";
import _ from 'lodash';

const apis = {
    /**
     * API to call data
     * @param url
     * @param data
     * @param method
     * @param headers
     * @returns {Promise}
     */
    callApi: (url, data = null, method = 'GET', headers = {'content-type': 'application/json'}) => {
        let options = {
            cache: 'no-cache',
            headers: headers,
            method: method
        };
        if (data !== null) {
            options.body = JSON.stringify(data);
        }
        return new Promise((resolve, reject) => {
            fetch(url, options)
                .then(res => {
                    res.json().then(respJson => {
                        resolve(respJson);
                    });
                })
                .catch(error => {
                    reject(error);
                });
        });
    },

    /**
     * Transform Gist response  
     * @param responseData 
     */
    getTransformedGistList: (responseData) => {
        const transformedGistList = [];
        if (typeof (responseData) !== 'undefined' && responseData !== null && responseData !== false) {
            responseData.map((data) => {
                let gistfiles = [];
                Object.values(data.files).map(file => {
                    return gistfiles.push({
                        type: file.type ? file.type : '',
                        language: file.language ? file.language : ''
                    })
                });
                return transformedGistList.push({
                        html_url: data.html_url ? data.html_url : null,
                        forks_url: data.forks_url ? data.forks_url : null,
                        description: data.description ? data.description : '',
                        comments: data.comments ? data.comments : 0,
                        created_at: data.created_at ? moment(data.created_at).format('YYYY-MM-DD - HH:mm') : '',
                        updated_at: data.updated_at ? moment(data.updated_at).format('YYYY-MM-DD - HH:mm') : '',
                        files: gistfiles,
                        forks: []
                });
            });
            // return transformed GistList
            return transformedGistList
        } else {
            return false;
        }
    },

    /**
     * Transform Gist forks list  
     * @param gistList 
     */
    getTransformedForksLists: async (gistList) => {
        const forksLists = await apis.__getAllforks(gistList);
        for (let i = 0, len = gistList.length; i < len; i++) {
            const forksListRes = forksLists[i];
            // check if forks api return items 
            if(forksListRes.length > 0 && !forksListRes.message) {
                // get the latest 3 forks users form forks array  
                forksListRes.sort((a, b) => (a.created_at !== b.created_at && a.created_at !== true) ? -1 : 1).slice(0, 3).map( item => {
                    return gistList[i]['forks'].push({
                        username: typeof (item.owner) !== 'undefined' && item.owner.login ? item.owner.login : '',
                        avatar_url: typeof (item.owner) !== 'undefined' && item.owner.avatar_url ? item.owner.avatar_url : '',
                        html_url: typeof (item.owner) !== 'undefined' && item.owner.html_url ? item.owner.html_url : '',
                        created_at: item.created_at ? moment(item.created_at).format('YYYY-MM-DD - HH:mm') : '',
                    });
                })
            } else if(forksListRes.message) {
                // log error if can't access fork url
                console.error(`Can't access ${gistList[i]['forks_url']}. Error msg: ${forksListRes.message}`);
            }
        }
        return gistList;
    },

    /**
     * Call all related forks list Apis
     * @param gistList 
     */
    __getAllforks: async (gistList) => {
        return await Promise.all(_.map(gistList, gistItem => apis.callApi(gistItem['forks_url'])));
    }
}

export default apis;
