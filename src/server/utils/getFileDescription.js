// @flow
import * as mime from 'mime-types';

export type FileDescription = {
    path: string,
    filePath: string,
    headers: Object,
};

function getFileDescription(file: string): FileDescription {
    return {
        path: `/${file}`,
        filePath: `./${file}`,
        headers: { 'content-type': mime.lookup(file) },
    };
}

export default getFileDescription;
