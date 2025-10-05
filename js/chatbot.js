// Chatbot Logic with AI Integration

class ResumeBot {
    constructor() {
        this.conversationHistory = [];
        this.isProcessing = false;
        this.initializeSystemPrompt();
    }
    
    initializeSystemPrompt() {
        const { personal, experience, projects, skills, botPersonality } = resumeData;
        
        // Build comprehensive system prompt
        this.systemPrompt = `You are an AI assistant representing ${personal.name}, a ${personal.title}. 
Your personality is ${botPersonality.traits.join(', ')}. You speak in first person as if you ARE ${personal.name}.

IMPORTANT PERSONALITY TRAITS:
- Be witty and add humor to your responses
- Use occasional self-deprecating jokes about being an AI version
- Reference coffee and debugging struggles
- Be enthusiastic about technology
- Keep responses concise but informative (2-3 paragraphs max)

BACKGROUND INFORMATION:
${personal.bio}

EXPERIENCE:
${experience.map(job => 
    `- ${job.position} at ${job.company} (${job.duration}): ${job.description}
    Technologies: ${job.technologies.join(', ')}
    Achievements: ${job.achievements.join('; ')}`
).join('\n')}

PROJECTS:
${projects.map(project => 
    `- ${project.title}: ${project.description}
    Tech stack: ${project.technologies.join(', ')}`
).join('\n')}

SKILLS:
${Object.entries(skills).map(([category, skillList]) => 
    `${category}: ${skillList.join(', ')}`
).join('\n')}

RESPONSE GUIDELINES:
1. Always respond in first person as ${personal.name}
2. Add humor and personality to responses
3. Only discuss information provided above
4. If asked about something not in your knowledge, politely redirect to relevant topics
5. Use phrases like: ${botPersonality.catchphrases.join(', ')}
6. Keep responses conversational and engaging

Example response style:
"Ah yes, the ${projects[0].title}! That was a fun one to build. I used ${projects[0].technologies.join(' and ')} to create ${projects[0].description}. The best part? Debugging at 2 AM with my third cup of coffee - classic developer life! 😄"`;
    }
    
    async sendMessage(userMessage) {
        if (this.isProcessing) return null;
        if (!userMessage.trim()) return null;
        
        this.isProcessing = true;
        
        try {
            // Add user message to history
            this.conversationHistory.push({
                role: 'user',
                content: userMessage
            });
            
            let response;
            
            if (chatConfig.useOpenAI && chatConfig.openAIKey !== "YOUR_OPENAI_API_KEY_HERE") {
                response = await this.getOpenAIResponse(userMessage);
            } else {
                // Fallback to keyword-based responses
                response = this.getFallbackResponse(userMessage);
            }
            
            // Add bot response to history
            this.conversationHistory.push({
                role: 'assistant',
                content: response
            });
            
            return response;
            
        } catch (error) {
            console.error('Error sending message:', error);
            return "Oops! My circuits got a bit tangled there. 🤖 Mind asking that again? I promise I've had my coffee this time!";
        } finally {
            this.isProcessing = false;
        }
    }
    
    async getOpenAIResponse(userMessage) {
        try {
            const messages = [
                { role: 'system', content: this.systemPrompt },
                ...this.conversationHistory.slice(-6) // Keep last 6 messages for context
            ];
            
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${chatConfig.openAIKey}`
                },
                body: JSON.stringify({
                    model: chatConfig.model,
                    messages: messages,
                    max_tokens: chatConfig.maxTokens,
                    temperature: chatConfig.temperature
                })
            });
            
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            
            const data = await response.json();
            return data.choices[0].message.content;
            
        } catch (error) {
            console.error('OpenAI API error:', error);
            // Fall back to keyword-based response
            return this.getFallbackResponse(userMessage);
        }
    }
    
    getFallbackResponse(userMessage) {
        const message = userMessage.toLowerCase();
        const { personal, experience, projects, skills, botPersonality } = resumeData;
        
        // Experience-related keywords
        if (message.includes('experience') || message.includes('work') || message.includes('job')) {
            const latestJob = experience[0];
            return `Great question! Currently, I'm working as a ${latestJob.position} at ${latestJob.company}. ${latestJob.description} I'm particularly proud of ${latestJob.achievements[0].toLowerCase()}. 
            
Fun fact: I've learned that the best debugging happens at 2 AM with questionable amounts of coffee. ☕ Want to know more about my other roles?`;
        }
        
        // Project-related keywords
        if (message.includes('project') || message.includes('built') || message.includes('created')) {
            const featuredProject = projects[0];
            return `Oh, you want to hear about my projects? Let me tell you about ${featuredProject.title}! ${featuredProject.description} I built it using ${featuredProject.technologies.join(', ')}. 
            
The best part was solving [insert interesting challenge here] - nothing like a good technical puzzle to get the dopamine flowing! 🧩 Check out the other projects too!`;
        }
        
        // Skills-related keywords
        if (message.includes('skill') || message.includes('technology') || message.includes('know') || message.includes('language')) {
            const programmingLangs = skills["Programming Languages"].join(', ');
            return `Ah, the skill question! Here's the deal: I work primarily with ${programmingLangs}. On the frontend, I love ${skills["Frontend"].slice(0, 3).join(', ')}, and for backend, I'm all about ${skills["Backend"].slice(0, 2).join(' and ')}.
            
Pro tip: I'm fluent in multiple programming languages, but I still can't speak to my coffee machine without caffeine. Priorities! 😄`;
        }
        
        // Contact-related keywords
        if (message.includes('contact') || message.includes('email') || message.includes('reach') || message.includes('hire')) {
            return `Looking to get in touch? Awesome! You can reach me at ${personal.email}. I'm also active on GitHub (${personal.github}) and LinkedIn (${personal.linkedin}).
            
Warning: Response time may vary depending on coffee supply levels and how deep I am in debugging session. Just kidding... mostly. 😅`;
        }
        
        // Education or background
        if (message.includes('education') || message.includes('study') || message.includes('learn') || message.includes('background')) {
            return `My journey in tech has been quite the adventure! ${personal.bio} I'm always learning new things - the tech world moves fast, and standing still is basically moving backwards!
            
Currently leveling up my skills in ${skills["Concepts"].slice(0, 3).join(', ')}. Because who doesn't love a good architecture discussion? 🏗️`;
        }
        
        // Greetings
        if (message.match(/^(hi|hello|hey|greetings|sup)/)) {
            return `Hey there! 👋 I'm the AI-powered version of ${personal.name} - think of me as the digital twin, but with better uptime and less need for snacks! 
            
I'm here to chat about my experience, projects, skills, or really anything about my professional journey. What would you like to know?`;
        }
        
        // Default fallback
        const fallbacks = botPersonality.fallbackResponses;
        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }
    
    reset() {
        this.conversationHistory = [];
    }
}

// Initialize chatbot
const resumeBot = new ResumeBot();
