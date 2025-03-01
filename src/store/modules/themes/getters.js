import { Config } from "@/config";

export default {
  getThemes: (_) => {
    return Config.THEMES;
  },
  getSelectedThemeIds: (state) => {
    return state.selectedThemeIds;
  },
  getThemeColor:
    (_, getters) =>
    (themeId, opacity = 1) => {
      const color = getters.getThemeData(themeId)?.color;
      return color
        ? `rgba(${color}, ${opacity})`
        : `rgba(100, 100, 100, ${opacity})`;
    },
  getThemeTitle: (_, getters) => (themeId) => {
    return getters.getThemeData(themeId)?.title ?? themeId;
  },
  getThemeData: (_, getters) => (themeId) => {
    if (Object.keys(getters.getThemes).includes(themeId)) {
      return getters.getThemes[themeId];
    }
    return null;
  },
  getThemeChipColor: (_, getters) => (themeId) => {
    return getters.isThemeSelected(themeId)
      ? getters.getThemeColor(themeId)
      : getters.getThemeColor(themeId, 0.3);
  },
  getThemeReasoningKey: (_, getters) => (themeId) => {
    const themeData = getters.getThemeData(themeId);
    if (!themeData) {
      return null;
    }
    return themeData["reasoningKey"];
  },
  isThemeSelected: (_, getters) => (themeId) => {
    return getters.getSelectedThemeIds.includes(themeId);
  },
  noThemesSelected: (_, getters) => () => {
    return getters.getSelectedThemeIds.length === 0;
  },
  getThemeIdByLitCode: (_, getters) => (themeAbbreviation) => {
    for (const [themeId, theme] of Object.entries(getters.getThemes)) {
      if (theme.themes.includes(themeAbbreviation)) {
        return themeId;
      }
    }
    return themeAbbreviation;
  },
};
