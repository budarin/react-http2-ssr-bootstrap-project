// @flow
import env from '../../utils/getEnv';

function renderHTMLBottom(): string {
    return `</div>
            <script src="${env.STATIC_URL}client.js" defer></script>
        </body>
        <html>`;
}

export default renderHTMLBottom;
