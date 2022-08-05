export const analyzeText = (text) => {
  if (
    text.toLowerCase().includes("create note") ||
    text.toLowerCase().includes("add note") ||
    text.toLowerCase().includes("make note") ||
    text.toLowerCase().includes("take note")
  ) {
    return {
      type: "create-note",
      text: text
        .toLowerCase()
        .substring(text.indexOf("note") + "note".length + 1, text.length),
    };
  }
  if (
    text.toLowerCase().includes("search note") ||
    text.toLowerCase().includes("find note")
  ) {
    return {
      type: "find-note",
      text: text
        .toLowerCase()
        .substring(text.indexOf("note") + "note".length + 1, text.length),
    };
  }
  if (
    text.toLowerCase().includes("clear search") ||
    text.toLowerCase().includes("reset search")
  ) {
    return {
      type: "reset-note",
    };
  }
  // Find if certain words are in the text
  const music = ["music", "song", "audio", "track", "record", "sound"];
  for (let i = 0; i < music.length; i++) {
    if (text.toLowerCase().includes(music[i])) {
      return {
        type: "music",
        text: text
          .toLowerCase()
          .substring(text.indexOf(music[i]) + music[i].length + 1, text.length),
      };
    }
  }
  // Find if certain words are in the text
  const web = ["search for", "web search", "web"];

  for (let i = 0; i < web.length; i++) {
    if (text.toLowerCase().includes(web[i])) {
      return {
        type: "web",
        text: text
          .toLowerCase()
          .substring(text.indexOf(web[i]) + web[i].length + 1, text.length),
      };
    }
  }
  // Find if certain words are in the text
  const news = [
    "news near me",
    "news around me",
    "news in my location",
    "news in my area",
    "local news",
    "news",
  ];

  for (let i = 0; i < news.length; i++) {
    if (text.toLowerCase().includes(news[i])) {
      return {
        type: "news",
        text: text
          .toLowerCase()
          .substring(text.indexOf(news[i]) + news[i].length + 1, text.length),
      };
    }
  }

  if (text.toLowerCase().includes("go to page")) {
    const pages = ["music", "news", "search", "note", "route"];
    for (let i = 0; i < pages.length; i++) {
      if (text.toLowerCase().includes(pages[i])) {
        return {
          type: "page",
          text: pages[i] === "note" ? "notes" : pages[i],
        };
      }
    }
  }

  return null;
};
