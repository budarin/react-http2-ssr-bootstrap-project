const resourceTypes = {
    css: 'style',
    js: 'script',
};

function getPreLoadingLink(resource) {
    const ext = resource.split('.').pop();
    const resourceType = resourceTypes[ext];

    return `<${resource}>; rel="preload"; as="${resourceType}";`;
}

export default getPreLoadingLink;
