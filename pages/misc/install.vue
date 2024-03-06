<template>
  <CardLikeContainer>
    <h1 class="text-3xl pb-3">App installieren</h1>
    <div class="alert alert-info">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span>Du verwendest ein iOS Gerät. Leider ist die App derzeit nicht im App-Store verfügbar. Folge diesen
        Schritten, um sie deinem Startbildschirm hinzuzufügen.</span>
    </div>
    <div class="flex flex-col space-y-3">

      <span class="text-xl">Schritt 1</span>
      <p>Öffne diese Webseite im Safari Webbrowser. Klicke auf den "Teilen"-Button.</p>
      <img class="rounded-lg" src="~assets/ios/ios_pwa_browser.webp" />

      <span class="text-xl">Schritt 2</span>
      <p>In dem Menü, dass sich öffnet, wähle "Zum Home-Bildschirm".</p>
      <img class="rounded-lg" src="~assets/ios/ios_pwa_share.webp" />

      <span class="text-xl">Schritt 3</span>
      <p>Klicke auf "Hinzufügen".</p>
      <img class="rounded-lg" src="~assets/ios/ios_pwa_add.webp" />

      <span class="text-xl">Fertig!</span>
      <p>Herzlichen Glückwunsch! Die App wurde deinem Startbildschrim hinzugefügt und du kannst sie wie jede
        andere App auch verwenden.</p>
      <img class="rounded-lg" src="~assets/ios/ios_pwa_installed.webp" />


    </div>
  </CardLikeContainer>
</template>
