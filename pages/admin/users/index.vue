<template>
    <AdminLayoutHeader title="Benutzerverwaltung" subtitle="Hier können alle Benutzer verwaltet werden." :path="[
        { name: 'Home', path: '/admin', active: false },
        { name: 'Benutzer', path: '/admin/users', active: true },
    ]">
        <!-- Action Buttons here -->
    </AdminLayoutHeader>
    <div class="pl-3">
        <div class="overflow-x-auto">
            <div class="btn btn-primary" @click="test">Test</div>
        </div>
    </div>
</template>
<script setup>
definePageMeta({
    middleware: "auth",
    layout: "admin",
});

const settings = useSettingsManager();

console.log(await settings.getValue("oobe_complete"))

async function test() {
    await settings.setValue("oobe_complete", { value: true })
}
</script>