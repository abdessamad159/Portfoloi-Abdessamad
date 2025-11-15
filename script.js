// ===== نظام الصوت =====
class SoundSystem {
    constructor() {
        this.audioContext = null;
        this.isEnabled = true;
        this.init();
    }

    init() {
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

    playClick() {
        this.playTone(523.25); // C5
    }

    playSuccess() {
        // سلسلة نغمات النجاح: C5, E5, G5
        this.playTone(523.25, 0.3);
        setTimeout(() => this.playTone(659.25, 0.3), 150);
        setTimeout(() => this.playTone(783.99, 0.5), 300);
    }

    playHover() {
        this.playTone(392, 0.1); // G4
    }
}

// تهيئة نظام الصوت
const soundSystem = new SoundSystem();

// ===== تأثير الكونفيتي =====
function createConfetti() {
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

// ===== نظام الترجمة =====
const translations = {
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
        'description': 'مطور واجهات أمامية محترف مع خبرة في React, Angular, Vue.js, Node.js, TypeScript. أبدع في تحويل الأفكار إلى تطبيقات ويب تفاعلية مع تجربة مستخدم استثنائية.<br><br>مع أكثر من 3 سنوات من الخبرة في تطوير واجهات المستخدم، أساعد الشركات والافراد في تحويل رؤيتهم إلى واقع رقمي ملموس. كل مشروع هو قصة جديدة أرويها من خلال الكود والتصميم.',
        'projectsBtn': 'مشاريعي',
        'contactBtn': 'تواصل معي',
        
        // قسم التقنيات
        'techTitle': 'التقنيات التي أستخدمها',
        'frontend': 'Frontend Technologies',
        'backend': 'Backend & Database',
        'tools': 'أدوات التطوير',
        
        // قسم GitHub
        'githubTitle': 'مشاريعي على GitHub',
        'repos': 'المستودعات',
        'stars': 'النجوم',
        'forks': 'الفروع',
        'all': 'الكل',
        
        // قسم المشاريع
        'projectsTitle': 'مشاريعي الحقيقية',
        
        // قسم التواصل
        'contactTitle': 'تواصل معي',
        'email': 'البريد الإلكتروني',
        'phone': 'رقم الهاتف',
        'address': 'العنوان',
        'fullName': 'الاسم الكامل',
        'subject': 'الموضوع',
        'message': 'الرسالة',
        'send': 'إرسال الرسالة',
        
        // الفوتر
        'copyright': '©2025 ABDESSAMAD GUIADIRI - جميع الحقوق محفوظة'
    },
    'en': {
        // الشريط العلوي
        'home': 'Home',
        'about': 'About',
        'tech': 'Technologies',
        'github': 'GitHub Projects',
        'projects': 'Projects',
        'contact': 'Contact',
        
        // قسم البطل
        'title': 'Specialized Frontend Developer',
        'description': 'Professional frontend developer with expertise in React, Angular, Vue.js, Node.js, TypeScript. I excel at transforming ideas into interactive web applications with exceptional user experience.<br><br>With over 3 years of experience in UI development, I help companies and individuals transform their vision into tangible digital reality. Each project is a new story I tell through code and design.',
        'projectsBtn': 'My Projects',
        'contactBtn': 'Contact Me',
        
        // قسم التقنيات
        'techTitle': 'Technologies I Use',
        'frontend': 'Frontend Technologies',
        'backend': 'Backend & Database',
        'tools': 'Development Tools',
        
        // قسم GitHub
        'githubTitle': 'My GitHub Projects',
        'repos': 'Repositories',
        'stars': 'Stars',
        'forks': 'Forks',
        'all': 'All',
        
        // قسم المشاريع
        'projectsTitle': 'My Real Projects',
        
        // قسم التواصل
        'contactTitle': 'Contact Me',
        'email': 'Email',
        'phone': 'Phone Number',
        'address': 'Address',
        'fullName': 'Full Name',
        'subject': 'Subject',
        'message': 'Message',
        'send': 'Send Message',
        
        // الفوتر
        'copyright': '©2025 ABDESSAMAD GUIADIRI - All Rights Reserved'
    }
};

function applyTranslation(language) {
    const texts = translations[language];
    
    // تحديث قسم البطل
    document.querySelector('.title').textContent = texts['title'];
    document.querySelector('.description').innerHTML = texts['description'];
    document.querySelectorAll('.btn')[0].textContent = texts['projectsBtn'];
    document.querySelectorAll('.btn')[1].textContent = texts['contactBtn'];
    
    // تحديث قسم التقنيات
    document.querySelector('#tech .section-title').textContent = texts['techTitle'];
    document.querySelectorAll('.tech-category h3')[0].textContent = texts['frontend'];
    document.querySelectorAll('.tech-category h3')[1].textContent = texts['backend'];
    document.querySelectorAll('.tech-category h3')[2].textContent = texts['tools'];
    
    // تحديث قسم GitHub
    document.querySelector('#github .section-title').textContent = texts['githubTitle'];
    document.querySelectorAll('.stat-label')[0].textContent = texts['repos'];
    document.querySelectorAll('.stat-label')[1].textContent = texts['stars'];
    document.querySelectorAll('.stat-label')[2].textContent = texts['forks'];
    document.querySelectorAll('.filter-btn')[0].textContent = texts['all'];
    
    // تحديث قسم المشاريع
    document.querySelector('#projects .section-title').textContent = texts['projectsTitle'];
    
    // تحديث قسم التواصل
    document.querySelector('#contact .section-title').textContent = texts['contactTitle'];
    document.querySelectorAll('.contact-details h3')[0].textContent = texts['email'];
    document.querySelectorAll('.contact-details h3')[1].textContent = texts['phone'];
    document.querySelectorAll('.contact-details h3')[2].textContent = texts['address'];
    document.querySelector('input[placeholder="الاسم الكامل"]').placeholder = texts['fullName'];
    document.querySelector('input[placeholder="البريد الإلكتروني"]').placeholder = texts['email'];
    document.querySelector('input[placeholder="الموضوع"]').placeholder = texts['subject'];
    document.querySelector('textarea[placeholder="الرسالة"]').placeholder = texts['message'];
    document.querySelector('#contactForm button').textContent = texts['send'];
    
    // تحديث الفوتر
    document.querySelector('.footer p').textContent = texts['copyright'];
    
    // تغيير اتجاه الصفحة
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
}

// ===== GitHub API Integration =====
async function loadGitHubRepos() {
    const username = 'abdessamad159';
    const reposGrid = document.getElementById('reposGrid');
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&direction=desc`);
        
        if (!response.ok) {
            throw new Error('فشل في تحميل بيانات GitHub');
        }
        
        const repos = await response.json();
        
        // حساب الإحصائيات
        let totalStars = 0;
        let totalForks = 0;
        
        repos.forEach(repo => {
            totalStars += repo.stargazers_count;
            totalForks += repo.forks_count;
        });
        
        // تحديث الإحصائيات
        document.getElementById('totalRepos').textContent = repos.length;
        document.getElementById('totalStars').textContent = totalStars;
        document.getElementById('totalForks').textContent = totalForks;
        
        // عرض المستودعات
        displayRepos(repos);
        
    } catch (error) {
        console.error('Error loading GitHub repos:', error);
        reposGrid.innerHTML = `
            <div class="error-message" style="grid-column: 1/-1; text-align: center; padding: 2rem;">
                <p>عذراً، حدث خطأ في تحميل مشاريع GitHub. يرجى المحاولة مرة أخرى لاحقاً.</p>
                <button class="btn" onclick="loadGitHubRepos()">إعادة المحاولة</button>
            </div>
        `;
    }
}

function displayRepos(repos) {
    const reposGrid = document.getElementById('reposGrid');
    
    if (repos.length === 0) {
        reposGrid.innerHTML = `
            <div class="error-message" style="grid-column: 1/-1; text-align: center; padding: 2rem;">
                <p>لا توجد مشاريع متاحة حالياً.</p>
            </div>
        `;
        return;
    }
    
    reposGrid.innerHTML = repos.map(repo => `
        <div class="repo-card" data-language="${repo.language || 'other'}">
            <div class="repo-header">
                <h3 class="repo-title">
                    <i class="fab fa-github"></i>
                    ${repo.name}
                </h3>
                <p class="repo-description">${repo.description || 'لا يوجد وصف للمشروع'}</p>
                <div class="repo-meta">
                    <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                    <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                    <span><i class="fas fa-eye"></i> ${repo.watchers_count}</span>
                </div>
            </div>
            <div class="repo-footer">
                <div class="repo-language">
                    <span class="language-color" style="background: ${getLanguageColor(repo.language)};"></span>
                    <span>${repo.language || 'غير محدد'}</span>
                </div>
                <a href="${repo.html_url}" target="_blank" class="repo-link">
                    عرض المشروع <i class="fas fa-arrow-left"></i>
                </a>
            </div>
        </div>
    `).join('');
}

function getLanguageColor(language) {
    const colors = {
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
    
    return colors[language] || '#8FBC8F';
}

// ===== تصفية مشاريع GitHub =====
function setupGitHubFilters() {
    const filterBtns = document.querySelectorAll('.github-filters .filter-btn');
    const repoCards = document.querySelectorAll('.repo-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            soundSystem.playClick();
            
            // إزالة النشاط من جميع الأزرار
            filterBtns.forEach(b => b.classList.remove('active'));
            // إضافة النشاط للزر المختار
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            repoCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-language') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ===== الأنظمة المطلوبة =====

// 1. نظام الألوان (9 ألوان) - مستقل عن الوضع الليلي
const colorToggle = document.getElementById('colorToggle');
const colorPalette = document.getElementById('colorPalette');
const colorOptions = document.querySelectorAll('.color-option');

colorToggle.addEventListener('click', () => {
    soundSystem.playClick();
    colorPalette.classList.toggle('active');
});

colorOptions.forEach(option => {
    option.addEventListener('click', () => {
        soundSystem.playClick();
        const color = option.getAttribute('data-color');
        
        // إزالة جميع كلاسات الألوان
        document.body.classList.remove('color-1', 'color-2', 'color-3', 'color-4', 'color-5', 
                                     'color-6', 'color-7', 'color-8', 'color-9');
        
        // إضافة اللون المختار
        document.body.classList.add(`color-${color}`);
        
        // تحديث الأزرار النشطة
        colorOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        
        // إغلاق لوحة الألوان
        colorPalette.classList.remove('active');
        
        // حفظ اللون المختار
        localStorage.setItem('selectedColor', color);
    });
});

// 2. نظام الشات بوت
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const closeChat = document.getElementById('closeChat');
const chatContainer = document.getElementById('chatContainer');
const chatInput = document.getElementById('chatInput');
const sendMessage = document.getElementById('sendMessage');
const suggestedQuestions = document.getElementById('suggestedQuestions');

const botResponses = {
    "ما هي مهاراتك التقنية؟": "أمتلك مهارات في تطوير الويب باستخدام HTML, CSS, JavaScript, React, Node.js، بالإضافة إلى خبرة في قواعد البيانات مثل MySQL وMongoDB. كما أمتلك مهارات في تصميم واجهات المستخدم وتحسين تجربة المستخدم.",
    "ما هي مشاريعك السابقة؟": "عملت على العديد من المشاريع منها تطبيقات ويب تفاعلية، أنظمة إدارة المحتوى، تطبيقات تجارة إلكترونية، ومنصات تعليمية. يمكنك الاطلاع على بعض مشاريعي عبر منصات مثل GitHub وMostaql.",
    "كيف يمكنني التواصل معك؟": "يمكنك التواصل معي عبر البريد الإلكتروني: abdessamadguia11@gmail.com أو عبر الهاتف: +212778-9463. كما يمكنك زيارة حساباتي على منصات العمل الحر للاطلاع على أعمالي.",
    "default": "شكرًا لسؤالك. يمكنني الإجابة عن استفساراتك حول مهاراتي، مشاريعي، خدماتي، أو كيفية التواصل معي. هل لديك سؤال محدد؟"
};

chatToggle.addEventListener('click', () => {
    soundSystem.playClick();
    chatWindow.classList.toggle('active');
});

closeChat.addEventListener('click', () => {
    soundSystem.playClick();
    chatWindow.classList.remove('active');
});

function sendChatMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

sendMessage.addEventListener('click', () => {
    soundSystem.playClick();
    const message = chatInput.value.trim();
    if (message) {
        sendChatMessage(message, true);
        chatInput.value = '';
        
        setTimeout(() => {
            const response = botResponses[message] || botResponses.default;
            sendChatMessage(response);
        }, 1000);
    }
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage.click();
    }
});

suggestedQuestions.addEventListener('click', (e) => {
    if (e.target.classList.contains('question-btn')) {
        soundSystem.playClick();
        const question = e.target.getAttribute('data-question');
        sendChatMessage(question, true);
        
        setTimeout(() => {
            const response = botResponses[question] || botResponses.default;
            sendChatMessage(response);
        }, 1000);
    }
});

// 3. نظام نسخ البريد من الصورة
const profileImg = document.getElementById('profileImg');
const copyPopup = document.getElementById('copyPopup');

profileImg.addEventListener('click', () => {
    soundSystem.playClick();
    const email = 'abdessamadguia11@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        copyPopup.classList.add('active');
        setTimeout(() => {
            copyPopup.classList.remove('active');
        }, 2000);
    });
});

// 4. نظام الاحتفال عند إرسال بريد
const contactForm = document.getElementById('contactForm');
const celebration = document.getElementById('celebration');
const closeCelebration = document.getElementById('closeCelebration');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    soundSystem.playClick();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'جاري الإرسال...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        // إظهار الاحتفال مع الكونفيتي
        celebration.classList.add('active');
        createConfetti();
        soundSystem.playSuccess();
        
        // إعادة تعيين النموذج
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

closeCelebration.addEventListener('click', () => {
    soundSystem.playClick();
    celebration.classList.remove('active');
});

// 5. نظام الوضع الليلي - مستقل عن نظام الألوان
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', function() {
    soundSystem.playClick();
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
});

// 6. نظام الترجمة
const languageToggle = document.getElementById('languageToggle');
let currentLanguage = 'ar';

languageToggle.addEventListener('click', () => {
    soundSystem.playClick();
    currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    applyTranslation(currentLanguage);
    localStorage.setItem('language', currentLanguage);
});

// 7. نسخ البريد من البطاقة
const emailCard = document.getElementById('emailCard');
emailCard.addEventListener('click', () => {
    soundSystem.playClick();
    const email = 'abdessamadguia11@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
        copyPopup.classList.add('active');
        setTimeout(() => {
            copyPopup.classList.remove('active');
        }, 2000);
    });
});

// إغلاق لوحة الألوان عند النقر خارجها
document.addEventListener('click', (e) => {
    if (!colorToggle.contains(e.target) && !colorPalette.contains(e.target)) {
        colorPalette.classList.remove('active');
    }
});

// تحميل التفضيلات المحفوظة
window.addEventListener('DOMContentLoaded', () => {
    // تحميل الوضع الليلي
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

    // تحميل اللون المختار
    const savedColor = localStorage.getItem('selectedColor');
    if (savedColor) {
        document.body.classList.add(`color-${savedColor}`);
        colorOptions.forEach(opt => {
            if (opt.getAttribute('data-color') === savedColor) {
                opt.classList.add('active');
            } else {
                opt.classList.remove('active');
            }
        });
    }

    // تحميل اللغة
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        currentLanguage = savedLanguage;
        applyTranslation(currentLanguage);
    }

    // تحميل مشاريع GitHub
    loadGitHubRepos();
    setupGitHubFilters();

    // إضافة تأثيرات hover مع الصوت
    document.querySelectorAll('.btn, .control-btn, .side-toggle, .contact-card, .tech-item, .project-card, .social-link, .repo-card, .filter-btn').forEach(element => {
        element.addEventListener('mouseenter', function() {
            soundSystem.playHover();
        });
    });
});

// تحسين الـ Responsive
window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
        document.querySelector('.navbar').style.width = '95%';
    } else {
        document.querySelector('.navbar').style.width = '90%';
    }
});