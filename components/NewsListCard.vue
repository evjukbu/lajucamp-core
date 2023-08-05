<template>
    <router-link :to="'/posts/' + post.id">
        <div class="card bg-base-100 shadow-lg">
            <figure><img :src="pb.files.getUrl(props.post, props.post.image)" alt="Shoes" /></figure>
            <div class="card-body">
                <span>{{ getRelativeTime(new Date(post.created)) }}</span>
                <h2 class="card-title">{{ props.post.title }}</h2>
                <p>{{ props.post.description }}</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Weiterlesen</button>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script setup>
const props = defineProps(['post'])
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
</script>