<template>
    <div>
        <div class="record-list-timestamp">{{ getWeekDayFromIso(props.record.start) }}<br />{{ getStartTimeFromIso(props.record.start) }} -<br/>{{ getEndTimeFromIso(props.record.end) }}</div>
    </div>

</template>

<script setup>

const props = defineProps(["record"])

function getWeekDayFromIso(iso) {
    const date = new Date(iso);
    const days = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
    return days[date.getDay()];
}

function getStartTimeFromIso(iso) {
    const date = new Date(iso);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

function getEndTimeFromIso(iso) {
    const date = new Date(iso);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}
</script>

<style scoped>
.record-list-timestamp {
    font-size: 0.8rem;
    font-weight: 500;
    text-align: center;
    line-height: 0.8rem;
    text-align: left;
    margin-right: 0.2rem;
}
</style>
