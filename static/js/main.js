// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'var(--nav-bg)';
        navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
        navbar.style.background = 'var(--nav-bg)';
        navbar.style.boxShadow = 'none';
    }
});

// Load Projects Dynamically
async function loadProjects() {
    try {
        const response = await fetch('/api/projects');
        const projects = await response.json();
        const worksGrid = document.getElementById('works-grid');
        
        worksGrid.innerHTML = projects.map(project => `
            <div class="work-card" data-aos="fade-up" data-aos-delay="${projects.indexOf(project) * 100}">
                <div class="work-image">
                    <img src="/static/images/${project.image}" alt="${project.title}" class="work-img">
                </div>
                <div class="work-content">
                    <div class="work-category">${project.category}</div>
                    <h3 class="work-title">${project.title}</h3>
                    <p class="work-description">${project.description}</p>
                    <div class="work-tech">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    ${project.github_link || project.live_link || project.demo_video ? `
                    <div class="work-links">
                        ${project.github_link ? `
                        <a href="${project.github_link}" target="_blank" class="github-link">
                            <i class="fab fa-github"></i>
                            View on GitHub
                        </a>
                        ` : ''}
                        ${project.live_link ? `
                        <a href="${project.live_link}" target="_blank" class="live-link">
                            <i class="fas fa-external-link-alt"></i>
                            View Live Site
                        </a>
                        ` : ''}
                        ${project.demo_video ? `
                        <a href="${project.demo_video}" target="_blank" class="demo-link">
                            <i class="fas fa-play-circle"></i>
                            Watch Demo
                        </a>
                        ` : ''}
                    </div>
                    ` : ''}
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

// Load Skills Dynamically
async function loadSkills() {
    try {
        const response = await fetch('/api/skills');
        const skills = await response.json();
        const technicalSkillsList = document.getElementById('technical-skills-list');
        const softSkillsList = document.getElementById('soft-skills-list');
        
        // Load technical skills
        technicalSkillsList.innerHTML = skills.technical.map((skill, index) => `
            <span class="skill-tag" data-aos="bounce-in" data-aos-duration="600" data-aos-delay="${600 + index * 100}">${skill}</span>
        `).join('');
        
        // Load soft skills
        softSkillsList.innerHTML = skills.soft.map((skill, index) => `
            <span class="skill-tag" data-aos="bounce-in" data-aos-duration="600" data-aos-delay="${800 + index * 100}">${skill}</span>
        `).join('');
    } catch (error) {
        console.error('Error loading skills:', error);
    }
}

// Load Experience Dynamically
async function loadExperience() {
    try {
        const response = await fetch('/api/experience');
        const experience = await response.json();
        const timeline = document.getElementById('timeline');
        
        timeline.innerHTML = experience.map(exp => `
            <div class="timeline-item" data-aos="fade-up">
                <div class="timeline-content">
                    <h3 class="timeline-title">${exp.title}</h3>
                    <div class="timeline-company">${exp.company}</div>
                    <div class="timeline-period">${exp.period}</div>
                    <p class="timeline-description">${exp.description}</p>
                </div>
                <div class="timeline-dot"></div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading experience:', error);
    }
}

// Contact Form Handling
document.getElementById('contact-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };
    
    // Show success message (in a real app, you'd send this to a server)
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    
    // Reset form
    document.getElementById('contact-form').reset();
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        background: type === 'success' ? 'var(--primary-color)' : 'var(--secondary-color)',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        boxShadow: 'var(--shadow-lg)',
        zIndex: '9999',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Intersection Observer for Additional Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for custom animations
document.addEventListener('DOMContentLoaded', () => {
    // Load dynamic content
    loadProjects();
    loadSkills();
    loadExperience();
    
    // Observe skill tags for animation
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(20px)';
        tag.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(tag);
    });
    
    // Observe work cards for hover effects
    document.querySelectorAll('.work-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Parallax effect removed to prevent interference with other sections
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let index = 0;
        
        function typeText() {
            if (index < text.length) {
                heroTitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeText, 50);
            }
        }
        
        setTimeout(typeText, 1000);
    }
});

// Add CSS for notification
const notificationStyles = `
    .notification {
        font-family: inherit;
        font-size: 0.9rem;
        max-width: 300px;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = notificationStyles;
document.head.appendChild(styleSheet);

// Performance optimization - Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handlers
const debouncedScrollHandler = debounce(() => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
        navbar.style.boxShadow = 'none';
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// Add loading states for better UX
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Console welcome message
console.log('%c👋 Welcome to Carl Cabrera\'s Portfolio!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ using Flask, HTML, CSS, and JavaScript', 'color: #764ba2; font-size: 14px;');

// Resume View Functionality
document.addEventListener('DOMContentLoaded', () => {
    const viewResumeBtn = document.getElementById('view-resume-btn');
    
    if (viewResumeBtn) {
        viewResumeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Create modal overlay
            const modalOverlay = document.createElement('div');
            modalOverlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            // Create modal content
            const modalContent = document.createElement('div');
            modalContent.style.cssText = `
                background: var(--card-bg);
                padding: 1.5rem;
                border-radius: 12px;
                box-shadow: var(--shadow-lg);
                width: 95%;
                max-width: 1200px;
                max-height: 95%;
                position: relative;
                transform: scale(0.8);
                transition: transform 0.3s ease;
                text-align: center;
            `;
            
            modalContent.innerHTML = `
                <h2 style="margin-bottom: 1rem; color: var(--text-primary);">My Resume</h2>
                <div style="width: 95%; max-width: 1100px; height: 75vh; margin-bottom: 2rem; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
                    <iframe src="/resume/Professional Minimalist CV Resume.pdf" width="100%" height="100%" style="border: none;">
                        <p>Your browser does not support PDFs. 
                        <a href="/resume/Professional Minimalist CV Resume.pdf" download="Carl_Cabrera_Resume.pdf">Download resume</a> instead.</p>
                    </iframe>
                </div>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <button id="download-resume" style="
                        background: var(--primary-color);
                        color: white;
                        border: none;
                        padding: 0.75rem 1.5rem;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                        transition: all 0.3s ease;
                    ">
                        <i class="fas fa-download"></i> Download Resume
                    </button>
                    <button id="close-modal" style="
                        background: var(--text-muted);
                        color: white;
                        border: none;
                        padding: 0.75rem 1.5rem;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: 600;
                        transition: all 0.3s ease;
                    ">
                        <i class="fas fa-times"></i> Close
                    </button>
                </div>
            `;
            
            modalOverlay.appendChild(modalContent);
            document.body.appendChild(modalOverlay);
            
            // Animate in
            setTimeout(() => {
                modalOverlay.style.opacity = '1';
                modalContent.style.transform = 'scale(1)';
            }, 10);
            
            // Close modal functions
            const closeModal = () => {
                modalOverlay.style.opacity = '0';
                modalContent.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    document.body.removeChild(modalOverlay);
                }, 300);
            };
            
            // Event listeners
            document.getElementById('close-modal').addEventListener('click', closeModal);
            document.getElementById('download-resume').addEventListener('click', () => {
                // Try to download the new resume file
                const link = document.createElement('a');
                link.href = '/resume/Professional Minimalist CV Resume.pdf';
                link.download = 'Carl_Cabrera_Resume.pdf';
                link.click();
                
                showNotification('Resume download started!', 'success');
            });
            
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    closeModal();
                }
            });
            
            // Close on Escape key
            const handleEscape = (e) => {
                if (e.key === 'Escape') {
                    closeModal();
                    document.removeEventListener('keydown', handleEscape);
                }
            };
            document.addEventListener('keydown', handleEscape);
        });
    }
});
