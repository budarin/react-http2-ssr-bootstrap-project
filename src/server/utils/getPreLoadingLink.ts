interface IResourceTypes {
    css: string;
    js: string;
    [key: string]: string;
}

const resourceTypes: IResourceTypes = {
    css: 'style',
    js: 'script',
};

function getPreLoadingLink(resourcePath: string): string {
    const ext = resourcePath.split('.').pop();
    const resourceType = ext && resourceTypes[ext];

    return `<${resourcePath}>; rel="preload"; as="${resourceType}";`;
}

export default getPreLoadingLink;
