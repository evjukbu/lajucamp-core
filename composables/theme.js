export const useTheme = () => {
    const DEFAULT_THEME = "bulabulight"

    const cookie = useCookie("theme", { expires: new Date('9999-12-31') })
    const themes = [
        { name: 'Festival - Standard', internal: "bulabulight", dark: false },
        { name: 'Festival Dunkel', internal: "bulabu", dark: true },
        { name: 'Pastel', internal: "pastel", dark: false },
        { name: 'Wald', internal: "forest", dark: true },
    ]

    const ThemeManager = {
        getCurrentTheme: () => {
            let theme = cookie.value || DEFAULT_THEME
            // Check if theme is valid
            if (!themes.find(t => t.internal === theme)) {
                theme = DEFAULT_THEME
            }
            return theme
        },
        setTheme: (theme) => cookie.value = theme,
        themeOptions: themes,
        setTheme: (theme) => {
            if (themes.find(t => t.internal === theme)) {
                cookie.value = theme
            } else {
                raise("Invalid theme name")
            }
        },
        isDark: () => themes.find(t => t.internal === ThemeManager.getCurrentTheme()).dark
    }
    return ThemeManager
}