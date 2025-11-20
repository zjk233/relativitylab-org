
/**
 * layout.js - RelativityLab Global Layout Manager
 * 
 * Functions:
 * 1. Inject Tailwind CSS & Google Fonts
 * 2. Create Grid Background
 * 3. Create Header (Home Link)
 * 4. Create Footer (Copyright + Email + Developer Link)
 */

(function() {
    // --- 1. Resource Injection (CSS & Fonts) ---
    const tailwindScript = document.createElement('script');
    tailwindScript.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(tailwindScript);

    const fontLink = document.createElement('link');
    fontLink.rel = "stylesheet";
    fontLink.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap";
    document.head.appendChild(fontLink);

    // Configure Tailwind Theme
    tailwindScript.onload = function() {
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        bgDark: '#050505',
                        glass: 'rgba(20, 20, 20, 0.6)',
                        borderGlass: 'rgba(255, 255, 255, 0.08)',
                        accent: '#38bdf8',
                        textMuted: '#94a3b8'
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    }
                }
            }
        }
        initLayout();
    };

    function initLayout() {
        // --- Configuration ---
        const SITE_TITLE = "RelativityLab";
        const COPYRIGHT_TEXT = "© 2025 RelativityLab. All rights reserved.";
        const CONTACT_EMAIL = "contact@relativitylab.org";
        const GITHUB_LINK = "https://github.com/zjk233";
        const GITHUB_TEXT = "About the Developer";

        // Nav Items (Just Home)
        const navItems = [
            { name: "Home", link: "index.html" }
        ];

        const currentPath = window.location.pathname.split("/").pop() || "index.html";

        // --- 2. Inject Custom CSS (Background Grid) ---
        const style = document.createElement('style');
        style.innerHTML = `
            body { background-color: #050505; margin: 0; font-family: 'Inter', sans-serif; color: white; overflow-x: hidden; }
            
            /* Sci-fi Grid Background */
            .bg-grid-canvas {
                position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;
                background-size: 40px 40px;
                background-image: linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                                  linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
                mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
                -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 100%);
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
        
        const bgGrid = document.createElement('div');
        bgGrid.className = "bg-grid-canvas";
        document.body.prepend(bgGrid);


        // --- 3. Generate Header HTML ---
        const headerHTML = `
            <header class="fixed top-0 left-0 w-full z-50 border-b border-borderGlass bg-glass backdrop-blur-md h-16">
                <div class="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
                    
                    <!-- Logo -->
                    <a href="index.html" class="flex items-center gap-2 group">
                        <div class="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-accent/50 transition-colors">
                            <svg class="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                            </svg>
                        </div>
                        <span class="text-lg font-semibold tracking-tight text-white group-hover:text-accent transition-colors">${SITE_TITLE}</span>
                    </a>

                    <!-- Navigation -->
                    <nav class="flex items-center gap-1 bg-white/5 p-1 rounded-full border border-white/5">
                        ${navItems.map(item => {
                            const isActive = currentPath === item.link;
                            const activeClass = isActive 
                                ? "bg-white/10 text-white shadow-sm border border-white/10" 
                                : "text-textMuted hover:text-white hover:bg-white/5";
                            
                            return `
                                <a href="${item.link}" class="px-5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${activeClass}">
                                    ${item.name}
                                </a>
                            `;
                        }).join('')}
                    </nav>

                    <!-- Right Spacer -->
                    <div class="w-8"></div>
                </div>
            </header>
        `;

        // --- 4. Generate Footer HTML ---
        const footerHTML = `
            <footer class="fixed bottom-0 left-0 w-full z-50 border-t border-borderGlass bg-glass backdrop-blur-md py-3">
                <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-textMuted">
                    
                    <!-- Copyright -->
                    <div class="opacity-80">${COPYRIGHT_TEXT}</div>
                    
                    <!-- Right Side: Email & GitHub -->
                    <div class="flex items-center gap-6">
                        
                        <!-- Email Link -->
                        <a href="mailto:${CONTACT_EMAIL}" class="hover:text-accent transition-colors">
                            ${CONTACT_EMAIL}
                        </a>

                        <!-- GitHub (About Developer) Link -->
                        <a href="${GITHUB_LINK}" target="_blank" class="flex items-center gap-2 hover:text-white transition-colors group">
                            <span>${GITHUB_TEXT}</span>
                            <svg class="w-4 h-4 text-textMuted group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                        </a>
                    </div>

                </div>
            </footer>
        `;

        document.body.insertAdjacentHTML('afterbegin', headerHTML);
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    }
})();