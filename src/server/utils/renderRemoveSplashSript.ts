function renderRemoveSplashScript(): string {
    return `<script>
                window.clearTimeout(window.window.splashTimer);

                function clearSplash() {
                    const rootEl = document.getElementById('root');
                    const splashEl = document.getElementById('splash');

                    if (splashEl) {
                        const css = document.createElement('style');
                        const styles = '#splash { display: none }';

                        css.type = 'text/css';
                        if (css.styleSheet) {
                            css.styleSheet.cssText = styles;
                        } else {
                            css.appendChild(document.createTextNode(styles));
                        }

                        rootEl.append(css);
                    }
                }

                if (window.showingSpash) {
                    window.onEndOfShowingSplash = clearSplash;
                } else {
                    clearSplash();
                }
            </script>
        `;
}

export default renderRemoveSplashScript;
