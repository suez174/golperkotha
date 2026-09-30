/**
 * GOLPER KOTHA (গল্পের কথা) - Main Application Controller
 * Handles:
 * - Story repository (seed + user-published stories in localStorage)
 * - Strict Writer Auth enforcement for story writing & publishing
 * - Reader modal with ambient audio, TTS speech, font size, themes
 * - Filter by genre, search, claps, bookmarks, comments
 * - Language toggle (Bengali / English)
 * - Canvas fireflies particle animation
 */

class GolperKothaApp {
  constructor() {
    this.STORAGE_KEY_STORIES = "golper_kotha_stories_v1";
    this.STORAGE_KEY_BOOKMARKS = "golper_kotha_bookmarks_v1";
    this.STORAGE_KEY_CLAPS = "golper_kotha_user_claps_v1";
    this.STORAGE_KEY_COMMENTS = "golper_kotha_comments_v1";
    this.STORAGE_KEY_LANG = "golper_kotha_lang_v1";

    this.currentLang = localStorage.getItem(this.STORAGE_KEY_LANG) || "bn"; // 'bn' or 'en'
    this.currentGenre = "all";
    this.searchQuery = "";
    this.activeReadingStory = null;
    this.readerTheme = "midnight"; // midnight, parchment, sepia, snow
    this.readerFontSize = "medium"; // small, medium, large, xlarge

    this.init();
  }

  init() {
    this.initStoriesData();
    this.setupEventListeners();
    this.setupWriterAuthListener();
    this.renderHeaderAuth();
    this.renderGenreFilters();
    this.renderStories();
    this.renderFeaturedStory();
    this.initHeroCanvas();
    this.updateLanguageUI();
    window.audioEngine.setupVisualizer("playerVisualizer");
  }

  // --- DATA STORAGE & SYNC ---
  initStoriesData() {
    if (!localStorage.getItem(this.STORAGE_KEY_STORIES)) {
      localStorage.setItem(this.STORAGE_KEY_STORIES, JSON.stringify(INITIAL_STORIES));
    }
  }

  getStories() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY_STORIES);
      return data ? JSON.parse(data) : INITIAL_STORIES;
    } catch (e) {
      console.error("Error loading stories:", e);
      return INITIAL_STORIES;
    }
  }

  saveStories(stories) {
    localStorage.setItem(this.STORAGE_KEY_STORIES, JSON.stringify(stories));
  }

  getBookmarks() {
    try {
      const b = localStorage.getItem(this.STORAGE_KEY_BOOKMARKS);
      return b ? JSON.parse(b) : [];
    } catch (e) {
      return [];
    }
  }

  toggleBookmark(storyId) {
    let bookmarks = this.getBookmarks();
    const index = bookmarks.indexOf(storyId);
    let isBookmarked = false;
    if (index > -1) {
      bookmarks.splice(index, 1);
    } else {
      bookmarks.push(storyId);
      isBookmarked = true;
    }
    localStorage.setItem(this.STORAGE_KEY_BOOKMARKS, JSON.stringify(bookmarks));
    this.showToast(isBookmarked ? "গল্পটি আপনার প্রিয় তালিকায় যুক্ত হয়েছে (Saved to Library)" : "তালিকা থেকে অপসারিত (Removed from Library)");
    this.renderStories();
    if (this.activeReadingStory && this.activeReadingStory.id === storyId) {
      this.updateReaderBookmarkBtn(isBookmarked);
    }
  }

  getStoryComments(storyId) {
    try {
      const all = localStorage.getItem(this.STORAGE_KEY_COMMENTS);
      const parsed = all ? JSON.parse(all) : {};
      return parsed[storyId] || [
        {
          id: "c-1",
          authorName: "তানভীর আহমেদ",
          comment: "অসাধারণ এক অনুভূতি! গল্পের ভাষা এবং গভীরতা মন ছুঁয়ে গেল।",
          date: "২ দিন আগে"
        },
        {
          id: "c-2",
          authorName: "সৌমিলি সেনগুপ্ত",
          comment: "চিলেকোঠার দৃশ্যপট চোখের সামনে যেন ভেসে উঠল। দারুণ আবহ সংগীতের সাথে পাঠ করার অভিজ্ঞতা অতুলনীয়!",
          date: "গতকাল"
        }
      ];
    } catch (e) {
      return [];
    }
  }

  addComment(storyId, authorName, commentText) {
    if (!commentText.trim()) return;
    try {
      const all = localStorage.getItem(this.STORAGE_KEY_COMMENTS);
      const parsed = all ? JSON.parse(all) : {};
      if (!parsed[storyId]) parsed[storyId] = this.getStoryComments(storyId);

      const newC = {
        id: "c-" + Date.now(),
        authorName: authorName.trim() || "সাহিত্যপ্রেমী পাঠক",
        comment: commentText.trim(),
        date: "এইমাত্র"
      };

      parsed[storyId].unshift(newC);
      localStorage.setItem(this.STORAGE_KEY_COMMENTS, JSON.stringify(parsed));
      this.renderReaderComments(storyId);
      this.showToast("আপনার মন্তব্য প্রকাশিত হয়েছে (Comment posted)");
    } catch (e) {
      console.error(e);
    }
  }

  clapStory(storyId) {
    const stories = this.getStories();
    const story = stories.find(s => s.id === storyId);
    if (!story) return;

    story.claps = (story.claps || 0) + 1;
    this.saveStories(stories);

    // Animate clap button
    const clapBtn = document.getElementById("readerClapBtn");
    if (clapBtn) {
      const clapCountSpan = document.getElementById("readerClapCount");
      if (clapCountSpan) clapCountSpan.textContent = story.claps;
      this.createClapBurst(clapBtn);
    }
    this.renderStories();
  }

  createClapBurst(elem) {
    const burst = document.createElement("span");
    burst.className = "clap-floating-badge";
    burst.textContent = "+1 👏";
    elem.appendChild(burst);
    setTimeout(() => burst.remove(), 900);
  }

  // --- WRITER AUTH UI & SECURITY BARRIER ---
  setupWriterAuthListener() {
    window.addEventListener("writerAuthChanged", () => {
      this.renderHeaderAuth();
      this.renderStories();
    });
  }

  renderHeaderAuth() {
    const userContainer = document.getElementById("navUserArea");
    if (!userContainer) return;

    const activeWriter = window.writerAuth.getActiveWriter();

    if (activeWriter) {
      userContainer.innerHTML = `
        <div class="writer-profile-pill" id="writerProfileMenuTrigger">
          <img src="${activeWriter.avatar || 'assets/images/logo.jpg'}" alt="${activeWriter.penName}" class="writer-avatar-mini" />
          <div class="writer-info-mini">
            <span class="writer-badge-label">লেখক (Author)</span>
            <span class="writer-name-label">${activeWriter.penName}</span>
          </div>
          <i class="ph-bold ph-caret-down"></i>
          
          <div class="writer-dropdown-menu" id="writerDropdownMenu">
            <div class="dropdown-header">
              <strong>${activeWriter.name}</strong>
              <span>${activeWriter.email}</span>
            </div>
            <button class="dropdown-item" onclick="app.openWriterStudio()">
              <i class="ph-bold ph-pen-nib"></i> নতুন গল্প লিখুন (Write Story)
            </button>
            <button class="dropdown-item" onclick="app.openMyStoriesModal()">
              <i class="ph-bold ph-books"></i> আমার গল্পসমূহ (My Stories)
            </button>
            <div class="dropdown-divider"></div>
            <button class="dropdown-item text-danger" onclick="app.handleLogout()">
              <i class="ph-bold ph-sign-out"></i> লগআউট (Logout)
            </button>
          </div>
        </div>
      `;

      const trigger = document.getElementById("writerProfileMenuTrigger");
      const menu = document.getElementById("writerDropdownMenu");
      if (trigger && menu) {
        trigger.addEventListener("click", (e) => {
          e.stopPropagation();
          menu.classList.toggle("show");
        });
        document.addEventListener("click", () => menu.classList.remove("show"));
      }
    } else {
      userContainer.innerHTML = `
        <button class="btn btn-outline btn-sm" onclick="app.openAuthModal('login')">
          <i class="ph-bold ph-user-circle"></i>
          <span class="lang-text" data-bn="লেখক প্রবেশ" data-en="Writer Login">লেখক প্রবেশ</span>
        </button>
        <button class="btn btn-primary btn-sm glow-btn" onclick="app.handleWriteStoryClick()">
          <i class="ph-bold ph-feather"></i>
          <span class="lang-text" data-bn="গল্প লিখুন" data-en="Write Story">গল্প লিখুন</span>
        </button>
      `;
    }
  }

  handleWriteStoryClick() {
    // ENFORCE WRITER ACCOUNT REQUIREMENT
    window.writerAuth.requireAuth((writer) => {
      this.openWriterStudio();
    });
  }

  handleLogout() {
    window.writerAuth.logout();
    this.showToast("লেখক একাউন্ট থেকে সফলভাবে লগআউট হয়েছে (Logged out)");
  }

  openAuthModal(defaultTab = "login", customNotice = null, onSuccessCallback = null) {
    this.authSuccessCallback = onSuccessCallback;
    const modal = document.getElementById("authModal");
    const noticeEl = document.getElementById("authModalNotice");
    if (noticeEl) {
      if (customNotice) {
        noticeEl.innerHTML = `<i class="ph-fill ph-shield-check"></i> ${customNotice}`;
        noticeEl.style.display = "flex";
      } else {
        noticeEl.style.display = "none";
      }
    }
    this.switchAuthTab(defaultTab);
    modal.classList.add("open");
  }

  closeAuthModal() {
    const modal = document.getElementById("authModal");
    modal.classList.remove("open");
  }

  switchAuthTab(tab) {
    const loginForm = document.getElementById("loginFormContainer");
    const registerForm = document.getElementById("registerFormContainer");
    const tabLoginBtn = document.getElementById("tabLoginBtn");
    const tabRegisterBtn = document.getElementById("tabRegisterBtn");

    if (tab === "login") {
      loginForm.style.display = "block";
      registerForm.style.display = "none";
      tabLoginBtn.classList.add("active");
      tabRegisterBtn.classList.remove("active");
    } else {
      loginForm.style.display = "none";
      registerForm.style.display = "block";
      tabLoginBtn.classList.remove("active");
      tabRegisterBtn.classList.add("active");
    }
  }

  quickLogin(email, password) {
    const result = window.writerAuth.login(email, password);
    if (result.success) {
      this.closeAuthModal();
      this.showToast(`স্বাগতম, ${result.writer.penName}! আপনি সফলভাবে লগইন করেছেন।`);
      if (this.authSuccessCallback) {
        this.authSuccessCallback(result.writer);
        this.authSuccessCallback = null;
      }
    } else {
      alert(result.message);
    }
  }

  handleLoginFormSubmit(e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const pass = document.getElementById("loginPassword").value;
    const errorEl = document.getElementById("loginErrorMsg");

    const result = window.writerAuth.login(email, pass);
    if (result.success) {
      errorEl.textContent = "";
      this.closeAuthModal();
      this.showToast(`স্বাগতম, ${result.writer.penName}!`);
      if (this.authSuccessCallback) {
        this.authSuccessCallback(result.writer);
        this.authSuccessCallback = null;
      }
    } else {
      errorEl.textContent = result.message;
    }
  }

  handleRegisterFormSubmit(e) {
    e.preventDefault();
    const name = document.getElementById("regName").value;
    const penName = document.getElementById("regPenName").value;
    const email = document.getElementById("regEmail").value;
    const password = document.getElementById("regPassword").value;
    const bio = document.getElementById("regBio").value;
    const genreFocus = document.getElementById("regGenre").value;
    const errorEl = document.getElementById("regErrorMsg");

    const result = window.writerAuth.register({
      name,
      penName,
      email,
      password,
      bio,
      avatar: "assets/images/logo.jpg",
      genreFocus
    });

    if (result.success) {
      errorEl.textContent = "";
      this.closeAuthModal();
      this.showToast(`অভিনন্দন ${result.writer.penName}! আপনার লেখক একাউন্ট সফলভাবে তৈরি হয়েছে।`);
      if (this.authSuccessCallback) {
        this.authSuccessCallback(result.writer);
        this.authSuccessCallback = null;
      }
    } else {
      errorEl.textContent = result.message;
    }
  }

  // --- WRITER STUDIO (WRITE & PUBLISH STORIES) ---
  openWriterStudio() {
    const activeWriter = window.writerAuth.getActiveWriter();
    if (!activeWriter) {
      this.handleWriteStoryClick();
      return;
    }

    const studioModal = document.getElementById("writerStudioModal");
    document.getElementById("studioAuthorName").textContent = activeWriter.penName;
    document.getElementById("studioAuthorEmail").textContent = activeWriter.email;
    studioModal.classList.add("open");
  }

  closeWriterStudio() {
    const studioModal = document.getElementById("writerStudioModal");
    studioModal.classList.remove("open");
  }

  handlePublishStory(e) {
    e.preventDefault();
    const activeWriter = window.writerAuth.getActiveWriter();
    if (!activeWriter) {
      alert("গল্প প্রকাশের পূর্বে অবশ্যই লেখক একাউন্টে লগইন থাকতে হবে!");
      return;
    }

    const title = document.getElementById("storyTitleInput").value.trim();
    const titleEn = document.getElementById("storyTitleEnInput").value.trim() || title;
    const genre = document.getElementById("storyGenreInput").value;
    const readTime = document.getElementById("storyReadTimeInput").value.trim() || "5 মিনিট";
    const coverChoice = document.getElementById("storyCoverSelect").value;
    const summary = document.getElementById("storySummaryInput").value.trim();
    const content = document.getElementById("storyContentInput").value.trim();

    if (!title || !content) {
      alert("অনুগ্রহ করে গল্পের শিরোনাম এবং পূর্ণ কাহিনী লিখুন (Title and story content are required).");
      return;
    }

    const genreObj = GENRES.find(g => g.id === genre) || GENRES[1];

    const newStory = {
      id: "story-" + Date.now(),
      title,
      titleEn,
      genre,
      genreBn: genreObj.nameBn,
      cover: coverChoice,
      authorId: activeWriter.id,
      authorName: activeWriter.name,
      authorPenName: activeWriter.penName,
      authorAvatar: activeWriter.avatar || "assets/images/logo.jpg",
      readTime,
      readTimeEn: readTime,
      audioDuration: "4:00",
      claps: 1,
      views: 1,
      featured: false,
      publishedAt: new Date().toISOString().split("T")[0],
      summary: summary || content.substring(0, 140) + "...",
      summaryEn: summary || "A newly penned tale by " + activeWriter.penName,
      content,
      contentEn: content // fallback to original
    };

    const stories = this.getStories();
    stories.unshift(newStory);
    this.saveStories(stories);

    this.closeWriterStudio();
    this.renderStories();
    this.showToast(`🎉 "${title}" গল্পটি সফলভাবে 'গল্পের কথা'য় প্রকাশিত হয়েছে!`);

    // Reset form
    document.getElementById("publishStoryForm").reset();
  }

  openMyStoriesModal() {
    const activeWriter = window.writerAuth.getActiveWriter();
    if (!activeWriter) return;

    const modal = document.getElementById("myStoriesModal");
    const container = document.getElementById("myStoriesList");
    const allStories = this.getStories();
    const myStories = allStories.filter(s => s.authorId === activeWriter.id || s.authorName === activeWriter.name);

    document.getElementById("myStoriesCount").textContent = myStories.length;

    if (myStories.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <i class="ph-duotone ph-book-open"></i>
          <p>আপনি এখনও কোনো গল্প প্রকাশ করেননি। এখনই আপনার প্রথম গল্পটি লিখে ফেলুন!</p>
          <button class="btn btn-primary btn-sm" onclick="app.closeMyStoriesModal(); app.openWriterStudio();">গল্প লিখুন</button>
        </div>
      `;
    } else {
      container.innerHTML = myStories.map(s => `
        <div class="my-story-item">
          <img src="${s.cover}" alt="${s.title}" class="my-story-thumb" />
          <div class="my-story-details">
            <h4>${s.title}</h4>
            <div class="my-story-meta">
              <span><i class="ph-bold ph-tag"></i> ${s.genreBn}</span>
              <span><i class="ph-bold ph-hands-clapping"></i> ${s.claps} কড়াতালি</span>
              <span><i class="ph-bold ph-calendar"></i> ${s.publishedAt}</span>
            </div>
          </div>
          <div class="my-story-actions">
            <button class="btn btn-outline btn-xs" onclick="app.closeMyStoriesModal(); app.openReader('${s.id}')">
              <i class="ph-bold ph-book-open"></i> পড়ুন
            </button>
            <button class="btn btn-danger btn-xs" onclick="app.deleteStory('${s.id}')">
              <i class="ph-bold ph-trash"></i> মুছুন
            </button>
          </div>
        </div>
      `).join("");
    }

    modal.classList.add("open");
  }

  closeMyStoriesModal() {
    document.getElementById("myStoriesModal").classList.remove("open");
  }

  deleteStory(storyId) {
    if (!confirm("আপনি কি নিশ্চিতভাবে এই গল্পটি মুছে ফেলতে চান?")) return;
    let stories = this.getStories();
    stories = stories.filter(s => s.id !== storyId);
    this.saveStories(stories);
    this.openMyStoriesModal();
    this.renderStories();
    this.showToast("গল্পটি মুছে ফেলা হয়েছে (Story deleted)");
  }

  // --- GENRE FILTERS & SEARCH ---
  renderGenreFilters() {
    const container = document.getElementById("genreFilterContainer");
    if (!container) return;

    container.innerHTML = GENRES.map(g => `
      <button class="genre-pill ${this.currentGenre === g.id ? 'active' : ''}" data-genre="${g.id}" onclick="app.setGenre('${g.id}')">
        <span class="genre-icon">${g.icon}</span>
        <span class="genre-title">${this.currentLang === 'en' ? g.nameEn : g.nameBn}</span>
      </button>
    `).join("");
  }

  setGenre(genreId) {
    this.currentGenre = genreId;
    this.renderGenreFilters();
    this.renderStories();
  }

  handleSearch(query) {
    this.searchQuery = (query || "").trim().toLowerCase();
    this.renderStories();
  }

  // --- STORY CARDS RENDERING ---
  renderFeaturedStory() {
    const heroContent = document.getElementById("heroFeaturedContent");
    if (!heroContent) return;

    const stories = this.getStories();
    const featured = stories.find(s => s.featured) || stories[0];
    if (!featured) return;

    const isBn = this.currentLang === "bn";
    heroContent.innerHTML = `
      <div class="featured-badge">
        <i class="ph-fill ph-sparkle"></i> ${isBn ? "আজকের বিশেষ কাহিনী" : "Featured Tale"}
      </div>
      <h1 class="hero-title">${isBn ? featured.title : featured.titleEn}</h1>
      <p class="hero-summary">${isBn ? featured.summary : featured.summaryEn}</p>
      
      <div class="hero-author-strip">
        <img src="${featured.authorAvatar}" alt="${featured.authorPenName}" class="author-avatar-sm" />
        <div class="author-info-sm">
          <span class="author-by">${isBn ? "লেখক" : "By"}: <strong>${featured.authorPenName}</strong></span>
          <span class="story-stats-sm"><i class="ph-bold ph-clock"></i> ${isBn ? featured.readTime : featured.readTimeEn} • <i class="ph-bold ph-headphones"></i> ${featured.audioDuration} অডিও</span>
        </div>
      </div>

      <div class="hero-cta-group">
        <button class="btn btn-primary glow-btn" onclick="app.openReader('${featured.id}')">
          <i class="ph-fill ph-book-open"></i> ${isBn ? "সম্পূর্ণ কাহিনী পড়ুন" : "Read Story"}
        </button>
        <button class="btn btn-glass" onclick="app.playStoryAudio('${featured.id}')">
          <i class="ph-fill ph-play-circle"></i> ${isBn ? "অডিও শুনুন" : "Listen Audio"}
        </button>
      </div>
    `;
  }

  renderStories() {
    const grid = document.getElementById("storiesGrid");
    if (!grid) return;

    const stories = this.getStories();
    const bookmarks = this.getBookmarks();
    const isBn = this.currentLang === "bn";

    let filtered = stories;

    // Filter by genre
    if (this.currentGenre !== "all") {
      filtered = filtered.filter(s => s.genre === this.currentGenre);
    }

    // Filter by search query
    if (this.searchQuery) {
      filtered = filtered.filter(s =>
        s.title.toLowerCase().includes(this.searchQuery) ||
        s.titleEn.toLowerCase().includes(this.searchQuery) ||
        s.summary.toLowerCase().includes(this.searchQuery) ||
        s.authorPenName.toLowerCase().includes(this.searchQuery) ||
        s.genreBn.toLowerCase().includes(this.searchQuery)
      );
    }

    // Update story count badge
    const countBadge = document.getElementById("storiesCountBadge");
    if (countBadge) {
      countBadge.textContent = `${filtered.length} টি গল্প উপলব্ধ`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="no-results-card">
          <i class="ph-duotone ph-book-x"></i>
          <h3>কোনো গল্প খুঁজে পাওয়া যায়নি</h3>
          <p>অন্য কোনো ঘরানা অথবা কীওয়ার্ড দিয়ে আবার অনুসন্ধান করুন।</p>
          <button class="btn btn-outline btn-sm" onclick="app.setGenre('all')">সব গল্প দেখুন</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(story => {
      const isBookmarked = bookmarks.includes(story.id);
      return `
        <article class="story-card" data-story-id="${story.id}">
          <div class="card-cover-wrapper" onclick="app.openReader('${story.id}')">
            <img src="${story.cover}" alt="${story.title}" class="story-cover-img" loading="lazy" />
            <span class="genre-badge">${story.genreBn}</span>
            <button class="bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" title="বুকমার্ক" onclick="event.stopPropagation(); app.toggleBookmark('${story.id}')">
              <i class="ph-fill ph-bookmark-simple"></i>
            </button>
            <div class="card-audio-badge">
              <i class="ph-fill ph-headphones"></i> ${story.audioDuration}
            </div>
          </div>

          <div class="card-body">
            <div class="card-meta-top">
              <span class="read-time"><i class="ph-bold ph-hourglass-medium"></i> ${isBn ? story.readTime : story.readTimeEn}</span>
              <span class="story-claps-count"><i class="ph-bold ph-hands-clapping"></i> ${story.claps}</span>
            </div>

            <h3 class="story-card-title" onclick="app.openReader('${story.id}')">
              ${isBn ? story.title : story.titleEn}
            </h3>

            <p class="story-card-snippet">
              ${isBn ? story.summary : story.summaryEn}
            </p>

            <div class="card-footer">
              <div class="card-author">
                <img src="${story.authorAvatar}" alt="${story.authorPenName}" class="author-avatar-xs" />
                <span class="author-name">${story.authorPenName}</span>
              </div>
              <div class="card-quick-actions">
                <button class="btn-icon-round" title="${isBn ? 'অডিও শুনুন' : 'Listen'}" onclick="event.stopPropagation(); app.playStoryAudio('${story.id}')">
                  <i class="ph-fill ph-play"></i>
                </button>
                <button class="btn-read-now" onclick="app.openReader('${story.id}')">
                  ${isBn ? "পড়ুন" : "Read"} <i class="ph-bold ph-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  // --- FULLSCREEN IMMERSIVE READER ---
  openReader(storyId) {
    const stories = this.getStories();
    const story = stories.find(s => s.id === storyId);
    if (!story) return;

    this.activeReadingStory = story;
    const modal = document.getElementById("readerModal");
    const isBn = this.currentLang === "bn";
    const bookmarks = this.getBookmarks();
    const isBookmarked = bookmarks.includes(story.id);

    // Set texts
    document.getElementById("readerStoryTitle").textContent = isBn ? story.title : story.titleEn;
    document.getElementById("readerAuthorName").textContent = story.authorPenName;
    document.getElementById("readerAuthorAvatar").src = story.authorAvatar;
    document.getElementById("readerStoryGenre").textContent = story.genreBn;
    document.getElementById("readerStoryCover").src = story.cover;
    document.getElementById("readerReadTime").textContent = isBn ? story.readTime : story.readTimeEn;
    document.getElementById("readerClapCount").textContent = story.claps;

    this.updateReaderBookmarkBtn(isBookmarked);

    // Render paragraphs
    const contentText = isBn ? story.content : (story.contentEn || story.content);
    const paragraphs = contentText.split("\n\n").map((p, idx) => `
      <p class="reader-paragraph" id="rp-${idx}">${p.trim().replace(/\n/g, '<br/>')}</p>
    `).join("");

    document.getElementById("readerStoryBody").innerHTML = paragraphs;

    this.renderReaderComments(story.id);
    this.applyReaderStyling();

    modal.classList.add("open");
    document.body.style.overflow = "hidden";

    // Setup scroll reading progress
    const scrollContainer = document.getElementById("readerScrollArea");
    const progressBar = document.getElementById("readerReadingProgress");
    if (scrollContainer && progressBar) {
      scrollContainer.scrollTop = 0;
      scrollContainer.onscroll = () => {
        const total = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        const current = scrollContainer.scrollTop;
        const pct = total > 0 ? (current / total) * 100 : 0;
        progressBar.style.width = pct + "%";
      };
    }
  }

  closeReader() {
    const modal = document.getElementById("readerModal");
    modal.classList.remove("open");
    document.body.style.overflow = "";
    this.activeReadingStory = null;
    window.audioEngine.stopSpeaking();
  }

  updateReaderBookmarkBtn(isBookmarked) {
    const btn = document.getElementById("readerBookmarkBtn");
    if (!btn) return;
    if (isBookmarked) {
      btn.classList.add("bookmarked");
      btn.innerHTML = `<i class="ph-fill ph-bookmark-simple"></i> সংরক্ষিত`;
    } else {
      btn.classList.remove("bookmarked");
      btn.innerHTML = `<i class="ph-bold ph-bookmark-simple"></i> সংরক্ষণ`;
    }
  }

  setReaderTheme(theme) {
    this.readerTheme = theme;
    this.applyReaderStyling();
  }

  setReaderFontSize(size) {
    this.readerFontSize = size;
    this.applyReaderStyling();
  }

  applyReaderStyling() {
    const contentArea = document.getElementById("readerMainContent");
    if (!contentArea) return;

    contentArea.className = `reader-main-content theme-${this.readerTheme} font-${this.readerFontSize}`;

    // Highlight active theme buttons
    document.querySelectorAll(".theme-toggle-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.theme === this.readerTheme);
    });

    // Highlight active font size buttons
    document.querySelectorAll(".font-size-btn").forEach(b => {
      b.classList.toggle("active", b.dataset.size === this.readerFontSize);
    });
  }

  playStoryAudio(storyId) {
    const stories = this.getStories();
    const story = stories.find(s => s.id === storyId);
    if (!story) return;

    window.audioEngine.currentStory = story;

    // Update global player dock
    document.getElementById("playerCover").src = story.cover;
    document.getElementById("playerTitle").textContent = story.title;
    document.getElementById("playerAuthor").textContent = story.authorPenName;
    document.getElementById("globalAudioPlayer").classList.add("active");

    // Speak story narration
    const textToSpeak = `${story.title}। লেখক: ${story.authorPenName}। ${story.content}`;
    window.audioEngine.speakStory(textToSpeak, "bn-IN");
    this.showToast(`🎧 "${story.title}" অডিও পাঠ শুরু হয়েছে`);
  }

  toggleSpeechNarration() {
    if (window.audioEngine.isSpeaking) {
      window.audioEngine.pauseSpeaking();
    } else if (window.audioEngine.speechUtterance) {
      window.audioEngine.resumeSpeaking();
    } else if (this.activeReadingStory) {
      this.playStoryAudio(this.activeReadingStory.id);
    }
  }

  renderReaderComments(storyId) {
    const list = document.getElementById("readerCommentsList");
    if (!list) return;

    const comments = this.getStoryComments(storyId);
    list.innerHTML = comments.map(c => `
      <div class="comment-item">
        <div class="comment-author-badge">
          <i class="ph-bold ph-user-circle"></i>
          <strong>${c.authorName}</strong>
          <span class="comment-time">${c.date}</span>
        </div>
        <p class="comment-text">${c.comment}</p>
      </div>
    `).join("");
  }

  // --- LANGUAGE SWITCHER ---
  toggleLanguage() {
    this.currentLang = this.currentLang === "bn" ? "en" : "bn";
    localStorage.setItem(this.STORAGE_KEY_LANG, this.currentLang);
    this.updateLanguageUI();
    this.renderGenreFilters();
    this.renderStories();
    this.renderFeaturedStory();
  }

  updateLanguageUI() {
    const langBtn = document.getElementById("langToggleBtn");
    if (langBtn) {
      langBtn.innerHTML = this.currentLang === "bn" ? `<strong>বাং</strong> | EN` : `বাং | <strong>EN</strong>`;
    }

    document.querySelectorAll(".lang-text").forEach(el => {
      const bnText = el.getAttribute("data-bn");
      const enText = el.getAttribute("data-en");
      if (this.currentLang === "en" && enText) {
        el.textContent = enText;
      } else if (bnText) {
        el.textContent = bnText;
      }
    });
  }

  // --- HERO FLOATING PARTICLES CANVAS ---
  initHeroCanvas() {
    const canvas = document.getElementById("heroCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    window.addEventListener("resize", () => {
      if (canvas.offsetWidth) {
        width = canvas.width = canvas.offsetWidth;
        height = canvas.height = canvas.offsetHeight;
      }
    });

    const particles = [];
    const count = 35;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2.2 + 0.8,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -Math.random() * 0.6 - 0.2,
        opacity: Math.random() * 0.7 + 0.2,
        color: Math.random() > 0.4 ? "#f59e0b" : "#fbbf24"
      });
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    }

    animate();
  }

  // --- TOAST NOTIFICATIONS ---
  showToast(message) {
    let toast = document.getElementById("globalToast");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "globalToast";
      toast.className = "global-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("visible");
    setTimeout(() => toast.classList.remove("visible"), 3200);
  }

  // --- EVENT LISTENERS INITIALIZATION ---
  setupEventListeners() {
    // Search input
    const searchInput = document.getElementById("storySearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => this.handleSearch(e.target.value));
    }

    // Language toggle
    const langBtn = document.getElementById("langToggleBtn");
    if (langBtn) {
      langBtn.addEventListener("click", () => this.toggleLanguage());
    }

    // Reader clap
    const clapBtn = document.getElementById("readerClapBtn");
    if (clapBtn) {
      clapBtn.addEventListener("click", () => {
        if (this.activeReadingStory) this.clapStory(this.activeReadingStory.id);
      });
    }

    // Reader bookmark
    const readerBookmarkBtn = document.getElementById("readerBookmarkBtn");
    if (readerBookmarkBtn) {
      readerBookmarkBtn.addEventListener("click", () => {
        if (this.activeReadingStory) this.toggleBookmark(this.activeReadingStory.id);
      });
    }

    // Reader comment form
    const commentForm = document.getElementById("readerCommentForm");
    if (commentForm) {
      commentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const author = document.getElementById("commentAuthorInput").value;
        const text = document.getElementById("commentTextInput").value;
        if (this.activeReadingStory) {
          this.addComment(this.activeReadingStory.id, author, text);
          document.getElementById("commentTextInput").value = "";
        }
      });
    }

    // Ambient sound picker in reader
    document.querySelectorAll(".ambient-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const type = btn.getAttribute("data-ambient");
        document.querySelectorAll(".ambient-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        window.audioEngine.playAmbient(type);
      });
    });

    const ambientVolSlider = document.getElementById("ambientVolSlider");
    if (ambientVolSlider) {
      ambientVolSlider.addEventListener("input", (e) => {
        window.audioEngine.setAmbientVolume(parseFloat(e.target.value));
      });
    }

    // Speech rate controls
    const speechRateSelect = document.getElementById("speechRateSelect");
    if (speechRateSelect) {
      speechRateSelect.addEventListener("change", (e) => {
        window.audioEngine.setSpeechRate(parseFloat(e.target.value));
      });
    }

    // Global player play/pause
    const playerPlayBtn = document.getElementById("playerPlayBtn");
    if (playerPlayBtn) {
      playerPlayBtn.addEventListener("click", () => this.toggleSpeechNarration());
    }

    // Global player close
    const playerCloseBtn = document.getElementById("playerCloseBtn");
    if (playerCloseBtn) {
      playerCloseBtn.addEventListener("click", () => {
        window.audioEngine.stopSpeaking();
        window.audioEngine.stopAmbient();
        document.getElementById("globalAudioPlayer").classList.remove("active");
      });
    }
  }
}

// Global instance helper
window.openAuthModal = (notice, callback) => {
  if (window.app) window.app.openAuthModal("login", notice, callback);
};

document.addEventListener("DOMContentLoaded", () => {
  window.app = new GolperKothaApp();
});
