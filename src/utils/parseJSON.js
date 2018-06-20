/*
* Safe parsing JSON
* */
function parseJSON(JSONString) {
    try {
        return JSON.parse(decodeURIComponent(JSONString));
    } catch (ex) {
        console.log('Ошибка разбора JSON строки:', JSONString, '->', ex.message);

        return {};
    }
}

export default parseJSON;
