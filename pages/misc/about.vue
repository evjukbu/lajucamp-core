<template>
  <CardLikeContainer>
    <h1 class="text-3xl pb-3">Über diese App</h1>
  </CardLikeContainer>
  <div class="flex flex-col space-y-3">
    <div class="card card-compact w-full bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title">Jugendfestival App Version {{ version }}</h2>
        <figure class="flex justify-center">
          <img v-if="theme.isDark()" src="~assets/ejkkbu_darkmode.png" class="w-1/3" />
          <img v-else src="~assets/ejkkbu.png" class="w-1/3" />
        </figure>
        <span class="text-center">Copyright © 2023 Evangelische Jugend im Kirchenkreis Burgdorf.</span>
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
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>

                </button>

              </a>
              <a href="https://instagram.com/__sensens_">
                <button class="btn btn-xl btn-ghost join-item">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>

                </button>


              </a>
            </div>
          </div>
          <AboutPageContributorEntry v-for="contributor in contributors" :contributor="contributor" />
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
          <span><b>{{ entry.date }}</b></span>
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
const version = "1.2"

const contributors = [
  {
    initials: "AB",
    name: "Anne Basedau",
    tag: "EvJu Bula",
    job: "Projektbegleitung",
    insta: "https://instagram.com/annebasedau",
    color: "bg-red-400"
  },
  {
    initials: "AB",
    name: "Anna Brandt",
    tag: "EvJu Celle",
    job: "Testerin und Begleitung für IOS",
    insta: "https://instagram.com/anna.c.brandt",
    color: "bg-secondary"
  },
  {
    initials: "CL",
    name: "Christian Lerch",
    tag: "EvJu BuLa",
    job: "IOS Entwicklung",
    web: "https://softwareschmiede-lerch.de/",
    color: "bg-cyan-400"
  },
  {
    initials: "LM",
    name: "Lukas Mayrhofer-Reinhartshuber",
    tag: null,
    job: "Designberatung",
    insta: "https://instagram.com/lukasm06_",
    color: "bg-purple-400"
  },
  {
    initials: "AR",
    name: "Anni Reimann",
    tag: "EvJu Burgdorf",
    job: "Projektbegleitung",
    insta: "https://instagram.com/annimation85",
    color: "bg-orange-400"
  },
]
const changelog = [
  {
    date: "06. September 2023 - Version 1.2",
    changes: [
      "Change: Veranstaltungen werden nun nach Tagen getrennt aufgelistet.",
      "Change: Wenn keine Posts vorhanden sind, wird nun ein Hinweis angezeigt.",
      "Change: Berechtigungsschlüssel können nun weitreichendere Auswirkungen haben.",
      "Fix: Die 'Neuster Post'-Karte lädt nun nicht mehr unendlich, wenn keine Posts vorhanden sind.",
      "Fix: Die App aktualisiert nun den Cache, wenn die Daten zu alt sind.",
      "Removed: Die Farbdesigns 'Fantasy', 'Nacht' und 'Sonnig' wurden entfernt.",
    ]
  },
  {
    date: "04. September 2023 - Version 1.1.2",
    changes: [
      "Added: Die Heinrich Dammann Stiftung wird nun als Unterstützer angezeigt.",
      "Change: Unter IOS wird in der Webversion jetzt auf den App Store verlinkt.",
      "Change: Update der Mitwirkenden.",
      "Fix: Auf der Homepage werden keine Veranstaltungen mehr angezeigt, die ausgeblendet wurden."
    ]
  },
  {
    date: "31. August 2023 - Version 1.1.1",
    changes: [
      "Added: Das Farbdesign \"Festival\" wurde hinzugefügt.",
      "Fix: Der Cache wird jetzt aktualisiert, wenn die Daten zu alt sind.",
      "Change: Das Farbdesign \"Festival Dunkel\" befindet sich nicht mehr in der Preview.",
      "Change: Das Farbdesign \"Festival\" ist nun das Standarddesign.",
      "Change: Berechtigungsschlüssel können nun den Cache deaktivieren."
    ]
  },
  {
    date: "30. August 2023 - Version 1.1.0",
    changes: [
      "Added: Das Farbdesign \"Festival Dunkel\" wurde als Preview hinzugefügt.",
      "Added: Die App speichert nun einige Daten im Cache, um die Ladezeiten zu verbessern und offline zuverlässiger zu funktionieren.",
      "Change: Der Service Worker benutzt nun bei mehr Seiten Pre-Caching, um die Ladezeiten zu verbessern.",
      "Change: Designs wurden refactored.",
      "Change: Das Logo unter 'Über diese App' wird nun auch in Designs mit dunklem Hintergrund richtig angezeigt.",
    ]
  },
  {
    date: "27. August 2023",
    changes: [
      "Fix: Kategorien zeigen wieder Veranstaltungen an",
    ]
  },
  {
    date: "22. August 2023",
    changes: [
      "Added: Auf der Startseite können durch die Admins Veranstaltungen ausgeblendet werden. Unter 'Events' werden weiterhin alle Veranstaltungen angezeigt.",
      "Change: Refactoring unter 'Über diese App' und in der Veranstaltungsliste"
    ]
  },
  {
    date: "21. August 2023",
    changes: [
      "Added: In der Webversion wird auf der Startseite nun eine 'App installieren' Schaltflächen angezeigt.",
      "Added: Eine Anleitung zum Installieren der App auf IOS Geräten wurde hinzugefügt.",
      "Added: Mehrere Mitwirkende können unter 'Über diese App' angezeigt werden.",
      "Change: 'Über diese App' wurde optisch angepasst."
    ]
  },
  {
    date: "16. August 2023",
    changes: [
      "Change: Das Festival Logo wird nun unter 'Über diese App' verwendet.",
      "Change: Die aktuelle Version des Festival Logos wird verwendet."
    ]
  },
  {
    date: "13. August 2023",
    changes: [
      "Change: Allgemeine Layout Verbesserungen bei Spacing"
    ]
  },
  {
    date: "12. August 2023",
    changes: [
      "Added: Logo in der About Page",
      "Change: Passende Werte im Manifest der PWA",
      "Change: Verbessertes Spacing im 'Über diese App' Bildschirm"
    ]
  },
  {
    date: "11. August 2023",
    changes: [
      "Added: Neue Seite 'Über diese App'",
      "Fix: Das ausgewählte Design wird für die ganze Seite verwendet",
      "Fix: Seiten mit viel Text werden nicht mehr abgeschnitten"
    ]
  },
  {
    date: "08. August 2023",
    changes: [
      "Added: Mehrere Farbthemen",
      "Added: Neue Seite 'Designs'",
      "Changed: Seiten haben jetzt Titel"
    ]
  },
  {
    date: "07. August 2023",
    changes: [
      "Added: Die App erfüllt nun die Anforderungen einer TWA",
      "Changed: Layoutverbesserungen in der Veranstaltungsliste",
      "Changed: Allgemeines Refactoring"
    ]
  }
]

const theme = useTheme()
</script>
