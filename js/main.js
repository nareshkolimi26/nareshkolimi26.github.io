// Project Data
const projects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce platform with real-time inventory management and payment processing.",
        image: "path/to/ecommerce.jpg",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        category: "fullstack",
        demoUrl: "https://demo.example.com",
        githubUrl: "https://github.com/example/ecommerce"
    },
    {
        id: 2,
        title: "Task Management System",
        description: "A collaborative task management system with real-time updates and team collaboration features.",
        image: "path/to/taskmanager.jpg",
        technologies: ["Vue.js", "Express", "PostgreSQL", "Socket.io"],
        category: "fullstack",
        demoUrl: "https://demo.example.com",
        githubUrl: "https://github.com/example/taskmanager"
    },
    // {
    //     id: 3,
    //     title: "Portfolio Dashboard",
    //     description: "An interactive dashboard for tracking investment portfolios with real-time market data.",
    //     image: "path/to/dashboard.jpg",
    //     technologies: ["React", "D3.js", "Firebase"],
    //     category: "frontend",
    //     demoUrl: "https://demo.example.com",
    //     githubUrl: "https://github.com/example/dashboard"
    // },
    {
        id: 4,
        title: "RESTful API Service",
        description: "A scalable RESTful API service with authentication, rate limiting, and caching.",
        image: "path/to/api.jpg",
        technologies: ["Node.js", "Express", "Redis", "JWT"],
        category: "backend",
        demoUrl: "https://demo.example.com",
        githubUrl: "https://github.com/example/api"
    }
];

// DOM Elements
const projectsGrid = document.querySelector('.projects-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const contactForm = document.getElementById('contact-form');
const navLinks = document.querySelectorAll('.main-nav a');

// Initialize AOS
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll initialization
    initSmoothScroll();
    
    // Initialize projects
    populateProjects('all');
    
    // Initialize skill bars animation
    initSkillBars();
    
    // Initialize header scroll effect
    initHeaderScroll();
});

// Smooth Scroll
function initSmoothScroll() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
            
            // Update active link
            navLinks.forEach(link => link.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// Header Scroll Effect
function initHeaderScroll() {
    const header = document.querySelector('.main-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scrolling down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scrolling up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
}

// Populate Projects
function populateProjects(filter = 'all') {
    projectsGrid.innerHTML = '';
    
    const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(project => project.category === filter);
    
    filteredProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-overlay">
                    <div class="project-links">
                        <a href="${project.demoUrl}" target="_blank" class="project-link">Live Demo</a>
                        <a href="${project.githubUrl}" target="_blank" class="project-link">GitHub</a>
                    </div>
                </div>
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
            </div>
        `;
        
        projectsGrid.appendChild(projectCard);
    });
}

// Project Filters
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter projects
        populateProjects(filter);
    });
});

// Skill Bars Animation
function initSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.parentElement.getAttribute('data-level') + '%';
            }
        });
    }, { threshold: 0.5 });
    
    skillLevels.forEach(level => observer.observe(level));
}

// Form Submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const formProps = Object.fromEntries(formData);
    
    try {
        // Show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
        contactForm.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    } catch (error) {
        showNotification('Failed to send message. Please try again.', 'error');
    }
});

// Notification System
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.expertise-card, .timeline-item, .project-card').forEach(
    element => observer.observe(element)
);

// Loading Animation
function initLoadingAnimation() {
    const overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(overlay);

    window.addEventListener('load', () => {
        setTimeout(() => {
            overlay.classList.add('hide');
            setTimeout(() => overlay.remove(), 500);
            initParticleBackground();
        }, 1000);
    });
}

// Particle Background
function initParticleBackground() {
    const particleCount = 50;
    const colors = ['#2563eb', '#3b82f6', '#60a5fa'];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDuration = `${6 + Math.random() * 4}s`;
        particle.style.animationDelay = `${-Math.random() * 2}s`;
        document.body.appendChild(particle);
    }
}

// Cursor Effect
function initCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-effect';
    document.body.appendChild(cursor);

    let cursorVisible = false;
    let cursorEnlarged = false;

    const onMouseMove = (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

        if (!cursorVisible) {
            cursor.classList.add('active');
            cursorVisible = true;
        }
    };

    const onMouseEnter = (e) => {
        cursor.classList.add('active');
        cursorVisible = true;
    };

    const onMouseLeave = (e) => {
        cursor.classList.remove('active');
        cursorVisible = false;
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    // Add hover effect for clickable elements
    const clickables = document.querySelectorAll(
        'a, button, .project-card, .expertise-card'
    );

    clickables.forEach((el) => {
        el.addEventListener('mouseover', () => {
            cursor.style.transform = 'scale(1.5)';
            cursorEnlarged = true;
        });

        el.addEventListener('mouseout', () => {
            cursor.style.transform = 'scale(1)';
            cursorEnlarged = false;
        });
    });
}

// Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.scrollY;
        const progress = scrolled / documentHeight;
        
        progressBar.style.transform = `scaleX(${progress})`;
    });
}

// Enhanced Skill Bars Animation
function initEnhancedSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const animateSkill = (bar) => {
        const level = bar.querySelector('.skill-level');
        const targetWidth = bar.getAttribute('data-level') + '%';
        
        level.style.width = '0%';
        setTimeout(() => {
            level.style.width = targetWidth;
        }, 100);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkill(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
}

// Parallax Effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('.expertise-card, .project-card');
    
    window.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        parallaxElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const elCenterX = rect.left + rect.width / 2;
            const elCenterY = rect.top + rect.height / 2;
            
            const deltaX = (clientX - centerX) * 0.01;
            const deltaY = (clientY - centerY) * 0.01;
            
            el.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
    });
}

// Typewriter Effect
function initTypewriter() {
    const text = document.querySelector('.hero-subtitle');
    const originalText = text.textContent;
    text.textContent = '';
    
    let charIndex = 0;
    const typeChar = () => {
        if (charIndex < originalText.length) {
            text.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, 50);
        }
    };
    
    setTimeout(typeChar, 1000);
}

// Enhanced Project Filters
function enhanceProjectFilters() {
    const filters = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    
    filters.forEach(filter => {
        filter.addEventListener('click', () => {
            const category = filter.getAttribute('data-filter');
            
            // Update active filter
            filters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            
            // Animate projects
            projects.forEach(project => {
                project.style.opacity = '0';
                project.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    if (category === 'all' || project.getAttribute('data-category') === category) {
                        project.style.display = 'block';
                        setTimeout(() => {
                            project.style.opacity = '1';
                            project.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        project.style.display = 'none';
                    }
                }, 300);
            });
        });
    });
}

// Animate circular progress
function animateCircularProgress() {
    const circles = document.querySelectorAll('.progress-ring-circle');
    const circumference = 2 * Math.PI * 54; // 54 is the radius of our circle

    circles.forEach(circle => {
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;

        const skillItem = circle.closest('.skill-item');
        const percentageText = skillItem.querySelector('.percentage');
        const percentage = parseInt(percentageText.textContent);
        
        const offset = circumference - (percentage / 100) * circumference;
        
        // Animate when the element comes into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    circle.style.strokeDashoffset = offset;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(circle);
    });
}

// Handle project dialogs
function initProjectDialogs() {
    const viewButtons = document.querySelectorAll('.view-project-btn');
    const closeButtons = document.querySelectorAll('.close-dialog');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.dataset.project;
            const dialog = document.getElementById(projectId);
            dialog.showModal();
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const dialog = button.closest('dialog');
            dialog.close();
            document.body.style.overflow = 'auto';
        });
    });

    // Close dialog when clicking outside
    document.querySelectorAll('.project-dialog').forEach(dialog => {
        dialog.addEventListener('click', (e) => {
            const dialogDimensions = dialog.getBoundingClientRect();
            if (
                e.clientX < dialogDimensions.left ||
                e.clientX > dialogDimensions.right ||
                e.clientY < dialogDimensions.top ||
                e.clientY > dialogDimensions.bottom
            ) {
                dialog.close();
                document.body.style.overflow = 'auto';
            }
        });
    });
}

// Project filtering with animations
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.dataset.filter;
            
            projectCards.forEach(card => {
                card.style.animation = 'none';
                card.offsetHeight; // Trigger reflow
                
                if (filterValue === 'all' || card.dataset.category === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Animate skill progress bars
function animateSkillBars() {
    const progressBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.dataset.progress;
                progressBar.style.width = `${progress}%`;
                observer.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        bar.style.width = '0';
        observer.observe(bar);
    });
}

// Circular Progress Animation
function initCircularProgress() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const circle = item.querySelector('.progress-ring-circle');
        const percentage = parseInt(item.querySelector('.percentage').textContent);
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;
        
        function setProgress(percent) {
            const offset = circumference - (percent / 100) * circumference;
            circle.style.strokeDashoffset = offset;
        }
        
        // Create an intersection observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        setProgress(percentage);
                    }, 200);
                    observer.unobserve(item);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(item);
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', () => {
    animateSkillBars();
    initProjectDialogs();
    initProjectFilters();
    initSmoothScroll();
    initHeaderScroll();
    populateProjects('all');
    initSkillBars();
    initLoadingAnimation();
    initCursorEffect();
    initScrollProgress();
    initEnhancedSkillBars();
    initParallax();
    initTypewriter();
    enhanceProjectFilters();
    animateCircularProgress();
    initCircularProgress();
    
    // Initialize intersection observers for animations
    const animatedElements = document.querySelectorAll(
        '.expertise-card, .timeline-item, .project-card'
    );
    
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );
    
    animatedElements.forEach(el => observer.observe(el));
});
