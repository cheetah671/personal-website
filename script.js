// Combined script.js that handles both user tracking and text analysis

// ================ User Interaction Tracking ================
function trackUserInteractions() {
    // About yourself paragraph
    const aboutSection = document.querySelector('.about-text p:first-child');
    if (aboutSection) {
        // Track view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const timestamp = new Date().toISOString();
                    console.log(`${timestamp}, view, about-paragraph`);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(aboutSection);

        // Track click
        aboutSection.addEventListener('click', (e) => {
            const timestamp = new Date().toISOString();
            console.log(`${timestamp}, click, about-paragraph`);
        });
    }

    // Profile picture
    const profilePic = document.querySelector('.profile-pic');
    if (profilePic) {
        // Track view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const timestamp = new Date().toISOString();
                    console.log(`${timestamp}, view, profile-image`);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(profilePic);

        // Track click
        profilePic.addEventListener('click', (e) => {
            const timestamp = new Date().toISOString();
            console.log(`${timestamp}, click, profile-image`);
        });
    }

    // Local pictures from birthplace (gallery images)
    const galleryImages = document.querySelectorAll('.gallery-item img');
    galleryImages.forEach((img, index) => {
        // Track view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const timestamp = new Date().toISOString();
                    console.log(`${timestamp}, view, local-image-${index + 1}`);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(img);

        // Track click
        img.addEventListener('click', (e) => {
            const timestamp = new Date().toISOString();
            console.log(`${timestamp}, click, local-image-${index + 1}`);
        });
    });

    // Education background (timeline items)
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        // Track view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const timestamp = new Date().toISOString();
                    console.log(`${timestamp}, view, education-item-${index + 1}`);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(item);

        // Track click
        item.addEventListener('click', (e) => {
            const timestamp = new Date().toISOString();
            console.log(`${timestamp}, click, education-item-${index + 1}`);
        });
    });

    // Technical skills (skill categories)
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach((category, index) => {
        // Track view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const timestamp = new Date().toISOString();
                    console.log(`${timestamp}, view, skill-category-${index + 1}`);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(category);

        // Track click
        category.addEventListener('click', (e) => {
            const timestamp = new Date().toISOString();
            console.log(`${timestamp}, click, skill-category-${index + 1}`);
        });
    });

    // Track all other click events on the page
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (target.tagName && target !== document && target !== window) {
            const timestamp = new Date().toISOString();
            let elementType = target.tagName.toLowerCase();
            
            // Get more specific type if available
            if (target.classList.length > 0) {
                elementType = target.classList[0];
            } else if (target.id) {
                elementType = target.id;
            }
            
            console.log(`${timestamp}, click, ${elementType}`);
        }
    });

    // Track page views for sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const timestamp = new Date().toISOString();
                    const sectionId = section.id || 'unnamed-section';
                    console.log(`${timestamp}, view, ${sectionId}-section`);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(section);
    });

    // Initial page load tracking
    const initialLoadTimestamp = new Date().toISOString();
    console.log(`${initialLoadTimestamp}, view, page-load`);
}

// ================ Text Analysis Tool ================
function setupTextAnalysis() {
    const textInput = document.getElementById('textInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const basicStats = document.getElementById('basicStats');
    const pronounsStats = document.getElementById('pronounsStats');
    const prepositionsStats = document.getElementById('prepositionsStats');
    const articlesStats = document.getElementById('articlesStats');

    // Common pronouns in English
    const pronouns = [
        'i', 'me', 'my', 'mine', 'myself',
        'you', 'your', 'yours', 'yourself', 'yourselves',
        'he', 'him', 'his', 'himself',
        'she', 'her', 'hers', 'herself',
        'it', 'its', 'itself',
        'we', 'us', 'our', 'ours', 'ourselves',
        'they', 'them', 'their', 'theirs', 'themselves',
        'who', 'whom', 'whose', 'which', 'that'
    ];

    // Common prepositions in English
    const prepositions = [
        'about', 'above', 'across', 'after', 'against', 'along', 'among', 'around',
        'at', 'before', 'behind', 'below', 'beneath', 'beside', 'between', 'beyond',
        'by', 'down', 'during', 'except', 'for', 'from', 'in', 'inside', 'into',
        'like', 'near', 'of', 'off', 'on', 'onto', 'out', 'outside', 'over',
        'past', 'since', 'through', 'throughout', 'to', 'toward', 'under',
        'underneath', 'until', 'up', 'upon', 'with', 'within', 'without'
    ];

    // Articles in English
    const articles = ['a', 'an', 'the'];

    if (analyzeBtn) {
        analyzeBtn.addEventListener('click', analyzeText);
    }

    function analyzeText() {
        const text = textInput.value.trim();
        
        if (!text) {
            alert('Please enter some text to analyze');
            return;
        }

        // Basic statistics
        const letters = text.replace(/[^a-zA-Z]/g, '').length;
        const words = text.match(/\b\w+\b/g)?.length || 0;
        const spaces = text.match(/ /g)?.length || 0;
        const newlines = text.match(/\n/g)?.length || 0;
        const specialChars = text.length - letters - spaces - newlines;

        // Display basic stats
        basicStats.innerHTML = `
            <div class="stat-item"><span>Letters:</span><span>${letters}</span></div>
            <div class="stat-item"><span>Words:</span><span>${words}</span></div>
            <div class="stat-item"><span>Spaces:</span><span>${spaces}</span></div>
            <div class="stat-item"><span>Newlines:</span><span>${newlines}</span></div>
            <div class="stat-item"><span>Special Characters:</span><span>${specialChars}</span></div>
        `;

        // Tokenize and count pronouns
        const pronounCounts = countWords(text, pronouns);
        displayWordCounts(pronounCounts, pronounsStats);

        // Tokenize and count prepositions
        const prepositionCounts = countWords(text, prepositions);
        displayWordCounts(prepositionCounts, prepositionsStats);

        // Tokenize and count articles
        const articleCounts = countWords(text, articles);
        displayWordCounts(articleCounts, articlesStats);
    }

    function countWords(text, wordList) {
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        const counts = {};
        
        wordList.forEach(word => {
            counts[word] = 0;
        });

        words.forEach(word => {
            if (wordList.includes(word)) {
                counts[word] = (counts[word] || 0) + 1;
            }
        });

        // Convert to array and sort by count descending
        return Object.entries(counts)
            .filter(([_, count]) => count > 0)
            .sort((a, b) => b[1] - a[1]);
    }

    function displayWordCounts(countsArray, container) {
        if (countsArray.length === 0) {
            container.innerHTML = '<p>No matches found</p>';
            return;
        }

        container.innerHTML = countsArray
            .map(([word, count]) => `
                <div class="word-count-item">
                    <span>${word}:</span>
                    <span>${count}</span>
                </div>
            `)
            .join('');
    }
}

// ================ Initialize Everything ================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize user interaction tracking
    trackUserInteractions();
    
    // Initialize text analysis tool (if on the page with the tool)
    if (document.getElementById('textInput')) {
        setupTextAnalysis();
    }
});