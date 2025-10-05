// Resume Data Configuration
// Replace this with your actual resume information

const resumeData = {
    personal: {
        name: "Pradnya Wani",
        title: "Software Developer",
        email: "ppwani16@gmail.com",
        github: "https://github.com/yourusername",
        linkedin: "https://linkedin.com/in/yourprofile",
        bio: "Passionate software developer with expertise in full-stack development. I love building elegant solutions to complex problems and creating seamless user experiences.",
        rotatingTitles: [
            "Software Developer",
            "Full Stack Engineer",
            "Problem Solver",
            "Code Enthusiast",
            "Soduku Savage"
        ]
    },
    
    experience: [
        {
            position: "Software Development Intern",
            company: "J.B.Hunt",
            duration: "2023-2025",
            description: "",
            achievements: [
                
            ],
            technologies: ["Java", "Spring Boot"]
        },
        {
            position: "Software Development Intern",
            company: "Baker Group",
            duration: "Summer of 2022",
            description: "Developed features for enterprise SaaS platform. Collaborated with cross-functional teams to deliver high-quality products.",
            achievements: [
                
            ],
            technologies: []
        }
    ],
    
    projects: [
        {
            title: "E-Commerce Platform",
            description: "Full-stack e-commerce solution with payment integration, inventory management, and real-time analytics.",
            technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
            github: "https://github.com/yourusername/project1",
            live: "https://yourproject.com",
            icon: "🛒"
        },
        {
            title: "Task Management App",
            description: "Collaborative task management tool with real-time updates, team collaboration features, and custom workflows.",
            technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
            github: "https://github.com/yourusername/project2",
            live: "https://yourproject2.com",
            icon: "📋"
        },
        {
            title: "Weather Dashboard",
            description: "Beautiful weather application with location-based forecasts, interactive maps, and weather alerts.",
            technologies: ["React", "OpenWeather API", "Chart.js"],
            github: "https://github.com/yourusername/project3",
            live: "https://yourproject3.com",
            icon: "🌤️"
        }
    ],
    
    skills: {
        "Programming Languages": ["Java", "JavaScript", "Python", "TypeScript", "SQL"],
        "Frontend": ["React", "Vue.js", "HTML/CSS", "Tailwind CSS", "Redux"],
        "Backend": ["Node.js", "Spring Boot", "Express.js", "REST APIs", "GraphQL"],
        "Databases": ["PostgreSQL", "MongoDB", "MySQL", "Redis"],
        "DevOps & Tools": ["Git", "Docker", "AWS", "CI/CD", "Jest", "Maven"],
        "Concepts": ["OOP", "TDD", "Agile", "Microservices", "System Design"]
    },
    
    // Bot personality configuration
    botPersonality: {
        traits: [
            "witty",
            "helpful",
            "slightly sarcastic",
            "tech-enthusiastic",
            "coffee-dependent"
        ],
        catchphrases: [
            "Let me consult my digital brain...",
            "Ah yes, I remember that project! (Unlike my human counterpart who needs coffee to remember anything)",
            "Fun fact:",
            "Plot twist:",
            "Here's the deal:"
        ],
        fallbackResponses: [
            "Hmm, that's a good question! While I'm powered by AI, I can only answer questions about my creator's experience and projects. Want to know about their work with Java? Or maybe their embarrassing first project? 😄",
            "Ooh, you're testing my limits! I'm specifically programmed to discuss my human's professional experience. Ask me about their projects, skills, or that time they debugged code for 6 hours because of a missing semicolon! 🐛",
            "I'd love to help with that, but my knowledge is focused on my creator's resume and experience. How about asking me about their tech stack, work history, or their secret talent for turning coffee into code? ☕"
        ]
    }
};

// API Configuration (Add your OpenAI API key here)
const chatConfig = {
    // Option 1: Use OpenAI API (recommended for best results)
    useOpenAI: true,
    openAIKey: "YOUR_OPENAI_API_KEY_HERE", // Replace with your API key
    model: "gpt-3.5-turbo", // or "gpt-4" for better responses
    
    // Option 2: Use free alternatives (comment out if using OpenAI)
    // For demo purposes, you can use a fallback keyword-based system
    useFallback: true,
    useOpenAI: false,
    
    maxTokens: 500,
    temperature: 0.9 // Higher = more creative/funny responses
};

// Export data for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { resumeData, chatConfig };
}
