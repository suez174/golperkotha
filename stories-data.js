/**
 * GOLPER KOTHA (গল্পের কথা) - Master Stories Data Repository
 * Contains diverse stories spanning all major genres:
 * - Mystery (রহস্য)
 * - Horror / Supernatural (ভৌতিক)
 * - Folk & Fairy Tales (রূপকথা)
 * - Classic Literature (চিরায়ত সাহিত্য)
 * - Science Fiction & Adventure (কল্পবিজ্ঞান)
 * - Romance & Drama (রোমান্টিক)
 * - Detective & Suspense (গোয়েন্দা)
 * - Comedy & Satire (হাস্যরস)
 */

const INITIAL_STORIES = [
  {
    id: "story-1",
    title: "চিলেকোঠার রহস্যময় ট্রাঙ্ক",
    titleEn: "The Mystery of the Attic Trunk",
    genre: "mystery",
    genreBn: "রহস্য ও রোমাঞ্চ",
    cover: "assets/images/mystery.jpg",
    authorId: "writer-1",
    authorName: "অনিরুদ্ধ মজুমদার",
    authorPenName: "অনিরুদ্ধ",
    authorAvatar: "assets/images/logo.jpg",
    readTime: "8 মিনিট",
    readTimeEn: "8 min read",
    audioDuration: "5:20",
    claps: 1420,
    views: 8930,
    featured: true,
    publishedAt: "২০২৬-০৮-১৫",
    summary: "শ্যামনগর রাজবাড়ির শতবর্ষ পুরোনো চিলেকোঠায় পাওয়া গেল পিতলের কারুকার্য খচিত এক তালাবন্ধ ট্রাঙ্ক। চাবি খুঁজতেই বেরিয়ে এল এক বিস্ময়কর ইতিহাস...",
    summaryEn: "In the century-old attic of Shyamnagar Rajbari, a locked brass-inlaid trunk was discovered. Searching for its key unveiled an astonishing hidden chapter...",
    content: `শ্যামনগর রাজবাড়িটির বয়স প্রায় দুশো বছর। বিশাল থামওয়ালা বারান্দা, খিলানযুক্ত দরজা, আর পেছনে ঘন জঙ্গল পেরিয়ে বহুদূর পর্যন্ত চলে গেছে পদ্মার শাখা নদী।

কালবৈশাখীর এক ভেজা সন্ধ্যায় বাড়ির সর্বকনিষ্ঠ উত্তরাধিকারী দীপঙ্কর যখন চিলেকোঠার পুরোনো ভাঙা সিঁড়ি বেয়ে ওপরে উঠল, বাতাসে ছিল পুরোনো কাগজের ভেজা গন্ধ আর বাদুড়ের ডানার ঝটপটানি। চিলেকোঠার ছাদের এক কোণে জমে থাকা ধুলোর আস্তরণ সরাতেই ওর চোখে পড়ল একটি ভারী মেহগনি কাঠের ট্রাঙ্ক। তাতে পেতলের সূক্ষ্ম লতাপাতার খোদাই করা কাজ।

ট্রাঙ্কের গায়ে খোদাই করা ছিল একটি সংকেত:
"যে খুঁজবে সত্যের আলো, সে যেন হৃদয়ের অন্ধকারকে ভয় না পায়।"

দীপঙ্করের পকেটে ছিল প্রপিতামহের দেওয়া এক প্রাচীন তামার চাবি। চাবিটি ট্রাঙ্কের প্রাচীন তালায় প্রবেশ করাতেই এক মৃদু ক্লিক শব্দ হলো। ডালাটি ধীরে ধীরে খুলতেই চোখ ছানাবড়া হয়ে গেল তার। কোনো সোনা বা হিরে-জহরত নয়, ভেতরে ছিল এক রাশ চামড়ায় বাঁধানো ডায়েরি আর একখানা অদ্ভুত প্রাচীন মানচিত্র।

সেই ডায়েরির প্রথম পাতায় লেখা ছিল ১৮৭৯ সালের ১৮ই বৈশাখ। প্রপিতামহ রাজকুমার হরশঙ্কর রায় লিখে গেছেন:
"আজ রাতে শ্যামনগরের রাজভাণ্ডার স্থানান্তরিত করা হলো। যারা এই সম্পদ লোভের বশে খুঁজবে, তারা পাবে শুধু বিভ্রান্তি; কিন্তু যে জনহিতৈষী হৃদয় নিয়ে আসবে, তার জন্য উন্মুক্ত হবে মাটির নিচের জলদ্বার।"

বাইরে তখন গর্জন করে বজ্রপাত হলো। চিলেকোঠার জানালার কাঁচ কেঁপে উঠল প্রচণ্ড শব্দে। ঠিক তখনই ট্রাঙ্কের তলদেশ থেকে খুলে পড়ল একখণ্ড রুপোলি পদক। পদকটিতে ছিল নদীর গতিপথের এক অচেনা নিশানা... রহস্যের জাল কেবল বোনা শুরু হলো।`,
    contentEn: `Shyamnagar Rajbari stands with two centuries of grandeur. Colossal pillar-lined verandas, gothic arched doorways, and sprawling grounds that melt into the ancient banks of the Padma river.

On a stormy monsoon dusk, young Dipankar climbed the creaking attic stairs. The damp aroma of ancient parchment and dust filled the stillness. Wiping away decades of spiderwebs in the darkest corner, his eyes froze upon a massive mahogany trunk, heavily adorned with brass vine etchings.

Carved onto the brass lock plate was an enigma:
"He who seeks the truth of dawn must not fear the shadows of the heart."

In his pocket rested his great-grandfather's copper filigree key. Sliding it into the antique keyhole, an ethereal click echoed through the rafters. He lifted the heavy wooden lid. Inside lay no diamonds or gold coins, but stacks of leather-bound journals and a parchment star-chart.

On the yellowed title page of the 1879 diary, Prince Harashankar Roy had inscribed in calligraphic Bengali:
"Tonight, the treasures of Shyamnagar were consecrated beneath the flowing tides. The greedy shall find only illusions; but the righteous shall uncover the fountain of life."

Thunder ripped across the midnight sky, rattling the arched bay windows. And from the false bottom of the trunk slipped a silver medallion bearing the crest of a forgotten water-labyrinth... The adventure had just begun.`
  },
  {
    id: "story-2",
    title: "মায়াপঙ্খীর ডাক ও সোনার পদ্ম",
    titleEn: "Call of the Mayapankhi & The Golden Lotus",
    genre: "folk",
    genreBn: "রূপকথা ও লোকগাথা",
    cover: "assets/images/folk.jpg",
    authorId: "writer-2",
    authorName: "অপর্ণা দেবী",
    authorPenName: "রূপকথার দিদিমণি",
    authorAvatar: "assets/images/logo.jpg",
    readTime: "6 মিনিট",
    readTimeEn: "6 min read",
    audioDuration: "4:45",
    claps: 2310,
    views: 12400,
    featured: true,
    publishedAt: "২০২৬-০৯-১০",
    summary: "রূপোলী নদীর ধারে ঘন কদম্ব বনের মাঝে এক পূর্ণিমা রাতে রূপকথার মায়াপঙ্খী পাখি গান গাইতে নামে। সেই গানের সুরেই ফোটে অলৌকিক সোনার পদ্ম...",
    summaryEn: "On moonlit nights along the silver river, the mythical Mayapankhi bird descends to sing amidst Kadamba groves. Its ethereal melody blooms the legendary Golden Lotus...",
    content: `এক যে ছিল সাত সমুদ্দুর তেরো নদীর ওপারের রাজ্য—নাম তার হিরণ্ময় নগর। সেই নগরের শেষ প্রান্তে, যেখানে রূপোলী নদীটি শান্ত হয়ে বয়ে গেছে, সেখানে ছিল এক প্রাচীন কদম্ব বন।

বনের প্রবীণ মানুষেরা বলত, বারো বছর পর পর যখন শরৎকালের আকাশ ধ্রুবতারায় ভরে ওঠে, তখন পূর্ণিমার নিশীথে নীলিমার বুক চিরে নেমে আসে সোনার পালকওয়ালা মায়াপঙ্খী পাখি। তার ডানায় থাকে ভোরের আলোর ঝলকানি, আর কণ্ঠে থাকে এমন এক অমৃত সুর, যা শুনলে মনের সমস্ত দুঃখ নিমেষে কর্পূরের মতো উবে যায়।

রাজকুমার অরিন্দম ছিলেন সংবেদনশীল ও চিত্রশিল্পী। রাজ্যের প্রজারা যখন খরার করাল গ্রাসে তৃষ্ণার্ত, তখন অরিন্দম শুনলেন এক প্রাচীন ভবিষ্যৎবাণী—যদি কেউ মায়াপঙ্খীর অনুমতি নিয়ে সেই সোনার পদ্মের একটি পাপড়ি নদীর মোহনায় ভাসিয়ে দিতে পারে, তবে সারা রাজ্যে নেমে আসবে অমৃতবারিধারা।

অরিন্দম রাজপ্রাসাদের আরাম ত্যাগ করে একতারা হাতে হেঁটে চললেন বনের গভীরে। কোনো অস্ত্র নয়, শুধু নিখাদ সুর ও ভালোবাসা নিয়ে তিনি বসে রইলেন নদীর ঘাটে।

মধ্যরাতে যখন চাঁদ তার রূপোলী জোছনায় জলতলকে কাঁচের মতো স্বচ্ছ করে তুলল, অমনি বাতাসে ভেসে এল সুবাস। আকাশ থেকে নামল এক অপূর্ব পক্ষীরাজ ময়ূরপঙ্খী। অরিন্দম ভয় পেলেন না, তিনি তার একতারায় ভৈরবী রাগের মৃদু সুর তুললেন। সুরের মিলনে মায়াপঙ্খী তার ডানার একটি সুবর্ণ পালক নামিয়ে দিল নদীর জলে—আর মুহূর্তেই ফুটে উঠল হাজারটি জ্যোতির্ময় সোনার পদ্ম! রূপকথার সেই আলোয় ভরে উঠল গোটা বাংলা।`,
    contentEn: `Beyond seven oceans and thirteen mystic rivers lay the kingdom of Hiranmoy Nagar. At the edge of that kingdom, where the silver waters gently curved, stood an enchanted grove of ancient Kadamba blossoms.

Village folklore whispered that once every twelve autumns, under the pinnacle of the harvest moon, a celestial bird known as Mayapankhi would descend from the stars. Her wings gleamed like morning sunlight, and her song possessed such transcendent grace that all earthly sorrow vanished in an instant.

Prince Arindam was not a conqueror, but a poet and artist. When a merciless drought struck his people, ancient scriptures revealed that only a petal from the celestial Golden Lotus, gifted willingly by the Mayapankhi, could bring forth the restorative rains.

Leaving his palace cushions behind, Arindam walked into the midnight woods carrying only an Ektara. He took no weapons, only music and humility.

As midnight approached, the lotus lake turned to liquid mercury under the moon. A divine golden light cascaded through the trees. The Mayapankhi arrived, crowning the blooming bough. Gently, Arindam strummed the strings, matching the heartbeat of the woods. Touched by his purity, the bird dipped its gilded plume into the water—and in that sacred moment, a thousand radiant golden blossoms unfurled, bringing rain and life to the sleeping land.`
  },
  {
    id: "story-3",
    title: "নিশুতি রাতের শেষ খেয়া",
    titleEn: "The Midnight Ferry of Nishipur",
    genre: "horror",
    genreBn: "ভৌতিক ও অলৌকিক",
    cover: "assets/images/horror.jpg",
    authorId: "writer-3",
    authorName: "শুভেন্দু চট্টোপাধ্যায়",
    authorPenName: "কালপুরুষ",
    authorAvatar: "assets/images/logo.jpg",
    readTime: "10 মিনিট",
    readTimeEn: "10 min read",
    audioDuration: "7:10",
    claps: 3450,
    views: 18700,
    featured: true,
    publishedAt: "২০২৬-০৮-২৮",
    summary: "পোড়ো শ্মশানের ঘাট থেকে রাত বারোটার পর আর কোনো নৌকা ছাড়ে না। কিন্তু সে রাতে মাঝ নদীতে হঠাৎ ভেসে এল এক বৈঠার ছলাৎ ছলাৎ শব্দ...",
    summaryEn: "No boat dares cross the deserted cremation ghat past midnight. But on that tempestuous night, rhythmic rowing echoed from the shrouded river mist...",
    content: `নিশিপুরের শ্মশান ঘাটটি নিয়ে আশপাশের দশ গ্রামের মানুষের মনে এক অদ্ভুত আতঙ্ক আছে। প্রবীণ মাঝি কেনারাম স্পষ্ট জানিয়ে দিয়েছিল—"বাবু, ঘড়িতে বারোটার কাঁটা ছুঁলে আমি আর নৌকা খুলব না। ব্রহ্মপুত্রের ওপারে রাতের বেলায় যারা চলাচল করে, তারা রক্ত-মাংসের মানুষ নয়।"

কিন্তু কলকাতার তরুণ ভূতত্ত্ববিদ অমিতাভ বিজ্ঞানের ছাত্র, এসব কুসংস্কার সে তোয়াক্কা করে না। এক দুর্যোগপূর্ণ অমাবস্যার রাতে তার শেষ ট্রেনের জরুরি কাজে ওপারে যাওয়া দরকার ছিল। রাত তখন পৌনে বারোটা। আকাশে কালবোশেখির কালো মেঘ পুঞ্জীভূত হয়ে এসেছে, ক্ষণে ক্ষণে নীল বিদ্যুতের ঝলকানিতে পুরোনো বটগাছের ঝুলন্ত শিকড়গুলোকে মনে হচ্ছে প্রেতাত্মার কঙ্কালসার হাত।

ঘাট একদম ফাঁকা। শুধু ল্যাম্পপোস্টের নিচে একাকী বসে ছিল একজন বৃদ্ধ মাঝি। মুখে গভীর বলিরেখা, চাদরে মুখ ঢাকা।

"ওপারে যাবে বাবু?" অদ্ভুত ফ্যাসফেসে গলায় জিজ্ঞেস করল মাঝি।
"হ্যাঁ, দ্বিগুণ ভাড়া দেব।" অমিতাভ চটপট নৌকায় উঠল।

নৌকাটি যখন নদীর মধ্যিখানে পৌঁছল, হঠাৎ ঝড় থেমে গেল। সমস্ত বাতাস যেন বরফের মতো জমে গেল এক লহমায়। অমিতাভ লক্ষ্য করল—নৌকার কোনো বৈঠার শব্দ নেই, অথচ নৌকাটি অবিশ্বাস্য দ্রুত গতিতে জলের ওপর দিয়ে পিছলে যাচ্ছে! আরও ভয়ের ব্যাপার হলো, মাঝির কোনো ছায়া জলের ওপর পড়ছিল না!

মাঝি ধীরে ধীরে তার চাদরটি সরাল। তার চোখের কোটরে কোনো মণি নেই, জ্বলছে দুটো নীল আগুনের শিখা! সে ফিসফিস করে বলল:
"তিরিশ বছর আগে এই মাঝনদীতে আমার নৌকা ডুবেছিল বাবু... আজ তুমি এলে আমার শূন্য আসনটি পূর্ণ করতে..."

বিদ্যুৎ চমকে উঠল তীব্র শব্দে। পরদিন সকালে নদীর চরে শুধু পাওয়া গেল অমিতাভের হাতঘড়িটি, যার কাঁটা রাত ঠিক বারোটাতে থমকে দাঁড়িয়ে ছিল!`,
    contentEn: `The cremation pier of Nishipur has haunted the folklore of ten surrounding villages for generations. The veteran boatman Kenaram had set a solemn rule: "Once the midnight chime rings, no oar dips into the water. Those who travel across these misty currents after twelve are not sons of flesh and blood."

Yet Amitabh, a rationalist geologist from Calcutta, had no patience for superstition. Stranded on an ominous moonless night before a brewing tempest, he had to cross the river to catch the dawn junction express. It was a quarter to midnight. Violet lightning cracked across bruising storm clouds, turning the aerial roots of an ancient banyan into clawing skeletal fingers.

The ghat was desolate, except for a lone silhouette seated beneath a flickering hurricane lantern, his face obscured by a dark shawl.

"Crossing to the far shore, young sir?" the boatman rasped in a dry, rustling voice.
"Yes, I'll pay double fare," Amitabh stepped onboard without hesitation.

When the craft reached the dead center of the river, the howling gale abruptly stopped. The air turned bitterly cold, as if frozen in time. Amitabh noticed with mounting dread—there was no sound of oars splashing, yet the boat glided with unnatural speed. And worse: under the pale moon, the boatman cast no shadow upon the water!

Slowly, the rower drew back his shawl. In his hollow eye sockets, no pupils rested—only two pinpricks of spectral sapphire flame. He whispered:
"Thirty years ago tonight my ferry capsized in this very whirlpool... and at last, you have arrived to take my vacant seat."

A deafening lightning bolt split the sky. When dawn fishermen searched the shore next morning, all that remained was Amitabh's wristwatch—its hands forever frozen at twelve midnight.`
  },
  {
    id: "story-4",
    title: "বটমূলের পাঠশালা ও স্মৃতির দিন",
    titleEn: "The Banyan School & Tales of Memory",
    genre: "classic",
    genreBn: "চিরায়ত সাহিত্য",
    cover: "assets/images/classic.jpg",
    authorId: "writer-4",
    authorName: "রবীন্দ্রনাথ বন্দ্যোপাধ্যায়",
    authorPenName: "চিরন্তন",
    authorAvatar: "assets/images/logo.jpg",
    readTime: "7 মিনিট",
    readTimeEn: "7 min read",
    audioDuration: "5:00",
    claps: 1890,
    views: 9400,
    featured: false,
    publishedAt: "২০২৬-০৭-২২",
    summary: "গ্রামের প্রাচীন বটতলায় দাদু যখন লাল কাপড়ে মোড়া পুঁথিটি খুলতেন, চারপাশের শিশুরা রূপকথার দেশে হারিয়ে যেত। সে এক অনাবিল নষ্টালজিয়া...",
    summaryEn: "When grandfather opened the crimson-cloth manuscript under the giant village banyan tree, generations of children were transported into realms of wonder...",
    content: `বৈশাখ মাসের মিষ্টি রোদে তপ্ত মেঠোপথ। মাঠের ওপার থেকে ভেসে আসছে রাখালিয়ার বাঁশির সুর। দূরে নদী বক্ষে পাল তুলে ছুটে চলেছে রাজহাঁসের মতো একখানা গয়না নৌকা।

গ্রামের প্রাচীন কৃষ্ণচূড়া ও বটগাছের শীতল ছায়ায় বিছানো থাকত একটি হোগলার চাটাই। সেখানে বসতেন আমাদের মাস্টারমশাই ভবতারণ ঠাকুর। তাঁর সাদা শুভ্র দাড়ি, চোখে সোনালী ফ্রেমের চশমা, আর কোলের ওপর রাখা থাকত কাঠের দোয়াত এবং হাতে লেখা তালপাতার পুঁথি।

প্রতি শনিবার বিকেলে সেখানে বসত গল্পের আসর। গ্রামের সব ছেলেমেয়ে দল বেঁধে এসে গোল হয়ে বসত। ভবতারণ দাদু যখন জলদগম্ভীর গলায় বলতেন—"একদিন এক মেঘের দেশে ছিল পক্ষীরাজ ঘোড়া...", তখন মনে হতো যেন গাছের পাতাগুলোও নড়াচড়া বন্ধ করে গল্প শুনছে। বাতাসে উড়ন্ত ঝরা পাতার শব্দও মনে হতো রাজপুত্রের ঘোড়ার খুরের আওয়াজ।

আজ আর সেই মেঠো পথ নেই, কংক্রিটের শহরে হারিয়ে গেছে তালপাতার গন্ধ। কিন্তু চোখ বুজলেই আজও স্পষ্ট শোনা যায় সেই দূর অতীতের সান্ধ্যকালীন পাঠশালার ঘণ্টাধ্বনি আর দাদুর মুখে রবীন্দ্রনাথের কবিতার সেই অমলিন পঙ্‌ক্তিমালা:
"আমাদের ছোট নদী চলে বাঁকে বাঁকে,
বৈশাখ মাসে তার হাঁটু জল থাকে..."`,
    contentEn: `A golden sun warmed the dusty village path in the month of Boishakh. From across the emerald fields drifted the melancholic melody of a shepherd's bamboo flute, while a graceful sailboat glided like a white swan upon the river.

Under the sprawling canopy of a crimson Krishnachura and ancient Banyan tree, a simple bamboo mat was laid. There sat our village teacher, Pandit Bhavataran. With his snow-white beard, brass spectacles, and hand-copied birchwood manuscripts, he held the keys to an infinite world.

Every Saturday afternoon was story hour. Children from every lane gathered in wide-eyed circles. When grandfather Bhavataran began with his resonant voice, "Once upon a time, high above the storm clouds, galloped a winged stallion...", even the rustling leaves seemed to hold their breath in anticipation.

Today the dirt tracks have surrendered to concrete avenues, and the scent of palm manuscripts is rare. Yet closing one's eyes brings back that timeless twilight assembly, the temple bell in the distance, and the tender poetry of childhood that time can never erase.`
  },
  {
    id: "story-5",
    title: "নক্ষত্রলোকের পর্যটক",
    titleEn: "Voyager of the Starry Expanse",
    genre: "scifi",
    genreBn: "কল্পবিজ্ঞান ও মহাকাশ",
    cover: "assets/images/hero.jpg",
    authorId: "writer-1",
    authorName: "অনিরুদ্ধ মজুমদার",
    authorPenName: "অনিরুদ্ধ",
    authorAvatar: "assets/images/logo.jpg",
    readTime: "9 মিনিট",
    readTimeEn: "9 min read",
    audioDuration: "6:15",
    claps: 2780,
    views: 14100,
    featured: false,
    publishedAt: "২০২৬-০৯-০৫",
    summary: "২০৮৫ সালের কলকাতার মানমন্দির থেকে বিজ্ঞানী অদ্রীশ সেন আবিষ্কার করলেন মহাকাশের এক অদ্ভুত রেডিও সিগন্যাল, যা রবীন্দ্রনাথের গানের সুরে কোডিং করা!",
    summaryEn: "In 2085, from an observatory high above Kolkata, astrophysicist Adrish Sen intercepted an interstellar signal encoded with the exact frequency of a Tagore raga!",
    content: `সাল ২০৮৫। নিউ কলকাতার আকাশচুম্বী গম্বুজের ওপর নির্মিত ন্যাশনাল রেডিও টেলিস্কোপ তখন গ্যালাক্সির ওমেগা সেন্টরি নক্ষত্রমণ্ডলের দিকে তাক করা।

বিজ্ঞানী অদ্রীশ সেন গত বারো বছর ধরে মহাজাগতিক স্পন্দনের ওপর গবেষণা করছেন। গভীর রাতে যখন শহরের কোটি কোটি আলোকবর্তিকা মৃদু হয়ে এল, হঠাৎ স্পেকট্রোমিটারের মনিটরে দেখা গেল এক অভাবনীয় ওয়েভফর্ম।

সাধারণত মহাজাগতিক পালসার বা কোয়াসার থেকে আসা সিগন্যাল এলোমেলো ফ্রিকোয়েন্সিতে আসে। কিন্তু এই সংকেতটি ছিল অবিশ্বাস্যভাবে ছন্দোময়। অদ্রীশ যখন সিগন্যালটিকে অডিও কনভার্টারে চালান করলেন, কন্ট্রোল রুমে উপস্থিত সবাই স্তম্ভিত হয়ে দাঁড়িয়ে রইল!

স্পিকারে বেজে উঠল এক অলৌকিক সুর—তা ছিল রবীন্দ্রসংগীতের 'আকাশভরা সূর্যতারা' গানের সুরে কম্পিত এক কোয়ান্টাম বার্তা!

দশ আলোকবর্ষ দূর থেকে কারা পাঠাল এই সুর? অদ্রীশ যখন ডেটা ডিকোড করলেন, মনিটরে ফুটে উঠল একটি প্রাচীন বাংলা লিপি:
"যেখানে সুর পৌঁছেছে, সেখানে আমরা তোমাদের বহু পূর্ব থেকেই চিনে রেখেছি। পৃথিবীর মানুষেরা, তোমাদের মহাকাশযান প্রস্তুত করো..."`,
    contentEn: `The year was 2085. High atop the bio-domes of New Kolkata, the deep-space radiotelescope array was aligned with the Omega Centauri cluster.

Dr. Adrish Sen had spent twelve dedicated years listening to cosmic background murmurs. Late one winter midnight, as the neon grid dimmed, the spectrum analyzer suddenly spiked with an unprecedented harmonic waveform.

Cosmic pulsars produce chaotic radiation. But this pulse possessed unmistakable poetic geometry. When Dr. Sen routed the stream into an audio acoustic converter, every scientist in the control room stood in reverent silence.

From the deep void echoed a melody vibrating with mathematical precision—the unmistakable acoustic signature of Rabindranath's ode to the cosmos: 'The Sky Full of Sun and Stars'!

Who could transmit this from ten light-years away? As the quantum mainframe decrypted the frequency layers, a holographic script materialized in pristine Bengali:
"Wherever song can travel, our kindred spirits have known you for eons. Children of Earth, prepare your starships..."`
  },
  {
    id: "story-6",
    title: "মেঘমল্লারের বিকেলে",
    titleEn: "An Afternoon in Meghmallar",
    genre: "romance",
    genreBn: "রোমান্টিক ও জীবনগাথা",
    cover: "assets/images/classic.jpg",
    authorId: "writer-2",
    authorName: "অপর্ণা দেবী",
    authorPenName: "রূপকথার দিদিমণি",
    authorAvatar: "assets/images/logo.jpg",
    readTime: "7 মিনিট",
    readTimeEn: "7 min read",
    audioDuration: "4:50",
    claps: 1650,
    views: 8100,
    featured: false,
    publishedAt: "২০২৬-০৮-০১",
    summary: "কলেজ স্ট্রিটের এক পুরোনো বইয়ের দোকানে ঝুম বৃষ্টির বিকেলে দু'জন অচেনা মানুষের চোখাচোখি। একখানা কবিতার বই আর এক কাপ ধোঁয়া ওঠা চা...",
    summaryEn: "A torrential monsoon downpour in a vintage College Street bookstore brings two strangers together over an antique volume of poetry...",
    content: `কলেজ স্ট্রিটের সেই পুরোনো বইয়ের দোকানটির নাম ছিল 'গ্রন্থলোক'। কাঠের তাকে থরে থরে সাজানো হলুদ হয়ে যাওয়া কবিতার বই, পুরোনো মানচিত্র, আর ধুলোর মিষ্টি ঘ্রাণ।

শ্রাবণ মাসের সেই পড়ন্ত বিকেলে আচমকা নেমে এল অবিশ্রান্ত বারিধারা। ছাতা না থাকায় তনয়া দৌড়ে এসে ঢুকল সেই দোকানের ছোট ছাউনির নিচে। ভেজা চুল থেকে টুপটুপ করে জল পড়ছিল মেঝেতে।

ঠিক সেই মুহূর্তে বিপরীত দিক থেকে এক তরুণ ঢুকেছিল একখানা দুর্লভ জীবনানন্দ দাশের কবিতার বই খুঁজতে। দু'জনের হাত একসাথেই পৌঁছাল সেই লাল মলাটের বইটির ওপর।

চোখে চোখ পড়তেই বিদ্যুৎ চমকের আলোয় দুজনই স্তব্ধ হয়ে গেল। বৃষ্টির শব্দের মাঝে ভেসে এল পাশের চায়ের দোকানের মাটির ভাঁড়ের সুবাস।
"আপনি নিন বইটি," ছেলেটি মৃদু হেসে বলল।
"না, আপনি তো আগেই খুঁজছিলেন," তনয়া লাজুক কণ্ঠে উত্তর দিল।

সেদিন বই কেনা হয়েছিল কি না মনে নেই, কিন্তু কলেজ স্ট্রিটের সেই বৃষ্টিভেজা বিকেলে এক কাপ গরম আদা-চায়ের সাথে শুরু হয়েছিল এক নতুন উপন্যাসের প্রথম অধ্যায়।`,
    contentEn: `The quaint secondhand bookshop on College Street was known as 'Granthalok'. Dusty shelves groaned under the weight of yellowing poetry editions, forgotten cartography, and the intoxicating scent of aging paper.

On a dramatic Shravan afternoon, the skies broke without warning. Lacking an umbrella, Tanaya dashed beneath the carved mahogany awning of the bookshop, rain dripping gently from her hair.

At the exact same instant, a young architect stepped inside in quest of an out-of-print edition of poet Jibanananda Das. Their fingers touched simultaneously upon the crimson fabric spine of the very same volume.

A flash of lightning illuminated their startled eyes. Amidst the drumming rain and the rich aroma of earthen clay cups from the tea stall next door, he smiled softly: "Please, you take it."
"No, you were searching for it first," Tanaya replied with a soft blush.

Neither could recall if the book was purchased that stormy evening, but over two steaming cups of spiced ginger tea, the opening stanza of an unforgettable love story was penned.`
  }
];

const DEFAULT_WRITERS = [
  {
    id: "writer-1",
    name: "অনিরুদ্ধ মজুমদার",
    penName: "অনিরুদ্ধ",
    email: "aniruddha@golperkotha.com",
    password: "writer123password", // for demo authentication
    bio: "রহস্য, থ্রিলার এবং বৈজ্ঞানিক কল্পকাহিনীর লেখক। কলকাতার পুরোনো অলিগলি এবং ব্রহ্মপুত্রের চরে ঘুরে গল্প সংগ্রহ করাই আমার নেশা।",
    avatar: "assets/images/logo.jpg",
    genreFocus: "রহস্য ও কল্পবিজ্ঞান",
    joinedDate: "২০২৫-০১-১০",
    followersCount: 1420
  },
  {
    id: "writer-2",
    name: "অপর্ণা দেবী",
    penName: "রূপকথার দিদিমণি",
    email: "aparna@golperkotha.com",
    password: "writer123password",
    bio: "শিশুকিশোর সাহিত্য ও বাংলার লোকগাথা গবেষক। ঠাকুরমার ঝুলির মায়াবী রূপকথা নতুন প্রজন্মের কাছে পৌঁছে দেওয়াই আমার ব্রত।",
    avatar: "assets/images/folk.jpg",
    genreFocus: "রূপকথা ও ছোটদের গল্প",
    joinedDate: "২০২৫-০৩-২২",
    followersCount: 2380
  },
  {
    id: "writer-3",
    name: "শুভেন্দু চট্টোপাধ্যায়",
    penName: "কালপুরুষ",
    email: "shubhendu@golperkotha.com",
    password: "writer123password",
    bio: "অলৌকিক ও ভৌতিক সাহিত্যের একনিষ্ঠ সাধক। নিশুতি রাতের শ্মশান ও পোড়ো জমিদারবাড়ির অলিখিত ইতিহাস খুঁড়ে বের করি।",
    avatar: "assets/images/horror.jpg",
    genreFocus: "ভৌতিক ও রহস্য",
    joinedDate: "২০২৫-০২-১৪",
    followersCount: 3100
  },
  {
    id: "writer-4",
    name: "রবীন্দ্রনাথ বন্দ্যোপাধ্যায়",
    penName: "চিরন্তন",
    email: "rabindranath@golperkotha.com",
    password: "writer123password",
    bio: "চিরায়ত বাংলা সাহিত্যের অনুরাগী। গ্রামবাংলার মেঠোপথ ও শিকড়ের গল্প লিখি হৃদয়ের টানে।",
    avatar: "assets/images/classic.jpg",
    genreFocus: "চিরায়ত সাহিত্য",
    joinedDate: "২০২৪-১১-১৮",
    followersCount: 1890
  }
];

const GENRES = [
  { id: "all", nameBn: "সব গল্প", nameEn: "All Stories", icon: "📚" },
  { id: "mystery", nameBn: "রহস্য ও রোমাঞ্চ", nameEn: "Mystery & Thriller", icon: "🔍" },
  { id: "folk", nameBn: "রূপকথা ও লোকগাথা", nameEn: "Folk & Fairytales", icon: "✨" },
  { id: "horror", nameBn: "ভৌতিক ও অলৌকিক", nameEn: "Horror & Spooky", icon: "🕯️" },
  { id: "classic", nameBn: "চিরায়ত সাহিত্য", nameEn: "Classic Literature", icon: "📜" },
  { id: "scifi", nameBn: "কল্পবিজ্ঞান", nameEn: "Sci-Fi & Space", icon: "🚀" },
  { id: "romance", nameBn: "রোমান্টিক", nameEn: "Romance & Life", icon: "🌸" }
];
