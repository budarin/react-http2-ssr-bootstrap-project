// @flow
import getPreLoadingLink from './getPreLoadingLink';

/*
* Add Link field to http headers for pre loading resources
* */
const preLoadingResources: Array<string> = ['/default.css', '/client.js'].map(getPreLoadingLink);

function addPreLoadsToHeaders(headers: Object): void {
    headers['Link'] = preLoadingResources.join(',');
}

export default addPreLoadsToHeaders;
