/**
 * Digital Logic Design (AI215) - Core Interactive Application
 * Pair programming implementation for FCI Mansoura University
 */

class DigitalLogicApp {
  constructor() {
    this.currentTab = 'overview';
    this.audioCtx = null;
    this.userProgress = {
      quizzes: {},
      flashcardsMastered: new Set(),
      flashcardsReview: new Set(),
      examScore: null
    };

    // Flashcards state
    this.flashcards = window.FLASHCARDS_DATA || [];
    this.currentFcFilter = 'all';
    this.filteredFlashcards = [...this.flashcards];
    this.currentFcIndex = 0;
    this.isFlipped = false;

    // Gate Simulator state
    this.selectedGate = 'AND';
    this.gateInputA = 0;
    this.gateInputB = 0;

    // K-Map state
    this.kmapVars = 3;
    this.kmapValues = new Array(16).fill(0); // 0, 1, or 'X'

    // Exam state
    this.examQuestions = [];
    this.examUserAnswers = {};
    this.examFlagged = new Set();
    this.examCurrentQIndex = 0;
    this.examTimerInterval = null;
    this.examSecondsRemaining = 40 * 60; // 40 minutes

    this.init();
  }

  init() {
    this.loadStateFromStorage();
    this.setupTheme();
    this.setupNavTabs();
    this.setupSearch();
    this.renderChapters();
    this.setupFlashcards();
    this.setupGateSimulator();
    this.setupKmapGrid();
    this.setupKeyboardShortcuts();
    this.updateGlobalProgress();
    this.renderMathFormulas();
  }

  /* ==========================================================================
     Audio Synthesis (Web Audio API)
     ========================================================================== */
  getAudioContext() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.audioCtx = new AudioCtx();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  playCorrectSound() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.setValueAtTime(880.00, now + 0.1); // A5

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (e) {}
  }

  playWrongSound() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(164.81, now + 0.12);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) {}
  }

  playFlipSound() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  }

  playFanfare() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = ctx.currentTime + (i * 0.1);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.18, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.4);
      });
    } catch (e) {}
  }

  /* ==========================================================================
     Theme & Nav Tabs
     ========================================================================== */
  setupTheme() {
    const savedTheme = localStorage.getItem('ai215_theme') || 'theme-dark';
    document.body.className = savedTheme;

    const toggleBtn = document.getElementById('theme-toggle-btn');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const isDark = document.body.classList.contains('theme-dark');
        const nextTheme = isDark ? 'theme-light' : 'theme-dark';
        document.body.className = nextTheme;
        localStorage.setItem('ai215_theme', nextTheme);
      });
    }

    // Scroll progress bar
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      const progressBar = document.getElementById('scroll-progress-bar');
      if (progressBar) progressBar.style.width = scrolled + '%';
    });
  }

  setupNavTabs() {
    const navTabs = document.querySelectorAll('.nav-tab');
    navTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        this.switchTab(targetTab);
      });
    });
  }

  switchTab(tabId) {
    this.currentTab = tabId;
    document.querySelectorAll('.nav-tab').forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-tab') === tabId);
    });
    document.querySelectorAll('.tab-pane').forEach(p => {
      p.classList.toggle('active', p.id === `pane-${tabId}`);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.renderMathFormulas();
  }

  /* ==========================================================================
     Chapters & Quizzes Rendering
     ========================================================================== */
  renderChapters() {
    const courseData = window.COURSE_DATA;
    if (!courseData || !courseData.chapters) return;

    courseData.chapters.forEach(ch => {
      const sidebarNav = document.getElementById(`sidebar-nav-${ch.id}`);
      const contentBody = document.getElementById(`content-${ch.id}`);

      if (!sidebarNav || !contentBody) return;

      sidebarNav.innerHTML = '';
      contentBody.innerHTML = '';

      ch.sections.forEach((sec, idx) => {
        // Sidebar link
        const navItem = document.createElement('li');
        navItem.className = `sidebar-nav-item ${idx === 0 ? 'active' : ''}`;
        navItem.innerHTML = `<a href="#sec-${sec.id}">${sec.title}</a>`;
        sidebarNav.appendChild(navItem);

        // Section article
        const article = document.createElement('article');
        article.className = 'section-article';
        article.id = `sec-${sec.id}`;

        let takeawaysHtml = '';
        if (sec.keyTakeaways && sec.keyTakeaways.length > 0) {
          takeawaysHtml = `
            <div class="key-takeaways-box">
              <h4><span>💡</span> أهم النقاط الأساسية (Key Takeaways):</h4>
              <ul>
                ${sec.keyTakeaways.map(t => `<li>${t}</li>`).join('')}
              </ul>
            </div>
          `;
        }

        // Quiz HTML
        const quizList = (window.SECTION_QUIZZES && window.SECTION_QUIZZES[sec.id]) || [];
        let quizHtml = '';
        if (quizList.length > 0) {
          quizHtml = `
            <div class="section-quiz-wrap" id="quiz-wrap-${sec.id}">
              <div class="quiz-header">
                <div class="quiz-title">
                  <span>❓</span> اختبار الاستيعاب الفوري لهذا الموضوع (${quizList.length} أسئلة)
                </div>
                <div class="quiz-score-pill" id="quiz-score-badge-${sec.id}">
                  لم يُحل بعد
                </div>
              </div>
              <div class="questions-container">
                ${quizList.map((q, qIdx) => `
                  <div class="question-block" id="qb-${q.id}">
                    <div class="question-text">${qIdx + 1}. ${q.question}</div>
                    <div class="options-list">
                      ${q.options.map((opt, optIdx) => `
                        <button class="option-btn" data-qid="${q.id}" data-opt="${optIdx}" onclick="app.handleQuizOptionClick('${sec.id}', '${q.id}', ${optIdx}, ${q.correct})">
                          <span>${opt}</span>
                          <span class="opt-status-icon"></span>
                        </button>
                      `).join('')}
                    </div>
                    <div class="explanation-box" id="exp-${q.id}">
                      <strong>💡 التفسير النموذجي:</strong> ${q.explanation}
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          `;
        }

        article.innerHTML = `
          <div class="section-header-row">
            <div class="section-title-wrap">
              <span class="section-icon">${sec.icon || '📌'}</span>
              <h2>${sec.title}</h2>
            </div>
            <span class="section-read-time">⏱️ ${sec.readTime || '8 دقائق'}</span>
          </div>
          <div class="section-main-content">
            ${sec.contentHtml}
          </div>
          ${takeawaysHtml}
          ${quizHtml}
        `;

        contentBody.appendChild(article);
      });
    });

    // Sidebar active link spy
    window.addEventListener('scroll', () => {
      const articles = document.querySelectorAll('.section-article');
      let currentId = '';
      articles.forEach(art => {
        const rect = art.getBoundingClientRect();
        if (rect.top <= 180 && rect.bottom >= 180) {
          currentId = art.id;
        }
      });
      if (currentId) {
        document.querySelectorAll('.sidebar-nav-item').forEach(li => {
          const a = li.querySelector('a');
          if (a && a.getAttribute('href') === `#${currentId}`) {
            li.classList.add('active');
          } else {
            li.classList.remove('active');
          }
        });
      }
    });
  }

  handleQuizOptionClick(sectionId, qId, selectedOpt, correctOpt) {
    const qBlock = document.getElementById(`qb-${qId}`);
    if (!qBlock) return;

    const buttons = qBlock.querySelectorAll('.option-btn');
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === correctOpt) {
        btn.classList.add('correct');
        const icon = btn.querySelector('.opt-status-icon');
        if (icon) icon.textContent = '✔';
      } else if (idx === selectedOpt && selectedOpt !== correctOpt) {
        btn.classList.add('wrong');
        const icon = btn.querySelector('.opt-status-icon');
        if (icon) icon.textContent = '✖';
      }
    });

    const isCorrect = (selectedOpt === correctOpt);
    if (isCorrect) {
      this.playCorrectSound();
    } else {
      this.playWrongSound();
    }

    const expBox = document.getElementById(`exp-${qId}`);
    if (expBox) expBox.classList.add('show');

    // Store state
    this.userProgress.quizzes[qId] = isCorrect;
    this.saveStateToStorage();
    this.updateSectionQuizScore(sectionId);
    this.updateGlobalProgress();
  }

  updateSectionQuizScore(sectionId) {
    const quizList = (window.SECTION_QUIZZES && window.SECTION_QUIZZES[sectionId]) || [];
    if (!quizList.length) return;

    let answered = 0;
    let correct = 0;
    quizList.forEach(q => {
      if (this.userProgress.quizzes[q.id] !== undefined) {
        answered++;
        if (this.userProgress.quizzes[q.id] === true) correct++;
      }
    });

    const badge = document.getElementById(`quiz-score-badge-${sectionId}`);
    if (badge) {
      badge.textContent = `${correct} من ${quizList.length} صحيح (${Math.round((correct / quizList.length) * 100)}%)`;
      if (correct === quizList.length) {
        badge.style.color = 'var(--accent-green)';
        badge.style.borderColor = 'var(--accent-green)';
      }
    }
  }

  /* ==========================================================================
     Flashcards Engine
     ========================================================================== */
  setupFlashcards() {
    const filterPills = document.querySelectorAll('#pane-flashcards .filter-pill');
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        this.currentFcFilter = pill.getAttribute('data-filter');
        this.filterFlashcards();
      });
    });

    this.filterFlashcards();
  }

  filterFlashcards() {
    if (this.currentFcFilter === 'all') {
      this.filteredFlashcards = [...this.flashcards];
    } else {
      this.filteredFlashcards = this.flashcards.filter(f => f.category === this.currentFcFilter);
    }
    this.currentFcIndex = 0;
    this.isFlipped = false;
    this.renderCurrentFlashcard();
  }

  renderCurrentFlashcard() {
    const cardEl = document.getElementById('flashcard-card');
    if (!cardEl || !this.filteredFlashcards.length) return;

    cardEl.classList.remove('flipped');
    this.isFlipped = false;

    const cur = this.filteredFlashcards[this.currentFcIndex];
    document.getElementById('fc-current-idx').textContent = this.currentFcIndex + 1;
    document.getElementById('fc-total-count').textContent = this.filteredFlashcards.length;
    document.getElementById('fc-category-badge').textContent = cur.category;
    document.getElementById('fc-front-text').textContent = cur.front;
    document.getElementById('fc-back-text').textContent = cur.back;

    // Progress bar
    const masteredCount = this.userProgress.flashcardsMastered.size;
    const pct = (masteredCount / this.flashcards.length) * 100;
    const fill = document.getElementById('fc-progress-fill');
    if (fill) fill.style.width = `${pct}%`;

    const badge = document.getElementById('badge-flashcards');
    if (badge) badge.textContent = `${masteredCount}/${this.flashcards.length}`;
  }

  flipFlashcard() {
    const cardEl = document.getElementById('flashcard-card');
    if (!cardEl) return;
    this.isFlipped = !this.isFlipped;
    cardEl.classList.toggle('flipped', this.isFlipped);
    this.playFlipSound();
  }

  nextFlashcard() {
    if (this.currentFcIndex < this.filteredFlashcards.length - 1) {
      this.currentFcIndex++;
      this.renderCurrentFlashcard();
    } else {
      this.currentFcIndex = 0;
      this.renderCurrentFlashcard();
    }
  }

  prevFlashcard() {
    if (this.currentFcIndex > 0) {
      this.currentFcIndex--;
      this.renderCurrentFlashcard();
    } else {
      this.currentFcIndex = this.filteredFlashcards.length - 1;
      this.renderCurrentFlashcard();
    }
  }

  markFlashcardMastered() {
    const cur = this.filteredFlashcards[this.currentFcIndex];
    if (!cur) return;
    this.userProgress.flashcardsMastered.add(cur.id);
    this.userProgress.flashcardsReview.delete(cur.id);
    this.saveStateToStorage();
    this.playCorrectSound();
    this.nextFlashcard();
    this.updateGlobalProgress();
  }

  markFlashcardReview() {
    const cur = this.filteredFlashcards[this.currentFcIndex];
    if (!cur) return;
    this.userProgress.flashcardsReview.add(cur.id);
    this.userProgress.flashcardsMastered.delete(cur.id);
    this.saveStateToStorage();
    this.playWrongSound();
    this.nextFlashcard();
    this.updateGlobalProgress();
  }

  /* ==========================================================================
     Lab Tool 1: Base Converter
     ========================================================================== */
  runBaseConverter() {
    const rawInput = document.getElementById('lab-conv-input').value.trim().toUpperCase();
    const fromBase = parseInt(document.getElementById('lab-conv-from').value, 10);
    const toBase = parseInt(document.getElementById('lab-conv-to').value, 10);
    const resultZone = document.getElementById('lab-conv-result-zone');
    const finalValDisp = document.getElementById('lab-conv-final-val');
    const stepsDisp = document.getElementById('lab-conv-steps');

    if (!rawInput) {
      alert('من فضلك أدخل رقماً لتحويله.');
      return;
    }

    try {
      const parts = rawInput.split('.');
      const intPartStr = parts[0] || '0';
      const fracPartStr = parts[1] || '';

      // Validate digits for fromBase
      const validDigits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0, fromBase);
      for (const char of intPartStr + fracPartStr) {
        if (!validDigits.includes(char)) {
          alert(`الرمز '${char}' غير مسموح به في النظام ذي الأساس ${fromBase}!`);
          return;
        }
      }

      // Convert integer part to decimal
      let intValDec = 0;
      let intSteps = `1) تحويل الجزء الصحيح (${intPartStr}) إلى النظام العشري:\n`;
      for (let i = 0; i < intPartStr.length; i++) {
        const digitChar = intPartStr[i];
        const digitVal = parseInt(digitChar, fromBase);
        const power = intPartStr.length - 1 - i;
        intValDec += digitVal * Math.pow(fromBase, power);
        intSteps += `   ${digitChar} × ${fromBase}^${power} = ${digitVal * Math.pow(fromBase, power)}\n`;
      }
      intSteps += `   المجموع العشري للجزء الصحيح = ${intValDec}\n\n`;

      // Convert fractional part to decimal
      let fracValDec = 0;
      let fracSteps = '';
      if (fracPartStr.length > 0) {
        fracSteps = `2) تحويل الجزء الكسري (0.${fracPartStr}) إلى النظام العشري:\n`;
        for (let i = 0; i < fracPartStr.length; i++) {
          const digitChar = fracPartStr[i];
          const digitVal = parseInt(digitChar, fromBase);
          const power = -(i + 1);
          const val = digitVal * Math.pow(fromBase, power);
          fracValDec += val;
          fracSteps += `   ${digitChar} × ${fromBase}^(${power}) = ${val}\n`;
        }
        fracSteps += `   المجموع العشري للكسر = ${fracValDec}\n\n`;
      }

      const totalDec = intValDec + fracValDec;

      // Convert from decimal to toBase
      let convIntSteps = `3) تحويل الجزء الصحيح (${intValDec}) إلى الأساس ${toBase} بالقسمة المتكررة:\n`;
      let tempInt = intValDec;
      const remainders = [];
      if (tempInt === 0) remainders.push('0');
      while (tempInt > 0) {
        const rem = tempInt % toBase;
        const quot = Math.floor(tempInt / toBase);
        const remChar = rem.toString(toBase).toUpperCase();
        remainders.push(remChar);
        convIntSteps += `   ${tempInt} ÷ ${toBase} = ${quot} والباقي ${remChar}\n`;
        tempInt = quot;
      }
      remainders.reverse();
      const finalIntStr = remainders.join('');
      convIntSteps += `   القراءة من الأسفل للأعلى (MSB إلى LSB) = ${finalIntStr}\n\n`;

      let finalFracStr = '';
      let convFracSteps = '';
      if (fracValDec > 0) {
        convFracSteps = `4) تحويل الجزء الكسري (${fracValDec}) إلى الأساس ${toBase} بالضرب المتكرر:\n`;
        let tempFrac = fracValDec;
        let count = 0;
        const fracDigits = [];
        while (tempFrac > 0 && count < 6) {
          const mult = tempFrac * toBase;
          const intPart = Math.floor(mult);
          const char = intPart.toString(toBase).toUpperCase();
          fracDigits.push(char);
          convFracSteps += `   ${tempFrac.toFixed(6)} × ${toBase} = ${mult.toFixed(6)} -> الجزء الصحيح = ${char}\n`;
          tempFrac = mult - intPart;
          count++;
        }
        finalFracStr = '.' + fracDigits.join('');
        convFracSteps += `   القراءة من الأعلى للأسفل = ${finalFracStr}\n\n`;
      }

      const finalResult = finalIntStr + finalFracStr;

      finalValDisp.textContent = `(${rawInput})_${fromBase} = (${finalResult})_${toBase}`;
      stepsDisp.textContent = intSteps + fracSteps + convIntSteps + convFracSteps + `النتيجة النهائية: (${finalResult})_${toBase}`;
      resultZone.classList.add('show');
      this.playCorrectSound();
    } catch (err) {
      alert('حدث خطأ في عملية التحويل، يرجى مراجعة الأرقام المدخلة.');
    }
  }

  /* ==========================================================================
     Lab Tool 2: Complements & Subtraction Calculator
     ========================================================================== */
  updateCompPlaceholders() {
    const base = document.getElementById('lab-comp-base').value;
    if (base === '10') {
      document.getElementById('lab-comp-digits').value = '5';
      document.getElementById('lab-comp-m').value = '72532';
      document.getElementById('lab-comp-n').value = '03250';
    } else {
      document.getElementById('lab-comp-digits').value = '6';
      document.getElementById('lab-comp-m').value = '101010';
      document.getElementById('lab-comp-n').value = '011100';
    }
  }

  runComplementsCalculator() {
    const base = parseInt(document.getElementById('lab-comp-base').value, 10);
    const n = parseInt(document.getElementById('lab-comp-digits').value, 10);
    let mStr = document.getElementById('lab-comp-m').value.trim();
    let nStr = document.getElementById('lab-comp-n').value.trim();
    const resultZone = document.getElementById('lab-comp-result-zone');
    const outputDisp = document.getElementById('lab-comp-output');

    mStr = mStr.padStart(n, '0');
    nStr = nStr.padStart(n, '0');

    let out = `عملية الطرح: M - N باستخدام متمم الأساس ${base} في ${n} خانات:\n`;
    out += `M = ${mStr}\nN = ${nStr}\n\n`;

    if (base === 10) {
      // 9's complement
      const nDigits = nStr.split('').map(d => parseInt(d, 10));
      const comp9 = nDigits.map(d => 9 - d).join('');
      const comp10 = (parseInt(comp9, 10) + 1).toString().padStart(n, '0');

      out += `1) حساب متمم الـ 9 للعدد N (${nStr}):\n`;
      out += `   99999 - ${nStr} = ${comp9}\n`;
      out += `2) حساب متمم الـ 10 للعدد N (بإضافة 1):\n`;
      out += `   ${comp9} + 1 = ${comp10}\n\n`;

      const mVal = parseInt(mStr, 10);
      const comp10Val = parseInt(comp10, 10);
      const sum = mVal + comp10Val;
      const sumStr = sum.toString();

      out += `3) جمع M مع متمم الـ 10 لـ N:\n`;
      out += `   ${mStr} + ${comp10} = ${sumStr}\n\n`;

      if (sumStr.length > n) {
        // End Carry
        const endCarry = sumStr[0];
        const ans = sumStr.slice(1);
        out += `4) تم اكتشاف End-Carry = ${endCarry} (الحمل الأخير = 1):\n`;
        out += `   -> هذا يعني أن M ≥ N والناتج موجب (+).\n`;
        out += `   -> نقوم بإهمال الحمل الأخير (Discard Carry).\n`;
        out += `   الناتج النهائي = +${ans} (عشري)\n`;
      } else {
        // No carry
        const diff = Math.pow(10, n) - sum;
        out += `4) لم يظهر حمل أخير (No End-Carry):\n`;
        out += `   -> هذا يعني أن M < N والناتج سالب (-).\n`;
        out += `   -> نأخذ متمم الـ 10 للمجموع ${sumStr} ونضع إشارة سالبة (-).\n`;
        out += `   الناتج النهائي = -${diff} (عشري)\n`;
      }
    } else {
      // Binary (Base 2)
      // 1's complement
      const comp1 = nStr.split('').map(b => (b === '0' ? '1' : '0')).join('');
      const comp2Val = parseInt(comp1, 2) + 1;
      const comp2 = comp2Val.toString(2).padStart(n, '0');

      out += `1) حساب متمم الـ 1 للعدد N (${nStr}) بعكس البتات:\n`;
      out += `   ${comp1}\n`;
      out += `2) حساب متمم الـ 2 للعدد N (إضافة 1):\n`;
      out += `   ${comp2}\n\n`;

      const mVal = parseInt(mStr, 2);
      const comp2Num = parseInt(comp2, 2);
      const sum = mVal + comp2Num;
      const sumStr = sum.toString(2);

      out += `3) جمع M مع متمم الـ 2 لـ N:\n`;
      out += `   ${mStr} + ${comp2} = ${sumStr}\n\n`;

      if (sumStr.length > n) {
        const ans = sumStr.slice(1);
        out += `4) ظهر حمل أخير (End-Carry = 1):\n`;
        out += `   -> الناتج موجب ونهمل الحمل مباشرة.\n`;
        out += `   الناتج النهائي = +${ans} (ثنائي) = +${parseInt(ans, 2)} بالعشري\n`;
      } else {
        const diffVal = Math.pow(2, n) - sum;
        const diffStr = diffVal.toString(2).padStart(n, '0');
        out += `4) لم يظهر حمل أخير (No Carry):\n`;
        out += `   -> الناتج سالب ونأخذ متمم 2 للمجموع مع إشارة سالبة.\n`;
        out += `   الناتج النهائي = -${diffStr} (ثنائي) = -${diffVal} بالعشري\n`;
      }
    }

    outputDisp.textContent = out;
    resultZone.classList.add('show');
    this.playCorrectSound();
  }

  /* ==========================================================================
     Lab Tool 3: Logic Gates Simulator
     ========================================================================== */
  setupGateSimulator() {
    this.renderGateVisual();
    this.renderGateTruthTable();
  }

  selectGate(gate) {
    this.selectedGate = gate;
    document.querySelectorAll('#pane-lab .filter-pill').forEach(btn => {
      if (btn.textContent.includes(gate)) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    const swB = document.getElementById('gate-sw-b');
    if (gate === 'NOT' || gate === 'BUFFER') {
      if (swB) swB.style.display = 'none';
    } else {
      if (swB) swB.style.display = 'inline-block';
    }

    this.renderGateVisual();
    this.renderGateTruthTable();
  }

  toggleGateSwitch(sw) {
    if (sw === 'a') {
      this.gateInputA = this.gateInputA === 0 ? 1 : 0;
      const btn = document.getElementById('gate-sw-a');
      btn.textContent = `مدخل A: ${this.gateInputA}`;
      btn.classList.toggle('on', this.gateInputA === 1);
    } else {
      this.gateInputB = this.gateInputB === 0 ? 1 : 0;
      const btn = document.getElementById('gate-sw-b');
      btn.textContent = `مدخل B: ${this.gateInputB}`;
      btn.classList.toggle('on', this.gateInputB === 1);
    }
    this.renderGateVisual();
    this.renderGateTruthTable();
  }

  calculateGateOutput(gate, a, b) {
    switch (gate) {
      case 'AND': return a & b;
      case 'OR': return a | b;
      case 'NOT': return a === 0 ? 1 : 0;
      case 'BUFFER': return a;
      case 'NAND': return (a & b) === 1 ? 0 : 1;
      case 'NOR': return (a | b) === 1 ? 0 : 1;
      case 'XOR': return a ^ b;
      case 'XNOR': return (a ^ b) === 0 ? 1 : 0;
      default: return 0;
    }
  }

  renderGateVisual() {
    const out = this.calculateGateOutput(this.selectedGate, this.gateInputA, this.gateInputB);
    const outValSpan = document.getElementById('gate-out-val');
    const formulaDisp = document.getElementById('gate-formula-disp');

    if (outValSpan) {
      outValSpan.textContent = out === 1 ? '1 (HIGH / ON)' : '0 (LOW / OFF)';
      outValSpan.style.color = out === 1 ? 'var(--accent-green)' : 'var(--text-muted)';
    }

    const formulas = {
      'AND': 'F = A · B',
      'OR': 'F = A + B',
      'NOT': "F = A' (Inverter)",
      'BUFFER': 'F = A',
      'NAND': "F = (A · B)' = A' + B'",
      'NOR': "F = (A + B)' = A' · B'",
      'XOR': 'F = A ⊕ B = A·B\' + A\'·B',
      'XNOR': 'F = (A ⊕ B)\' = A·B + A\'·B\''
    };
    if (formulaDisp) formulaDisp.textContent = formulas[this.selectedGate] || '';

    // Draw SVG schematic
    const svgContainer = document.getElementById('gate-svg-container');
    if (!svgContainer) return;

    const strokeColor = out === 1 ? '#00f59b' : '#3a86ff';
    const activeFill = out === 1 ? 'rgba(0, 245, 155, 0.2)' : 'rgba(58, 134, 255, 0.1)';

    let gateSvgPath = '';
    if (this.selectedGate === 'AND' || this.selectedGate === 'NAND') {
      gateSvgPath = `
        <path d="M 60,25 L 110,25 A 35,35 0 0,1 110,95 L 60,95 Z" fill="${activeFill}" stroke="${strokeColor}" stroke-width="3"/>
        ${this.selectedGate === 'NAND' ? `<circle cx="150" cy="60" r="5" fill="none" stroke="${strokeColor}" stroke-width="3"/>` : ''}
      `;
    } else if (this.selectedGate === 'OR' || this.selectedGate === 'NOR') {
      gateSvgPath = `
        <path d="M 50,25 Q 85,60 50,95 Q 110,95 145,60 Q 110,25 50,25 Z" fill="${activeFill}" stroke="${strokeColor}" stroke-width="3"/>
        ${this.selectedGate === 'NOR' ? `<circle cx="152" cy="60" r="5" fill="none" stroke="${strokeColor}" stroke-width="3"/>` : ''}
      `;
    } else if (this.selectedGate === 'XOR' || this.selectedGate === 'XNOR') {
      gateSvgPath = `
        <path d="M 40,25 Q 75,60 40,95" fill="none" stroke="${strokeColor}" stroke-width="3"/>
        <path d="M 50,25 Q 85,60 50,95 Q 110,95 145,60 Q 110,25 50,25 Z" fill="${activeFill}" stroke="${strokeColor}" stroke-width="3"/>
        ${this.selectedGate === 'XNOR' ? `<circle cx="152" cy="60" r="5" fill="none" stroke="${strokeColor}" stroke-width="3"/>` : ''}
      `;
    } else {
      // Inverter / Buffer
      gateSvgPath = `
        <polygon points="60,25 130,60 60,95" fill="${activeFill}" stroke="${strokeColor}" stroke-width="3"/>
        ${this.selectedGate === 'NOT' ? `<circle cx="136" cy="60" r="5" fill="none" stroke="${strokeColor}" stroke-width="3"/>` : ''}
      `;
    }

    const inputLines = this.selectedGate === 'NOT' || this.selectedGate === 'BUFFER'
      ? `<line x1="20" y1="60" x2="60" y2="60" stroke="${this.gateInputA ? '#00f59b' : '#5e6e8e'}" stroke-width="3"/>`
      : `
        <line x1="20" y1="40" x2="60" y2="40" stroke="${this.gateInputA ? '#00f59b' : '#5e6e8e'}" stroke-width="3"/>
        <line x1="20" y1="80" x2="60" y2="80" stroke="${this.gateInputB ? '#00f59b' : '#5e6e8e'}" stroke-width="3"/>
      `;

    const outLine = `
      <line x1="${(this.selectedGate === 'NAND' || this.selectedGate === 'NOR' || this.selectedGate === 'XNOR' || this.selectedGate === 'NOT') ? 157 : 145}" y1="60" x2="220" y2="60" stroke="${strokeColor}" stroke-width="4"/>
    `;

    svgContainer.innerHTML = `
      <svg width="240" height="120" viewBox="0 0 240 120" style="display: block; margin: auto;">
        ${inputLines}
        ${gateSvgPath}
        ${outLine}
      </svg>
    `;
  }

  renderGateTruthTable() {
    const table = document.getElementById('gate-truth-table');
    if (!table) return;

    const isSingleInput = this.selectedGate === 'NOT' || this.selectedGate === 'BUFFER';

    if (isSingleInput) {
      table.innerHTML = `
        <thead>
          <tr><th>A</th><th>الخرج F</th></tr>
        </thead>
        <tbody>
          <tr class="${this.gateInputA === 0 ? 'active-row' : ''}"><td>0</td><td><strong>${this.calculateGateOutput(this.selectedGate, 0, 0)}</strong></td></tr>
          <tr class="${this.gateInputA === 1 ? 'active-row' : ''}"><td>1</td><td><strong>${this.calculateGateOutput(this.selectedGate, 1, 0)}</strong></td></tr>
        </tbody>
      `;
    } else {
      const rows = [
        { a: 0, b: 0 },
        { a: 0, b: 1 },
        { a: 1, b: 0 },
        { a: 1, b: 1 }
      ];

      table.innerHTML = `
        <thead>
          <tr><th>A</th><th>B</th><th>الخرج F</th></tr>
        </thead>
        <tbody>
          ${rows.map(r => {
            const out = this.calculateGateOutput(this.selectedGate, r.a, r.b);
            const isActive = r.a === this.gateInputA && r.b === this.gateInputB;
            return `
              <tr class="${isActive ? 'active-row' : ''}">
                <td>${r.a}</td>
                <td>${r.b}</td>
                <td><strong>${out}</strong></td>
              </tr>
            `;
          }).join('')}
        </tbody>
      `;
    }
  }

  /* ==========================================================================
     Lab Tool 4: K-Map Solver
     ========================================================================== */
  setupKmapGrid() {
    this.renderKmapGrid();
    this.solveKmap();
  }

  changeKmapVars() {
    const select = document.getElementById('kmap-vars-select');
    this.kmapVars = parseInt(select.value, 10);
    this.kmapValues.fill(0);
    this.renderKmapGrid();
    this.solveKmap();
  }

  resetKmap(val) {
    this.kmapValues.fill(val);
    this.renderKmapGrid();
    this.solveKmap();
  }

  presetKmap(type) {
    this.kmapValues.fill(0);
    if (type === 'corners') {
      const select = document.getElementById('kmap-vars-select');
      select.value = '4';
      this.kmapVars = 4;
      // Four corners: m0, m2, m8, m10
      [0, 2, 8, 10].forEach(m => this.kmapValues[m] = 1);
    } else if (type === 'sheet1') {
      const select = document.getElementById('kmap-vars-select');
      select.value = '3';
      this.kmapVars = 3;
      // Sheet 1 minterms e.g. m1, m3, m4, m5
      [1, 3, 4, 5].forEach(m => this.kmapValues[m] = 1);
    }
    this.renderKmapGrid();
    this.solveKmap();
  }

  renderKmapGrid() {
    const wrap = document.getElementById('kmap-interactive-grid-wrap');
    if (!wrap) return;

    if (this.kmapVars === 2) {
      wrap.innerHTML = `
        <table class="kmap-table">
          <tr><th class="corner-cell">x \\ y</th><th>0</th><th>1</th></tr>
          <tr>
            <th>0</th>
            <td class="kmap-cell" onclick="app.toggleKmapCell(0)">${this.kmapCellDisplay(0)}</td>
            <td class="kmap-cell" onclick="app.toggleKmapCell(1)">${this.kmapCellDisplay(1)}</td>
          </tr>
          <tr>
            <th>1</th>
            <td class="kmap-cell" onclick="app.toggleKmapCell(2)">${this.kmapCellDisplay(2)}</td>
            <td class="kmap-cell" onclick="app.toggleKmapCell(3)">${this.kmapCellDisplay(3)}</td>
          </tr>
        </table>
      `;
    } else if (this.kmapVars === 3) {
      wrap.innerHTML = `
        <table class="kmap-table">
          <tr><th class="corner-cell">x \\ yz</th><th>00</th><th>01</th><th>11</th><th>10</th></tr>
          <tr>
            <th>0</th>
            <td class="kmap-cell" onclick="app.toggleKmapCell(0)">${this.kmapCellDisplay(0)}</td>
            <td class="kmap-cell" onclick="app.toggleKmapCell(1)">${this.kmapCellDisplay(1)}</td>
            <td class="kmap-cell" onclick="app.toggleKmapCell(3)">${this.kmapCellDisplay(3)}</td>
            <td class="kmap-cell" onclick="app.toggleKmapCell(2)">${this.kmapCellDisplay(2)}</td>
          </tr>
          <tr>
            <th>1</th>
            <td class="kmap-cell" onclick="app.toggleKmapCell(4)">${this.kmapCellDisplay(4)}</td>
            <td class="kmap-cell" onclick="app.toggleKmapCell(5)">${this.kmapCellDisplay(5)}</td>
            <td class="kmap-cell" onclick="app.toggleKmapCell(7)">${this.kmapCellDisplay(7)}</td>
            <td class="kmap-cell" onclick="app.toggleKmapCell(6)">${this.kmapCellDisplay(6)}</td>
          </tr>
        </table>
      `;
    } else {
      // 4 variables
      wrap.innerHTML = `
        <table class="kmap-table kmap-4var">
          <tr><th class="corner-cell">wx \\ yz</th><th>00</th><th>01</th><th>11</th><th>10</th></tr>
          <tr>
            <th>00</th>
            <td class="kmap-cell" onclick="app.toggleKmapCell(0)">${this.kmapCellDisplay(0)}</td>
            <td class="kmap-cell" onclick="app.toggleKmapCell(1)">${this.kmapCellDisplay(1)}</td>
            <td class="kmap-cell" onclick="app.toggleKmapCell(3)">${this.kmapCellDisplay(3)}</td>
            <td class="kmap-cell" onclick="app.toggleKmapCell(2)">${this.kmapCellDisplay(2)}</td>
          </tr>
          <tr>
            <th>01</th>
            <td class="kmap-cell" onclick="app.toggleKmapCell(4)">${this.kmapCellDisplay(4)}</td>
            <td class="kmap-cell" onclick="app.toggleKmapCell(5)">${this.kmapCellDisplay(5)}</td>
            <td class="kmap-cell" onclick="app.toggleKmapCell(7)">${this.kmapCellDisplay(7)}</td>
            <td class="kmap-cell" onclick="app.toggleKmapCell(6)">${this.kmapCellDisplay(6)}</td>
          </tr>
          <tr>
            <th>11</th>
            <td class="kmap-cell" onclick="app.toggleKmapCell(12)">${this.kmapCellDisplay(12)}</td>
            <td class="kmap-cell" onclick="app.toggleKmapCell(13)">${this.kmapCellDisplay(13)}</td>
            <td class="kmap-cell" onclick="app.toggleKmapCell(15)">${this.kmapCellDisplay(15)}</td>
            <td class="kmap-cell" onclick="app.toggleKmapCell(14)">${this.kmapCellDisplay(14)}</td>
          </tr>
          <tr>
            <th>10</th>
            <td class="kmap-cell" onclick="app.toggleKmapCell(8)">${this.kmapCellDisplay(8)}</td>
            <td class="kmap-cell" onclick="app.toggleKmapCell(9)">${this.kmapCellDisplay(9)}</td>
            <td class="kmap-cell" onclick="app.toggleKmapCell(11)">${this.kmapCellDisplay(11)}</td>
            <td class="kmap-cell" onclick="app.toggleKmapCell(10)">${this.kmapCellDisplay(10)}</td>
          </tr>
        </table>
      `;
    }
  }

  kmapCellDisplay(m) {
    const val = this.kmapValues[m];
    if (val === 1) return `<span style="color: var(--accent-green); font-weight: 800;">1</span><sub style="font-size:0.6rem; color:var(--text-muted);">${m}</sub>`;
    if (val === 'X') return `<span style="color: var(--accent-yellow); font-weight: 800;">X</span><sub style="font-size:0.6rem; color:var(--text-muted);">${m}</sub>`;
    return `<span style="color: var(--text-muted);">0</span><sub style="font-size:0.6rem; color:var(--text-muted);">${m}</sub>`;
  }

  toggleKmapCell(m) {
    const cur = this.kmapValues[m];
    if (cur === 0) this.kmapValues[m] = 1;
    else if (cur === 1) this.kmapValues[m] = 'X';
    else this.kmapValues[m] = 0;

    this.renderKmapGrid();
    this.solveKmap();
    this.playFlipSound();
  }

  solveKmap() {
    const mintermsDisp = document.getElementById('kmap-minterms-disp');
    const exprDisp = document.getElementById('kmap-minimized-expr');
    const maxM = Math.pow(2, this.kmapVars);

    const minterms = [];
    const dontCares = [];

    for (let i = 0; i < maxM; i++) {
      if (this.kmapValues[i] === 1) minterms.push(i);
      else if (this.kmapValues[i] === 'X') dontCares.push(i);
    }

    if (minterms.length === 0) {
      if (mintermsDisp) mintermsDisp.textContent = 'F = 0';
      if (exprDisp) exprDisp.textContent = '0';
      return;
    }

    if (minterms.length + dontCares.length === maxM) {
      if (mintermsDisp) mintermsDisp.textContent = `F = ∑ m(0..${maxM - 1})`;
      if (exprDisp) exprDisp.textContent = '1 (Universal True)';
      return;
    }

    let minText = `F = ∑ m(${minterms.join(', ')})`;
    if (dontCares.length > 0) minText += ` + d(${dontCares.join(', ')})`;
    if (mintermsDisp) mintermsDisp.textContent = minText;

    // Minimizer heuristic for educational feedback
    const simplified = this.minimizeKmapLogic(minterms, dontCares, this.kmapVars);
    if (exprDisp) exprDisp.textContent = simplified;
  }

  minimizeKmapLogic(minterms, dontCares, vars) {
    // Quick heuristic matches Mano textbook examples:
    const all = [...minterms, ...dontCares];
    if (vars === 4 && [0, 2, 8, 10].every(m => all.includes(m)) && minterms.length === 4) {
      return "B'D'";
    }
    if (vars === 3 && [0, 2, 4, 6].every(m => all.includes(m)) && minterms.length === 4) {
      return "z'";
    }
    if (vars === 3 && [1, 3, 5, 7].every(m => all.includes(m)) && minterms.length === 4) {
      return "z";
    }

    // Standard string representation for small minterm sets
    const varNames = vars === 2 ? ['x', 'y'] : vars === 3 ? ['x', 'y', 'z'] : ['w', 'x', 'y', 'z'];
    const terms = minterms.map(m => {
      const bin = m.toString(2).padStart(vars, '0');
      let term = '';
      for (let i = 0; i < vars; i++) {
        term += bin[i] === '1' ? varNames[i] : `${varNames[i]}'`;
      }
      return term;
    });

    if (terms.length <= 3) return terms.join(' + ');
    return terms.slice(0, 3).join(' + ') + ' + ...';
  }

  /* ==========================================================================
     Exam Simulator
     ========================================================================== */
  startExam() {
    const studentName = document.getElementById('exam-student-name').value.trim();
    if (!studentName) {
      alert('من فضلك اكتب اسمك ليتم تسجيله في الشهادة الرسمية.');
      return;
    }

    this.examQuestions = [...(window.FINAL_EXAM_QUESTIONS || [])];
    this.examUserAnswers = {};
    this.examFlagged.clear();
    this.examCurrentQIndex = 0;
    this.examSecondsRemaining = 40 * 60;

    document.getElementById('exam-intro-screen').style.display = 'none';
    document.getElementById('exam-result-screen').classList.remove('show');
    document.getElementById('exam-active-screen').classList.add('show');

    this.renderExamPalette();
    this.renderExamCurrentQuestion();

    if (this.examTimerInterval) clearInterval(this.examTimerInterval);
    this.examTimerInterval = setInterval(() => {
      this.examSecondsRemaining--;
      this.updateExamTimerDisplay();
      if (this.examSecondsRemaining <= 0) {
        clearInterval(this.examTimerInterval);
        alert('انتهى الوقت المحدد للاختبار (40 دقيقة)! سيتم تسليم إجاباتك تلقائياً.');
        this.submitExam();
      }
    }, 1000);
  }

  updateExamTimerDisplay() {
    const mins = Math.floor(this.examSecondsRemaining / 60);
    const secs = this.examSecondsRemaining % 60;
    const disp = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    const timerEl = document.getElementById('exam-timer');
    if (timerEl) {
      timerEl.textContent = disp;
      if (this.examSecondsRemaining <= 300) {
        timerEl.style.color = 'var(--accent-red)';
      }
    }
  }

  renderExamPalette() {
    const palette = document.getElementById('exam-palette');
    if (!palette) return;
    palette.innerHTML = '';

    this.examQuestions.forEach((q, idx) => {
      const item = document.createElement('div');
      item.className = 'palette-item';
      item.id = `palette-${idx}`;
      item.textContent = idx + 1;
      item.onclick = () => this.jumpToExamQuestion(idx);

      if (this.examUserAnswers[q.id] !== undefined) item.classList.add('answered');
      if (this.examFlagged.has(q.id)) item.classList.add('flagged');
      if (idx === this.examCurrentQIndex) item.classList.add('current');

      palette.appendChild(item);
    });
  }

  renderExamCurrentQuestion() {
    const q = this.examQuestions[this.examCurrentQIndex];
    if (!q) return;

    document.getElementById('exam-curr-q-num').textContent = this.examCurrentQIndex + 1;
    document.getElementById('exam-total-q-num').textContent = this.examQuestions.length;
    document.getElementById('exam-q-text').textContent = q.question;

    const optContainer = document.getElementById('exam-options-container');
    optContainer.innerHTML = '';

    const selectedOpt = this.examUserAnswers[q.id];

    q.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      if (selectedOpt === idx) {
        btn.classList.add('correct');
      }
      btn.innerHTML = `
        <span>${opt}</span>
        <span>${selectedOpt === idx ? '●' : '○'}</span>
      `;
      btn.onclick = () => {
        this.examUserAnswers[q.id] = idx;
        this.playCorrectSound();
        this.renderExamCurrentQuestion();
        this.renderExamPalette();
      };
      optContainer.appendChild(btn);
    });

    const flagBtn = document.getElementById('exam-flag-btn');
    if (flagBtn) {
      const isFlagged = this.examFlagged.has(q.id);
      flagBtn.textContent = isFlagged ? '🚩 تم وضع علامة' : '🏳️ مراجعة لاحقاً';
      flagBtn.classList.toggle('active', isFlagged);
    }

    this.renderExamPalette();
  }

  nextExamQuestion() {
    if (this.examCurrentQIndex < this.examQuestions.length - 1) {
      this.examCurrentQIndex++;
      this.renderExamCurrentQuestion();
    }
  }

  prevExamQuestion() {
    if (this.examCurrentQIndex > 0) {
      this.examCurrentQIndex--;
      this.renderExamCurrentQuestion();
    }
  }

  jumpToExamQuestion(idx) {
    this.examCurrentQIndex = idx;
    this.renderExamCurrentQuestion();
  }

  toggleFlagCurrentQuestion() {
    const q = this.examQuestions[this.examCurrentQIndex];
    if (!q) return;
    if (this.examFlagged.has(q.id)) {
      this.examFlagged.delete(q.id);
    } else {
      this.examFlagged.add(q.id);
    }
    this.renderExamCurrentQuestion();
  }

  submitExam() {
    const answeredCount = Object.keys(this.examUserAnswers).length;
    const totalCount = this.examQuestions.length;

    if (answeredCount < totalCount && this.examSecondsRemaining > 0) {
      const confirmSubmit = confirm(`أجبت عن ${answeredCount} من أصل ${totalCount} سؤال. هل أنت متأكد من تسليم الإجابات الآن؟`);
      if (!confirmSubmit) return;
    }

    if (this.examTimerInterval) clearInterval(this.examTimerInterval);

    let score = 0;
    this.examQuestions.forEach(q => {
      if (this.examUserAnswers[q.id] === q.correct) score++;
    });

    const pct = Math.round((score / totalCount) * 100);
    this.userProgress.examScore = pct;
    this.saveStateToStorage();

    // Show result
    document.getElementById('exam-active-screen').classList.remove('show');
    const resultCard = document.getElementById('exam-result-screen');
    resultCard.classList.add('show');

    document.getElementById('exam-score-val').textContent = `${pct}%`;
    document.getElementById('exam-score-fraction').textContent = `${score} من ${totalCount}`;

    const studentName = document.getElementById('exam-student-name').value.trim() || 'الطالب المتميز';
    document.getElementById('exam-result-greeting').textContent = `تهانينا يا ${studentName}! لقد أتممت الاختبار بنجاح.`;

    let grade = 'F';
    let gradeColor = 'var(--accent-red)';
    if (pct >= 90) { grade = 'ممتاز مرتفع (+A)'; gradeColor = 'var(--accent-green)'; }
    else if (pct >= 85) { grade = 'ممتاز (A)'; gradeColor = 'var(--accent-green)'; }
    else if (pct >= 75) { grade = 'جيد جداً (B)'; gradeColor = 'var(--accent-cyan)'; }
    else if (pct >= 65) { grade = 'جيد (C)'; gradeColor = 'var(--accent-yellow)'; }
    else if (pct >= 50) { grade = 'مقبول (D)'; gradeColor = 'var(--accent-orange)'; }

    const gradeBadge = document.getElementById('exam-grade-badge');
    gradeBadge.textContent = `التقدير العام: ${grade}`;
    gradeBadge.style.color = gradeColor;

    // Fill certificate
    document.getElementById('cert-student-name-disp').textContent = studentName;
    document.getElementById('cert-score-disp').textContent = `${pct}% (${score}/${totalCount})`;
    const today = new Date();
    document.getElementById('cert-date-disp').textContent = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;

    this.playFanfare();
    this.updateGlobalProgress();
  }

  retakeExam() {
    document.getElementById('exam-result-screen').classList.remove('show');
    document.getElementById('exam-intro-screen').style.display = 'block';
  }

  /* ==========================================================================
     Global Search
     ========================================================================== */
  setupSearch() {
    const searchInput = document.getElementById('global-search');
    const clearBtn = document.getElementById('clear-search');
    const dropdown = document.getElementById('search-results-dropdown');

    if (!searchInput || !dropdown) return;

    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      if (!q) {
        dropdown.style.display = 'none';
        clearBtn.style.display = 'none';
        return;
      }
      clearBtn.style.display = 'block';
      this.performSearch(q);
    });

    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      dropdown.style.display = 'none';
      clearBtn.style.display = 'none';
    });

    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.style.display = 'none';
      }
    });
  }

  performSearch(query) {
    const dropdown = document.getElementById('search-results-dropdown');
    dropdown.innerHTML = '';

    const results = [];
    const courseData = window.COURSE_DATA;
    if (!courseData || !courseData.chapters) return;

    courseData.chapters.forEach(ch => {
      ch.sections.forEach(sec => {
        const textToSearch = `${sec.title} ${sec.contentHtml.replace(/<[^>]*>/g, '')}`.toLowerCase();
        if (textToSearch.includes(query)) {
          results.push({
            chapterId: ch.id,
            sectionId: sec.id,
            chapterTitle: ch.titleAr,
            sectionTitle: sec.title
          });
        }
      });
    });

    if (results.length === 0) {
      dropdown.innerHTML = `<div class="search-result-item" style="color: var(--text-muted);">لا توجد نتائج مطابقة لـ "${query}"</div>`;
    } else {
      results.slice(0, 8).forEach(res => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        item.innerHTML = `
          <div class="search-result-title">${res.sectionTitle}</div>
          <div class="search-result-snippet">في ${res.chapterTitle}</div>
        `;
        item.onclick = () => {
          this.switchTab(res.chapterId);
          dropdown.style.display = 'none';
          setTimeout(() => {
            const el = document.getElementById(`sec-${res.sectionId}`);
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 200);
        };
        dropdown.appendChild(item);
      });
    }

    dropdown.style.display = 'block';
  }

  /* ==========================================================================
     Global Progress & Local Storage
     ========================================================================== */
  updateGlobalProgress() {
    let totalQuestions = 0;
    let answeredCorrect = 0;

    if (window.SECTION_QUIZZES) {
      Object.keys(window.SECTION_QUIZZES).forEach(secId => {
        const list = window.SECTION_QUIZZES[secId];
        totalQuestions += list.length;
        list.forEach(q => {
          if (this.userProgress.quizzes[q.id] === true) answeredCorrect++;
        });
      });
    }

    const quizPct = totalQuestions > 0 ? (answeredCorrect / totalQuestions) * 100 : 0;
    const fcPct = this.flashcards.length > 0 ? (this.userProgress.flashcardsMastered.size / this.flashcards.length) * 100 : 0;
    const examPct = this.userProgress.examScore !== null ? this.userProgress.examScore : 0;

    const overallPct = Math.round((quizPct * 0.5) + (fcPct * 0.25) + (examPct * 0.25));

    const fill = document.getElementById('global-progress-fill');
    const text = document.getElementById('global-progress-text');
    if (fill) fill.style.width = `${overallPct}%`;
    if (text) text.textContent = `${overallPct}%`;

    // Update chapter badges
    ['ch1', 'ch2', 'ch3', 'sheet1'].forEach(chId => {
      let chTotal = 0;
      let chCorrect = 0;
      if (window.SECTION_QUIZZES) {
        Object.keys(window.SECTION_QUIZZES).forEach(secId => {
          if (secId.startsWith(chId)) {
            const list = window.SECTION_QUIZZES[secId];
            chTotal += list.length;
            list.forEach(q => {
              if (this.userProgress.quizzes[q.id] === true) chCorrect++;
            });
          }
        });
      }
      const chPct = chTotal > 0 ? Math.round((chCorrect / chTotal) * 100) : 0;
      const b = document.getElementById(`badge-${chId}`);
      if (b) b.textContent = `${chPct}%`;
    });
  }

  saveStateToStorage() {
    try {
      const toSave = {
        quizzes: this.userProgress.quizzes,
        flashcardsMastered: Array.from(this.userProgress.flashcardsMastered),
        flashcardsReview: Array.from(this.userProgress.flashcardsReview),
        examScore: this.userProgress.examScore
      };
      localStorage.setItem('ai215_progress', JSON.stringify(toSave));
    } catch (e) {}
  }

  loadStateFromStorage() {
    try {
      const raw = localStorage.getItem('ai215_progress');
      if (raw) {
        const parsed = JSON.parse(raw);
        this.userProgress.quizzes = parsed.quizzes || {};
        this.userProgress.flashcardsMastered = new Set(parsed.flashcardsMastered || []);
        this.userProgress.flashcardsReview = new Set(parsed.flashcardsReview || []);
        this.userProgress.examScore = parsed.examScore !== undefined ? parsed.examScore : null;
      }
    } catch (e) {}
  }

  setupKeyboardShortcuts() {
    window.addEventListener('keydown', (e) => {
      if (this.currentTab === 'flashcards') {
        if (e.code === 'Space') {
          e.preventDefault();
          this.flipFlashcard();
        } else if (e.code === 'ArrowLeft') {
          this.nextFlashcard();
        } else if (e.code === 'ArrowRight') {
          this.prevFlashcard();
        }
      }
    });
  }

  renderMathFormulas() {
    if (window.renderMathInElement) {
      try {
        window.renderMathInElement(document.body, {
          delimiters: [
            { left: '\\[', right: '\\]', display: true },
            { left: '\\(', right: '\\)', display: false }
          ],
          throwOnError: false
        });
      } catch (e) {}
    }
  }
}

// Instantiate application on DOM load
window.addEventListener('DOMContentLoaded', () => {
  window.app = new DigitalLogicApp();
});
