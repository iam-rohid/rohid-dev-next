export const trackButtonClick = (label: string) => {
  gtag("event", "click", {
    event_category: "Button",
    event_label: label,
  });
};

export const trackLinkClick = (label: string) => {
  gtag("event", "click", {
    event_category: "Link",
    event_label: label,
  });
};

export const trackThemeChange = (theme: string) => {
  gtag("event", "theme_change", {
    event_category: "Theme",
    event_label: theme,
  });
};
