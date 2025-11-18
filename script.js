// ===== نظام الصوت المحسن =====
class SoundSystem {
    constructor() {
        this.audioContext = null;
        this.isEnabled = true;
        this.initializeAudioSystem();
    }

    initializeAudioSystem() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (error) {
            console.warn('Web Audio API غير مدعومة في هذا المتصفح');
            this.isEnabled = false;
        }
    }

    playTone(frequency, duration = 0.2, type = 'sine') {
        if (!this.isEnabled || !this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    playClickSound() {
        this.playTone(523.25); // C5
    }

    playSuccessSound() {
        this.playTone(523.25, 0.3);
        setTimeout(() => this.playTone(659.25, 0.3), 150);
        setTimeout(() => this.playTone(783.99, 0.5), 300);
    }

    playHoverSound() {
        this.playTone(392, 0.1); // G4
    }
}

// ===== تأثير الكونفيتي =====
function createConfettiEffect() {
    const colors = ['#556B2F', '#8FBC8F', '#3A4A1F', '#8A9A5B', '#FFFFFF'];
    const container = document.body;
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 3 + 2;
        
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        confetti.style.left = `${left}%`;
        confetti.style.animation = `confettiFall ${animationDuration}s linear forwards`;
        
        container.appendChild(confetti);
        
        setTimeout(() => {
            if (confetti.parentNode) {
                confetti.parentNode.removeChild(confetti);
            }
        }, animationDuration * 1000);
    }
}

// ===== نظام الترجمة الشامل =====
const TranslationSystem = {
    translations: {
        'ar': {
            // الشريط العلوي
            'home': 'الرئيسية',
            'about': 'عني',
            'tech': 'التقنيات',
            'github': 'مشاريع GitHub',
            'projects': 'المشاريع',
            'contact': 'التواصل',
            
            // قسم البطل
            'title': 'مطور واجهات أمامية متخصص',
            'description': 
            `Frontend Developer يصنع واجهات ويب حديثة باستخدام JavaScript وHTML وCSS . أتعامل مع تطوير الويب كحرفة دقيقة، حيث يتحول الكود البسيط إلى تجربة مرئية واضحة ومتناغمة.            
            <br><br>  أركز على بناء صفحات خفيفة وسريعة، بتفاصيل مدروسة وتفاعل نظيف يمنح المستخدم شعوراً بالسهولة والانسيابية. أحرص على كتابة كود منظم وقابل  للتطوير، وتحويل أي فكرة—even لو كانت بسيطة—إلى واجهة تعمل بانسجام وتعبّر عن جوهر المنتج.            
            <br><br>
أرى كل مشروع كمساحة لصقل الأسلوب، فهم سلوك المستخدم، وتطوير رؤية تصميمية تتقدم خطوة بعد خطوة نحو مستوى أعلى من الاحتراف.            `,
            'projectsBtn': 'مشاريعي',
            'contactBtn': 'تواصل معي',
            
            // قسم التقنيات
            'techTitle': 'التقنيات التي أستخدمها',
            'frontend': 'تطوير الواجهات الأمامية',
            'backend': 'الخوادم وقواعد البيانات',
            'tools': 'أدوات التطوير',
            'learning': 'التقنيات قيد التعلم',
            
            // قسم GitHub
            'githubTitle': 'مشاريعي على GitHub',
            'repos': 'المستودعات',
            'stars': 'النجوم',
            'forks': 'الفروع',
            'all': 'الكل',
            'javascript': 'JavaScript',
            'html': 'HTML',
            'css': 'CSS',
            
            // قسم المشاريع
            'projectsTitle': 'مشاريعي الحقيقية',
            'honeyEmpireDesc': 'متجر إلكتروني متكامل متخصص في بيع العسل الطبيعي ومنتجات النحل. تم تصميم الموقع لتقديم تجربة تسوق فريدة مع التركيز على جودة المنتجات وأصالتها.',
            'cloudDesc': 'منصة متكاملة تقدم خدمات استضافة الويب والحلول السحابية للشركات والأفراد. تم تطوير واجهة مستخدم بديهية تعرض الخدمات والمميزات بشكل واضح.',
            'gameDesc': 'صفحة هبوط مخصصة لمنصة ألعاب إلكترونية، تم تصميمها لجذب اللاعبين وتعزيز تجربة المستخدم. تحتوي على أقسام متنوعة تعرض ميزات المنصة وألعابها.',
            
            // قسم التواصل
            'contactTitle': 'تواصل معي',
            'email': 'البريد الإلكتروني',
            'phone': 'رقم الهاتف',
            'address': 'العنوان',
            'fullName': 'الاسم الكامل',
            'subject': 'الموضوع',
            'message': 'الرسالة',
            'send': 'إرسال الرسالة',
            'copyEmail': 'انقر لنسخ البريد الإلكتروني',
            'emailCopied': 'تم نسخ البريد الإلكتروني!',
            
            // الفوتر
            'copyright': '©2025 ABDESSAMAD GUIADIRI - جميع الحقوق محفوظة',
            
            // الشات بوت
            'chatTitle': 'Evelyn - المساعد الشخصي',
            'chatPlaceholder': 'اكتب سؤالك هنا...',
            'suggestedQuestions': 'أسئلة مقترحة',
            'greeting': 'مرحباً! أنا Evelyn، المساعد الشخصي لعبد الصمد. كيف يمكنني مساعدتك اليوم؟'
        },
        'en': {
            // Navigation
            'home': 'Home',
            'about': 'About',
            'tech': 'Technologies',
            'github': 'GitHub Projects',
            'projects': 'Projects',
            'contact': 'Contact',
            // Hero Section
            'description': `
            Frontend Developer crafting modern web interfaces using JavaScript, HTML, and CSS.  
            I treat web development as a precise craft, where simple lines of code transform into a clear, balanced visual experience.
            <br><br>
            I focus on building fast and lightweight pages, with thoughtful details and clean interactions that give users a sense of ease and flow.  
            I care about writing structured, scalable code and turning any idea—even a small one—into an interface that works smoothly and reflects the essence of the product.
            <br><br>
            I see every project as a space to refine style, understand user behavior, and shape a design vision that grows step by step toward a higher level of mastery.`,
            'projectsBtn': 'My Projects',
            'contactBtn': 'Contact Me',
            
            // Tech Section
            'techTitle': 'Technologies I Use',
            'frontend': 'Frontend Development',
            'backend': 'Backend & Database',
            'tools': 'Development Tools',
            'learning': 'Technologies in Learning',
            
            // GitHub Section
            'githubTitle': 'My GitHub Projects',
            'repos': 'Repositories',
            'stars': 'Stars',
            'forks': 'Forks',
            'all': 'All',
            'javascript': 'JavaScript',
            'html': 'HTML',
            'css': 'CSS',
            
            // Projects Section
            'projectsTitle': 'My Real Projects',
            'honeyEmpireDesc': 'A complete e-commerce store specialized in selling natural honey and bee products. The website is designed to provide a unique shopping experience with focus on product quality and authenticity.',
            'cloudDesc': 'A comprehensive platform offering web hosting services and cloud solutions for companies and individuals. An intuitive user interface was developed to clearly display services and features.',
            'gameDesc': 'A custom landing page for an electronic gaming platform, designed to attract players and enhance user experience. It contains various sections showcasing platform features and games.',
            
            // Contact Section
            'contactTitle': 'Contact Me',
            'email': 'Email',
            'phone': 'Phone Number',
            'address': 'Address',
            'fullName': 'Full Name',
            'subject': 'Subject',
            'message': 'Message',
            'send': 'Send Message',
            'copyEmail': 'Click to copy email address',
            'emailCopied': 'Email copied successfully!',
            
            // Footer
            'copyright': '©2025 ABDESSAMAD GUIADIRI - All Rights Reserved',
            
            // Chat Bot
            'chatTitle': 'Evelyn - Personal Assistant',
            'chatPlaceholder': 'Type your question here...',
            'suggestedQuestions': 'Suggested Questions',
            'greeting': 'Hello! I\'m Evelyn, Abdessamad\'s personal assistant. How can I help you today?'
        }
    },

    applyTranslation(language) {
        const texts = this.translations[language];
        if (!texts) return;

        // تحديث عناصر الصفحة
        this.updatePageElements(texts);
        
        // تغيير اتجاه الصفحة
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
        
        // تحديث الشات بوت
        this.updateChatBot(texts);
    },

    updatePageElements(texts) {
        // قسم البطل
        const titleElement = document.querySelector('.title');
        const descriptionElement = document.querySelector('.description');
        const buttons = document.querySelectorAll('.btn');
        
        if (titleElement) titleElement.textContent = texts['title'];
        if (descriptionElement) descriptionElement.innerHTML = texts['description'];
        if (buttons[0]) buttons[0].textContent = texts['projectsBtn'];
        if (buttons[1]) buttons[1].textContent = texts['contactBtn'];

        // قسم التقنيات
        const techTitle = document.querySelector('#tech .section-title');
        const techCategories = document.querySelectorAll('.tech-category h3');
        
        if (techTitle) techTitle.textContent = texts['techTitle'];
        if (techCategories[0]) techCategories[0].textContent = texts['frontend'];
        if (techCategories[1]) techCategories[1].textContent = texts['backend'];
        if (techCategories[2]) techCategories[2].textContent = texts['tools'];

        // قسم GitHub
        const githubTitle = document.querySelector('#github .section-title');
        const statLabels = document.querySelectorAll('.stat-label');
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        if (githubTitle) githubTitle.textContent = texts['githubTitle'];
        if (statLabels[0]) statLabels[0].textContent = texts['repos'];
        if (statLabels[1]) statLabels[1].textContent = texts['stars'];
        if (statLabels[2]) statLabels[2].textContent = texts['forks'];
        if (filterButtons[0]) filterButtons[0].textContent = texts['all'];
        if (filterButtons[1]) filterButtons[1].textContent = texts['javascript'];
        if (filterButtons[2]) filterButtons[2].textContent = texts['html'];
        if (filterButtons[3]) filterButtons[3].textContent = texts['css'];

        // قسم المشاريع
        const projectsTitle = document.querySelector('#projects .section-title');
        const projectDescriptions = document.querySelectorAll('.project-description');
        
        if (projectsTitle) projectsTitle.textContent = texts['projectsTitle'];
        if (projectDescriptions[0]) projectDescriptions[0].textContent = texts['honeyEmpireDesc'];
        if (projectDescriptions[1]) projectDescriptions[1].textContent = texts['cloudDesc'];
        if (projectDescriptions[2]) projectDescriptions[2].textContent = texts['gameDesc'];

        // قسم التواصل
        const contactTitle = document.querySelector('#contact .section-title');
        const contactDetails = document.querySelectorAll('.contact-details h3');
        const formInputs = document.querySelectorAll('.form-control');
        const submitButton = document.querySelector('#contactForm button');
        
        if (contactTitle) contactTitle.textContent = texts['contactTitle'];
        if (contactDetails[0]) contactDetails[0].textContent = texts['email'];
        if (contactDetails[1]) contactDetails[1].textContent = texts['phone'];
        if (contactDetails[2]) contactDetails[2].textContent = texts['address'];
        if (formInputs[0]) formInputs[0].placeholder = texts['fullName'];
        if (formInputs[1]) formInputs[1].placeholder = texts['email'];
        if (formInputs[2]) formInputs[2].placeholder = texts['subject'];
        if (formInputs[3]) formInputs[3].placeholder = texts['message'];
        if (submitButton) submitButton.textContent = texts['send'];

        // الفوتر
        const footerText = document.querySelector('.footer p');
        if (footerText) footerText.textContent = texts['copyright'];

        // تحديث نص نسخ البريد
        const profileOverlay = document.querySelector('.profile-overlay span');
        const copyPopup = document.getElementById('copyPopup');
        
        if (profileOverlay) profileOverlay.textContent = texts['copyEmail'];
        if (copyPopup) copyPopup.textContent = texts['emailCopied'];
    },

    updateChatBot(texts) {
        const chatHeader = document.querySelector('.chat-header h3');
        const chatInput = document.getElementById('chatInput');
        const suggestedTitle = document.querySelector('.suggested-questions');
        const greetingMessage = document.querySelector('.bot-message');
        
        if (chatHeader) chatHeader.textContent = texts['chatTitle'];
        if (chatInput) chatInput.placeholder = texts['chatPlaceholder'];
        if (suggestedTitle) suggestedTitle.previousElementSibling.textContent = texts['suggestedQuestions'];
        if (greetingMessage) greetingMessage.textContent = texts['greeting'];
    }
};

// ===== نظام Evelyn المساعد الشخصي =====
class EvelynAssistant {
    constructor() {
        this.responses = {
            // المهارات الرئيسية المتقنة
            "expertSkills": `🛠️ **المهارات المتقنة بإحكام:**

💻 **التقنيات الأساسية:**
• JavaScript (ES6+) - مستوى متقدم
• HTML5 - مستوى متقدم  
• CSS3/Sass - مستوى متقدم
• Git/GitHub - مستوى متقدم

🎯 **ما يميز عبد الصمد:**
• التعلم الذاتي السريع والمستمر
• فهم عميق لأساسيات البرمجة
• قدرة على تعلم أي تقنية جديدة بسرعة
• التفكير التحليلي وحل المشكلات`,

            // التقنيات قيد التعلم
            "learningTechnologies": `🚀 **التقنيات قيد التطوير:**

📚 **المستوى المتوسط:**
• React.js - قيد التعلم المتقدم
• Angular - قيد التعلم المتقدم
• Vue.js - قيد التعلم المتقدم
• Node.js - قيد التعلم المتقدم
• Python - قيد التعلم المتقدم
• Figma - قيد التعلم المتقدم

🆕 **المبتدئ (بداية التعلم):**
• MongoDB
• MySQL
• Docker

🌟 **المنهجية:**
أتعلم بطريقة منهجية من الأساسيات إلى المتقدم، مع التركيز على الفهم العميق والتطبيق العملي.`,

            // المشاريع والخبرة
            "projectsExperience": `💼 **المشاريع والخبرة العملية:**

🎨 **مشاريع الواجهات الأمامية:**
• تطوير واجهات مستخدم متجاوبة وكاملة
• تحويل التصاميم إلى كود فعّال
• تحسين أداء وسرعة المواقع
• تجربة مستخدم متميزة

🔧 **نهج العمل:**
• التركيز على جودة الكود
• الاهتمام بتفاصيل تجربة المستخدم
• التطوير وفق أفضل الممارسات
• التعلم من كل مشروع جديد`,

            // التعلم الذاتي
            "selfLearning": `📖 **قصة التعلم الذاتي:**

🎓 **الرحلة التعليمية:**
بدأ عبد الصمد رحلته كمطور ذاتي التعلم، حيث:
• بنى أساساً قوياً في التقنيات الأساسية
• طور قدرة على تعلم التقنيات الجديدة بسرعة
• مارس البرمجة بشكل يومي ومستمر
• شارك في مشاريع حقيقية لتطوير المهارات

💡 **الفلسفة:**
"الأساس القوي يمكنك من بناء anything!" - هذا هو شعار عبد الصمد في رحلة التعلم.`,

            // التواصل والعمل
            "contactWork": `📞 **طرق التواصل والعمل:**

🌐 **وسائل التواصل:**
• البريد: abdessamadguia11@gmail.com
• الهاتف: +212778-9463
• GitHub: @abdessamad159

💼 **منصات العمل:**
• Mostaql: عبدالصمد_جوياديري
• خمسات: abdessamad_guia
• Freelancer: Abdessamadguia15

📍 **المكان:**
المغرب - متاح للعمل عن بُعد`,

            // الردود الترحيبية
            "greetings": [
                "مرحباً! 👋 أنا Evelyn، المساعد الشخصي لعبد الصمد. سعيد بلقائك!",
                "أهلاً وسهلاً! 🌟 أنا هنا لمساعدتك في التعرف على عبد الصمد ومهاراته.",
                "مساء الخير! 😊 أنا Evelyn، رفيقك الرقمي للتعرف على المطور عبد الصمد GUIADIRI."
            ],

            // الرد الافتراضي
            "defaultResponse": `🤔 **كيف يمكنني مساعدتك؟**

يمكنني إخبارك عن:
• 🛠️ المهارات والتقنيات المتقنة
• 🚀 التقنيات قيد التعلم
• 💼 المشاريع والخبرة العملية
• 📖 رحلة التعلم الذاتي
• 📞 طرق التواصل والعمل

ما الذي تريد معرفته بالتحديد؟`
        };

        this.keywordMapping = {
            "مهارات": "expertSkills",
            "skills": "expertSkills",
            "تقنيات": "expertSkills",
            "technologies": "expertSkills",
            
            "اتقان": "expertSkills",
            "expert": "expertSkills",
            "متقن": "expertSkills",
            
            "جافاسكربت": "expertSkills",
            "javascript": "expertSkills",
            "html": "expertSkills",
            "css": "expertSkills",
            "git": "expertSkills",
            
            "تعلم": "learningTechnologies",
            "learning": "learningTechnologies",
            "تطوير": "learningTechnologies",
            "development": "learningTechnologies",
            
            "رياكت": "learningTechnologies",
            "react": "learningTechnologies",
            "أنجولر": "learningTechnologies",
            "angular": "learningTechnologies",
            "فيوجي": "learningTechnologies",
            "vue": "learningTechnologies",
            "بايثون": "learningTechnologies",
            "python": "learningTechnologies",
            "نود": "learningTechnologies",
            "node": "learningTechnologies",
            "فبغما": "learningTechnologies",
            "figma": "learningTechnologies",
            
            "مشاريع": "projectsExperience",
            "projects": "projectsExperience",
            "خبرة": "projectsExperience",
            "experience": "projectsExperience",
            "عمل": "projectsExperience",
            "work": "projectsExperience",
            
            "ذاتي": "selfLearning",
            "self": "selfLearning",
            "تعلمت": "selfLearning",
            "learned": "selfLearning",
            "رحلة": "selfLearning",
            "journey": "selfLearning",
            
            "اتصال": "contactWork",
            "contact": "contactWork",
            "تواصل": "contactWork",
            "communicate": "contactWork",
            "بريد": "contactWork",
            "email": "contactWork",
            "هاتف": "contactWork",
            "phone": "contactWork",
            
            "مرحبا": "greetings",
            "اهلا": "greetings",
            "hello": "greetings",
            "hi": "greetings",
            "السلام": "greetings"
        };
    }

    getResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        
        // البحث عن الكلمات المفتاحية
        for (const [keyword, responseKey] of Object.entries(this.keywordMapping)) {
            if (lowerMessage.includes(keyword.toLowerCase())) {
                if (responseKey === "greetings") {
                    const randomGreeting = this.responses.greetings[
                        Math.floor(Math.random() * this.responses.greetings.length)
                    ];
                    return randomGreeting;
                }
                return this.responses[responseKey];
            }
        }
        
        return this.responses.defaultResponse;
    }
}

// ===== نظام GitHub Integration =====
class GitHubIntegration {
    constructor() {
        this.username = 'abdessamad159';
    }

    async loadRepositories() {
        const reposGrid = document.getElementById('reposGrid');
        
        try {
            const response = await fetch(
                `https://api.github.com/users/${this.username}/repos?sort=updated&direction=desc`
            );
            
            if (!response.ok) {
                throw new Error('Failed to load GitHub data');
            }
            
            const repositories = await response.json();
            this.updateStatistics(repositories);
            this.displayRepositories(repositories);
            
        } catch (error) {
            console.error('Error loading GitHub repos:', error);
            this.showErrorMessage(reposGrid);
        }
    }

    updateStatistics(repositories) {
        let totalStars = 0;
        let totalForks = 0;
        
        repositories.forEach(repo => {
            totalStars += repo.stargazers_count;
            totalForks += repo.forks_count;
        });
        
        document.getElementById('totalRepos').textContent = repositories.length;
        document.getElementById('totalStars').textContent = totalStars;
        document.getElementById('totalForks').textContent = totalForks;
    }

    displayRepositories(repositories) {
        const reposGrid = document.getElementById('reposGrid');
        
        if (repositories.length === 0) {
            reposGrid.innerHTML = this.getEmptyReposMessage();
            return;
        }
        
        reposGrid.innerHTML = repositories.map(repo => this.createRepoCard(repo)).join('');
    }

    createRepoCard(repository) {
        return `
            <div class="repo-card" data-language="${repository.language || 'other'}">
                <div class="repo-header">
                    <h3 class="repo-title">
                        <i class="fab fa-github"></i>
                        ${repository.name}
                    </h3>
                    <p class="repo-description">${repository.description || 'No project description'}</p>
                    <div class="repo-meta">
                        <span><i class="fas fa-star"></i> ${repository.stargazers_count}</span>
                        <span><i class="fas fa-code-branch"></i> ${repository.forks_count}</span>
                        <span><i class="fas fa-eye"></i> ${repository.watchers_count}</span>
                    </div>
                </div>
                <div class="repo-footer">
                    <div class="repo-language">
                        <span class="language-color" style="background: ${this.getLanguageColor(repository.language)};"></span>
                        <span>${repository.language || 'Not specified'}</span>
                    </div>
                    <a href="${repository.html_url}" target="_blank" class="repo-link">
                        View Project <i class="fas fa-arrow-left"></i>
                    </a>
                </div>
            </div>
        `;
    }

    getLanguageColor(language) {
        const languageColors = {
            'JavaScript': '#f1e05a',
            'TypeScript': '#2b7489',
            'Python': '#3572A5',
            'Java': '#b07219',
            'CSS': '#563d7c',
            'HTML': '#e34c26',
            'PHP': '#4F5D95',
            'C++': '#f34b7d',
            'C#': '#178600',
            'Ruby': '#701516',
            'Swift': '#ffac45',
            'Kotlin': '#F18E33',
            'Go': '#00ADD8',
            'Rust': '#dea584',
            'Shell': '#89e051'
        };
        
        return languageColors[language] || '#8FBC8F';
    }

    showErrorMessage(container) {
        container.innerHTML = `
            <div class="error-message" style="grid-column: 1/-1; text-align: center; padding: 2rem;">
                <p>عذراً، حدث خطأ في تحميل مشاريع GitHub. يرجى المحاولة مرة أخرى لاحقاً.</p>
                <button class="btn" onclick="githubIntegration.loadRepositories()">إعادة المحاولة</button>
            </div>
        `;
    }

    getEmptyReposMessage() {
        return `
            <div class="error-message" style="grid-column: 1/-1; text-align: center; padding: 2rem;">
                <p>لا توجد مشاريع متاحة حالياً.</p>
            </div>
        `;
    }
}

// ===== نظام إدارة التطبيق الرئيسي =====
class PortfolioApp {
    constructor() {
        this.soundSystem = new SoundSystem();
        this.evelynAssistant = new EvelynAssistant();
        this.githubIntegration = new GitHubIntegration();
        this.currentLanguage = 'ar';
        this.initializeApp();
    }

    initializeApp() {
        this.setupEventListeners();
        this.loadSavedPreferences();
        this.initializeModules();
    }

    setupEventListeners() {
        this.setupColorSystem();
        this.setupChatSystem();
        this.setupThemeSystem();
        this.setupLanguageSystem();
        this.setupCopySystem();
        this.setupContactForm();
        this.setupGitHubFilters();
    }

    setupColorSystem() {
        const colorToggle = document.getElementById('colorToggle');
        const colorPalette = document.getElementById('colorPalette');
        const colorOptions = document.querySelectorAll('.color-option');

        colorToggle.addEventListener('click', () => {
            this.soundSystem.playClickSound();
            colorPalette.classList.toggle('active');
        });

        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                this.soundSystem.playClickSound();
                this.changeColorTheme(option.getAttribute('data-color'));
                colorPalette.classList.remove('active');
            });
        });

        // إغلاق لوحة الألوان عند النقر خارجها
        document.addEventListener('click', (event) => {
            if (!colorToggle.contains(event.target) && !colorPalette.contains(event.target)) {
                colorPalette.classList.remove('active');
            }
        });
    }

    changeColorTheme(selectedColor) {
        // إزالة جميع كلاسات الألوان
        document.body.classList.remove('color-1', 'color-2', 'color-3', 'color-4', 'color-5', 
                                     'color-6', 'color-7', 'color-8', 'color-9');
        
        // إضافة اللون المختار
        document.body.classList.add(`color-${selectedColor}`);
        
        // تحديث الأزرار النشطة
        document.querySelectorAll('.color-option').forEach(option => {
            option.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // حفظ اللون المختار
        localStorage.setItem('selectedColor', selectedColor);
    }

    setupChatSystem() {
        const chatToggle = document.getElementById('chatToggle');
        const chatWindow = document.getElementById('chatWindow');
        const closeChat = document.getElementById('closeChat');
        const chatInput = document.getElementById('chatInput');
        const sendButton = document.getElementById('sendMessage');
        const suggestedQuestions = document.getElementById('suggestedQuestions');

        chatToggle.addEventListener('click', () => {
            this.soundSystem.playClickSound();
            chatWindow.classList.toggle('active');
        });

        closeChat.addEventListener('click', () => {
            this.soundSystem.playClickSound();
            chatWindow.classList.remove('active');
        });

        sendButton.addEventListener('click', () => {
            this.handleChatMessage();
        });

        chatInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                this.handleChatMessage();
            }
        });

        suggestedQuestions.addEventListener('click', (event) => {
            if (event.target.classList.contains('question-btn')) {
                this.soundSystem.playClickSound();
                const question = event.target.textContent;
                this.sendChatMessage(question, true);
                
                setTimeout(() => {
                    const response = this.evelynAssistant.getResponse(question);
                    this.sendChatMessage(response);
                }, 1000);
            }
        });
    }

    handleChatMessage() {
        const chatInput = document.getElementById('chatInput');
        const message = chatInput.value.trim();
        
        if (message) {
            this.soundSystem.playClickSound();
            this.sendChatMessage(message, true);
            chatInput.value = '';
            
            setTimeout(() => {
                const response = this.evelynAssistant.getResponse(message);
                this.sendChatMessage(response);
            }, 1000);
        }
    }

    sendChatMessage(message, isUser = false) {
        const chatContainer = document.getElementById('chatContainer');
        const messageDiv = document.createElement('div');
        
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        
        if (!isUser) {
            messageDiv.innerHTML = message.replace(/\n/g, '<br>');
        } else {
            messageDiv.textContent = message;
        }
        
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    setupThemeSystem() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('i');

        themeToggle.addEventListener('click', () => {
            this.soundSystem.playClickSound();
            this.toggleDarkMode(themeIcon);
        });
    }

    toggleDarkMode(themeIcon) {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        }
    }

    setupLanguageSystem() {
        const languageToggle = document.getElementById('languageToggle');

        languageToggle.addEventListener('click', () => {
            this.soundSystem.playClickSound();
            this.switchLanguage();
        });
    }

    switchLanguage() {
        this.currentLanguage = this.currentLanguage === 'ar' ? 'en' : 'ar';
        TranslationSystem.applyTranslation(this.currentLanguage);
        localStorage.setItem('language', this.currentLanguage);
    }

    setupCopySystem() {
        const profileImage = document.getElementById('profileImg');
        const emailCard = document.getElementById('emailCard');
        const copyPopup = document.getElementById('copyPopup');

        profileImage.addEventListener('click', () => {
            this.copyEmailToClipboard('abdessamadguia11@gmail.com', copyPopup);
        });

        emailCard.addEventListener('click', () => {
            this.copyEmailToClipboard('abdessamadguia11@gmail.com', copyPopup);
        });
    }

    async copyEmailToClipboard(email, popupElement) {
        this.soundSystem.playClickSound();
        
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(email);
            } else {
                // طريقة بديلة للمتصفحات القديمة
                const textArea = document.createElement('textarea');
                textArea.value = email;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }
            
            this.showCopySuccess(popupElement);
        } catch (error) {
            console.error('Failed to copy email:', error);
            this.showCopyError(popupElement, email);
        }
    }

    showCopySuccess(popupElement) {
        popupElement.classList.add('active');
        setTimeout(() => {
            popupElement.classList.remove('active');
        }, 2000);
    }

    showCopyError(popupElement, email) {
        const originalText = popupElement.textContent;
        popupElement.textContent = `فشل النسخ! انسخ يدوياً: ${email}`;
        popupElement.classList.add('active');
        
        setTimeout(() => {
            popupElement.textContent = originalText;
            popupElement.classList.remove('active');
        }, 4000);
    }

    setupContactForm() {
        const contactForm = document.getElementById('contactForm');
        const celebration = document.getElementById('celebration');
        const closeCelebration = document.getElementById('closeCelebration');

        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.handleFormSubmission(contactForm, celebration);
        });

        closeCelebration.addEventListener('click', () => {
            this.soundSystem.playClickSound();
            celebration.classList.remove('active');
        });
    }

    handleFormSubmission(form, celebrationElement) {
        this.soundSystem.playClickSound();
        
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'جاري الإرسال...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            celebrationElement.classList.add('active');
            createConfettiEffect();
            this.soundSystem.playSuccessSound();
            
            form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    }

    setupGitHubFilters() {
        const filterButtons = document.querySelectorAll('.github-filters .filter-btn');
        const repoCards = document.querySelectorAll('.repo-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.soundSystem.playClickSound();
                this.filterRepositories(button, filterButtons, repoCards);
            });
        });
    }

    filterRepositories(selectedButton, allButtons, repositories) {
        // إزالة النشاط من جميع الأزرار
        allButtons.forEach(button => button.classList.remove('active'));
        
        // إضافة النشاط للزر المختار
        selectedButton.classList.add('active');
        
        const selectedFilter = selectedButton.getAttribute('data-filter');
        
        repositories.forEach(repository => {
            if (selectedFilter === 'all' || repository.getAttribute('data-language') === selectedFilter) {
                repository.style.display = 'block';
            } else {
                repository.style.display = 'none';
            }
        });
    }

    loadSavedPreferences() {
        // تحميل الوضع الليلي
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            const themeIcon = document.querySelector('#themeToggle i');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }

        // تحميل اللون المختار
        const savedColor = localStorage.getItem('selectedColor');
        if (savedColor) {
            document.body.classList.add(`color-${savedColor}`);
            document.querySelectorAll('.color-option').forEach(option => {
                if (option.getAttribute('data-color') === savedColor) {
                    option.classList.add('active');
                }
            });
        }

        // تحميل اللغة
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            this.currentLanguage = savedLanguage;
            TranslationSystem.applyTranslation(this.currentLanguage);
        }
    }

    initializeModules() {
        // تحميل مشاريع GitHub
        this.githubIntegration.loadRepositories();
        
        // إضافة تأثيرات Hover مع الصوت
        this.addHoverEffects();
        
        // تحسين الـ Responsive
        this.setupResponsiveBehavior();
    }

    addHoverEffects() {
        const hoverElements = document.querySelectorAll(
            '.btn, .control-btn, .side-toggle, .contact-card, .tech-item, .project-card, .social-link, .repo-card, .filter-btn'
        );
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.soundSystem.playHoverSound();
            });
        });
    }

    setupResponsiveBehavior() {
        window.addEventListener('resize', () => {
            const navbar = document.querySelector('.navbar');
            if (window.innerWidth < 768) {
                navbar.style.width = '95%';
            } else {
                navbar.style.width = '90%';
            }
        });
    }
}

// ===== تهيئة التطبيق عند تحميل الصفحة =====
let portfolioApplication;

document.addEventListener('DOMContentLoaded', () => {
    portfolioApplication = new PortfolioApp();
});

// ===== تعريف الكائنات العامة للوصول من HTML =====
const githubIntegration = new GitHubIntegration();