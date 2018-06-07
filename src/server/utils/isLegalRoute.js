// @flow
const legalRoutes: Array<string> = ['/'];

function isLegalRoute(req: Object): boolean {
    return legalRoutes.indexOf(req.url) > -1;
}

export default isLegalRoute;
