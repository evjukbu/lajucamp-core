<template>
    <RouterLink v-if="post !== null" :to="'/posts/' + post.id">
        <div class="card card-compact shadow-xl">
            <div class="card-body">
                <span class="text-sm font-light">Beitrag veröffentlicht {{ getRelativeTime(new Date(post.created))}}</span>
                <h2 class="card-title">
                    {{ post.title }}
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>

                    </span>
                </h2>
                <p>{{ post.description }}</p>
            </div>
        </div>
    </RouterLink>
</template>

<script setup>
const pb = usePocketBase()

const units = {
    year: 24 * 60 * 60 * 1000 * 365,
    month: 24 * 60 * 60 * 1000 * 365 / 12,
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000
}


const rtf = new Intl.RelativeTimeFormat('de', { numeric: 'auto' })

var getRelativeTime = (d2) => {
    var elapsed = d2 - new Date()

    // "Math.abs" accounts for both "past" & "future" scenarios
    for (var u in units)
        if (Math.abs(elapsed) > units[u] || u == 'second')
            return rtf.format(Math.round(elapsed / units[u]), u)
}

const post = ref(null)
const resultList = await pb.collection('posts').getList(1, 1, {
    sort: '-created',
});
if (resultList.totalItems > 0) {
    post.value = resultList.items[0]
}
</script>