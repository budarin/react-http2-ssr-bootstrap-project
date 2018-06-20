import * as mime from 'mime-types';

function getFileDescription(file) {
    return {
        path: `/${file}`,
        filePath: `./${file}`,
        headers: { 'content-type': mime.lookup(file) },
    };
}

export default getFileDescription;
