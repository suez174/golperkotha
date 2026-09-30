/**
 * GOLPER KOTHA (গল্পের কথা) - Writer Authentication & Account System
 * Enforces rule: "THE WRITER WHO WRITE THE STORY MUST HAVE ACCOUNT"
 * Readers can freely read all stories, but writers must authenticate to compose and publish.
 */

class WriterAuthSystem {
  constructor() {
    this.STORAGE_KEY_WRITERS = "golper_kotha_writers_v1";
    this.STORAGE_KEY_SESSION = "golper_kotha_active_session_v1";
    this.init();
  }

  init() {
    // Seed default writers if not already saved
    if (!localStorage.getItem(this.STORAGE_KEY_WRITERS)) {
      localStorage.setItem(this.STORAGE_KEY_WRITERS, JSON.stringify(DEFAULT_WRITERS));
    }
  }

  getWriters() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY_WRITERS);
      return data ? JSON.parse(data) : DEFAULT_WRITERS;
    } catch (e) {
      console.error("Error reading writers:", e);
      return DEFAULT_WRITERS;
    }
  }

  saveWriters(writers) {
    localStorage.setItem(this.STORAGE_KEY_WRITERS, JSON.stringify(writers));
  }

  getActiveWriter() {
    try {
      const session = localStorage.getItem(this.STORAGE_KEY_SESSION);
      return session ? JSON.parse(session) : null;
    } catch (e) {
      console.error("Error reading active writer session:", e);
      return null;
    }
  }

  setActiveWriter(writer) {
    if (writer) {
      // Don't store plain password in active session
      const safeWriter = { ...writer };
      delete safeWriter.password;
      localStorage.setItem(this.STORAGE_KEY_SESSION, JSON.stringify(safeWriter));
    } else {
      localStorage.removeItem(this.STORAGE_KEY_SESSION);
    }
    // Dispatch custom event for UI updates across components
    window.dispatchEvent(new CustomEvent("writerAuthChanged", { detail: writer }));
  }

  login(email, password) {
    const writers = this.getWriters();
    const cleanEmail = (email || "").trim().toLowerCase();
    const writer = writers.find(w => w.email.toLowerCase() === cleanEmail);

    if (!writer) {
      return { success: false, message: "এই ইমেল দিয়ে কোনো লেখক একাউন্ট পাওয়া যায়নি (Writer account not found with this email)." };
    }

    if (writer.password !== password) {
      return { success: false, message: "ভুল পাসওয়ার্ড! অনুগ্রহ করে আবার চেষ্টা করুন (Incorrect password)." };
    }

    this.setActiveWriter(writer);
    return { success: true, writer };
  }

  register({ name, penName, email, password, bio, avatar, genreFocus }) {
    if (!name || !email || !password) {
      return { success: false, message: "অনুগ্রহ করে সকল প্রয়োজনীয় তথ্য প্রদান করুন (Please fill all required fields)." };
    }

    if (password.length < 4) {
      return { success: false, message: "পাসওয়ার্ড অন্তত ৪ অক্ষরের হতে হবে (Password must be at least 4 characters)." };
    }

    const cleanEmail = email.trim().toLowerCase();
    const writers = this.getWriters();

    if (writers.some(w => w.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: "এই ইমেইল দিয়ে ইতিমধ্যে একজন লেখকের একাউন্ট রয়েছে (An account with this email already exists)." };
    }

    const newWriter = {
      id: "writer-" + Date.now(),
      name: name.trim(),
      penName: (penName && penName.trim()) || name.trim(),
      email: cleanEmail,
      password: password,
      bio: (bio && bio.trim()) || "গল্পের কথা প্ল্যাটফর্মের নতুন লেখক ও সাহিত্যপ্রেমী।",
      avatar: avatar || "assets/images/logo.jpg",
      genreFocus: genreFocus || "সব গল্প",
      joinedDate: new Date().toISOString().split("T")[0],
      followersCount: 1
    };

    writers.push(newWriter);
    this.saveWriters(writers);
    this.setActiveWriter(newWriter);

    return { success: true, writer: newWriter };
  }

  logout() {
    this.setActiveWriter(null);
  }

  isLoggedIn() {
    return !!this.getActiveWriter();
  }

  /**
   * Enforces writer login barrier.
   * If logged in, proceeds to callback.
   * If not logged in, opens the auth modal with high-priority notice.
   */
  requireAuth(onSuccessCallback) {
    if (this.isLoggedIn()) {
      if (typeof onSuccessCallback === "function") {
        onSuccessCallback(this.getActiveWriter());
      }
    } else {
      if (window.openAuthModal) {
        window.openAuthModal("গল্প লিখতে বা প্রকাশ করতে লেখকের নিজস্ব একাউন্টে লগইন থাকা বাধ্যতামূলক। (A Writer Account is strictly required to compose & publish stories.)", onSuccessCallback);
      } else {
        alert("গল্প লিখতে দয়া করে প্রথমে লেখক হিসেবে লগইন করুন! (Please log in as a Writer to publish stories.)");
      }
    }
  }
}

// Global instance
window.writerAuth = new WriterAuthSystem();
