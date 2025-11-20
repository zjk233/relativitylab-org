/**
 * layout.js - RelativityLab Global Layout Manager (Floating Back Button at Bottom-Left)
 *
 * Functions:
 * 1. Inject Tailwind CSS & Google Fonts
 * 2. Create Grid Background
 * 3. Create Floating "Back to Home" Button (bottom-left)
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
        };
        initLayout();
    };

    function initLayout() {
        // 检测是否在 demo-html 子目录，用于生成回首页路径
        const ROOT_PATH = window.location.pathname.includes('/demo-html/')
            ? '../'
            : './';

        // --- 2. Inject Custom CSS (Background Grid) ---
        const style = document.createElement('style');
        style.innerHTML = `
            body { 
                background-color: #050505; 
                margin: 0; 
                font-family: 'Inter', sans-serif; 
                color: white; 
                overflow-x: hidden;
                padding-bottom: 2.5rem; /* 避免内容挤到按钮上 */
            }

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

        // Add background
        const bgGrid = document.createElement('div');
        bgGrid.className = "bg-grid-canvas";
        document.body.prepend(bgGrid);

        // --- 3. Floating Back Button (moved to bottom-left) ---
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
