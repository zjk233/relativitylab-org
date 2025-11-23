(function() {
    // --- 1. Resource Injection (CSS & Fonts) ---
    const tailwindScript = document.createElement('script');
    tailwindScript.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(tailwindScript);

    const fontLink = document.createElement('link');
    fontLink.rel = "stylesheet";
    fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap";
    document.head.appendChild(fontLink);
    //sdw



    // analytics.js
    (function() {
        const gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-TLM5FMP9KX";
        document.head.appendChild(gaScript);

        const inlineScript = document.createElement('script');
        inlineScript.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TLM5FMP9KX');
        `;
        document.head.appendChild(inlineScript);
    })();

    function initLayout() {
        const ROOT_PATH = window.location.pathname.includes('/demo-html/')
            ? '../'
            : './';

        // --- 2. Inject Custom CSS (Grid Only, NO body overrides) ---
        const style = document.createElement('style');
        style.innerHTML = `
            /* Sci-fi Grid Background */
            .bg-grid-canvas {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: -1;
                background-size: 40px 40px;
                background-image:
                    linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
                mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
                -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);

        // Add grid background
        const bgGrid = document.createElement('div');
        bgGrid.className = "bg-grid-canvas";
        document.body.prepend(bgGrid);

        // --- 3. Floating Back Button ---
        const headerHTML = `
            <div class="fixed bottom-4 left-6 z-50">
                <a href="${ROOT_PATH}index.html"
                   class="px-6 py-2 rounded-full text-sm font-medium bg-white/5 border border-white/10 
                          text-white hover:bg-white/10 hover:border-accent/50 transition-all duration-200 backdrop-blur-md">
                    Back to Home
                </a>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', headerHTML);
    }
})();
