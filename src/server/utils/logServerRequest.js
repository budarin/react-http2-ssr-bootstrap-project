// @flow
function logServerRequest(req: Object): void {
    const { url, method } = req;

    console.log('>> Path:', url, '>> Method:', method);
}

export default logServerRequest;
