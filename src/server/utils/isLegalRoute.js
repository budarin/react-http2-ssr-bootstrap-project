// @flow
const legalRoutes = ['/'];

function isLegalRoute(url) {
    return legalRoutes.indexOf(url) > -1;
}

export default isLegalRoute;
