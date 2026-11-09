// Digital Logic Design (AI215) - Comprehensive Lectures & Sheet 1 Data
window.COURSE_DATA = {
  "info": {
    "courseCode": "AI215",
    "title": "Digital Logic Design",
    "titleAr": "تصميم المنطق الرقمي",
    "subtitle": "جامعة المنصورة - كلية الحاسبات والمعلومات - قسم الذكاء الاصطناعي",
    "instructors": [
      {
        "name": "Assoc. Prof. Dr. Tarek M. Hassan",
        "role": "Vice Dean for Education and Student Affairs, FCI Mansoura University"
      },
      {
        "name": "Dr. Noha Emad Alsayad",
        "role": "Department of Artificial Intelligence, FCI Mansoura University"
      }
    ],
    "textbook": {
      "title": "Digital Design",
      "edition": "4th Edition",
      "authors": "M. Morris Mano & Michael D. Ciletti",
      "publisher": "Prentice Hall"
    },
    "grading": [
      {
        "item": "Final Written Exam (الامتحان التحريري النهائي)",
        "marks": 60,
        "pct": "60%"
      },
      {
        "item": "Midterm Exam (امتحان منتصف الفصل)",
        "marks": 15,
        "pct": "15%"
      },
      {
        "item": "Practical & Lab Work (العملي والمعمل)",
        "marks": 15,
        "pct": "15%"
      },
      {
        "item": "Year Work & Assignments / Quizzes (أعمال السنة والشيتات)",
        "marks": 10,
        "pct": "10%"
      },
      {
        "item": "Total (المجموع الكلي)",
        "marks": 100,
        "pct": "100%"
      }
    ],
    "description": "منصة تعليمية تفاعلية متكاملة لمقرر تصميم المنطق الرقمي (AI215)، تغطي الأنظمة الرقمية والتحويلات العددية، المتممات والحساب الثنائي، الجبر البولياني وقوانين هنتنغتون وديمورجان، البوابات المنطقية، وتبسيط الدوال باستخدام خرائط كارنوف (K-Maps)، مع حلول شيت (1) كاملة خطوة بخطوة ومعامل تفاعلية."
  },
  "chapters": [
    {
      "id": "ch1",
      "number": "الفصل الأول",
      "code": "Chapter 1",
      "title": "Digital Systems and Binary Numbers",
      "titleAr": "الأنظمة الرقمية والأعداد الثنائية",
      "icon": "⚡",
      "badge": "37 شريحة تعليمية",
      "description": "دراسة الفارق بين الإشارات التناظرية والرقمية، النظام الموضعي للأساس r، التحويلات بين القواعد، المتممات وطرق الطرح، الأعداد ذات الإشارة، ومدخل المنطق الثنائي.",
      "sections": [
        {
          "id": "ch1-sec1",
          "title": "1.1 الأنظمة الرقمية والمعلومات المنفصلة (Digital Systems & Discrete Info)",
          "icon": "💡",
          "readTime": "6 دقائق",
          "contentHtml": "\n<div class=\"content-block\">\n  <h3>ما هو النظام الرقمي (Digital System)؟</h3>\n  <p>النظام الرقمي هو نظام يتعامل مع إشارات منفصلة (Discrete Signals) تمثل قيماً محددة مسبقاً، على عكس الأنظمة التناظرية (Analog Systems) التي تتعامل مع إشارات مستمرة (Continuous) تتغير بسلاسة عبر الزمن.</p>\n  \n  <div class=\"comparison-grid\">\n    <div class=\"comparison-card analog\">\n      <h4>📻 النظام التناظري (Analog System)</h4>\n      <ul>\n        <li>الإشارة مستمرة القيمة والزمن.</li>\n        <li>حساس جداً للتشويش والضوضاء (Noise Sensitive).</li>\n        <li>صعوبة التخزين والمعالجة بدقة متناهية.</li>\n        <li>أمثلة: صوت الإنسان في الهواء، درجات الحرارة الطبيعية، الجهد المستمر.</li>\n      </ul>\n    </div>\n    <div class=\"comparison-card digital\">\n      <h4>💻 النظام الرقمي (Digital System)</h4>\n      <ul>\n        <li>الإشارة منفصلة تتخذ مستويين محددين فقط: <strong>0 و 1</strong> (High / Low).</li>\n        <li>مناعة فائقة ضد الضوضاء (High Noise Immunity).</li>\n        <li>سهولة التخزين والبرمجة والتكامل في دوائر مدمجة (ICs).</li>\n        <li>أمثلة: الحواسيب، الهواتف الذكية، أنظمة التحكم الرقمية، المعالجات.</li>\n      </ul>\n    </div>\n  </div>\n\n  <div class=\"highlight-box\">\n    <strong>💡 الفائدة الأساسية للنظام الرقمي:</strong>\n    تتيح الأجهزة الرقمية دقة أعلى (Greater Accuracy) وثباتاً استثنائياً؛ لأن الدائرة لا تحتاج إلا إلى التمييز بين مستويين فقط للجهد (مثلاً: 0V إلى 0.5V يمثل 0، و 2.4V إلى 5V يمثل 1)، مما يجعل التشويش الصغير لا يؤثر على قيمة البيانات نهائياً.\n  </div>\n\n  <h4>المستويات الثنائية وتمثيلاتها الفيزيائية:</h4>\n  <table class=\"styled-table\">\n    <thead>\n      <tr>\n        <th>القيمة المنطقية</th>\n        <th>المستوى الكهربي</th>\n        <th>الحالة المنطقية</th>\n        <th>المفتاح (Switch)</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td><span class=\"badge-code\">1</span></td>\n        <td>High (مثلاً 5V أو 3.3V)</td>\n        <td>صحيح (True)</td>\n        <td>مغلق / يمرر تيار (ON)</td>\n      </tr>\n      <tr>\n        <td><span class=\"badge-code\">0</span></td>\n        <td>Low (مثلاً 0V - الأرضي)</td>\n        <td>خاطئ (False)</td>\n        <td>مفتوح / قاطع تيار (OFF)</td>\n      </tr>\n    </tbody>\n  </table>\n</div>\n",
          "keyTakeaways": [
            "الأنظمة الرقمية تتعامل مع إشارات منفصلة (0 و 1) وتوفر دقة ومناعة ضد الضوضاء أعلى بكثير من الأنظمة التناظرية.",
            "البت (Bit) هو أصغر وحدة معلومة ثنائية (Binary Digit)، ويمكن أن يكون 0 أو 1 فقط.",
            "الدوائر الرقمية تعتمد على تمثيل الفولتيات بنطاقات منطقية (Logic High / Logic Low)."
          ]
        },
        {
          "id": "ch1-sec2",
          "title": "1.2 الأعداد الثنائية ونظام الأساس r (Binary Numbers & Radix System)",
          "icon": "🔢",
          "readTime": "10 دقائق",
          "contentHtml": "\n<div class=\"content-block\">\n  <h3>القانون العام للأعداد في أي نظام موضعي (Positional Number System)</h3>\n  <p>أي عدد في نظام عددي له أساس <strong>r (Radix)</strong> يمكن كتابته في صورة مجموع متسلسلة أوزان لقوى الأساس r:</p>\n  \n  <div class=\"math-formula\">\n    \\[ D = \\sum_{j=-m}^{n-1} a_j \\cdot r^j = a_{n-1} r^{n-1} + \\dots + a_1 r^1 + a_0 r^0 + a_{-1} r^{-1} + \\dots + a_{-m} r^{-m} \\]\n  </div>\n  \n  <p>حيث تكون معاملات الخانات \\( 0 \\le a_j \\le (r - 1) \\)، والنقطة التي تفصل الجزء الصحيح عن الكسري تسمى <strong>Radix Point</strong> (نقطة الأساس، أو العلامة العشرية/الثنائية).</p>\n\n  <h4>أمثلة على الأنظمة الشائعة:</h4>\n  <div class=\"grid-2col\">\n    <div class=\"card-mini\">\n      <strong>النظام العشري (Decimal, r = 10):</strong>\n      <p>الأرقام المسموحة: 0 إلى 9.<br>\n      مثال: \\( (739.2)_{10} = 7 \\times 10^2 + 3 \\times 10^1 + 9 \\times 10^0 + 2 \\times 10^{-1} = 700 + 30 + 9 + 0.2 = 739.2 \\)</p>\n    </div>\n    <div class=\"card-mini\">\n      <strong>النظام الثنائي (Binary, r = 2):</strong>\n      <p>الأرقام المسموحة: 0 و 1.<br>\n      مثال: \\( (11010.11)_2 = 1\\times 2^4 + 1\\times 2^3 + 0\\times 2^2 + 1\\times 2^1 + 0\\times 2^0 + 1\\times 2^{-1} + 1\\times 2^{-2} \\)<br>\n      \\( = 16 + 8 + 0 + 2 + 0 + 0.5 + 0.25 = (26.75)_{10} \\)</p>\n    </div>\n  </div>\n\n  <h3>التحويل من النظام العشري إلى أي أساس r</h3>\n  <div class=\"step-guide\">\n    <div class=\"step-item\">\n      <span class=\"step-num\">1</span>\n      <div>\n        <strong>تحويل الجزء الصحيح (Integer Part):</strong>\n        <p>نستخدم <em>القسمة المتكررة على الأساس r (Successive Division)</em>، ونسجل الباقي (Remainder) في كل خطوة حتى نصل للصفر. نقرأ البواقي من <strong>الأسفل إلى الأعلى</strong> بحيث يكون الباقي الأول هو الخانة الأقل أهمية (LSB) والأخير هو الخانة الأكثر أهمية (MSB).</p>\n      </div>\n    </div>\n    <div class=\"step-item\">\n      <span class=\"step-num\">2</span>\n      <div>\n        <strong>تحويل الجزء الكسري (Fractional Part):</strong>\n        <p>نستخدم <em>الضرب المتكرر في الأساس r (Successive Multiplication)</em>، ونأخذ الجزء الصحيح الناتج في كل خطوة ونكمل بالكسر المتبقي. نقرأ الأعداد الصحيحة الناتجة من <strong>الأعلى إلى الأسفل</strong>.</p>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"example-box\">\n    <strong>تطبيق عملي من المحاضرة: تحويل العدد \\( (41.6875)_{10} \\) إلى ثنائي:</strong>\n    <div class=\"example-steps\">\n      <p><strong>أ) الجزء الصحيح (41):</strong></p>\n      <ul>\n        <li>\\( 41 \\div 2 = 20 \\) والباقي <strong>1</strong> (LSB)</li>\n        <li>\\( 20 \\div 2 = 10 \\) والباقي <strong>0</strong></li>\n        <li>\\( 10 \\div 2 = 5 \\) والباقي <strong>0</strong></li>\n        <li>\\( 5 \\div 2 = 2 \\) والباقي <strong>1</strong></li>\n        <li>\\( 2 \\div 2 = 1 \\) والباقي <strong>0</strong></li>\n        <li>\\( 1 \\div 2 = 0 \\) والباقي <strong>1</strong> (MSB)</li>\n      </ul>\n      <p>إذن: \\( (41)_{10} = (101001)_2 \\)</p>\n\n      <p><strong>ب) الجزء الكسري (0.6875):</strong></p>\n      <ul>\n        <li>\\( 0.6875 \\times 2 = 1.375 \\) -> الجزء الصحيح = <strong>1</strong> (أول خانة بعد العلامة)</li>\n        <li>\\( 0.375 \\times 2 = 0.75 \\) -> الجزء الصحيح = <strong>0</strong></li>\n        <li>\\( 0.75 \\times 2 = 1.50 \\) -> الجزء الصحيح = <strong>1</strong></li>\n        <li>\\( 0.50 \\times 2 = 1.00 \\) -> الجزء الصحيح = <strong>1</strong> (وصلنا لصفر)</li>\n      </ul>\n      <p>إذن: \\( (0.6875)_{10} = (0.1011)_2 \\)</p>\n      <div class=\"result-highlight\">النتيجة النهائية: \\( (41.6875)_{10} = (101001.1011)_2 \\)</div>\n    </div>\n  </div>\n</div>\n",
          "keyTakeaways": [
            "أي أساس r يستخدم معاملات في النطاق من 0 إلى (r-1).",
            "تحويل الجزء الصحيح يتم بالقسمة المتكررة وقراءة البواقي من الأسفل للأعلى (من LSB إلى MSB).",
            "تحويل الكسر يتم بالضرب المتكرر وقراءة الأجزاء الصحيحة من الأعلى للأسفل."
          ]
        },
        {
          "id": "ch1-sec3",
          "title": "1.3 قوى العدد 2 والأنظمة الثمانية والست عشرية (Octal, Hex & Powers of 2)",
          "icon": "🗄️",
          "readTime": "9 دقائق",
          "contentHtml": "\n<div class=\"content-block\">\n  <h3>قوى العدد 2 وسعات التخزين القياسية في الحواسيب</h3>\n  <p>نظراً لأن أجهزة الحاسب تعمل بالمنطق الثنائي، تُقاس الذاكرة وسعات التخزين بقوى ثنائية محددة:</p>\n  \n  <div class=\"powers-grid\">\n    <div class=\"power-card\">\n      <span class=\"power-sym\">K (Kilo)</span>\n      <span class=\"power-val\">\\( 2^{10} = 1,024 \\) بايت</span>\n      <p>مثلاً: 32K بايت = \\( 32 \\times 1024 = 32,768 \\) بايت</p>\n    </div>\n    <div class=\"power-card\">\n      <span class=\"power-sym\">M (Mega)</span>\n      <span class=\"power-val\">\\( 2^{20} = 1,048,576 \\) بايت</span>\n      <p>مثلاً: 64M بايت = \\( 64 \\times 2^{20} = 67,108,864 \\) بايت</p>\n    </div>\n    <div class=\"power-card\">\n      <span class=\"power-sym\">G (Giga)</span>\n      <span class=\"power-val\">\\( 2^{30} = 1,073,741,824 \\) بايت</span>\n      <p>مثلاً: 6.4G بايت = \\( 6.4 \\times 2^{30} \\approx 6,871,947,674 \\) بايت</p>\n    </div>\n    <div class=\"power-card\">\n      <span class=\"power-sym\">T (Tera)</span>\n      <span class=\"power-val\">\\( 2^{40} = 1,099,511,627,776 \\) بايت</span>\n      <p>سعات الأقراص الصلبة الحديثة</p>\n    </div>\n  </div>\n\n  <h3>العلاقة بين الثنائي والثماني والست عشري (Fast Conversions)</h3>\n  <p>نظراً لأن الأساس الثماني \\( 8 = 2^3 \\) والست عشري \\( 16 = 2^4 \\)، فإن التحويل بينهم وبين الثنائي لا يحتاج المرور بالنظام العشري نهائياً، بل يتم بمجرد <strong>التجميع (Grouping)</strong>:</p>\n\n  <div class=\"conversion-rules-box\">\n    <h4>1. الثنائي إلى ثماني (Binary to Octal):</h4>\n    <p>نقسم العدد الثنائي إلى مجموعات من <strong>3 بتات</strong> بدءاً من العلامة الثنائية باتجاه اليسار للجزء الصحيح، وباتجاه اليمين للكسر (مع إضافة أصفار عند الحاجة):</p>\n    <div class=\"code-calc\">\n      (10 110 001 101 011 . 111 100 000 110)_2 <br>\n       2   6   1   5   3  .  7   4   0   6  = (26153.7406)_8\n    </div>\n\n    <h4>2. الثنائي إلى ست عشري (Binary to Hexadecimal):</h4>\n    <p>نقسم العدد الثنائي إلى مجموعات من <strong>4 بتات</strong> بدءاً من العلامة الثنائية:</p>\n    <div class=\"code-calc\">\n      (10 1100 0110 1011 . 1111 0000 0110)_2 <br>\n       2    C    6    B  .   F    0    6  = (2C6B.F06)_{16}\n    </div>\n    <p><small>* تذكر: A=10, B=11, C=12, D=13, E=14, F=15.</small></p>\n  </div>\n\n  <div class=\"tip-box\">\n    <strong>💡 أهمية التحويل المباشر:</strong>\n    التحويل المباشر بين الثنائي والست عشري عبر تجميع 4 بتات يوفر الوقت بصورة هائلة ويمنع الأخطاء الحسابية الضخمة التي تنتج عن تحويل أعداد ثنائية طويلة أولاً إلى عشري ثم إلى ست عشري!\n  </div>\n</div>\n",
          "keyTakeaways": [
            "في علم الحاسوب: K = 1024, M = 1,048,576, G = 1,073,741,824.",
            "كل خانة ثمانية (Octal) تعادل بالضبط 3 بتات ثنائية (2^3 = 8).",
            "كل خانة ست عشرية (Hex) تعادل بالضبط 4 بتات ثنائية (2^4 = 16) من 0 حتى F."
          ]
        },
        {
          "id": "ch1-sec4",
          "title": "1.4 متممات الأعداد وطرق حسابها (Complements of Numbers)",
          "icon": "🔄",
          "readTime": "11 دقيقة",
          "contentHtml": "\n<div class=\"content-block\">\n  <h3>لماذا نستخدم المتممات (Complements)؟</h3>\n  <p>تُستخدم المتممات في الحواسيب الرقمية لتبسيط عمليات <strong>الطرح (Subtraction)</strong> والتلاعب المنطقي. فبدلاً من تصميم دائرة منفصلة ومعقدة للطرح، نستخدم نفس دوائر الجمع لإجراء الطرح عن طريق جمع المتمم!</p>\n  \n  <p>لكل نظام عددي أساسه \\( r \\) نوعان رئيسيان من المتممات:</p>\n  <ol>\n    <li>متمم الأساس المنقوص: <strong>\\( (r - 1) \\)'s Complement</strong> (مثل متمم الـ 9 في العشري، ومتمم الـ 1 في الثنائي).</li>\n    <li>متمم الأساس الكامل: <strong>\\( r \\)'s Complement</strong> (مثل متمم الـ 10 في العشري، ومتمم الـ 2 في الثنائي).</li>\n  </ol>\n\n  <hr>\n\n  <h4>أولاً: متمم الأساس المنقوص \\( (r - 1) \\)'s Complement</h4>\n  <p>لعدد \\( N \\) مكون من \\( n \\) خانة صحيحة في الأساس \\( r \\)، يُعرّف بالقانون:</p>\n  <div class=\"math-formula\">\n    \\[ (r^n - 1) - N \\]\n  </div>\n  <ul>\n    <li><strong>في النظام العشري (9's Complement):</strong> نطرح كل رقم في العدد من 9.<br>\n      مثال: متمم الـ 9 للعدد 546700 هو: \\( 999999 - 546700 = 453299 \\)</li>\n    <li><strong>في النظام الثنائي (1's Complement):</strong> نطرح كل بت من 1، وهو ما يعادل ببساطة <strong>عكس جميع البتات (Bit Inversion)</strong>: تحويل كل 0 إلى 1 وكل 1 إلى 0.<br>\n      مثال: متمم الـ 1 للعدد \\( 1011000 \\) هو \\( 0100111 \\)</li>\n  </ul>\n\n  <hr>\n\n  <h4>ثانياً: متمم الأساس الكامل \\( r \\)'s Complement</h4>\n  <p>يُعرّف بالقانون العام:</p>\n  <div class=\"math-formula\">\n    \\[ r^n - N = [(r^n - 1) - N] + 1 = (r - 1)\\text{'s Complement} + 1 \\]\n  </div>\n  <ul>\n    <li><strong>في النظام العشري (10's Complement):</strong> هو متمم الـ 9 مضافاً إليه 1.<br>\n      مثال: متمم الـ 10 للعدد 546700 هو: \\( 453299 + 1 = 453300 \\)</li>\n    <li><strong>في النظام الثنائي (2's Complement):</strong> هو متمم الـ 1 مضافاً إليه 1.<br>\n      مثال: متمم الـ 2 للعدد \\( 1011000 \\) هو \\( 0100111 + 1 = 0101000 \\)</li>\n  </ul>\n\n  <div class=\"rule-card\">\n    <h4>⚡ قاعدة ذهبية سريعة لحساب متمم الـ 2 (Quick Trick):</h4>\n    <p>لحساب متمم الـ 2 لأي عدد ثنائي مباشرة دون جمع:</p>\n    <ol>\n      <li>امشِ من اليمين (الخانة الأقل LSB) نحو اليسار.</li>\n      <li>اترك كل الأصفار كما هي بدون تغيير.</li>\n      <li>اترك أول رقم (1) تصادفه كما هو دون تغيير.</li>\n      <li><strong>اقلب جميع البتات المتبقية بعد هذا الواحد</strong> (الـ 0 يصبح 1، والـ 1 يصبح 0).</li>\n    </ol>\n    <div class=\"code-calc\">\n      العدد الأصلي: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1 0 1 1 <strong>0 0 0</strong> &nbsp; (الأصفار تبقى، ثم أول 1)<br>\n      تطبيق القاعدة: &nbsp;&nbsp; <strong>0 1 0</strong> 1 0 0 0 &nbsp; (تم قلب ما بعد أول واحد فقط!)\n    </div>\n  </div>\n</div>\n",
          "keyTakeaways": [
            "متمم (r-1) لعدد n خانة هو (r^n - 1) - N.",
            "متمم r هو متمم (r-1) مضافاً إليه 1 في الخانة الأقل أهمية.",
            "متمم الـ 1 هو قلب كل البتات (NOT)، ومتمم الـ 2 هو ترك الأصفار وأول 1 وقلب الباقي."
          ]
        },
        {
          "id": "ch1-sec5",
          "title": "1.5 عملية الطرح باستخدام المتممات (Subtraction with Complements)",
          "icon": "➖",
          "readTime": "12 دقيقة",
          "contentHtml": "\n<div class=\"content-block\">\n  <h3>خوارزمية الطرح باستخدام متمم الأساس r (مثل متمم 10 أو متمم 2)</h3>\n  <p>لحساب ناتج \\( M - N \\) حيث \\( M \\) و \\( N \\) عددان غير سالبين:</p>\n  <div class=\"step-guide\">\n    <div class=\"step-item\">\n      <span class=\"step-num\">1</span>\n      <div>\n        <strong>الجمع مع المتمم:</strong>\n        <p>نجمع المطروح منه \\( M \\) مع <strong>متمم الأساس \\( r \\) للمطروح \\( N \\)</strong>: أي نحسب \\( M + (r^n - N) = M - N + r^n \\).</p>\n      </div>\n    </div>\n    <div class=\"step-item\">\n      <span class=\"step-num\">2</span>\n      <div>\n        <strong>الحالة الأولى: إذا ظهر End-Carry (حمل أخير = 1):</strong>\n        <p>هذا يعني أن \\( M \\ge N \\) والناتج موجب. نقوم ببساطة بـ <strong>إهمال وتجاهل هذا الحمل (Discard End Carry)</strong>، ويكون الباقي هو الناتج الصحيح مباشرة \\( M - N \\).</p>\n      </div>\n    </div>\n    <div class=\"step-item\">\n      <span class=\"step-num\">3</span>\n      <div>\n        <strong>الحالة الثانية: إذا لم يظهر End-Carry (لا يوجد حمل أخير):</strong>\n        <p>هذا يعني أن \\( M < N \\) والناتج سالب. نقوم بأخذ <strong>متمم الأساس \\( r \\) للمجموع الناتج</strong> ونضع أمامه إشارة سالبة \\( - \\) ليصبح: \\( -(r^n - \\text{Sum}) \\).</p>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"example-box\">\n    <h4>مثال 1 (حالة وجود حمل End-Carry): احسب \\( 72532 - 03250 \\) باستخدام متمم الـ 10:</h4>\n    <div class=\"example-steps\">\n      <p>1. نوجد متمم الـ 10 للعدد 03250 (مع الحفاظ على 5 خانات): \\( 99999 - 03250 + 1 = 96750 \\).</p>\n      <p>2. نجمع: \\( 72532 + 96750 = \\mathbf{1}69282 \\).</p>\n      <p>3. ظهر حمل أخير (End-Carry = 1) -> نهمله!</p>\n      <div class=\"result-highlight\">الناتج = \\( +69282 \\) (وهو بالضبط ناتج الطرح العادي).</div>\n    </div>\n  </div>\n\n  <div class=\"example-box\">\n    <h4>مثال 2 (حالة عدم وجود حمل): احسب \\( 03250 - 72532 \\) باستخدام متمم الـ 10:</h4>\n    <div class=\"example-steps\">\n      <p>1. متمم الـ 10 للعدد 72532 هو \\( 99999 - 72532 + 1 = 27468 \\).</p>\n      <p>2. نجمع: \\( 03250 + 27468 = 30718 \\).</p>\n      <p>3. لم يظهر حمل أخير (No End Carry) -> الناتج سالب!</p>\n      <p>4. نأخذ متمم الـ 10 للناتج 30718: \\( 99999 - 30718 + 1 = 69282 \\).</p>\n      <div class=\"result-highlight\">الناتج النهائي = \\( -69282 \\).</div>\n    </div>\n  </div>\n\n  <div class=\"note-card\">\n    <h4>ملاحظة هامة عن الطرح بمتمم (r-1) (مثل متمم الـ 1):</h4>\n    <p>إذا استخدمنا متمم الـ 1، وعند ظهور حمل أخير (End-Carry)، لا نهمله بل <strong>نجمعه مع خانة الآحاد (End-Around Carry)</strong>! وإذا لم يظهر حمل، نأخذ متمم الـ 1 للناتج ونضع إشارة سالبة.</p>\n  </div>\n</div>\n",
          "keyTakeaways": [
            "الطرح بمتمم r يتحول إلى جمع بسيط.",
            "وجود End Carry يعني الناتج موجب ونهمل الـ Carry مباشرة.",
            "عدم وجود End Carry يعني الناتج سالب ونأخذ متمم r للمجموع مع إشارة سالبة."
          ]
        },
        {
          "id": "ch1-sec6",
          "title": "1.6 الأعداد الثنائية ذات الإشارة (Signed Binary Numbers & Overflow)",
          "icon": "⚖️",
          "readTime": "10 دقائق",
          "contentHtml": "\n<div class=\"content-block\">\n  <h3>تمثيل الإشارة في الأنظمة الرقمية (Sign Representation)</h3>\n  <p>في الحواسيب، تُخصص الخانة الموجودة في أقصى اليسار <strong>(Most Significant Bit - MSB)</strong> لتمثيل الإشارة:</p>\n  <ul>\n    <li>إذا كان \\( \\text{MSB} = 0 \\) -> العدد <strong>موجب (+)</strong>.</li>\n    <li>إذا كان \\( \\text{MSB} = 1 \\) -> العدد <strong>سالب (-)</strong>.</li>\n  </ul>\n\n  <p>هناك ثلاثة أنظمة رئيسية لتمثيل الأعداد ذات الإشارة:</p>\n  <table class=\"styled-table\">\n    <thead>\n      <tr>\n        <th>النظام</th>\n        <th>تمثيل +9 في 8 بت</th>\n        <th>تمثيل -9 في 8 بت</th>\n        <th>المدى لـ n بت</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td><strong>Signed-Magnitude</strong></td>\n        <td><code>00001001</code></td>\n        <td><code>10001001</code></td>\n        <td>\\( -(2^{n-1} - 1) \\) إلى \\( +(2^{n-1} - 1) \\) (له صفران +0 و -0)</td>\n      </tr>\n      <tr>\n        <td><strong>Signed-1's Complement</strong></td>\n        <td><code>00001001</code></td>\n        <td><code>11110110</code></td>\n        <td>\\( -(2^{n-1} - 1) \\) إلى \\( +(2^{n-1} - 1) \\) (له صفران أيضاً)</td>\n      </tr>\n      <tr>\n        <td><strong>Signed-2's Complement</strong> (المعتمد عالمياً)</td>\n        <td><code>00001001</code></td>\n        <td><code>11110111</code></td>\n        <td>\\( -2^{n-1} \\) إلى \\( +(2^{n-1} - 1) \\) (<strong>له صفر واحد فقط!</strong>)</td>\n      </tr>\n    </tbody>\n  </table>\n\n  <div class=\"highlight-box\">\n    <strong>🌟 لماذا يعتبر Signed-2's Complement هو المعيار المعتمد في كل معالجات العالم؟</strong>\n    <ol>\n      <li>يحتوي على تمثيل واحد فقط للصفر (00000000)، بينما الأنظمة الأخرى لديها صفر موجب وصفر سالب!</li>\n      <li>يوفر مدى إضافياً للأعداد السالبة (مثلاً في 8 بت: من -128 إلى +127).</li>\n      <li>الجمع والطرح يتمان بدائرة جمع واحدة وبسيطة دون الحاجة للتحقق من إشارات المدخلات مسبقاً.</li>\n    </ol>\n  </div>\n\n  <h3>ظاهرة الفيض الحسابي (Overflow)</h3>\n  <p>تحدث ظاهرة <strong>Overflow</strong> عندما يتجاوز ناتج جمع عددين المدى المسموح به لعدد الخانات المخصصة (n bits)، مما يؤدي لنتيجة خاطئة تماماً وعكس في الإشارة.</p>\n  <div class=\"rule-card danger\">\n    <strong>قاعدة كشف الـ Overflow:</strong>\n    يحدث Overflow في الجمع فقط في حالتين:\n    <ul>\n      <li>جمع عددين <strong>موجبين</strong> والناتج يظهر كـ <strong>سالب</strong> (البت الأيسر أصبح 1).</li>\n      <li>جمع عددين <strong>سالبين</strong> والناتج يظهر كـ <strong>موجب</strong> (البت الأيسر أصبح 0).</li>\n      <li>* جمع عدد موجب مع عدد سالب لا يمكن أن يسبب Overflow أبداً!</li>\n    </ul>\n  </div>\n</div>\n",
          "keyTakeaways": [
            "البت الأيسر (MSB) يمثل الإشارة: 0 موجب، 1 سالب.",
            "نظام Signed-2's Complement هو الأفضل لعدم وجود ازدواجية في الصفر ومدى أوسع (-2^(n-1) إلى 2^(n-1)-1).",
            "يحدث الـ Overflow عندما ينتج عن جمع عددين من نفس الإشارة ناتج بإشارة معاكسة."
          ]
        },
        {
          "id": "ch1-sec7",
          "title": "1.7 المنطق الثنائي والبوابات الأساسية (Binary Logic & Basic Gates)",
          "icon": "🚪",
          "readTime": "8 دقائق",
          "contentHtml": "\n<div class=\"content-block\">\n  <h3>المنطق الثنائي (Binary Logic)</h3>\n  <p>يتكون المنطق الثنائي من متغيرات ثنائية (Binary Variables) تأخذ إحدى القيمتين {0, 1}، وتخضع لثلاث عمليات منطقية أساسية:</p>\n  \n  <div class=\"gates-intro-grid\">\n    <div class=\"gate-intro-card\">\n      <h4>1. عملية AND (الضرب المنطقي \\( x \\cdot y \\)):</h4>\n      <p>الناتج يكون <strong>1 فقط إذا كانت جميع المدخلات 1</strong>، ويكون 0 إذا كان أي مدخل 0.</p>\n      <table class=\"mini-tt\">\n        <tr><th>x</th><th>y</th><th>x · y</th></tr>\n        <tr><td>0</td><td>0</td><td>0</td></tr>\n        <tr><td>0</td><td>1</td><td>0</td></tr>\n        <tr><td>1</td><td>0</td><td>0</td></tr>\n        <tr><td>1</td><td>1</td><td><strong>1</strong></td></tr>\n      </table>\n    </div>\n\n    <div class=\"gate-intro-card\">\n      <h4>2. عملية OR (الجمع المنطقي \\( x + y \\)):</h4>\n      <p>الناتج يكون <strong>1 إذا كان أي مدخل على الأقل 1</strong>، ويكون 0 فقط إذا كانت جميع المدخلات 0.</p>\n      <table class=\"mini-tt\">\n        <tr><th>x</th><th>y</th><th>x + y</th></tr>\n        <tr><td>0</td><td>0</td><td>0</td></tr>\n        <tr><td>0</td><td>1</td><td><strong>1</strong></td></tr>\n        <tr><td>1</td><td>0</td><td><strong>1</strong></td></tr>\n        <tr><td>1</td><td>1</td><td><strong>1</strong></td></tr>\n      </table>\n    </div>\n\n    <div class=\"gate-intro-card\">\n      <h4>3. عملية NOT / Inverter (النفي \\( x' \\) أو \\( \\bar{x} \\)):</h4>\n      <p>عملية أحادية تعكس القيمة المنطقية: الصفر يصبح 1 والواحد يصبح 0.</p>\n      <table class=\"mini-tt\">\n        <tr><th>x</th><th>x'</th></tr>\n        <tr><td>0</td><td><strong>1</strong></td></tr>\n        <tr><td>1</td><td><strong>0</strong></td></tr>\n      </table>\n    </div>\n  </div>\n\n  <div class=\"note-card\">\n    <strong>⚠️ تنبيه جوهري: الفارق بين الجبر المنطقي والجبر العادي:</strong>\n    في الجبر الثنائي المنطقي: \\( 1 + 1 = 1 \\) (لأنه يعني: صحيح OR صحيح = صحيح).<br>\n    بينما في الحساب الثنائي العادي: \\( 1 + 1 = 10_2 \\) (يعني 2 مع حمل). احذر الخلط بينهما!\n  </div>\n</div>\n",
          "keyTakeaways": [
            "العمليات الأساسية الثلاث في المنطق الرقمي هي: AND و OR و NOT.",
            "في الجبر البولياني، عملية الجمع + تعني OR وعملية الضرب · تعني AND.",
            "تختلف عملية الجمع المنطقي (1+1=1) عن الجمع الحسابي الثنائي (1+1=10)."
          ]
        }
      ]
    },
    {
      "id": "ch2",
      "number": "الفصل الثاني",
      "code": "Chapter 2",
      "title": "Boolean Algebra and Logic Gates",
      "titleAr": "الجبر البولياني والبوابات المنطقية",
      "icon": "📐",
      "badge": "37 شريحة تعليمية",
      "description": "مسلمات هنتنغتون، مبدأ الثنائية (Duality)، النظريات الأساسية وقوانين ديمورجان، المينتيرمز والماكستيرمز، الأشكال القانونية، والـ 16 دالة ثنائية وبواباتها.",
      "sections": [
        {
          "id": "ch2-sec1",
          "title": "2.1 مسلمات هنتنغتون للجبر البولياني (Huntington Postulates)",
          "icon": "📜",
          "readTime": "10 دقائق",
          "contentHtml": "\n<div class=\"content-block\">\n  <h3>التعريف البديهي للجبر البولياني (Axiomatic Definition)</h3>\n  <p>في عام 1904، وضع عالم الرياضيات إدوارد هنتنغتون مجموعة من المسلمات (Postulates) التي تعرّف نظام الجبر البولياني بشكل صارم على مجموعة عناصر \\( B \\) مع عمليتين ثنائيتين \\( + \\) و \\( \\cdot \\):</p>\n  \n  <div class=\"postulates-list\">\n    <div class=\"postulate-card\">\n      <span class=\"p-num\">P1</span>\n      <div>\n        <strong>الانغلاق (Closure):</strong>\n        <p>لكل \\( x, y \\in B \\): الناتج \\( x + y \\in B \\) والناتج \\( x \\cdot y \\in B \\).</p>\n      </div>\n    </div>\n    <div class=\"postulate-card\">\n      <span class=\"p-num\">P2</span>\n      <div>\n        <strong>العنصر المحايد (Identity Elements):</strong>\n        <p>يوجد عنصر محايد للجمع وهو <strong>0</strong> بحيث: \\( x + 0 = x \\).<br>\n        يوجد عنصر محايد للضرب وهو <strong>1</strong> بحيث: \\( x \\cdot 1 = x \\).</p>\n      </div>\n    </div>\n    <div class=\"postulate-card\">\n      <span class=\"p-num\">P3</span>\n      <div>\n        <strong>خاصية الإبدال (Commutative Law):</strong>\n        <p>\\( x + y = y + x \\) &nbsp;&nbsp;&nbsp;&nbsp; و &nbsp;&nbsp;&nbsp;&nbsp; \\( x \\cdot y = y \\cdot x \\)</p>\n      </div>\n    </div>\n    <div class=\"postulate-card highlight-postulate\">\n      <span class=\"p-num\">P4</span>\n      <div>\n        <strong>خاصية التوزيع (Distributive Law):</strong>\n        <p>1. الضرب يتوزع على الجمع: \\( x \\cdot (y + z) = (x \\cdot y) + (x \\cdot z) \\)<br>\n        2. <strong>الجمع يتوزع على الضرب (خاصة فريدة بالجبر البولياني فقط!):</strong><br>\n        \\[ x + (y \\cdot z) = (x + y) \\cdot (x + z) \\]</p>\n      </div>\n    </div>\n    <div class=\"postulate-card\">\n      <span class=\"p-num\">P5</span>\n      <div>\n        <strong>المتمم (Complement):</strong>\n        <p>لكل عنصر \\( x \\in B \\) يوجد متمم \\( x' \\in B \\) بحيث:<br>\n        \\( x + x' = 1 \\) &nbsp;&nbsp;&nbsp;&nbsp; و &nbsp;&nbsp;&nbsp;&nbsp; \\( x \\cdot x' = 0 \\)</p>\n      </div>\n    </div>\n    <div class=\"postulate-card\">\n      <span class=\"p-num\">P6</span>\n      <div>\n        <strong>عنصران متمايزان على الأقل (Distinct Elements):</strong>\n        <p>يوجد عنصران على الأقل في المجموعة \\( B \\) بحيث \\( x \\ne y \\) (وهما عادة 0 و 1).</p>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"tip-box\">\n    <strong>💡 مقارنة هامة مع الجبر العادي:</strong>\n    في الجبر العادي، خاصية توزيع الجمع على الضرب \\( x + yz = (x+y)(x+z) \\) غير صحيحة على الإطلاق! لكنها صحيحة تماماً وقوية جداً في الجبر البولياني، وتستخدم في تبسيط المعادلات بكثرة.\n  </div>\n</div>\n",
          "keyTakeaways": [
            "مسلمات هنتنغتون تعرّف الجبر البولياني رياضياً عبر الانغلاق والمحايد والإبدال والتوزيع والمتمم.",
            "المحايد الجمعي هو 0 والمحايد الضربي هو 1.",
            "خاصية x + yz = (x + y)(x + z) صحيحة في الجبر البولياني وتميزه عن الجبر العادي."
          ]
        },
        {
          "id": "ch2-sec2",
          "title": "2.2 مبدأ الثنائية والنظريات الأساسية (Duality & Boolean Theorems)",
          "icon": "⚖️",
          "readTime": "12 دقيقة",
          "contentHtml": "\n<div class=\"content-block\">\n  <h3>مبدأ الثنائية (Principle of Duality)</h3>\n  <p>ينص المبدأ على أن أي تعبير جبري بولياني صحيح، يظل صحيحاً إذا تم اشتقاق <strong>ثنائيته (Dual)</strong> عن طريق:</p>\n  <ul>\n    <li>استبدال كل عملية \\( + \\) بعملية \\( \\cdot \\).</li>\n    <li>استبدال كل عملية \\( \\cdot \\) بعملية \\( + \\).</li>\n    <li>استبدال كل \\( 0 \\) بـ \\( 1 \\)، وكل \\( 1 \\) بـ \\( 0 \\).</li>\n    <li><small>* تنبيه: الحروف (Literals) تبقى كما هي دون تغيير متمماتها!</small></li>\n  </ul>\n\n  <h3>جدول النظريات والخصائص الأساسية للجبر البولياني</h3>\n  <table class=\"styled-table theorems-table\">\n    <thead>\n      <tr>\n        <th>النظرية / الخاصية</th>\n        <th>الصيغة (Part a)</th>\n        <th>الصيغة الثنائية (Part b)</th>\n        <th>الاسم العلمي</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr>\n        <td><strong>Theorem 1</strong></td>\n        <td>\\( x + x = x \\)</td>\n        <td>\\( x \\cdot x = x \\)</td>\n        <td>الجمود (Idempotency)</td>\n      </tr>\n      <tr>\n        <td><strong>Theorem 2</strong></td>\n        <td>\\( x + 1 = 1 \\)</td>\n        <td>\\( x \\cdot 0 = 0 \\)</td>\n        <td>السيادة (Boundedness)</td>\n      </tr>\n      <tr>\n        <td><strong>Theorem 3</strong></td>\n        <td>\\( (x')' = x \\)</td>\n        <td>-</td>\n        <td>النقض المزدوج (Involution)</td>\n      </tr>\n      <tr>\n        <td><strong>Postulate 3</strong></td>\n        <td>\\( x + y = y + x \\)</td>\n        <td>\\( xy = yx \\)</td>\n        <td>الإبدال (Commutative)</td>\n      </tr>\n      <tr>\n        <td><strong>Theorem 4 (Assoc.)</strong></td>\n        <td>\\( x + (y + z) = (x + y) + z \\)</td>\n        <td>\\( x(yz) = (xy)z \\)</td>\n        <td>التجميع (Associative)</td>\n      </tr>\n      <tr>\n        <td><strong>Postulate 4 (Dist.)</strong></td>\n        <td>\\( x(y + z) = xy + xz \\)</td>\n        <td>\\( x + yz = (x + y)(x + z) \\)</td>\n        <td>التوزيع (Distributive)</td>\n      </tr>\n      <tr>\n        <td><strong>Theorem 5 (DeMorgan)</strong></td>\n        <td>\\( (x + y)' = x' y' \\)</td>\n        <td>\\( (xy)' = x' + y' \\)</td>\n        <td>قوانين ديمورجان (DeMorgan's)</td>\n      </tr>\n      <tr>\n        <td><strong>Theorem 6 (Absorption)</strong></td>\n        <td>\\( x + xy = x \\)</td>\n        <td>\\( x(x + y) = x \\)</td>\n        <td>الامتصاص (Absorption)</td>\n      </tr>\n      <tr>\n        <td><strong>Consensus Theorem</strong></td>\n        <td>\\( xy + x'z + yz = xy + x'z \\)</td>\n        <td>\\( (x+y)(x'+z)(y+z) = (x+y)(x'+z) \\)</td>\n        <td>التوافق (Consensus)</td>\n      </tr>\n    </tbody>\n  </table>\n\n  <div class=\"example-box\">\n    <h4>برهان نظرية الامتصاص (Absorption Theorem) \\( x + xy = x \\):</h4>\n    <div class=\"example-steps\">\n      <p>\\( x + xy = x \\cdot 1 + xy \\) &nbsp;&nbsp;&nbsp;&nbsp; (باستخدام المسلمة 2: المحايد الضربي)</p>\n      <p>\\( = x(1 + y) \\) &nbsp;&nbsp;&nbsp;&nbsp; (باستخدام التوزيع)</p>\n      <p>\\( = x(y + 1) \\) &nbsp;&nbsp;&nbsp;&nbsp; (باستخدام الإبدال)</p>\n      <p>\\( = x \\cdot 1 \\) &nbsp;&nbsp;&nbsp;&nbsp; (باستخدام النظرية 2: \\( y + 1 = 1 \\))</p>\n      <p>\\( = x \\) &nbsp;&nbsp;&nbsp;&nbsp; (تم الإثبات وهو المطلوب!)</p>\n    </div>\n  </div>\n</div>\n",
          "keyTakeaways": [
            "مبدأ الثنائية: تبديل + مع · وتبديل 0 مع 1 ينتج معادلة صحيحة دائماً.",
            "قوانين ديمورجان: نفي الجمع هو ضرب المنفيات، ونفي الضرب هو جمع المنفيات.",
            "نظرية التوافق (Consensus): تفيد في حذف الحدود الزائدة التي لا تؤثر على قيمة الدالة."
          ]
        },
        {
          "id": "ch2-sec3",
          "title": "2.3 المينتيرمز والماكستيرمز والأشكال القياسية (Minterms & Maxterms)",
          "icon": "📊",
          "readTime": "11 دقيقة",
          "contentHtml": "\n<div class=\"content-block\">\n  <h3>المفاهيم الأساسية: Minterms vs Maxterms</h3>\n  <p>لأي دالة تحتوي على \\( n \\) من المتغيرات الثنائية، يوجد \\( 2^n \\) توليفة ممكنة من المدخلات:</p>\n\n  <div class=\"grid-2col\">\n    <div class=\"card-mini minterm-card\">\n      <h4>المينتيرم (Minterm - Standard Product):</h4>\n      <ul>\n        <li>يمثل عملية ضرب (AND) تشمل جميع المتغيرات.</li>\n        <li>يُرمز له بـ \\( m_i \\).</li>\n        <li><strong>يساوي 1 لتوليفة واحدة فقط</strong> من المدخلات و 0 لباقي التوليفات.</li>\n        <li>إذا كان المتغير قيمته 0 يُكتب منفياً (\\( x' \\))، وإذا كان 1 يُكتب صريحاً (\\( x \\)).</li>\n      </ul>\n    </div>\n    <div class=\"card-mini maxterm-card\">\n      <h4>الماكستيرم (Maxterm - Standard Sum):</h4>\n      <ul>\n        <li>يمثل عملية جمع (OR) تشمل جميع المتغيرات.</li>\n        <li>يُرمز له بـ \\( M_i \\).</li>\n        <li><strong>يساوي 0 لتوليفة واحدة فقط</strong> و 1 لباقي التوليفات.</li>\n        <li>إذا كان المتغير قيمته 1 يُكتب منفياً (\\( x' \\))، وإذا كان 0 يُكتب صريحاً (\\( x \\)).</li>\n      </ul>\n    </div>\n  </div>\n\n  <div class=\"rule-card\">\n    <strong>العلاقة الجوهرية بين المينتيرم والماكستيرم:</strong>\n    \\[ m_j' = M_j \\quad \\text{and} \\quad M_j' = m_j \\]\n    أي أن متمم المينتيرم رقم j هو الماكستيرم المقابل له تماماً (حسب قانون ديمورجان).\n  </div>\n\n  <h4>جدول المينتيرمز والماكستيرمز لثلاثة متغيرات (x, y, z):</h4>\n  <table class=\"styled-table\">\n    <thead>\n      <tr>\n        <th>x</th><th>y</th><th>z</th>\n        <th>Minterm Term</th><th>رمز المينتيرم</th>\n        <th>Maxterm Term</th><th>رمز الماكستيرم</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr><td>0</td><td>0</td><td>0</td><td>x' y' z'</td><td><strong>m₀</strong></td><td>x + y + z</td><td><strong>M₀</strong></td></tr>\n      <tr><td>0</td><td>0</td><td>1</td><td>x' y' z</td><td><strong>m₁</strong></td><td>x + y + z'</td><td><strong>M₁</strong></td></tr>\n      <tr><td>0</td><td>1</td><td>0</td><td>x' y z'</td><td><strong>m₂</strong></td><td>x + y' + z</td><td><strong>M₂</strong></td></tr>\n      <tr><td>0</td><td>1</td><td>1</td><td>x' y z</td><td><strong>m₃</strong></td><td>x + y' + z'</td><td><strong>M₃</strong></td></tr>\n      <tr><td>1</td><td>0</td><td>0</td><td>x y' z'</td><td><strong>m₄</strong></td><td>x' + y + z</td><td><strong>M₄</strong></td></tr>\n      <tr><td>1</td><td>0</td><td>1</td><td>x y' z</td><td><strong>m₅</strong></td><td>x' + y + z'</td><td><strong>M₅</strong></td></tr>\n      <tr><td>1</td><td>1</td><td>0</td><td>x y z'</td><td><strong>m₆</strong></td><td>x' + y' + z</td><td><strong>M₆</strong></td></tr>\n      <tr><td>1</td><td>1</td><td>1</td><td>x y z</td><td><strong>m₇</strong></td><td>x' + y' + z'</td><td><strong>M₇</strong></td></tr>\n    </tbody>\n  </table>\n\n  <h3>الأشكال القانونية للدوال المنطقية (Canonical Forms)</h3>\n  <ol>\n    <li><strong>مجموع المينتيرمز (Sum of Minterms - SOM):</strong> جمع التوليفات التي يكون عندها الخرج 1:<br>\n      \\[ F(x, y, z) = \\sum m(1, 4, 7) = m_1 + m_4 + m_7 = x'y'z + xy'z' + xyz \\]\n    </li>\n    <li><strong>حاصل ضرب الماكستيرمز (Product of Maxterms - POM):</strong> ضرب التوليفات التي يكون عندها الخرج 0:<br>\n      \\[ F(x, y, z) = \\prod M(0, 2, 3, 5, 6) = M_0 \\cdot M_2 \\cdot M_3 \\cdot M_5 \\cdot M_6 \\]\n    </li>\n  </ol>\n\n  <div class=\"tip-box\">\n    <strong>💡 التحويل السريع بين SOM و POM:</strong>\n    أي دالة مكتوبة بصيغة \\( \\sum m \\) يمكن كتابتها مباشرة بصيغة \\( \\prod M \\) بأخذ <strong>الأرقام غير الموجودة (Missing Indices)</strong> في مجموع المينتيرمز!\n  </div>\n</div>\n",
          "keyTakeaways": [
            "المينتيرم m_i هو حد ضرب يمثل القيمة 1 لصف واحد في جدول الحقيقة.",
            "الماكستيرم M_i هو حد جمع يمثل القيمة 0 لصف واحد في جدول الحقيقة.",
            "التحويل بين SOM و POM يتم بأخذ الأرقام المتبقية في النطاق من 0 إلى 2^n - 1."
          ]
        },
        {
          "id": "ch2-sec4",
          "title": "2.4 الدوال المنطقية الـ 16 والبوابات الرقمية (16 Functions & Logic Gates)",
          "icon": "🚪",
          "readTime": "12 دقيقة",
          "contentHtml": "\n<div class=\"content-block\">\n  <h3>الـ 16 دالة منطقية الممكنة لمتغيرين (Two Binary Variables)</h3>\n  <p>بما أن لدينا متغيرين \\( x, y \\)، فإن جدول الحقيقة له \\( 2^2 = 4 \\) صفوف. وبالتالي يوجد \\( 2^4 = 16 \\) دالة منطقية مختلفة وممكنة رياضياً:</p>\n\n  <table class=\"styled-table mini-text\">\n    <thead>\n      <tr>\n        <th>الدالة</th>\n        <th>الخرج (00, 01, 10, 11)</th>\n        <th>التعبير البولياني</th>\n        <th>الاسم العلمي والشائع</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr><td>F₀</td><td>0 0 0 0</td><td>0</td><td>Null (دالة الصفر الدائم)</td></tr>\n      <tr><td>F₁</td><td>0 0 0 1</td><td>\\( xy \\)</td><td><strong>AND</strong> (الضرب المنطقي)</td></tr>\n      <tr><td>F₂</td><td>0 0 1 0</td><td>\\( xy' \\)</td><td>Inhibition (المنع / x وليس y)</td></tr>\n      <tr><td>F₃</td><td>0 0 1 1</td><td>\\( x \\)</td><td>Transfer (نقل قيمة x)</td></tr>\n      <tr><td>F₄</td><td>0 1 0 0</td><td>\\( x'y \\)</td><td>Inhibition (y وليس x)</td></tr>\n      <tr><td>F₅</td><td>0 1 0 1</td><td>\\( y \\)</td><td>Transfer (نقل قيمة y)</td></tr>\n      <tr><td>F₆</td><td>0 1 1 0</td><td>\\( x y' + x' y = x \\oplus y \\)</td><td><strong>Exclusive-OR (XOR)</strong></td></tr>\n      <tr><td>F₇</td><td>0 1 1 1</td><td>\\( x + y \\)</td><td><strong>OR</strong> (الجمع المنطقي)</td></tr>\n      <tr><td>F₈</td><td>1 0 0 0</td><td>\\( (x+y)' \\)</td><td><strong>NOR</strong> (نفي OR)</td></tr>\n      <tr><td>F₉</td><td>1 0 0 1</td><td>\\( xy + x'y' = (x \\oplus y)' \\)</td><td><strong>Equivalence / XNOR</strong></td></tr>\n      <tr><td>F₁₀</td><td>1 0 1 0</td><td>\\( y' \\)</td><td>Invert y (نفي المتغير y)</td></tr>\n      <tr><td>F₁₁</td><td>1 0 1 1</td><td>\\( x + y' \\)</td><td>Implication (التضمين \\( y \\implies x \\))</td></tr>\n      <tr><td>F₁₂</td><td>1 1 0 0</td><td>\\( x' \\)</td><td>Invert x (نفي المتغير x)</td></tr>\n      <tr><td>F₁₃</td><td>1 1 0 1</td><td>\\( x' + y \\)</td><td>Implication (التضمين \\( x \\implies y \\))</td></tr>\n      <tr><td>F₁₄</td><td>1 1 1 0</td><td>\\( (xy)' \\)</td><td><strong>NAND</strong> (نفي AND)</td></tr>\n      <tr><td>F₁₅</td><td>1 1 1 1</td><td>1</td><td>Identity (دالة الواحد الدائم)</td></tr>\n    </tbody>\n  </table>\n\n  <h3>البوابات المنطقية الرقمية القياسية (Digital Logic Gates)</h3>\n  <div class=\"gates-cards-grid\">\n    <div class=\"gate-detail-card\">\n      <div class=\"g-header\"><strong>AND Gate</strong> <code>F = x · y</code></div>\n      <p>تنتج 1 فقط إذا كان كل المدخلات 1. الرمز: قوس مستقيم من الخلف ومنحني من الأمام.</p>\n    </div>\n    <div class=\"gate-detail-card\">\n      <div class=\"g-header\"><strong>OR Gate</strong> <code>F = x + y</code></div>\n      <p>تنتج 1 إذا كان أي مدخل 1. الرمز: مدبب من الأمام ومقعر من الخلف.</p>\n    </div>\n    <div class=\"gate-detail-card\">\n      <div class=\"g-header\"><strong>Inverter (NOT)</strong> <code>F = x'</code></div>\n      <p>دائرة أحادية المدخل، تعكس الإشارة. مثلث مع دائرة صغيرة (Bubble) في نهايته.</p>\n    </div>\n    <div class=\"gate-detail-card\">\n      <div class=\"g-header\"><strong>Buffer</strong> <code>F = x</code></div>\n      <p>لا يغير المنطق، ولكنه يُستخدم لتقوية الإشارة الكهربائية (Power Amplification).</p>\n    </div>\n    <div class=\"gate-detail-card\">\n      <div class=\"g-header\"><strong>NAND Gate</strong> <code>F = (xy)'</code></div>\n      <p>بوابة شاملة (Universal). بوابة AND مع دائرة نفي (Bubble) على الخرج.</p>\n    </div>\n    <div class=\"gate-detail-card\">\n      <div class=\"g-header\"><strong>NOR Gate</strong> <code>F = (x+y)'</code></div>\n      <p>بوابة شاملة (Universal). بوابة OR مع دائرة نفي (Bubble) على الخرج.</p>\n    </div>\n    <div class=\"gate-detail-card\">\n      <div class=\"g-header\"><strong>XOR Gate</strong> <code>F = x ⊕ y</code></div>\n      <p><strong>Odd Function:</strong> تعطي 1 إذا كان عدد الآحاد في الدخل فردياً (مختلفين في مدخلين).</p>\n    </div>\n    <div class=\"gate-detail-card\">\n      <div class=\"g-header\"><strong>XNOR Gate</strong> <code>F = (x ⊕ y)'</code></div>\n      <p><strong>Equivalence Gate:</strong> تعطي 1 إذا كانت المدخلات متساوية ومتطابقة (كلاهما 0 أو كلاهما 1).</p>\n    </div>\n  </div>\n</div>\n",
          "keyTakeaways": [
            "لمتغيرين، يوجد 16 دالة منطقية مختلفة تماماً.",
            "بوابة XOR تسمى دالة الفردية (Odd Function) لأن خرجها 1 إذا كان عدد الآحاد في الدخل فردياً.",
            "بوابة XNOR تسمى بوابة التكافؤ (Equivalence) لأنها تعطي 1 عند تطابق المدخلات."
          ]
        }
      ]
    },
    {
      "id": "ch3",
      "number": "الفصل الثالث",
      "code": "Chapter 3",
      "title": "Gate-Level Minimization (K-Maps)",
      "titleAr": "تبسيط الدوائر المنطقية بخرائط كارنوف",
      "icon": "🗺️",
      "badge": "33 شريحة تعليمية",
      "description": "طريقة خريطة كارنوف (K-Map) لـ 2 و 3 و 4 متغيرات، التبسيط بصيغة POS، شروط Don't Care، البوابات الشاملة NAND و NOR، والتنفيذ ثنائي المستوى (Two-Level Implementations).",
      "sections": [
        {
          "id": "ch3-sec1",
          "title": "3.1 خريطة كارنوف لمتغيرين وثلاثة متغيرات (2 & 3 Variable K-Maps)",
          "icon": "📐",
          "readTime": "11 دقيقة",
          "contentHtml": "\n<div class=\"content-block\">\n  <h3>ما هي خريطة كارنوف (Karnaugh Map - K-Map)؟</h3>\n  <p>خريطة كارنوف هي تمثيل بياني جدولي لجدول الحقيقة، تم اختراعها بواسطة موريس كارنوف عام 1953. تكمن قوتها في ترتيب الخلايا وفق <strong>كود جراي (Gray Code: 00, 01, 11, 10)</strong> بحيث تختلف كل خليتين متجاورتين أفقياً أو رأسياً في <strong>متغير واحد فقط</strong>، مما يسمح بحذف هذا المتغير مباشرة عند دمجهما بالاعتماد على القاعدة: \\( x + x' = 1 \\).</p>\n\n  <hr>\n\n  <h4>أولاً: خريطة المتغيرين (2-Variable Map - 4 مربعات):</h4>\n  <div class=\"kmap-visual-wrap\">\n    <table class=\"kmap-table\">\n      <tr>\n        <th class=\"corner-cell\">m / y<br>x</th>\n        <th>y=0 (y')</th>\n        <th>y=1 (y)</th>\n      </tr>\n      <tr>\n        <th>x=0 (x')</th>\n        <td class=\"kmap-cell\"><strong>m₀</strong> (x'y')</td>\n        <td class=\"kmap-cell\"><strong>m₁</strong> (x'y)</td>\n      </tr>\n      <tr>\n        <th>x=1 (x)</th>\n        <td class=\"kmap-cell\"><strong>m₂</strong> (xy')</td>\n        <td class=\"kmap-cell\"><strong>m₃</strong> (xy)</td>\n      </tr>\n    </table>\n  </div>\n  <p>دمج مربعين متجاورين يلغي متغيراً واحداً (مثال: \\( m_0 + m_1 = x'y' + x'y = x'(y' + y) = x' \\)).</p>\n\n  <hr>\n\n  <h4>ثانياً: خريطة الثلاثة متغيرات (3-Variable Map - 8 مربعات):</h4>\n  <p>المتغيرات \\( x \\) (الصفوف) و \\( yz \\) (الأعمدة). لاحظ ترتيب الأعمدة بكود جراي: <strong>00, 01, 11, 10</strong>:</p>\n  \n  <div class=\"kmap-visual-wrap\">\n    <table class=\"kmap-table\">\n      <tr>\n        <th class=\"corner-cell\">x \\ yz</th>\n        <th>00 (y'z')</th>\n        <th>01 (y'z)</th>\n        <th>11 (yz)</th>\n        <th>10 (yz')</th>\n      </tr>\n      <tr>\n        <th>0 (x')</th>\n        <td class=\"kmap-cell\"><strong>m₀</strong></td>\n        <td class=\"kmap-cell\"><strong>m₁</strong></td>\n        <td class=\"kmap-cell\"><strong>m₃</strong></td>\n        <td class=\"kmap-cell\"><strong>m₂</strong></td>\n      </tr>\n      <tr>\n        <th>1 (x)</th>\n        <td class=\"kmap-cell\"><strong>m₄</strong></td>\n        <td class=\"kmap-cell\"><strong>m₅</strong></td>\n        <td class=\"kmap-cell\"><strong>m₇</strong></td>\n        <td class=\"kmap-cell\"><strong>m₆</strong></td>\n      </tr>\n    </table>\n  </div>\n\n  <div class=\"rule-card\">\n    <strong>قواعد التجاور والالتفاف (Wrap-Around):</strong>\n    العمود الأول (00) متجاور مع العمود الأخير (10)! هذا يعني أن المربع \\( m_0 \\) متجاور مع \\( m_2 \\)، والمربع \\( m_4 \\) متجاور مع \\( m_6 \\) عبر الحواف الملتفة.\n  </div>\n\n  <h4>أحجام المجموعات (قوى العدد 2):</h4>\n  <ul>\n    <li>مجموعة من <strong>1</strong> مربع = تمثل حداً بثلاثة متغيرات.</li>\n    <li>مجموعة من <strong>2</strong> مربعين متجاورين = تلغي متغيراً واحداً، يتبقى حد بمتغيرين.</li>\n    <li>مجموعة من <strong>4</strong> مربعات = تلغي متغيرين، يتبقى حد بمتغير واحد فقط.</li>\n    <li>مجموعة من <strong>8</strong> مربعات (الخريطة كاملة) = الدالة تساوي 1 دائماً.</li>\n  </ul>\n</div>\n",
          "keyTakeaways": [
            "ترتيب أعمدة وصفوف خريطة كارنوف يتبع كود جراي (00, 01, 11, 10) لضمان تغير بت واحد بين كل خليتين متجاورتين.",
            "الأطراف الخارجية للخريطة متجاورة بحركة الالتفاف (Wrap-around).",
            "مجموعة من 2^k خلية تحذف k متغيرات من التعبير الناتج."
          ]
        },
        {
          "id": "ch3-sec2",
          "title": "3.2 خريطة الأربعة متغيرات والمتضمنات الأساسية (4-Variable K-Map & EPI)",
          "icon": "🧩",
          "readTime": "13 دقيقة",
          "contentHtml": "\n<div class=\"content-block\">\n  <h3>خريطة الأربعة متغيرات (16 مربعاً)</h3>\n  <p>المتغيرات \\( w, x \\) للصفوف و \\( y, z \\) للأعمدة. كلا المحورين مرتبان بتسلسل كود جراي (00, 01, 11, 10):</p>\n\n  <div class=\"kmap-visual-wrap\">\n    <table class=\"kmap-table kmap-4var\">\n      <tr>\n        <th class=\"corner-cell\">wx \\ yz</th>\n        <th>00</th><th>01</th><th>11</th><th>10</th>\n      </tr>\n      <tr>\n        <th>00</th>\n        <td class=\"kmap-cell\">m₀</td><td class=\"kmap-cell\">m₁</td><td class=\"kmap-cell\">m₃</td><td class=\"kmap-cell\">m₂</td>\n      </tr>\n      <tr>\n        <th>01</th>\n        <td class=\"kmap-cell\">m₄</td><td class=\"kmap-cell\">m₅</td><td class=\"kmap-cell\">m₇</td><td class=\"kmap-cell\">m₆</td>\n      </tr>\n      <tr>\n        <th>11</th>\n        <td class=\"kmap-cell\">m₁₂</td><td class=\"kmap-cell\">m₁₃</td><td class=\"kmap-cell\">m₁₅</td><td class=\"kmap-cell\">m₁₄</td>\n      </tr>\n      <tr>\n        <th>10</th>\n        <td class=\"kmap-cell\">m₈</td><td class=\"kmap-cell\">m₉</td><td class=\"kmap-cell\">m₁₁</td><td class=\"kmap-cell\">m₁₀</td>\n      </tr>\n    </table>\n  </div>\n\n  <div class=\"highlight-box\">\n    <strong>🌟 حالة خاصة هامة: الأركان الأربعة (The Four Corners):</strong>\n    المربعات الأربعة في أركان الخريطة: <strong>\\( m_0, m_2, m_8, m_{10} \\)</strong> تعتبر متجاورة تماماً بالالتفاف الأفقي والرأسي، وتشكل معاً مجموعة رباعية مبسطة ناتجها هو: <strong>\\( B'D' \\)</strong> (أو \\( x'z' \\)).\n  </div>\n\n  <h3>المتضمن الأولي والمتضمن الأولي الأساسي (PI vs EPI)</h3>\n  <div class=\"grid-2col\">\n    <div class=\"card-mini\">\n      <h4>المتضمن الأولي (Prime Implicant - PI):</h4>\n      <p>هو أكبر مستطيل ممكن من خلايا الآحاد المتجاورة (بحجم 1, 2, 4, 8, 16) لا يمكن دمجه مع أي مجموعة أكبر دون إدخال أصفار.</p>\n    </div>\n    <div class=\"card-mini\">\n      <h4>المتضمن الأولي الأساسي (Essential Prime Implicant - EPI):</h4>\n      <p>هو متضمن أولي (PI) <strong>يحتوي على رقم 1 واحد على الأقل لا تغطيه أي مجموعة أخرى</strong>! يجب إدراجه إجبارياً في التعبير النهائي للدالة.</p>\n    </div>\n  </div>\n\n  <div class=\"step-guide\">\n    <h4>خوارزمية التبسيط المثالي بخريطة كارنوف:</h4>\n    <div class=\"step-item\">\n      <span class=\"step-num\">1</span>\n      <div>حدد كل المتضمنات الأولية الأساسية (EPIs) وضعها في التعبير النهائي فوراً.</div>\n    </div>\n    <div class=\"step-item\">\n      <span class=\"step-num\">2</span>\n      <div>ابحث عن أي آحاد متبقية لم تتم تغطيتها، وغطّها بأقل عدد ممكن من المتضمنات الأولية (PIs).</div>\n    </div>\n  </div>\n</div>\n",
          "keyTakeaways": [
            "خريطة الـ 4 متغيرات تحتوي على 16 مربعاً والالتفاف يعمل أفقياً ورأسياً.",
            "الأركان الأربعة (m0, m2, m8, m10) تشكل مجموعة رباعية تنتج حداً بحرفين فقط.",
            "المتضمن الأولي الأساسي (EPI) يغطي خانة 1 فريدة لا يغطيها غيره، ووجوده في الحل إجباري."
          ]
        },
        {
          "id": "ch3-sec3",
          "title": "3.3 التبسيط بصيغة POS وحالات Don't-Care (POS & Don't-Care)",
          "icon": "🎯",
          "readTime": "10 دقائق",
          "contentHtml": "\n<div class=\"content-block\">\n  <h3>التبسيط بصيغة حاصل ضرب المجموعات (Product of Sums - POS)</h3>\n  <p>بدلاً من تجميع الآحاد (1s) للحصول على صيغة مجموع المنتجات (SOP)، يمكننا تبسيط الدالة بصيغة POS عبر الخطوات التالية:</p>\n  <div class=\"step-guide\">\n    <div class=\"step-item\">\n      <span class=\"step-num\">1</span>\n      <div><strong>تجميع الأصفار (0s):</strong> نجمع خلايا الأصفار في أكبر مجموعات ممكنة من قوى 2 للحصول على الدالة المنفية \\( F' \\) بصيغة SOP.</div>\n    </div>\n    <div class=\"step-item\">\n      <span class=\"step-num\">2</span>\n      <div><strong>تطبيق نظرية ديمورجان:</strong> نأخذ متمم \\( F' \\) ليصبح \\( F = (F')' \\)، مما يحول حدود الضرب المنفية إلى حدود جمع مضروبة في بعضها (POS).</div>\n    </div>\n  </div>\n\n  <div class=\"example-box\">\n    <h4>مثال عملي:</h4>\n    <p>إذا كانت مجموعة الأصفار تعطي: \\( F' = AB + CD' \\)</p>\n    <p>بتطبيق ديمورجان: \\( F = (F')' = (AB + CD')' = (AB)' \\cdot (CD')' = (A' + B')(C' + D) \\)</p>\n    <div class=\"result-highlight\">النتيجة هي دالة بصيغة POS مبسطة ومباشرة!</div>\n  </div>\n\n  <hr>\n\n  <h3>شروط Don't-Care (الحالات غير المهمة - d أو X)</h3>\n  <p>في بعض التطبيقات العملية، توجد توليفات معينة من المدخلات لا تحدث أبداً فيزيائياً (مثل الأرقام من 10 إلى 15 في كود BCD للأرقام العشرية). خروج الدالة عند هذه التوليفات يسمى <strong>Don't-Care Condition</strong> ويُرمز له بـ \\( d \\) أو \\( X \\).</p>\n\n  <div class=\"rule-card\">\n    <strong>القاعدة الذهبية للتعامل مع Don't-Care:</strong>\n    <ul>\n      <li>يمكن اعتبار خانة الـ \\( X \\) مساوية لـ <strong>1</strong> إذا ساعدت في تكبير حجم المجموعة وتقليل عدد حروف التعبير.</li>\n      <li>يمكن اعتبار خانة الـ \\( X \\) مساوية لـ <strong>0</strong> وتجاهلها تماماً إذا لم تفد في تكبير أي مجموعة.</li>\n      <li><strong>ليس واجباً أبداً تغطية جميع الـ Xs</strong>، بل نغطي الآحاد الحقيقية فقط!</li>\n    </ul>\n  </div>\n</div>\n",
          "keyTakeaways": [
            "للحصول على صيغة POS: جمّع أصفار الخريطة ثم خذ المتمم بقوانين ديمورجان.",
            "شروط Don't-Care (X) تمثل حالات إدخال لا تقع في الواقع العملي.",
            "نستغل X كـ 1 فقط إذا ساعدت في تكبير المجموعة، ونهملها كـ 0 إن لم تفد."
          ]
        },
        {
          "id": "ch3-sec4",
          "title": "3.4 البوابات الشاملة والتنفيذ ثنائي المستوى (NAND/NOR & Two-Level Logic)",
          "icon": "🔄",
          "readTime": "12 دقيقة",
          "contentHtml": "\n<div class=\"content-block\">\n  <h3>لماذا تعتبر بوابات NAND و NOR بوابات شاملة (Universal Gates)؟</h3>\n  <p>تسمى البوابة \"شاملة\" إذا كان بإمكانها بمفردها تمثيل وتكوين أي دالة منطقية مهما كانت دون الحاجة لأي نوع آخر من البوابات. وتتميز بوابات NAND و NOR بسهولة ورخص تصنيعها الفائق باستخدام تقنية الترانزستورات (CMOS / TTL).</p>\n\n  <div class=\"grid-2col\">\n    <div class=\"card-mini\">\n      <h4>التمثيلان المتكافئان لبوابة NAND:</h4>\n      <ul>\n        <li><strong>AND-Invert:</strong> بوابة AND وفي نهايتها دائرة نفي (Bubble).</li>\n        <li><strong>Invert-OR:</strong> بوابة OR وفي مداخلها دوائر نفي (حسب ديمورجان: \\( (xy)' = x' + y' \\)).</li>\n      </ul>\n    </div>\n    <div class=\"card-mini\">\n      <h4>التمثيلان المتكافئان لبوابة NOR:</h4>\n      <ul>\n        <li><strong>OR-Invert:</strong> بوابة OR وفي نهايتها دائرة نفي (Bubble).</li>\n        <li><strong>Invert-AND:</strong> بوابة AND وفي مداخلها دوائر نفي (حسب ديمورجان: \\( (x+y)' = x'y' \\)).</li>\n      </ul>\n    </div>\n  </div>\n\n  <h3>تحويل دائرة AND-OR إلى دوائر NAND فقط (NAND-NAND Implementation)</h3>\n  <p>أي دالة معبر عنها بصيغة مجموع المنتجات (Sum of Products - SOP) مكونة من مستويين (AND gates في المستوى الأول متبوعة بـ OR gate في المستوى الثاني) يمكن تحويلها <strong>مباشرة وبشكل متطابق إلى بوابات NAND فقط</strong> دون تغيير أي توصيلات:</p>\n  <div class=\"step-guide\">\n    <div class=\"step-item\">\n      <span class=\"step-num\">1</span>\n      <div>المستوى الأول: استبدل كل بوابة AND ببوابة NAND عادية (AND-Invert).</div>\n    </div>\n    <div class=\"step-item\">\n      <span class=\"step-num\">2</span>\n      <div>المستوى الثاني: استبدل بوابة OR ببوابة Invert-OR (وهي التكافؤ المباشر لـ NAND). دوائر النفي تلغي بعضها تماماً (Bubble Cancels Bubble)!</div>\n    </div>\n  </div>\n\n  <h3>التنفيذات ثنائية المستوى غير المنحلة (Non-Degenerate Forms):</h3>\n  <table class=\"styled-table\">\n    <thead>\n      <tr>\n        <th>المستوى الأول</th>\n        <th>المستوى الثاني</th>\n        <th>الشكل الناتج المكافئ</th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr><td>AND</td><td>OR</td><td>AND-OR (SOP قياسي)</td></tr>\n      <tr><td>NAND</td><td>NAND</td><td><strong>مكافئ تماماً لـ AND-OR</strong></td></tr>\n      <tr><td>OR</td><td>AND</td><td>OR-AND (POS قياسي)</td></tr>\n      <tr><td>NOR</td><td>NOR</td><td><strong>مكافئ تماماً لـ OR-AND</strong></td></tr>\n      <tr><td>AND</td><td>NOR</td><td>AND-OR-INVERT (AOI)</td></tr>\n      <tr><td>OR</td><td>NAND</td><td>OR-AND-INVERT (OAI)</td></tr>\n    </tbody>\n  </table>\n</div>\n",
          "keyTakeaways": [
            "NAND و NOR بوابتان شاملتان يمكن بناء أي نظام رقمي كامل باستخدامهما فقط.",
            "دائرة AND-OR ثنائية المستوى تكافئ تماماً دائرة NAND-NAND.",
            "دائرة OR-AND ثنائية المستوى تكافئ تماماً دائرة NOR-NOR."
          ]
        }
      ]
    },
    {
      "id": "sheet1",
      "number": "الشيت الأول",
      "code": "Sheet (1)",
      "title": "Sheet 1: Comprehensive Tutorial Exercises",
      "titleAr": "شيت (1): المسائل والتمارين المحلولة بالتفصيل",
      "icon": "📑",
      "badge": "10 مسائل كاملة بالخطوات",
      "description": "حلول تفصيلية ودقيقة لجميع مسائل الشيت الأول من قسم الذكاء الاصطناعي بجامعة المنصورة، مع الخطوات الرياضية وتوضيح كل عملية جمع وطرح وتحويل.",
      "sections": [
        {
          "id": "sheet1-p1",
          "title": "تمرين 1: كتابة قوائم الأعداد في قواعد مختلفة (Number Lists)",
          "icon": "📝",
          "readTime": "6 دقائق",
          "contentHtml": "\n<div class=\"content-block\">\n  <h3>نص المسالة 1 (Problem 1)</h3>\n  <div class=\"problem-statement\">\n    <strong>List the octal and hexadecimal numbers from 16 to 32. Using A, B, and C for the last three digits, list the numbers from 8 to 28 in base 13.</strong>\n  </div>\n\n  <h4>أولاً: الأعداد من 16 إلى 32 في النظام العشري وما يقابلها في الثماني والست عشري:</h4>\n  <table class=\"styled-table\">\n    <thead>\n      <tr><th>Decimal (Base 10)</th><th>Octal (Base 8)</th><th>Hexadecimal (Base 16)</th></tr>\n    </thead>\n    <tbody>\n      <tr><td>16</td><td>20</td><td>10</td></tr>\n      <tr><td>17</td><td>21</td><td>11</td></tr>\n      <tr><td>18</td><td>22</td><td>12</td></tr>\n      <tr><td>19</td><td>23</td><td>13</td></tr>\n      <tr><td>20</td><td>24</td><td>14</td></tr>\n      <tr><td>21</td><td>25</td><td>15</td></tr>\n      <tr><td>22</td><td>26</td><td>16</td></tr>\n      <tr><td>23</td><td>27</td><td>17</td></tr>\n      <tr><td>24</td><td>30</td><td>18</td></tr>\n      <tr><td>25</td><td>31</td><td>19</td></tr>\n      <tr><td>26</td><td>32</td><td>1A</td></tr>\n      <tr><td>27</td><td>33</td><td>1B</td></tr>\n      <tr><td>28</td><td>34</td><td>1C</td></tr>\n      <tr><td>29</td><td>35</td><td>1D</td></tr>\n      <tr><td>30</td><td>36</td><td>1E</td></tr>\n      <tr><td>31</td><td>37</td><td>1F</td></tr>\n      <tr><td>32</td><td>40</td><td>20</td></tr>\n    </tbody>\n  </table>\n\n  <h4>ثانياً: الأعداد من 8 إلى 28 في الأساس 13 (Base 13):</h4>\n  <p>الرموز المتاحة في الأساس 13 هي: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A (يمثل 10), B (يمثل 11), C (يمثل 12).</p>\n  <div class=\"code-calc\">\n    8₁₀  = 8₁₃<br>\n    9₁₀  = 9₁₃<br>\n    10₁₀ = A₁₃<br>\n    11₁₀ = B₁₃<br>\n    12₁₀ = C₁₃<br>\n    13₁₀ = 10₁₃ &nbsp;&nbsp; (1 × 13¹ + 0 × 13⁰)<br>\n    14₁₀ = 11₁₃<br>\n    15₁₀ = 12₁₃<br>\n    16₁₀ = 13₁₃<br>\n    17₁₀ = 14₁₃<br>\n    18₁₀ = 15₁₃<br>\n    19₁₀ = 16₁₃<br>\n    20₁₀ = 17₁₃<br>\n    21₁₀ = 18₁₃<br>\n    22₁₀ = 19₁₃<br>\n    23₁₀ = 1A₁₃<br>\n    24₁₀ = 1B₁₃<br>\n    25₁₀ = 1C₁₃<br>\n    26₁₀ = 20₁₃ &nbsp;&nbsp; (2 × 13¹ + 0 × 13⁰ = 26)<br>\n    27₁₀ = 21₁₃<br>\n    28₁₀ = 22₁₃\n  </div>\n</div>\n",
          "keyTakeaways": [
            "في أي أساس r، العدد التالي بعد (r-1) هو 10_r.",
            "في النظام الست عشري: بعد 19 تأتي 1A حتى 1F ثم 20.",
            "في الأساس 13: 26_10 هي 20_13 لأن 2 × 13 = 26."
          ]
        },
        {
          "id": "sheet1-p2",
          "title": "تمرين 2: حساب عدد البايتات الدقيق للسعات 32K و 64M و 6.4G",
          "icon": "💾",
          "readTime": "5 دقائق",
          "contentHtml": "\n<div class=\"content-block\">\n  <h3>نص المسالة 2 (Problem 2)</h3>\n  <div class=\"problem-statement\">\n    <strong>What is the exact number of bytes in a system that contains:</strong><br>\n    (a) 32K bytes?<br>\n    (b) 64M bytes?<br>\n    (c) 6.4G bytes?\n  </div>\n\n  <h4>الحل النموذجي بالخطوات:</h4>\n  \n  <div class=\"example-box\">\n    <strong>(a) 32K bytes:</strong>\n    <p>نعلم أن الكيلو الثنائي \\( 1\\text{K} = 2^{10} = 1024 \\) بايت.</p>\n    <div class=\"math-formula\">\n      \\[ 32\\text{K} = 32 \\times 1024 = 2^5 \\times 2^{10} = 2^{15} = \\mathbf{32,768} \\text{ bytes} \\]\n    </div>\n  </div>\n\n  <div class=\"example-box\">\n    <strong>(b) 64M bytes:</strong>\n    <p>نعلم أن الميجا الثنائية \\( 1\\text{M} = 2^{20} = 1,048,576 \\) بايت.</p>\n    <div class=\"math-formula\">\n      \\[ 64\\text{M} = 64 \\times 2^{20} = 2^6 \\times 2^{20} = 2^{26} = 64 \\times 1,048,576 = \\mathbf{67,108,864} \\text{ bytes} \\]\n    </div>\n  </div>\n\n  <div class=\"example-box\">\n    <strong>(c) 6.4G bytes:</strong>\n    <p>نعلم أن الجيجا الثنائية \\( 1\\text{G} = 2^{30} = 1,073,741,824 \\) بايت.</p>\n    <div class=\"math-formula\">\n      \\[ 6.4\\text{G} = 6.4 \\times 2^{30} = 6.4 \\times 1,073,741,824 = \\mathbf{6,871,947,673.6} \\approx \\mathbf{6,871,947,674} \\text{ bytes} \\]\n    </div>\n    <p><small>* ملحوظة: إذا اعتبرنا الجيجا بالنظام العشري القياسي التجاري (Decimal SI) فإن 6.4G = \\( 6.4 \\times 10^9 = 6,400,000,000 \\) بايت، لكن في سياق نظم الحاسب الثنائية المعتمد في المنهج نستخدم \\( 2^{30} \\).</small></p>\n  </div>\n</div>\n",
          "keyTakeaways": [
            "32K تعادل 2^15 = 32,768 بايت.",
            "64M تعادل 2^26 = 67,108,864 بايت.",
            "6.4G تعادل 6.4 × 2^30 ≈ 6,871,947,674 بايت."
          ]
        },
        {
          "id": "sheet1-p3",
          "title": "تمرين 3 & 4: تحويل الأعداد ذات القواعد والكسور إلى عشري",
          "icon": "🔄",
          "readTime": "8 دقائق",
          "contentHtml": "\n<div class=\"content-block\">\n  <h3>نص المسالة 3 (Problem 3)</h3>\n  <div class=\"problem-statement\">\n    <strong>Convert the following numbers with the indicated bases to decimal:</strong><br>\n    (a) \\( (4310)_5 \\)<br>\n    (b) \\( (198)_{12} \\)<br>\n    (c) \\( (735)_8 \\)<br>\n    (d) \\( (525)_{16} \\)\n  </div>\n\n  <h4>خطوات الحل بالتفصيل:</h4>\n  <ul>\n    <li><strong>(a) \\( (4310)_5 \\):</strong><br>\n      \\( = 4 \\times 5^3 + 3 \\times 5^2 + 1 \\times 5^1 + 0 \\times 5^0 \\)<br>\n      \\( = 4 \\times 125 + 3 \\times 25 + 1 \\times 5 + 0 = 500 + 75 + 5 + 0 = \\mathbf{580_{10}} \\)\n    </li>\n    <li><strong>(b) \\( (198)_{12} \\):</strong><br>\n      \\( = 1 \\times 12^2 + 9 \\times 12^1 + 8 \\times 12^0 \\)<br>\n      \\( = 144 + 108 + 8 = \\mathbf{260_{10}} \\)\n    </li>\n    <li><strong>(c) \\( (735)_8 \\):</strong><br>\n      \\( = 7 \\times 8^2 + 3 \\times 8^1 + 5 \\times 8^0 \\)<br>\n      \\( = 7 \\times 64 + 24 + 5 = 448 + 24 + 5 = \\mathbf{477_{10}} \\)\n    </li>\n    <li><strong>(d) \\( (525)_{16} \\):</strong><br>\n      \\( = 5 \\times 16^2 + 2 \\times 16^1 + 5 \\times 16^0 \\)<br>\n      \\( = 5 \\times 256 + 32 + 5 = 1280 + 32 + 5 = \\mathbf{1317_{10}} \\)\n    </li>\n  </ul>\n\n  <hr>\n\n  <h3>نص المسالة 4 (Problem 4): تحويل الأعداد الكسرية والست عشرية</h3>\n  <div class=\"problem-statement\">\n    (a) \\( (10110.0101)_2 \\)<br>\n    (b) \\( (16.5)_{16} \\)<br>\n    (c) \\( (26.24)_8 \\)<br>\n    (d) \\( (FAFA)_{16} \\)<br>\n    (e) \\( (1010.1010)_2 \\)\n  </div>\n\n  <h4>خطوات الحل:</h4>\n  <ul>\n    <li><strong>(a) \\( (10110.0101)_2 \\):</strong><br>\n      الصحيح: \\( 16 + 4 + 2 = 22 \\)<br>\n      الكسر: \\( 0\\times 2^{-1} + 1\\times 2^{-2} + 0\\times 2^{-3} + 1\\times 2^{-4} = 0.25 + 0.0625 = 0.3125 \\)<br>\n      الناتج: \\( \\mathbf{22.3125_{10}} \\)\n    </li>\n    <li><strong>(b) \\( (16.5)_{16} \\):</strong><br>\n      \\( = 1 \\times 16^1 + 6 \\times 16^0 + 5 \\times 16^{-1} = 16 + 6 + \\frac{5}{16} = 22 + 0.3125 = \\mathbf{22.3125_{10}} \\)\n    </li>\n    <li><strong>(c) \\( (26.24)_8 \\):</strong><br>\n      \\( = 2 \\times 8^1 + 6 \\times 8^0 + 2 \\times 8^{-1} + 4 \\times 8^{-2} = 16 + 6 + 0.25 + 0.0625 = \\mathbf{22.3125_{10}} \\)<br>\n      <small>*(لاحظ التطابق الرائع: أرقام a و b و c كلها متساوية وتمثل نفس العدد 22.3125!)*</small>\n    </li>\n    <li><strong>(d) \\( (FAFA)_{16} \\):</strong><br>\n      F = 15, A = 10<br>\n      \\( = 15 \\times 16^3 + 10 \\times 16^2 + 15 \\times 16^1 + 10 \\times 16^0 \\)<br>\n      \\( = 15 \\times 4096 + 10 \\times 256 + 15 \\times 16 + 10 = 61440 + 2560 + 240 + 10 = \\mathbf{64,250_{10}} \\)\n    </li>\n    <li><strong>(e) \\( (1010.1010)_2 \\):</strong><br>\n      الصحيح: \\( 8 + 2 = 10 \\)<br>\n      الكسر: \\( 0.5 + 0.125 = 0.625 \\)<br>\n      الناتج: \\( \\mathbf{10.625_{10}} \\)\n    </li>\n  </ul>\n</div>\n",
          "keyTakeaways": [
            "التحويل إلى عشري يتم بضرب كل خانة في الأساس مرفوعاً لأس موضعها.",
            "الخانات الكسرية بعد العلامة تبدأ بأس سالب: r^(-1), r^(-2)...",
            "القيم (10110.0101)_2 و (16.5)_16 و (26.24)_8 تمثل جميعاً نفس القيمة العشرية 22.3125."
          ]
        },
        {
          "id": "sheet1-p5",
          "title": "تمرين 5: الحساب المباشر بالثنائي والست عشري (Arithmetic without Decimal)",
          "icon": "➕",
          "readTime": "9 دقائق",
          "contentHtml": "\n<div class=\"content-block\">\n  <h3>نص المسالة 5 (Problem 5)</h3>\n  <div class=\"problem-statement\">\n    <strong>Perform the following division, multiplication, and addition operations directly in the specified base WITHOUT converting to decimal:</strong><br>\n    1) Binary: \\( 1011_2 + 101_2 \\)<br>\n    2) Binary: \\( 1011_2 \\times 101_2 \\)<br>\n    3) Hexadecimal: \\( 2E_{16} + 34_{16} \\)<br>\n    4) Hexadecimal: \\( 2E_{16} \\times 34_{16} \\)\n  </div>\n\n  <h4>أولاً: العمليات الثنائية (Direct Binary):</h4>\n  <div class=\"grid-2col\">\n    <div class=\"card-mini\">\n      <strong>1) جمع: \\( 1011_2 + 101_2 \\):</strong>\n      <div class=\"code-calc\">\n        &nbsp;&nbsp;¹ ¹ ¹ &nbsp; (الحمل Carries)<br>\n        &nbsp;&nbsp;1 0 1 1<br>\n        + &nbsp;&nbsp;1 0 1<br>\n        --------<br>\n        <strong>1 0 0 0 0</strong>\n      </div>\n      <p>الشرح: 1+1 = 0 ومعنا حمل 1. ثم 1+0+1 = 0 ومعنا حمل 1. ثم 1+0+1 = 0 ومعنا حمل 1. ثم 1+1 = 10. الناتج: \\( \\mathbf{10000_2} \\) (وهو 16 بالعشري: 11 + 5 = 16).</p>\n    </div>\n\n    <div class=\"card-mini\">\n      <strong>2) ضرب: \\( 1011_2 \\times 101_2 \\):</strong>\n      <div class=\"code-calc\">\n        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1 0 1 1<br>\n        &nbsp;&nbsp;&times; &nbsp;&nbsp;&nbsp;1 0 1<br>\n        ------------<br>\n        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1 0 1 1 &nbsp; (الضرب في 1)<br>\n        &nbsp;&nbsp;&nbsp;0 0 0 0 0 &nbsp; (الضرب في 0)<br>\n        + 1 0 1 1 0 0 &nbsp; (الضرب في 1)<br>\n        ------------<br>\n        <strong>1 1 0 1 1 1</strong>\n      </div>\n      <p>الناتج: \\( \\mathbf{110111_2} \\) (بالعشري: 11 × 5 = 55 = 32+16+4+2+1 = 55).</p>\n    </div>\n  </div>\n\n  <h4>ثانياً: العمليات الست عشرية (Direct Hexadecimal):</h4>\n  <div class=\"grid-2col\">\n    <div class=\"card-mini\">\n      <strong>3) جمع: \\( 2E_{16} + 34_{16} \\):</strong>\n      <div class=\"code-calc\">\n        &nbsp;¹ &nbsp; (حمل Carry)<br>\n        &nbsp;2 E<br>\n        + 3 4<br>\n        ----<br>\n        <strong>6 2</strong>\n      </div>\n      <p>الشرح:<br>\n      E + 4 = 14 + 4 = 18.<br>\n      18 في الست عشري = \\( 18 - 16 = 2 \\) ومعنا <strong>حمل 1</strong>.<br>\n      ثم 1 + 2 + 3 = 6.<br>\n      الناتج: \\( \\mathbf{62_{16}} \\).</p>\n    </div>\n\n    <div class=\"card-mini\">\n      <strong>4) ضرب: \\( 2E_{16} \\times 34_{16} \\):</strong>\n      <div class=\"code-calc\">\n        &nbsp;&nbsp;&nbsp;&nbsp;2 E<br>\n        &nbsp;&times;&nbsp;3 4<br>\n        ------<br>\n        &nbsp;&nbsp;&nbsp;B 8 &nbsp; (2E × 4: 4×14=56=3×16+8 -> 8 ومعنا 3, 4×2+3=11=B)<br>\n        + 8 A 0 &nbsp; (2E × 3: 3×14=42=2×16+10=A ومعنا 2, 3×2+2=8)<br>\n        ------<br>\n        <strong>9 5 8</strong>\n      </div>\n      <p>الشرح:<br>\n      جمع النواتج الجزئية: 8+0=8.<br>\n      B + A = 11 + 10 = 21 = 16 + 5 (5 ومعنا حمل 1).<br>\n      1 + 8 = 9.<br>\n      الناتج: \\( \\mathbf{958_{16}} \\).</p>\n    </div>\n  </div>\n</div>\n",
          "keyTakeaways": [
            "في الجمع الثنائي: 1+1 = 0 وحمل 1، 1+1+1 = 1 وحمل 1.",
            "في الجمع الست عشري: عند تجاوز المجموع 15، نطرح 16 ونرحل حمل 1 للخانات التالية.",
            "في ضرب الست عشري: نحول حاصل الضرب المؤقت لنظام الأساس 16 مباشرة."
          ]
        },
        {
          "id": "sheet1-p6-10",
          "title": "تمارين 6 إلى 10: المتممات وأقصى عدد ثنائي في 14 بت",
          "icon": "🏆",
          "readTime": "10 دقائق",
          "contentHtml": "\n<div class=\"content-block\">\n  <h3>تمرين 6 & 7 & 8: الطرح باستخدام المتممات</h3>\n  <div class=\"problem-statement\">\n    <strong>حلول عمليات الطرح باستخدام متممات الـ 10 ومتممات الـ 2 ومتممات الـ 1:</strong>\n  </div>\n\n  <div class=\"example-box\">\n    <h4>مسألة 6(a): احسب \\( 5250 - 321 \\) باستخدام متمم الـ 10 (4 خانات):</h4>\n    <p>1. نساوي عدد الخانات: 5250 و 0321.</p>\n    <p>2. متمم الـ 10 للعدد 0321: \\( 9999 - 0321 + 1 = 9679 \\).</p>\n    <p>3. نجمع: \\( 5250 + 9679 = \\mathbf{1}4929 \\).</p>\n    <p>4. يوجد حمل أخير (End Carry) -> نهمله. الناتج = \\( \\mathbf{+4929} \\).</p>\n  </div>\n\n  <div class=\"example-box\">\n    <h4>مسألة 6(b): احسب \\( 753 - 8640 \\) باستخدام متمم الـ 10 (4 خانات):</h4>\n    <p>1. نساوي الخانات: 0753 و 8640.</p>\n    <p>2. متمم الـ 10 للعدد 8640: \\( 9999 - 8640 + 1 = 1360 \\).</p>\n    <p>3. نجمع: \\( 0753 + 1360 = 2113 \\).</p>\n    <p>4. <strong>لا يوجد حمل أخير (No Carry)</strong> -> الناتج سالب!</p>\n    <p>5. نأخذ متمم الـ 10 لـ 2113: \\( 9999 - 2113 + 1 = 7887 \\).</p>\n    <p>الناتج = \\( \\mathbf{-7887} \\).</p>\n  </div>\n\n  <hr>\n\n  <h3>تمرين 9: المقارنة بين التحويل المباشر والتحويل عبر العشري</h3>\n  <div class=\"problem-statement\">\n    <strong>Convert the binary number 110111100101 to hexadecimal directly, and compare the work required with converting via decimal.</strong>\n  </div>\n  <div class=\"comparison-grid\">\n    <div class=\"comparison-card digital\">\n      <h4>الطريقة المباشرة (Direct 4-bit Grouping):</h4>\n      <p>نقسم البتات من اليمين لمجموعات من 4 بت:</p>\n      <div class=\"code-calc\">\n        1101 &nbsp;&nbsp; 1110 &nbsp;&nbsp; 0101 <br>\n         D   &nbsp;&nbsp;&nbsp;&nbsp; E   &nbsp;&nbsp;&nbsp;&nbsp; 5   = <strong>DE5₁₆</strong>\n      </div>\n      <p>الوقت: 5 ثوانٍ فقط وبدون أي حسابات معقدة أو احتمالية للخطأ!</p>\n    </div>\n    <div class=\"comparison-card analog\">\n      <h4>طريقة التحويل عبر العشري (Via Decimal):</h4>\n      <p>1. حساب قيمة 12 بت بالجمع: \\( 2048+1024+256+128+64+32+4+1 = 3557_{10} \\).</p>\n      <p>2. قسمة متكررة على 16: \\( 3557 \\div 16 = 222 \\) وباقي 5, ثم \\( 222 \\div 16 = 13 \\) وباقي 14 (E), ثم \\( 13 \\div 16 = 0 \\) وباقي 13 (D).</p>\n      <p>الجهد: مضاعف 10 مرات وعرضة للأخطاء الحسابية في القسمة والجمع!</p>\n    </div>\n  </div>\n\n  <hr>\n\n  <h3>تمرين 10: أقصى عدد ثنائي في 14 بت (Problem 10)</h3>\n  <div class=\"problem-statement\">\n    <strong>What is the largest binary number that can be expressed with 14 bits? Determine its equivalent decimal and hexadecimal numbers.</strong>\n  </div>\n  <div class=\"example-box\">\n    <h4>الحل النموذجي:</h4>\n    <p>1. في النظام الثنائي غير الموقع (Unsigned)، أكبر عدد هو 14 واحداً:</p>\n    <div class=\"code-calc\">\n      Binary: (11 1111 1111 1111)₂\n    </div>\n    <p>2. بالقيمة العشرية، يساوي دائماً \\( 2^n - 1 \\):</p>\n    <div class=\"math-formula\">\n      \\[ 2^{14} - 1 = 16,384 - 1 = \\mathbf{16,383_{10}} \\]\n    </div>\n    <p>3. بالقيمة الست عشرية: نقسمه إلى مجموعات من 4 بت (0011 1111 1111 1111):</p>\n    <div class=\"code-calc\">\n      0011 &nbsp; 1111 &nbsp; 1111 &nbsp; 1111 <br>\n       3   &nbsp;&nbsp;&nbsp; F   &nbsp;&nbsp;&nbsp; F   &nbsp;&nbsp;&nbsp; F  = <strong>(3FFF)₁₆</strong>\n    </div>\n  </div>\n</div>\n",
          "keyTakeaways": [
            "في الطرح بمتمم 10 أو 2: حمل أخير يعني موجب ونهمله، لا حمل يعني سالب ونأخذ المتمم.",
            "التحويل المباشر بالتجميع (Grouping) يوفر الوقت ويمنع الأخطاء.",
            "أكبر عدد بـ n خانات ثنائية هو 2^n - 1 (في 14 بت: 16383 عشرياً و 3FFF بالست عشري)."
          ]
        }
      ]
    }
  ]
};
