<template>
    <div class="btm-nav">
        <router-link :class="(routes.home.includes($route.name)) ? 'active' : 'not_active'" to="/">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>

            <span class="btm-nav-label">Home</span>
        </router-link>

        <router-link :class="(routes.events.includes($route.name)) ? 'active' : 'not_active'" to="/events">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
            </svg>

            <span class="btm-nav-label">Events</span>
        </router-link>
        <router-link v-show="checkMusicAccess()" :class="(routes.music.includes($route.name)) ? 'active' : 'not_active'"
            to="/music">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
            </svg>

            <span class="btm-nav-label">Lieder</span>
        </router-link>

        <router-link :class="(routes.news.includes($route.name)) ? 'active' : 'not_active'" to="/posts">
            <div class="indicator">
                <span v-if="1 === 2"
                    class="indicator-item indicator-bottom indicator-end badge badge-xs badge-secondary"></span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                </svg>
            </div>


            <span class="btm-nav-label">News</span>
        </router-link>
        <router-link :class="(routes.more.includes($route.name)) ? 'active' : 'not_active'" to="/misc">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>

            <span class="btm-nav-label">Mehr</span>
        </router-link>
    </div>
</template>

<script setup>
const routes = {
    home: [
        'index'
    ],
    events: [
        'events',
        'events-id',
        'category',
        'category-id',
        'search',
        'search-query'
    ],
    music: [
        'music',
        'music-id'
    ],
    news: [
        'posts',
        'posts-id'
    ],
    more: [
        'test',
        'misc',
        'misc-settings-keys',
        'misc-settings-keys-add',
        'misc-settings-appearance',
        'misc-page-id',
        'misc-about',
        'misc-install',
        "pictures"
    ]
}

const cookie = useCookie("keys", { expires: new Date('9999-12-31') })

function hackyCookieWorkaround() {
    const currentType = typeof cookie.value
    if (currentType === "string") {
        return JSON.parse(cookie.value)
    } else {
        return cookie.value
    }
}

function checkMusicAccess() {
    if (cookie.value === undefined) return false
    const data = hackyCookieWorkaround()
    return data.some(obj => obj.allowMusic === true)
}
</script>
