<template>
  <CardLikeContainer>
    <h1 class="text-3xl pb-3">Über diese App</h1>
  </CardLikeContainer>
  <div class="flex flex-col space-y-3">
    <div class="card card-compact w-full bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">{{ config.public.title }} App Version {{ version }}</h2>
        <figure class="flex justify-center">
          <img v-if="theme.isDark()" src="~assets/ejkkbu_darkmode.png" class="w-1/3" />
          <img v-else src="~assets/ejkkbu.png" class="w-1/3" />
        </figure>
        <span class="text-center"
          >Copyright © 2024 Evangelische Jugend im Kirchenkreis Burgdorf.</span
        >
      </div>
    </div>
    <div class="card card-compact w-full bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Mitwirkende</h2>
        <div class="flex flex-col space-y-1">
          <div class="flex justify-center mb-3">
            <div class="avatar placeholder">
              <div class="bg-success text-base-100 rounded-full w-16">
                <span class="text-2xl">JK</span>
              </div>
            </div>
          </div>
          <span class="text-center font-bold text-lg">Jens Krieger-Juhnke</span>
          <span class="text-center text-sm font-light">Hauptentwickler</span>
          <div class="flex justify-center flex-row">
            <div class="join">
              <a href="mailto:jens@evju-uetze.de">
                <button class="btn btn-xl btn-ghost join-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                </button>
              </a>
              <a href="https://instagram.com/__sensens_">
                <button class="btn btn-xl btn-ghost join-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </button>
              </a>
            </div>
          </div>
          <AboutPageContributorEntry
            v-for="contributor in contributors"
            :contributor="contributor"
          />
        </div>
      </div>
    </div>
    <div class="card card-compact w-full bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Unterstützt durch</h2>
        <figure class="flex justify-center">
          <img src="~assets/hds.png" class="w-1/3" />
        </figure>
      </div>
    </div>
    <div class="card card-compact w-full bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Changelog</h2>
        <div v-for="entry in changelog">
          <span
            ><b>{{ entry.date }}</b></span
          >
          <ul class="list-disc list-inside">
            <li v-for="change in entry.changes">{{ change }}</li>
          </ul>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>

<script setup>
const version = useVersion();

const contributors = useContributors();
const changelog = useChangelog();

const theme = useTheme();
const config = useRuntimeConfig();
</script>
