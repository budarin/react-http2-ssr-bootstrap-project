const renderRemoveSplashScript = `<script>
                window.clearTimeout(window.window.splashTimer);

                function clearSplash() {
                    const rootEl = document.getElementById('root');
                    const splashEl = document.getElementById('splash');

                    if (splashEl) {
                        while(rootEl.children.length) {
                            rootEl.removeChild(rootEl.children[0]);
                        }
                    }

                }

                if (window.showingSpash) {
                    window.onEndOfShowingSplash = clearSplash;
                } else {
                    clearSplash();
                }
            </script>
        `;

export default renderRemoveSplashScript;
