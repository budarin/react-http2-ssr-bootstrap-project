// @flow
const legalRoutes = ['/'];

function isLegalRoute(req) {
    return legalRoutes.indexOf(req.url) > -1;
}

export default isLegalRoute;
