// @flow
import mime from 'mime-types';

function getFileDescription(file: string) {
    return {
        path: `/${file}`,
        filePath: `./${file}`,
        headers: mime.lookup(file),
    };
}

export default getFileDescription;
