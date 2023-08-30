export const useTheme = () => {
    const DEFAULT_THEME = "fantasy"

    const cookie = useCookie("theme", { expires: new Date('9999-12-31') })
    const themes = [
        { name: 'Festival Dunkel - Preview', internal: "bulabu", dark: true },
        { name: 'Fantasy - Standard', internal: "fantasy", dark: false },
        { name: 'Sonnig', internal: "light", dark: false },
        { name: 'Pastel', internal: "pastel", dark: false },
        { name: 'Dunkel - Nacht', internal: "dark", dark: true },
        { name: 'Dunkel - Wald', internal: "forest", dark: true },
    ]

    const ThemeManager = {
        getCurrentTheme: () => cookie.value || DEFAULT_THEME,
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