function logServerRequest(req) {
    const { url, method } = req;

    console.log('>> Path:', url, '>> Method:', method);
}

export default logServerRequest;
