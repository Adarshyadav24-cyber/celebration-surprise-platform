/**
 * ✦ CELEBRATION SURPRISE PLATFORM — MASTER OCCASION CATALOG & CONTENT LIBRARY ✦
 * Exhaustive catalog containing all 80+ occasions across 7 major categories,
 * visual particle presets, 3D activity mappings, and multilingual message libraries.
 */

const OCCASION_CATEGORIES = [
  {
    id: "birthdays",
    name: "🎂 Birthday Celebrations",
    icon: "🎂",
    desc: "Celebrate milestones for family, friends, and special ones",
    occasions: [
      { id: "bday-general", name: "Birthday Celebration", activity: "cake-cutting", particle: "confetti" },
      { id: "bday-bestfriend", name: "Best Friend Birthday", activity: "cake-cutting", particle: "confetti" },
      { id: "bday-family", name: "Family Birthday", activity: "cake-cutting", particle: "sparkles" },
      { id: "bday-brother", name: "Brother's Birthday", activity: "cake-cutting", particle: "confetti" },
      { id: "bday-sister", name: "Sister's Birthday", activity: "cake-cutting", particle: "sparkles" },
      { id: "bday-mother", name: "Mother's Birthday", activity: "cake-cutting", particle: "sparkles" },
      { id: "bday-father", name: "Father's Birthday", activity: "cake-cutting", particle: "confetti" },
      { id: "bday-child", name: "Child's Birthday", activity: "cake-cutting", particle: "balloons" },
      { id: "bday-partner", name: "Partner's Birthday", activity: "cake-cutting", particle: "hearts" },
      { id: "bday-special", name: "Special Person Birthday", activity: "cake-cutting", particle: "hearts" },
      { id: "bday-belated", name: "Belated Birthday Surprise", activity: "cake-cutting", particle: "confetti" },
      { id: "bday-countdown", name: "Birthday Countdown", activity: "cake-cutting", particle: "sparkles" }
    ]
  },
  {
    id: "anniversaries",
    name: "💍 Wedding & Anniversaries",
    icon: "💍",
    desc: "Mark years of togetherness, milestones, and romantic journeys",
    occasions: [
      { id: "anni-marriage", name: "Marriage Anniversary", activity: "cake-cutting", particle: "sparkles" },
      { id: "anni-first-wedding", name: "First Wedding Anniversary", activity: "cake-cutting", particle: "hearts" },
      { id: "anni-silver", name: "Silver Jubilee Anniversary (25 Years)", activity: "cake-cutting", particle: "sparkles" },
      { id: "anni-golden", name: "Golden Jubilee Anniversary (50 Years)", activity: "cake-cutting", particle: "sparkles" },
      { id: "anni-relationship", name: "Relationship Anniversary", activity: "envelope-letter", particle: "hearts" },
      { id: "anni-dating", name: "Dating Anniversary", activity: "envelope-letter", particle: "hearts" },
      { id: "anni-first-meeting", name: "First Meeting Anniversary", activity: "envelope-letter", particle: "sparkles" },
      { id: "anni-first-date", name: "First Date Anniversary", activity: "rose-bloom", particle: "hearts" },
      { id: "anni-proposal", name: "Proposal Anniversary", activity: "ring-box", particle: "sparkles" },
      { id: "anni-engagement", name: "Engagement Anniversary", activity: "ring-box", particle: "sparkles" },
      { id: "anni-long-distance", name: "Long-Distance Relationship Anniversary", activity: "envelope-letter", particle: "hearts" }
    ]
  },
  {
    id: "valentines",
    name: "🌹 Valentine's Week (All 8 Days)",
    icon: "🌹",
    desc: "Every special day from Rose Day to Valentine's Day",
    occasions: [
      { id: "val-rose", name: "Rose Day (Feb 7)", activity: "rose-bloom", particle: "petals" },
      { id: "val-propose", name: "Propose Day (Feb 8)", activity: "ring-box", particle: "sparkles" },
      { id: "val-chocolate", name: "Chocolate Day (Feb 9)", activity: "chocolate-box", particle: "sparkles" },
      { id: "val-teddy", name: "Teddy Day (Feb 10)", activity: "teddy-hug", particle: "sparkles" },
      { id: "val-promise", name: "Promise Day (Feb 11)", activity: "promise-cards", particle: "stars" },
      { id: "val-hug", name: "Hug Day (Feb 12)", activity: "teddy-hug", particle: "hearts" },
      { id: "val-kiss", name: "Kiss Day (Feb 13)", activity: "envelope-letter", particle: "hearts" },
      { id: "val-valentines", name: "Valentine's Day (Feb 14)", activity: "rose-bloom", particle: "hearts" }
    ]
  },
  {
    id: "love",
    name: "💖 Love & Romantic Occasions",
    icon: "💖",
    desc: "Love notes, crush appreciation, apologies, and special surprises",
    occasions: [
      { id: "love-anniversary", name: "Love Anniversary", activity: "envelope-letter", particle: "hearts" },
      { id: "love-crush", name: "Crush Appreciation", activity: "rose-bloom", particle: "sparkles" },
      { id: "love-just-because", name: "Just Because I Love You", activity: "envelope-letter", particle: "hearts" },
      { id: "love-first-memory", name: "First Love Memory", activity: "envelope-letter", particle: "hearts" },
      { id: "love-long-distance", name: "Long-Distance Love", activity: "envelope-letter", particle: "hearts" },
      { id: "love-missing", name: "Missing You", activity: "envelope-letter", particle: "stars" },
      { id: "love-sorry", name: "Sorry / Apology", activity: "envelope-letter", particle: "sparkles" },
      { id: "love-makeup", name: "Make-Up Surprise", activity: "rose-bloom", particle: "hearts" },
      { id: "love-thank-you", name: "Thank You, My Love", activity: "envelope-letter", particle: "hearts" },
      { id: "love-morning", name: "Good Morning, My Love", activity: "rose-bloom", particle: "sparkles" },
      { id: "love-night", name: "Good Night, My Love", activity: "envelope-letter", particle: "stars" },
      { id: "love-memories", name: "Our Cherished Memories", activity: "envelope-letter", particle: "sparkles" },
      { id: "love-letter", name: "Personal Love Letter", activity: "envelope-letter", particle: "hearts" },
      { id: "love-date-invite", name: "Surprise Date Invitation", activity: "ring-box", particle: "sparkles" }
    ]
  },
  {
    id: "friendship",
    name: "🎉 Friendship Days",
    icon: "🎉",
    desc: "Honoring best friends, crazy memories, and unbreakable bonds",
    occasions: [
      { id: "friend-day", name: "Friendship Day", activity: "scratch-card", particle: "confetti" },
      { id: "friend-bestie-appreciation", name: "Best Friend Appreciation Day", activity: "scratch-card", particle: "confetti" },
      { id: "friend-forever", name: "Friends Forever", activity: "scratch-card", particle: "confetti" },
      { id: "friend-anniversary", name: "Friendship Anniversary", activity: "scratch-card", particle: "sparkles" },
      { id: "friend-thank-you", name: "Thank You, Bestie", activity: "scratch-card", particle: "confetti" },
      { id: "friend-missing", name: "Missing My Friend", activity: "envelope-letter", particle: "stars" },
      { id: "friend-surprise", name: "Friendship Day Surprise", activity: "scratch-card", particle: "confetti" }
    ]
  },
  {
    id: "family",
    name: "👨‍👩‍👧 Family Appreciation Days",
    icon: "👨‍👩‍👧",
    desc: "Celebrating mothers, fathers, siblings, and family heroes",
    occasions: [
      { id: "fam-mothers-day", name: "Mother's Day", activity: "envelope-letter", particle: "sparkles" },
      { id: "fam-fathers-day", name: "Father's Day", activity: "envelope-letter", particle: "confetti" },
      { id: "fam-parents-anni", name: "Parents' Anniversary", activity: "cake-cutting", particle: "sparkles" },
      { id: "fam-parents-appreciation", name: "Parents' Appreciation", activity: "envelope-letter", particle: "sparkles" },
      { id: "fam-siblings-day", name: "Siblings Day", activity: "cake-cutting", particle: "confetti" },
      { id: "fam-brother-appreciation", name: "Brother Appreciation", activity: "cake-cutting", particle: "confetti" },
      { id: "fam-sister-appreciation", name: "Sister Appreciation", activity: "cake-cutting", particle: "sparkles" },
      { id: "fam-grandparents-day", name: "Grandparents' Day", activity: "envelope-letter", particle: "sparkles" },
      { id: "fam-thank-you", name: "Family Thank You Surprise", activity: "envelope-letter", particle: "sparkles" }
    ]
  },
  {
    id: "celebrations",
    name: "✨ Festivals & Life Milestones",
    icon: "✨",
    desc: "Graduations, new jobs, festivals (Diwali, Christmas, Eid, etc.)",
    occasions: [
      { id: "cel-graduation", name: "Graduation Celebration", activity: "scratch-card", particle: "confetti" },
      { id: "cel-exam-success", name: "Exam Success", activity: "scratch-card", particle: "confetti" },
      { id: "cel-new-job", name: "New Job Celebration", activity: "scratch-card", particle: "confetti" },
      { id: "cel-promotion", name: "Career Promotion", activity: "scratch-card", particle: "confetti" },
      { id: "cel-achievement", name: "Achievement Celebration", activity: "scratch-card", particle: "confetti" },
      { id: "cel-welcome-home", name: "Welcome Home Surprise", activity: "scratch-card", particle: "sparkles" },
      { id: "cel-farewell", name: "Farewell Tribute", activity: "envelope-letter", particle: "stars" },
      { id: "cel-retirement", name: "Retirement Milestone", activity: "cake-cutting", particle: "sparkles" },
      { id: "cel-new-year", name: "New Year Celebration", activity: "scratch-card", particle: "fireworks" },
      { id: "cel-christmas", name: "Christmas Magic", activity: "scratch-card", particle: "snow" },
      { id: "cel-diwali", name: "Diwali (Festival of Lights)", activity: "scratch-card", particle: "diyas" },
      { id: "cel-holi", name: "Holi (Festival of Colors)", activity: "scratch-card", particle: "confetti" },
      { id: "cel-eid", name: "Eid Mubarak", activity: "envelope-letter", particle: "stars" },
      { id: "cel-raksha-bandhan", name: "Raksha Bandhan", activity: "scratch-card", particle: "sparkles" },
      { id: "cel-bhai-dooj", name: "Bhai Dooj", activity: "scratch-card", particle: "sparkles" },
      { id: "cel-teacher", name: "Teacher Appreciation", activity: "envelope-letter", particle: "sparkles" },
      { id: "cel-thank-you", name: "Heartfelt Thank You", activity: "envelope-letter", particle: "sparkles" },
      { id: "cel-congratulations", name: "Congratulations Surprise", activity: "scratch-card", particle: "confetti" },
      { id: "cel-get-well", name: "Get Well Soon", activity: "teddy-hug", particle: "sparkles" },
      { id: "cel-just-for-you", name: "Just For You Surprise", activity: "scratch-card", particle: "sparkles" }
    ]
  }
];

const MUSIC_LIBRARY = [
  { id: "track-bday-chime", title: "Happy Birthday Music Box", artist: "Royalty-Free Celestial Chimes", category: "birthdays", mood: "Celebratory & Joyful", url: "/happy-birthday.wav", duration: "0:27" },
  { id: "track-romantic", title: "Eternal Love Serenade", artist: "Harmonic Acoustic Ensemble", category: "valentines", mood: "Romantic & Soulful", url: "/audio/romantic-melody.wav", duration: "0:32" },
  { id: "track-celebration", title: "Victory & Triumph Anthem", artist: "Upbeat Festival Bells", category: "celebrations", mood: "Energetic & Victorious", url: "/audio/celebration-party.wav", duration: "0:28" },
  { id: "track-friendship", title: "Forever Besties Melody", artist: "Playful Crystal Chimes", category: "friendship", mood: "Playful & Heartfelt", url: "/audio/friendship-chimes.wav", duration: "0:30" },
  { id: "track-gentle", title: "Gentle Heartstrings Lullaby", artist: "Acoustic Piano & Harp", category: "family", mood: "Warm, Grateful & Emotional", url: "/audio/gentle-piano.wav", duration: "0:34" },
  { id: "track-festive", title: "Golden Festive Illumination", artist: "Sacred Festive Bells", category: "celebrations", mood: "Festive, Radiant & Blessed", url: "/audio/festive-bells.wav", duration: "0:26" }
];

/**
 * Intelligent helper that resolves complete configuration, themes, activities,
 * and multilingual messages for ANY occasion in the catalog.
 */
function getOccasionConfig(occasionId, categoryId, language = "en") {
  // Find category & occasion in catalog
  let cat = OCCASION_CATEGORIES.find(c => c.id === categoryId);
  if (!cat) {
    cat = OCCASION_CATEGORIES.find(c => c.occasions.some(o => o.id === occasionId)) || OCCASION_CATEGORIES[0];
  }
  let occ = cat.occasions.find(o => o.id === occasionId) || cat.occasions[0];

  // Derive theme based on category
  const themeMap = {
    birthdays: { primary: "#ff4b98", secondary: "#a855f7", accent: "#ffd166", bgGrad: "radial-gradient(ellipse at 50% 25%, #4a154b 0%, #170b28 75%)", glow: "rgba(255, 75, 152, 0.5)" },
    anniversaries: { primary: "#d97706", secondary: "#e11d48", accent: "#fde68a", bgGrad: "radial-gradient(ellipse at 50% 25%, #3e1f07 0%, #130a03 75%)", glow: "rgba(217, 119, 6, 0.5)" },
    valentines: { primary: "#e11d48", secondary: "#be185d", accent: "#fecdd3", bgGrad: "radial-gradient(ellipse at 50% 25%, #4c0519 0%, #180209 75%)", glow: "rgba(225, 29, 72, 0.5)" },
    love: { primary: "#f43f5e", secondary: "#9333ea", accent: "#fef08a", bgGrad: "radial-gradient(ellipse at 50% 25%, #450a22 0%, #150212 75%)", glow: "rgba(244, 63, 94, 0.5)" },
    friendship: { primary: "#06b6d4", secondary: "#f59e0b", accent: "#fef08a", bgGrad: "radial-gradient(ellipse at 50% 25%, #083344 0%, #03121a 75%)", glow: "rgba(6, 182, 212, 0.5)" },
    family: { primary: "#ec4899", secondary: "#6366f1", accent: "#fef08a", bgGrad: "radial-gradient(ellipse at 50% 25%, #4a0d35 0%, #140520 75%)", glow: "rgba(236, 72, 153, 0.5)" },
    celebrations: { primary: "#0284c7", secondary: "#d97706", accent: "#fde047", bgGrad: "radial-gradient(ellipse at 50% 25%, #0f2b48 0%, #04101e 75%)", glow: "rgba(2, 132, 199, 0.5)" }
  };

  const theme = themeMap[cat.id] || themeMap.birthdays;

  // Occasion-specific badge
  let badge = `✦ ${occ.name} ✦`;
  if (occ.id.includes("special") || occ.id === "val-valentines") {
    badge = "For Beautiful Soul 💖";
  }

  // Multilingual message templates
  const messages = {
    welcome: `Sending you the warmest celebration on this ${occ.name}! Today is dedicated to honoring you and making ordinary moments feel truly magical.`,
    wish: `May this special occasion bring you immense joy, radiant health, deep peace, and dreams that unfold into beautiful reality. You deserve the absolute best!`,
    card: `A heartfelt tribute on ${occ.name}. Keep shining, smiling, and inspiring everyone around you!`,
    activity: `Take a moment to enjoy your interactive celebration — a special memory made just for you!`,
    surprise: `Behind every sparkling star is a prayer: may your footsteps always be surrounded by love, warmth, and lifelong happiness.`,
    final: `May your journey ahead be blessed with countless reasons to smile. Once again, Happy ${occ.name}! ✨`
  };

  if (language === "hinglish") {
    messages.welcome = `${occ.name} ki dher saari shubhkaamnayein! Aaj ka din sirf aapke naam. May this surprise bring a genuine, radiant smile to your face!`;
    messages.wish = `Aapki life hamesha khushiyon, achhi sehat, exciting adventures aur success se bhari rahe. Jo bhi aapne socha hai, woh sab poora ho!`;
    messages.card = `Dil se nikli shubhkaamnayein on ${occ.name}! Always keep smiling like a star.`;
    messages.activity = `Apni favourite smile ke saath is celebration moment ko dil se enjoy kijiye!`;
    messages.surprise = `Aapki presence har din ko khoobsurat bana deti hai. Thank you for being so wonderful.`;
    messages.final = `Wishing you lots of love, success aur endless khushiyan. Happy ${occ.name} to you! 🎉`;
  } else if (language === "hi") {
    messages.welcome = `${occ.name} के इस पावन अवसर पर आपको हार्दिक शुभकामनाएं! यह विशेष दिन आपके जीवन में नई उमंगें और खुशियां लेकर आए।`;
    messages.wish = `ईश्वर से प्रार्थना है कि आपका जीवन उत्तम स्वास्थ्य, सुख-समृद्धि और अपार सफलता से परिपूर्ण रहे।`;
    messages.card = `सदा मुस्कुराते रहें और जीवन के हर पल का आनंद लें।`;
    messages.activity = `अपने दिल से एक प्यारी सी विश मांगें और इस उत्सव का आनंद लें!`;
    messages.surprise = `आपके जीवन में हमेशा शांति, प्रेम और खुशहाली का वास रहे।`;
    messages.final = `एक बार फिर आपको ${occ.name} की अनगिनत शुभकामनाएं! सदा प्रसन्न रहें।`;
  }

  // Smart music selection based on category and occasion type
  let music;
  if (occ.id.includes("bday")) {
    music = "track-bday-chime";
  } else if (cat.id === "valentines" || cat.id === "love" || cat.id === "anniversaries") {
    music = "track-romantic";
  } else if (cat.id === "family") {
    music = "track-gentle";
  } else if (cat.id === "friendship") {
    music = "track-friendship";
  } else if (cat.id === "celebrations" && (
    occ.id === "cel-diwali" || occ.id === "cel-new-year" ||
    occ.id === "cel-christmas" || occ.id === "cel-holi" ||
    occ.id === "cel-raksha-bandhan" || occ.id === "cel-eid"
  )) {
    music = "track-festive";
  } else {
    music = "track-celebration";
  }

  return {
    id: occ.id,
    name: occ.name,
    category: cat.id,
    categoryName: cat.name,
    badge,
    theme,
    particle: occ.particle || "sparkles",
    activity: occ.activity || "scratch-card",
    music,
    messages
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { OCCASION_CATEGORIES, MUSIC_LIBRARY, getOccasionConfig };
}
