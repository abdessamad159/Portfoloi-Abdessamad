// ===== نظام الصوت =====
class SoundSystem {
    // نظام إدارة الأصوات
    constructor() {
        // المُنشئ
        this.audioContext = null;
        // سياق الصوت
        this.isEnabled = true;
        // حالة تفعيل الصوت
        this.init();
        // تهيئة النظام
    }

    init() {
        // تهيئة نظام الصوت
        try {
            // محاولة إنشاء سياق الصوت
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            // إنشاء سياق الصوت المتوافق مع المتصفحات
        } catch (error) {
            // في حالة الخطأ
            console.warn('Web Audio API غير مدعومة في هذا المتصفح');
            // تحذير في الكونسول
            this.isEnabled = false;
            // تعطيل النظام
        }
    }

    playTone(frequency, duration = 0.2, type = 'sine') {
        // تشغيل نغمة
        if (!this.isEnabled || !this.audioContext) return;
        // الخروج إذا كان النظام معطلاً

        const oscillator = this.audioContext.createOscillator();
        // إنشاء مولد النغمة
        const gainNode = this.audioContext.createGain();
        // إنشاء عقدة التحكم في الصوت

        oscillator.connect(gainNode);
        // توصيل المولد بعقدة الصوت
        gainNode.connect(this.audioContext.destination);
        // توصيل عقدة الصوت بالخرج

        oscillator.frequency.value = frequency;
        // تعيين التردد
        oscillator.type = type;
        // تعيين نوع الموجة

        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        // بدء الصوت من الصفر
        gainNode.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.01);
        // زيادة الصوت بسرعة
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
        // تقليل الصوت تدريجياً

        oscillator.start(this.audioContext.currentTime);
        // بدء النغمة
        oscillator.stop(this.audioContext.currentTime + duration);
        // إيقاف النغمة بعد المدة
    }

    playHover() {
        // تشغيل صوت التمرير
        this.playTone(523.25); // C5
        // نغمة C5
    }

    playClick() {
        // تشغيل صوت النقر
        this.playTone(659.25); // E5
        // نغمة E5
    }

    playSuccess() {
        // تشغيل صوت النجاح
        // سلسلة نغمات النجاح: C5, E5, G5
        this.playTone(523.25, 0.3);
        // النغمة الأولى
        setTimeout(() => this.playTone(659.25, 0.3), 150);
        // النغمة الثانية بعد تأخير
        setTimeout(() => this.playTone(783.99, 0.5), 300);
        // النغمة الثالثة بعد تأخير
    }

    playBinary() {
        // تشغيل صوت الأرقام الثنائية
        // نغمات الأرقام الثنائية: G4, B4
        this.playTone(392, 0.1); // G4
        // النغمة الأولى
        setTimeout(() => this.playTone(493.88, 0.1), 100); // B4
        // النغمة الثانية بعد تأخير
    }

    playGlitch() {
        // تشغيل تأثير الغليتش
        // تأثير غليتش مع نغمات عشوائية
        for (let i = 0; i < 5; i++) {
            // تكرار 5 مرات
            setTimeout(() => {
                // تأخير لكل نغمة
                const randomFreq = Math.random() * 200 + 300;
                // تردد عشوائي
                this.playTone(randomFreq, 0.05, 'square');
                // تشغيل نغمة قصيرة
            }, i * 50);
            // تأخير متزايد
        }
    }
}

// تهيئة نظام الصوت
const soundSystem = new SoundSystem();
// إنشاء مثيل لنظام الصوت

// ===== تأثيرات تفاعلية =====
function createConfetti() {
    // إنشاء الكونفيتي
    const colors = ['#556B2F', '#8FBC8F', '#3A4A1F', '#8A9A5B', '#FFFFFF'];
    // ألوان الكونفيتي
    const container = document.body;
    // الحاوية الرئيسية
    
    for (let i = 0; i < 100; i++) {
        // إنشاء 100 قطعة كونفيتي
        const confetti = document.createElement('div');
        // إنشاء عنصر الكونفيتي
        confetti.className = 'confetti';
        // إضافة الكلاس
        
        // خصائص عشوائية
        const size = Math.random() * 10 + 5;
        // حجم عشوائي
        const color = colors[Math.floor(Math.random() * colors.length)];
        // لون عشوائي
        const left = Math.random() * 100;
        // موقع أفقي عشوائي
        const animationDuration = Math.random() * 3 + 2;
        // مدة أنيميشن عشوائية
        
        confetti.style.width = `${size}px`;
        // تعيين العرض
        confetti.style.height = `${size}px`;
        // تعيين الارتفاع
        confetti.style.backgroundColor = color;
        // تعيين لون الخلفية
        confetti.style.left = `${left}%`;
        // تعيين الموقع الأفقي
        confetti.style.animation = `confetti-fall ${animationDuration}s linear forwards`;
        // تعيين الأنيميشن
        
        container.appendChild(confetti);
        // إضافة الكونفيتي للصفحة
        
        // إزالة الكونفيتي بعد انتهاء الأنيميشن
        setTimeout(() => {
            if (confetti.parentNode) {
                // إذا كان العنصر موجوداً
                confetti.parentNode.removeChild(confetti);
                // إزالته
            }
        }, animationDuration * 1000);
        // بعد مدة الأنيميشن
    }
}

function showSuccessMessage() {
    // عرض رسالة النجاح
    const successMessage = document.getElementById('successMessage');
    // الحصول على عنصر رسالة النجاح
    successMessage.classList.add('active');
    // إضافة كلاس النشاط
    createConfetti();
    // إنشاء الكونفيتي
    soundSystem.playSuccess();
    // تشغيل صوت النجاح
}

function closeSuccessMessage() {
    // إغلاق رسالة النجاح
    const successMessage = document.getElementById('successMessage');
    // الحصول على عنصر رسالة النجاح
    successMessage.classList.remove('active');
    // إزالة كلاس النشاط
}

function showCopyPopup() {
    // عرض النافذة المنبثقة للنسخ
    const copyPopup = document.getElementById('copyPopup');
    // الحصول على عنصر النافذة المنبثقة
    copyPopup.classList.add('active');
    // إضافة كلاس النشاط
    
    setTimeout(() => {
        // بعد تأخير
        copyPopup.classList.remove('active');
        // إزالة كلاس النشاط
    }, 2000);
    // بعد ثانيتين
}

function applyGlitchEffect(element) {
    // تطبيق تأثير الغليتش
    element.classList.add('glitch-effect');
    // إضافة كلاس الغليتش
    soundSystem.playGlitch();
    // تشغيل صوت الغليتش
    
    setTimeout(() => {
        // بعد تأخير
        element.classList.remove('glitch-effect');
        // إزالة كلاس الغليتش
    }, 500);
    // بعد نصف ثانية
}

// ===== تحميل مشاريع GitHub =====
async function loadGitHubRepos() {
    // تحميل مستودعات GitHub
    try {
        // محاولة التحميل
        const response = await fetch('https://api.github.com/users/abdessamad159/repos?sort=updated&direction=desc');
        // جلب البيانات من API
        const repos = await response.json();
        // تحويل الاستجابة لـ JSON
        
        // حساب الإحصائيات
        let totalStars = 0;
        // مجموع النجوم
        let totalForks = 0;
        // مجموع الفروع
        
        repos.forEach(repo => {
            // لكل مستودع
            totalStars += repo.stargazers_count;
            // إضافة النجوم
            totalForks += repo.forks_count;
            // إضافة الفروع
        });
        
        // تحديث الإحصائيات
        document.getElementById('totalRepos').textContent = repos.length;
        // تحديث عدد المستودعات
        document.getElementById('totalStars').textContent = totalStars;
        // تحديث عدد النجوم
        document.getElementById('totalForks').textContent = totalForks;
        // تحديث عدد الفروع
        
        // عرض المستودعات
        const reposGrid = document.getElementById('reposGrid');
        // الحصول على عنصر الشبكة
        reposGrid.innerHTML = '';
        // تفريغ المحتوى
        
        repos.slice(0, 6).forEach(repo => {
            // عرض أول 6 مستودعات
            const repoCard = document.createElement('div');
            // إنشاء بطاقة مستودع
            repoCard.className = 'repo-card fade-in';
            // إضافة الكلاسات
            
            // تحديد لون اللغة
            const languageColor = getLanguageColor(repo.language);
            // الحصول على لون اللغة
            
            repoCard.innerHTML = `
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
                        <span class="language-color" style="background: ${languageColor};"></span>
                        <span>${repo.language || 'غير محدد'}</span>
                    </div>
                    <a href="${repo.html_url}" target="_blank" class="repo-link">
                        عرض المشروع <i class="fas fa-arrow-left"></i>
                    </a>
                </div>
            `;
            // محتوى بطاقة المستودع
            
            reposGrid.appendChild(repoCard);
            // إضافة البطاقة للشبكة
        });
        
        // إضافة تأثير الظهور التدريجي
        setTimeout(() => {
            // بعد تأخير
            const repoCards = document.querySelectorAll('.repo-card');
            // الحصول على جميع بطاقات المستودعات
            repoCards.forEach((card, index) => {
                // لكل بطاقة
                setTimeout(() => {
                    // مع تأخير
                    card.classList.add('visible');
                    // إضافة كلاس الظهور
                }, index * 200);
                // تأخير متزايد
            });
        }, 100);
        // بعد 100 مللي ثانية
        
    } catch (error) {
        // في حالة الخطأ
        console.error('Error loading GitHub repos:', error);
        // طباعة الخطأ
        document.getElementById('reposGrid').innerHTML = `
            <div class="error-message" style="grid-column: 1/-1; text-align: center; padding: 2rem;">
                <p>عذراً، حدث خطأ في تحميل مشاريع GitHub. يرجى المحاولة مرة أخرى لاحقاً.</p>
            </div>
        `;
        // عرض رسالة الخطأ
    }
}

// ===== تحديد ألوان اللغات البرمجية =====
function getLanguageColor(language) {
    // الحصول على لون اللغة
    const colors = {
        // كائن الألوان
        'JavaScript': '#f1e05a',
        // لون JavaScript
        'TypeScript': '#2b7489',
        // لون TypeScript
        'Python': '#3572A5',
        // لون Python
        'Java': '#b07219',
        // لون Java
        'CSS': '#563d7c',
        // لون CSS
        'HTML': '#e34c26',
        // لون HTML
        'PHP': '#4F5D95',
        // لون PHP
        'C++': '#f34b7d',
        // لون C++
        'C#': '#178600',
        // لون C#
        'Ruby': '#701516',
        // لون Ruby
        'Swift': '#ffac45',
        // لون Swift
        'Kotlin': '#F18E33',
        // لون Kotlin
        'Go': '#00ADD8',
        // لون Go
        'Rust': '#dea584',
        // لون Rust
        'Shell': '#89e051',
        // لون Shell
        'Vue': '#41b883',
        // لون Vue
        'React': '#61dafb',
        // لون React
        'Angular': '#dd0031',
        // لون Angular
        'Node.js': '#339933'
        // لون Node.js
    };
    
    return colors[language] || '#8FBC8F';
    // إرجاع لون اللغة أو اللون الافتراضي
}

// ===== تهيئة دوائر الخلفية =====
function initBubbles() {
    // تهيئة دوائر الخلفية
    const bubblesContainer = document.getElementById('floatingBubbles');
    // الحصول على حاوية الدوائر
    const bubbleCount = window.innerWidth < 768 ? 15 : 30;
    // عدد الدوائر حسب حجم الشاشة
    
    for (let i = 0; i < bubbleCount; i++) {
        // إنشاء الدوائر
        const bubble = document.createElement('div');
        // إنشاء دائرة
        bubble.className = 'bubble';
        // إضافة الكلاس
        
        // أحجام عشوائية للدوائر
        const size = Math.random() * 60 + 20;
        // حجم عشوائي
        bubble.style.width = `${size}px`;
        // تعيين العرض
        bubble.style.height = `${size}px`;
        // تعيين الارتفاع
        
        // مواقع عشوائية
        bubble.style.left = `${Math.random() * 100}%`;
        // موقع أفقي عشوائي
        bubble.style.top = `${Math.random() * 100}%`;
        // موقع عمودي عشوائي
        
        // ألوان متنوعة
        const hue = Math.random() * 60 + 80;
        // درجة لون عشوائية
        bubble.style.background = `hsl(${hue}, 50%, 50%)`;
        // تعيين لون الخلفية
        
        // تأخيرات متعددة للحركة
        bubble.style.animationDelay = `${Math.random() * 15}s`;
        // تأخير عشوائي للأنيميشن
        
        // تأثير الانفجار عند النقر
        bubble.addEventListener('click', function() {
            // عند النقر على الدائرة
            soundSystem.playBinary();
            // تشغيل صوت الأرقام الثنائية
            this.classList.add('popped');
            // إضافة كلاس الانفجار
            setTimeout(() => {
                // بعد تأخير
                bubblesContainer.removeChild(this);
                // إزالة الدائرة
                // إنشاء دائرة جديدة بعد اختفاء القديمة
                setTimeout(createNewBubble, 1000);
                // بعد ثانية
            }, 500);
            // بعد نصف ثانية
        });
        
        bubblesContainer.appendChild(bubble);
        // إضافة الدائرة للحاوية
    }
    
    function createNewBubble() {
        // إنشاء دائرة جديدة
        const bubble = document.createElement('div');
        // إنشاء دائرة
        bubble.className = 'bubble';
        // إضافة الكلاس
        
        const size = Math.random() * 60 + 20;
        // حجم عشوائي
        bubble.style.width = `${size}px`;
        // تعيين العرض
        bubble.style.height = `${size}px`;
        // تعيين الارتفاع
        bubble.style.left = `${Math.random() * 100}%`;
        // موقع أفقي عشوائي
        bubble.style.top = `${Math.random() * 100}%`;
        // موقع عمودي عشوائي
        
        const hue = Math.random() * 60 + 80;
        // درجة لون عشوائية
        bubble.style.background = `hsl(${hue}, 50%, 50%)`;
        // تعيين لون الخلفية
        bubble.style.animationDelay = `${Math.random() * 15}s`;
        // تأخير عشوائي
        
        bubble.addEventListener('click', function() {
            // عند النقر على الدائرة
            soundSystem.playBinary();
            // تشغيل صوت الأرقام الثنائية
            this.classList.add('popped');
            // إضافة كلاس الانفجار
            setTimeout(() => {
                // بعد تأخير
                bubblesContainer.removeChild(this);
                // إزالة الدائرة
                setTimeout(createNewBubble, 1000);
                // إنشاء دائرة جديدة
            }, 500);
            // بعد نصف ثانية
        });
        
        bubblesContainer.appendChild(bubble);
        // إضافة الدائرة للحاوية
    }
}

// ===== تبديل الوضع الليلي/النهاري =====
const themeToggle = document.getElementById('themeToggle');
// زر تبديل الوضع
const themeIcon = themeToggle.querySelector('i');
// أيقونة الزر

themeToggle.addEventListener('click', function() {
    // عند النقر على زر تبديل الوضع
    soundSystem.playClick();
    // تشغيل صوت النقر
    document.body.classList.toggle('dark-mode');
    // تبديل الوضع
    
    if (document.body.classList.contains('dark-mode')) {
        // إذا كان الوضع الليلي مفعل
        themeIcon.classList.remove('fa-moon');
        // إزالة أيقونة القمر
        themeIcon.classList.add('fa-sun');
        // إضافة أيقونة الشمس
        localStorage.setItem('theme', 'dark');
        // حفظ التفضيل
    } else {
        // إذا كان الوضع النهاري مفعل
        themeIcon.classList.remove('fa-sun');
        // إزالة أيقونة الشمس
        themeIcon.classList.add('fa-moon');
        // إضافة أيقونة القمر
        localStorage.setItem('theme', 'light');
        // حفظ التفضيل
    }
});

// التحقق من الوضع المحفوظ
if (localStorage.getItem('theme') === 'dark') {
    // إذا كان التفضيل محفوظ كوضع ليلي
    document.body.classList.add('dark-mode');
    // تفعيل الوضع الليلي
    themeIcon.classList.remove('fa-moon');
    // إزالة أيقونة القمر
    themeIcon.classList.add('fa-sun');
    // إضافة أيقونة الشمس
}

// ===== تبديل اللغة =====
const languageToggle = document.getElementById('languageToggle');
// زر تبديل اللغة
const languageIcon = languageToggle.querySelector('i');
// أيقونة الزر
let currentLanguage = 'ar'; // اللغة الافتراضية هي العربية

// نصوص الترجمة
const translations = {
    // كائن الترجمات
    'ar': {
        // النصوص العربية
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
        'githubDesc': 'هذه مجموعة من مشاريعي المفتوحة المصدر على GitHub التي تعكس مهاراتي وتطوري في مجال البرمجة.',
        'repos': 'المستودعات',
        'stars': 'النجوم',
        'forks': 'الفروع',
        'experience': 'سنوات من الخبرة',
        
        // قسم المشاريع
        'projectsTitle': 'مشاريعي الحقيقية',
        'all': 'الكل',
        'ecommerce': 'متاجر إلكترونية',
        'landing': 'صفحات هبوط',
        'cloud': 'خدمات سحابية',
        
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
        // النصوص الإنجليزية
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
        'githubDesc': 'This is a collection of my open-source projects on GitHub that reflect my skills and development in the programming field.',
        'repos': 'Repositories',
        'stars': 'Stars',
        'forks': 'Forks',
        'experience': 'Years of Experience',
        
        // قسم المشاريع
        'projectsTitle': 'My Real Projects',
        'all': 'All',
        'ecommerce': 'E-commerce',
        'landing': 'Landing Pages',
        'cloud': 'Cloud Services',
        
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

languageToggle.addEventListener('click', function() {
    // عند النقر على زر تبديل اللغة
    soundSystem.playClick();
    // تشغيل صوت النقر
    // تبديل اللغة
    currentLanguage = currentLanguage === 'ar' ? 'en' : 'ar';
    // تبديل بين العربية والإنجليزية
    
    // تحديث أيقونة الزر
    if (currentLanguage === 'ar') {
        // إذا كانت اللغة العربية
        languageIcon.classList.remove('fa-language');
        // إزالة الكلاس القديم
        languageIcon.classList.add('fa-language');
        // إضافة الكلاس الجديد
    } else {
        // إذا كانت اللغة الإنجليزية
        languageIcon.classList.remove('fa-language');
        // إزالة الكلاس القديم
        languageIcon.classList.add('fa-language');
        // إضافة الكلاس الجديد
    }
    
    // تطبيق الترجمة
    applyTranslation(currentLanguage);
    // تطبيق الترجمة للغة المحددة
    
    // حفظ اللغة المفضلة
    localStorage.setItem('language', currentLanguage);
    // حفظ التفضيل
});

// تطبيق الترجمة
function applyTranslation(language) {
    // تطبيق الترجمة للغة المحددة
    const texts = translations[language];
    // الحصول على نصوص اللغة
    
    // تحديث الشريط العلوي
    document.querySelectorAll('.nav-links a').forEach((link, index) => {
        // لكل رابط في شريط التنقل
        const keys = ['home', 'about', 'tech', 'github', 'projects', 'contact'];
        // مفاتيح النصوص
        if (keys[index]) {
            // إذا كان المفتاح موجود
            link.textContent = texts[keys[index]];
            // تحديث النص
        }
    });
    
    // تحديث الشريط الجانبي
    document.querySelectorAll('.sidebar-nav a').forEach((link, index) => {
        // لكل رابط في الشريط الجانبي
        const keys = ['home', 'about', 'tech', 'github', 'projects', 'contact'];
        // مفاتيح النصوص
        if (keys[index]) {
            // إذا كان المفتاح موجود
            link.textContent = texts[keys[index]];
            // تحديث النص
        }
    });
    
    // تحديث قسم البطل
    const heroSection = document.querySelector('.hero');
    // قسم البطل
    heroSection.querySelector('.title').textContent = texts['title'];
    // تحديث العنوان
    heroSection.querySelector('.description').innerHTML = texts['description'];
    // تحديث الوصف
    heroSection.querySelectorAll('.btn')[0].textContent = texts['projectsBtn'];
    // تحديث نص الزر الأول
    heroSection.querySelectorAll('.btn')[1].textContent = texts['contactBtn'];
    // تحديث نص الزر الثاني
    
    // تحديث قسم التقنيات
    document.querySelector('#tech .section-title').textContent = texts['techTitle'];
    // تحديث عنوان القسم
    document.querySelectorAll('.tech-category-advanced h3')[0].textContent = texts['frontend'];
    // تحديث عنوان الفئة الأولى
    document.querySelectorAll('.tech-category-advanced h3')[1].textContent = texts['backend'];
    // تحديث عنوان الفئة الثانية
    document.querySelectorAll('.tech-category-advanced h3')[2].textContent = texts['tools'];
    // تحديث عنوان الفئة الثالثة
    
    // تحديث قسم GitHub
    document.querySelector('#github .section-title').textContent = texts['githubTitle'];
    // تحديث عنوان القسم
    document.querySelector('.github-header p').textContent = texts['githubDesc'];
    // تحديث الوصف
    document.querySelectorAll('.stat-label')[0].textContent = texts['repos'];
    // تحديث تسمية الإحصائية الأولى
    document.querySelectorAll('.stat-label')[1].textContent = texts['stars'];
    // تحديث تسمية الإحصائية الثانية
    document.querySelectorAll('.stat-label')[2].textContent = texts['forks'];
    // تحديث تسمية الإحصائية الثالثة
    document.querySelectorAll('.stat-label')[3].textContent = texts['experience'];
    // تحديث تسمية الإحصائية الرابعة
    
    // تحديث قسم المشاريع
    document.querySelector('#projects .section-title').textContent = texts['projectsTitle'];
    // تحديث عنوان القسم
    document.querySelectorAll('.filter-btn')[0].textContent = texts['all'];
    // تحديث زر الكل
    document.querySelectorAll('.filter-btn')[1].textContent = texts['ecommerce'];
    // تحديث زر المتاجر الإلكترونية
    document.querySelectorAll('.filter-btn')[2].textContent = texts['landing'];
    // تحديث زر صفحات الهبوط
    document.querySelectorAll('.filter-btn')[3].textContent = texts['cloud'];
    // تحديث زر الخدمات السحابية
    
    // تحديث قسم التواصل
    document.querySelector('#contact .section-title').textContent = texts['contactTitle'];
    // تحديث عنوان القسم
    document.querySelectorAll('.contact-details-advanced h3')[0].textContent = texts['email'];
    // تحديث عنوان البطاقة الأولى
    document.querySelectorAll('.contact-details-advanced h3')[1].textContent = texts['phone'];
    // تحديث عنوان البطاقة الثانية
    document.querySelectorAll('.contact-details-advanced h3')[2].textContent = texts['address'];
    // تحديث عنوان البطاقة الثالثة
    document.querySelector('label[for="name"]').textContent = texts['fullName'];
    // تحديث تسمية حقل الاسم
    document.querySelector('label[for="email"]').textContent = texts['email'];
    // تحديث تسمية حقل البريد
    document.querySelector('label[for="subject"]').textContent = texts['subject'];
    // تحديث تسمية حقل الموضوع
    document.querySelector('label[for="message"]').textContent = texts['message'];
    // تحديث تسمية حقل الرسالة
    document.querySelector('#contactForm button').textContent = texts['send'];
    // تحديث نص زر الإرسال
    
    // تحديث الفوتر
    document.querySelector('.copyright').textContent = texts['copyright'];
    // تحديث حقوق النشر
    
    // تغيير اتجاه الصفحة
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    // تغيير اتجاه النص
    document.documentElement.lang = language;
    // تغيير لغة المستند
}

// التحقق من اللغة المحفوظة
const savedLanguage = localStorage.getItem('language');
// الحصول على اللغة المحفوظة
if (savedLanguage) {
    // إذا كانت هناك لغة محفوظة
    currentLanguage = savedLanguage;
    // تعيين اللغة الحالية
    applyTranslation(currentLanguage);
    // تطبيق الترجمة
}

// ===== الشريط الجانبي =====
const menuToggle = document.getElementById('menuToggle');
// زر فتح القائمة
const sidebar = document.getElementById('sidebar');
// الشريط الجانبي
const sidebarClose = document.getElementById('sidebarClose');
// زر إغلاق الشريط

menuToggle.addEventListener('click', function() {
    // عند النقر على زر فتح القائمة
    soundSystem.playClick();
    // تشغيل صوت النقر
    sidebar.classList.add('active');
    // إظهار الشريط الجانبي
});

sidebarClose.addEventListener('click', function() {
    // عند النقر على زر الإغلاق
    soundSystem.playClick();
    // تشغيل صوت النقر
    sidebar.classList.remove('active');
    // إخفاء الشريط الجانبي
});

// إغلاق الشريط الجانبي عند النقر خارجها
document.addEventListener('click', function(event) {
    // عند النقر في أي مكان
    if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
        // إذا كان النقر خارج الشريط وخارج زر القائمة
        sidebar.classList.remove('active');
        // إخفاء الشريط الجانبي
    }
});

// ===== تأثير التمرير على الشريط العلوي =====
window.addEventListener('scroll', function() {
    // عند التمرير
    const navbar = document.getElementById('navbar');
    // شريط التنقل
    if (window.scrollY > 50) {
        // إذا تم التمرير لأكثر من 50px
        navbar.classList.add('scrolled');
        // إضافة كلاس التمرير
    } else {
        // إذا كان في الأعلى
        navbar.classList.remove('scrolled');
        // إزالة كلاس التمرير
    }
});

// ===== شريط التقدم =====
window.addEventListener('scroll', function() {
    // عند التمرير
    const winHeight = window.innerHeight;
    // ارتفاع النافذة
    const docHeight = document.documentElement.scrollHeight;
    // ارتفاع المستند
    const scrolled = window.scrollY;
    // مقدار التمرير
    const progress = (scrolled / (docHeight - winHeight)) * 100;
    // حساب النسبة المئوية
    
    document.getElementById('progressBar').style.width = progress + '%';
    // تحديث عرض شريط التقدم
});

// ===== نسخ البريد الإلكتروني =====
const profileContainer = document.getElementById('profileContainer');
// حاوية الصورة الشخصية
const copyEffect = document.getElementById('copyEffect');
// تأثير النسخ

profileContainer.addEventListener('click', function() {
    // عند النقر على الصورة الشخصية
    const email = 'abdessamadguia11@gmail.com';
    // البريد الإلكتروني
    
    navigator.clipboard.writeText(email).then(() => {
        // نسخ البريد للحافظة
        soundSystem.playSuccess();
        // تشغيل صوت النجاح
        showCopyPopup();
        // عرض النافذة المنبثقة
        
        // إظهار التأثير الكبير بعد تأخير بسيط
        setTimeout(() => {
            // بعد تأخير
            copyEffect.classList.add('active');
            // إظهار تأثير النسخ الكبير
        }, 500);
        // بعد نصف ثانية
    });
});

function closeCopyEffect() {
    // إغلاق تأثير النسخ
    copyEffect.classList.remove('active');
    // إخفاء التأثير
}

// ===== تصفية المشاريع =====
const filterBtns = document.querySelectorAll('.filter-btn');
// أزرار التصفية
const projectCards = document.querySelectorAll('.project-card-advanced');
// بطاقات المشاريع

filterBtns.forEach(btn => {
    // لكل زر تصفية
    btn.addEventListener('click', function() {
        // عند النقر على زر التصفية
        soundSystem.playClick();
        // تشغيل صوت النقر
        // إزالة النشاط من جميع الأزرار
        filterBtns.forEach(b => b.classList.remove('active'));
        // إزالة كلاس النشاط
        // إضافة النشاط للزر المختار
        this.classList.add('active');
        // إضافة كلاس النشاط
        
        const filter = this.getAttribute('data-filter');
        // الحصول على قيمة التصفية
        
        projectCards.forEach(card => {
            // لكل بطاقة مشروع
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                // إذا كانت التصفية "الكل" أو تطابق الفئة
                card.style.display = 'block';
                // إظهار البطاقة
            } else {
                // إذا لم تتطابق
                card.style.display = 'none';
                // إخفاء البطاقة
            }
        });
    });
});

// ===== نموذج التواصل =====
const contactForm = document.getElementById('contactForm');
// نموذج التواصل

contactForm.addEventListener('submit', function(e) {
    // عند إرسال النموذج
    e.preventDefault();
    // منع الإرسال الافتراضي
    
    // محاكاة إرسال النموذج
    const submitBtn = this.querySelector('button[type="submit"]');
    // زر الإرسال
    const originalText = submitBtn.textContent;
    // النص الأصلي للزر
    
    submitBtn.textContent = 'جاري الإرسال...';
    // تغيير نص الزر
    submitBtn.disabled = true;
    // تعطيل الزر
    
    // تطبيق تأثير الغليتش على الزر
    applyGlitchEffect(submitBtn);
    // تطبيق تأثير الغليتش
    
    setTimeout(() => {
        // بعد تأخير
        showSuccessMessage();
        // عرض رسالة النجاح
        contactForm.reset();
        // إعادة تعيين النموذج
        submitBtn.textContent = originalText;
        // إعادة النص الأصلي
        submitBtn.disabled = false;
        // تمكين الزر
    }, 2000);
    // بعد ثانيتين
});

// ===== تأثيرات Hover مع الصوت =====
document.querySelectorAll('.btn, .nav-links a, .theme-toggle, .language-toggle, .menu-toggle, .contact-card, .tech-item, .project-card-advanced, .repo-card, .social-link').forEach(element => {
    // لكل عنصر تفاعلي
    element.addEventListener('mouseenter', function() {
        // عند التمرير فوق العنصر
        soundSystem.playHover();
        // تشغيل صوت التمرير
    });
    
    element.addEventListener('click', function() {
        // عند النقر على العنصر
        soundSystem.playClick();
        // تشغيل صوت النقر
    });
});

// ===== أنيميشن التمرير =====
const fadeElements = document.querySelectorAll('.fade-in');
// العناصر ذات تأثير الظهور التدريجي

const fadeInOnScroll = function() {
    // وظيفة الظهور عند التمرير
    fadeElements.forEach(element => {
        // لكل عنصر
        const elementTop = element.getBoundingClientRect().top;
        // المسافة من أعلى العنصر لأعلى النافذة
        const elementVisible = 150;
        // المسافة المطلوبة للظهور
        
        if (elementTop < window.innerHeight - elementVisible) {
            // إذا كان العنصر ضمن النطاق المرئي
            element.classList.add('visible');
            // إضافة كلاس الظهور
        }
    });
};

window.addEventListener('scroll', fadeInOnScroll);
// استدعاء الوظيفة عند التمرير
fadeInOnScroll();
// استدعاء الوظيفة عند التحميل

// ===== تأثيرات GSAP متقدمة =====
gsap.registerPlugin(ScrollTrigger);
// تسجيل إضافة ScrollTrigger

// تأثيرات على الأقسام
gsap.utils.toArray('section').forEach(section => {
    // لكل قسم
    gsap.fromTo(section, {
        // من
        opacity: 0,
        // شفافية
        y: 50
        // موقع
    }, {
        // إلى
        opacity: 1,
        // شفافية
        y: 0,
        // موقع
        duration: 1,
        // مدة
        scrollTrigger: {
            // محفز التمرير
            trigger: section,
            // العنصر المحفز
            start: 'top 80%',
            // بداية التأثير
            end: 'bottom 20%',
            // نهاية التأثير
            toggleActions: 'play none none reverse'
            // الإجراءات
        }
    });
});

// تأثيرات على البطاقات
gsap.utils.toArray('.tech-category-advanced').forEach((category, i) => {
    // لكل فئة تقنية
    gsap.fromTo(category, {
        // من
        opacity: 0,
        // شفافية
        y: 50
        // موقع
    }, {
        // إلى
        opacity: 1,
        // شفافية
        y: 0,
        // موقع
        duration: 0.8,
        // مدة
        delay: i * 0.2,
        // تأخير
        scrollTrigger: {
            // محفز التمرير
            trigger: category,
            // العنصر المحفز
            start: 'top 85%',
            // بداية التأثير
            end: 'bottom 20%',
            // نهاية التأثير
            toggleActions: 'play none none reverse'
            // الإجراءات
        }
    });
});

// تهيئة الموقع
document.addEventListener('DOMContentLoaded', function() {
    // عند تحميل المستند
    initBubbles();
    // تهيئة الدوائر
    loadGitHubRepos();
    // تحميل مستودعات GitHub
});