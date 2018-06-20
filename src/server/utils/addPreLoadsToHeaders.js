import getPreLoadingLink from './getPreLoadingLink';

/*
* Add Link field to http headers for pre loading resources
* */
const preLoadingResources = ['/default.css', '/client.js'].map(getPreLoadingLink);

function addPreLoadsToHeaders(headers) {
    headers['Link'] = preLoadingResources.join(',');
}

export default addPreLoadsToHeaders;
