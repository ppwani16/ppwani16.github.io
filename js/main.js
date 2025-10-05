// Main JavaScript for Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    initializeRotatingText();
    loadExperience();
    loadProjects();
    loadSkills();
    initializeChatbot();
    initializeScrollAnimations();
});

// Rotating text in hero section
function initializeRotatingText() {
    const rotatingElement = document.getElementById('rotating-text');
    const titles = resumeData.personal.rotatingTitles;
    let currentIndex = 0;
    
    setInterval(() => {
        currentIndex = (currentIndex + 1) % titles.length;
        rotatingElement.style.opacity = '0';
        
        setTimeout(() => {
            rotatingElement.textContent = titles[currentIndex];
            rotatingElement.style.opacity = '1';
        }, 300);
    }, 3000);
}

// Load experience timeline
function loadExperience() {
    const timeline = document.getElementById('experienceTimeline');
    
    resumeData.experience.forEach(job => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        
        item.innerHTML = `
            <div class="timeline-content">
                <div class="timeline-header">
                    <div>
                        <h3 class="timeline-title">${job.position}</h3>
                        <p class="timeline-company">${job.company}</p>
                    </div>
                    <span class="timeline-duration">${job.duration}</span>
                </div>
                <p class="timeline-description">${job.description}</p>
                <div class="timeline-tech">
                    ${job.technologies.map(tech => 
                        `<span class="tech-tag">${tech}</span>`
                    ).join('')}
                </div>
            </div>
        `;
        
        timeline.appendChild(item);
    });
}

// Load projects
function loadProjects() {
    const grid = document.getElementById('projectsGrid');
    
    resumeData.projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        card.innerHTML = `
            <div class="project-image">
                ${project.icon || '🚀'}
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => 
                        `<span class="tech-tag">${tech}</span>`
                    ).join('')}
                </div>
                <div class="project-links">
                    ${project.github ? `<a href="${project.github}" target="_blank" rel="noopener" class="project-link">GitHub →</a>` : ''}
                    ${project.live ? `<a href="${project.live}" target="_blank" rel="noopener" class="project-link">Live Demo →</a>` : ''}
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Load skills
function loadSkills() {
    const container = document.getElementById('skillsContainer');
    
    Object.entries(resumeData.skills).forEach(([category, skills]) => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'skill-category';
        
        categoryDiv.innerHTML = `
            <h3 class="skill-category-title">${category}</h3>
            <div class="skill-list">
                ${skills.map(skill => 
                    `<span class="skill-item">${skill}</span>`
                ).join('')}
            </div>
        `;
        
        container.appendChild(categoryDiv);
    });
}

// Initialize chatbot
function initializeChatbot() {
    const chatWidget = document.getElementById('chatWidget');
    const chatToggle = document.getElementById('chatToggle');
    const closeChat = document.getElementById('closeChat');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendMessage');
    const messagesContainer = document.getElementById('chatMessages');
    
    // Toggle chat widget
    chatToggle.addEventListener('click', () => {
        chatWidget.classList.add('active');
        chatInput.focus();
    });
    
    closeChat.addEventListener('click', () => {
        chatWidget.classList.remove('active');
    });
    
    // Send message function
    async function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Display user message
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Show typing indicator
        const typingIndicator = addTypingIndicator();
        
        // Get bot response
        const response = await resumeBot.sendMessage(message);
        
        // Remove typing indicator
        typingIndicator.remove();
        
        // Display bot response
        if (response) {
            addMessage(response, 'bot');
        }
    }
    
    // Event listeners for sending messages
    sendButton.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Add message to chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        messageDiv.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        return messageDiv;
    }
    
    // Add typing indicator
    function addTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'message bot-message';
        indicator.innerHTML = `
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        
        messagesContainer.appendChild(indicator);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        return indicator;
    }
}

// Scroll animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
