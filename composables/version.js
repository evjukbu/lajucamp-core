export const useVersion = () => {
    return "1.6.0 (Preview)"
}

export const useChangelog = () => {
    return [
        {
            date: "Januar 2023 - Version 1.6.0",
            changes: [
                "Added: Berechtigungsschlüssel können nun per QR-Code gescannt werden.",
                "Added: Das Logo der Heinrich Damman Stiftung kann ausgeblendet werden, wenn die Veranstaltung nicht von der Stiftung unterstützt wird.",
                "Added: Im neuen Admin Interface können nun Veranstaltungen, Kategorien, Willkommensnachrichten, Administrator*innen und Orte verwaltet werden.",
                "Added: Der Name der App kann nun beim Kompilieren geändert werden.",
                "Added: Veranstaltungen können nun einem Team zugeordnet werden.",
                "Added: Neues \"Lajucamp\" Theme",
                "Added: Neues Icon",
                "Breaking: Neue Variablen werden beim Kompilieren benötigt.",
                "Fix: Kategorieansicht und Veranstaltungsansicht überlappen nicht mehr",
                "Change: Neue Versionen von Abhängigkeiten werden verwendet.",
                "Change: Codestruktur für Admin Interface und 'Über diese App' Dialog wurde besser strukturiert."
            ],
        },
        {
            date: "22. September 2023 - Version 1.5.0",
            changes: ["Added: Vergangene Veranstaltungen können nun ausgeblendet werden."],
        },
        {
            date: "14. September 2023 - Version 1.4.0",
            changes: [
                "Added: Mit einem Berechtigungsschlüssel kann nun eine Fotogalerie angezeigt werden.",
            ],
        },
        {
            date: "11. September 2023 - Version 1.3.1",
            changes: [
                "Change: Es wird nun eine Nachricht angezeigt, wenn keine zukünftigen Veranstaltungen vorhanden sind.",
            ],
        },
        {
            date: "08. September 2023 - Version 1.3.0",
            changes: ["Added: News haben jetzt einen Autor", "Change: Interne Änderungen"],
        },
        {
            date: "08. September 2023 - Version 1.2.2",
            changes: [
                "Change: Der Cache für Veranstaltungen wird nun nur noch alle 60 Minuten aktualisiert.",
                "Change: Der Cache für Seiten wird nun nur noch alle 120 Minuten aktualisiert.",
                "Change: Der Cache für Homepage Banner wird nun schon alle 60 Minuten aktualisiert.",
            ],
        },
        {
            date: "08. September 2023 - Version 1.2.1",
            changes: ["Fix: Es gibt jetzt einen Abstand zwischen mehreren Seiten im Liederbuch."],
        },
        {
            date: "06. September 2023 - Version 1.2",
            changes: [
                "Change: Veranstaltungen werden nun nach Tagen getrennt aufgelistet.",
                "Change: Wenn keine Posts vorhanden sind, wird nun ein Hinweis angezeigt.",
                "Change: Berechtigungsschlüssel können nun weitreichendere Auswirkungen haben.",
                "Fix: Die 'Neuster Post'-Karte lädt nun nicht mehr unendlich, wenn keine Posts vorhanden sind.",
                "Fix: Die App aktualisiert nun den Cache, wenn die Daten zu alt sind.",
                "Removed: Die Farbdesigns 'Fantasy', 'Nacht' und 'Sonnig' wurden entfernt.",
            ],
        },
        {
            date: "04. September 2023 - Version 1.1.2",
            changes: [
                "Added: Die Heinrich Dammann Stiftung wird nun als Unterstützer angezeigt.",
                "Change: Unter IOS wird in der Webversion jetzt auf den App Store verlinkt.",
                "Change: Update der Mitwirkenden.",
                "Fix: Auf der Homepage werden keine Veranstaltungen mehr angezeigt, die ausgeblendet wurden.",
            ],
        },
        {
            date: "31. August 2023 - Version 1.1.1",
            changes: [
                'Added: Das Farbdesign "Festival" wurde hinzugefügt.',
                "Fix: Der Cache wird jetzt aktualisiert, wenn die Daten zu alt sind.",
                'Change: Das Farbdesign "Festival Dunkel" befindet sich nicht mehr in der Preview.',
                'Change: Das Farbdesign "Festival" ist nun das Standarddesign.',
                "Change: Berechtigungsschlüssel können nun den Cache deaktivieren.",
            ],
        },
        {
            date: "30. August 2023 - Version 1.1.0",
            changes: [
                'Added: Das Farbdesign "Festival Dunkel" wurde als Preview hinzugefügt.',
                "Added: Die App speichert nun einige Daten im Cache, um die Ladezeiten zu verbessern und offline zuverlässiger zu funktionieren.",
                "Change: Der Service Worker benutzt nun bei mehr Seiten Pre-Caching, um die Ladezeiten zu verbessern.",
                "Change: Designs wurden refactored.",
                "Change: Das Logo unter 'Über diese App' wird nun auch in Designs mit dunklem Hintergrund richtig angezeigt.",
            ],
        },
        {
            date: "27. August 2023",
            changes: ["Fix: Kategorien zeigen wieder Veranstaltungen an"],
        },
        {
            date: "22. August 2023",
            changes: [
                "Added: Auf der Startseite können durch die Admins Veranstaltungen ausgeblendet werden. Unter 'Events' werden weiterhin alle Veranstaltungen angezeigt.",
                "Change: Refactoring unter 'Über diese App' und in der Veranstaltungsliste",
            ],
        },
        {
            date: "21. August 2023",
            changes: [
                "Added: In der Webversion wird auf der Startseite nun eine 'App installieren' Schaltflächen angezeigt.",
                "Added: Eine Anleitung zum Installieren der App auf IOS Geräten wurde hinzugefügt.",
                "Added: Mehrere Mitwirkende können unter 'Über diese App' angezeigt werden.",
                "Change: 'Über diese App' wurde optisch angepasst.",
            ],
        },
        {
            date: "16. August 2023",
            changes: [
                "Change: Das Festival Logo wird nun unter 'Über diese App' verwendet.",
                "Change: Die aktuelle Version des Festival Logos wird verwendet.",
            ],
        },
        {
            date: "13. August 2023",
            changes: ["Change: Allgemeine Layout Verbesserungen bei Spacing"],
        },
        {
            date: "12. August 2023",
            changes: [
                "Added: Logo in der About Page",
                "Change: Passende Werte im Manifest der PWA",
                "Change: Verbessertes Spacing im 'Über diese App' Bildschirm",
            ],
        },
        {
            date: "11. August 2023",
            changes: [
                "Added: Neue Seite 'Über diese App'",
                "Fix: Das ausgewählte Design wird für die ganze Seite verwendet",
                "Fix: Seiten mit viel Text werden nicht mehr abgeschnitten",
            ],
        },
        {
            date: "08. August 2023",
            changes: [
                "Added: Mehrere Farbthemen",
                "Added: Neue Seite 'Designs'",
                "Changed: Seiten haben jetzt Titel",
            ],
        },
        {
            date: "07. August 2023",
            changes: [
                "Added: Die App erfüllt nun die Anforderungen einer TWA",
                "Changed: Layoutverbesserungen in der Veranstaltungsliste",
                "Changed: Allgemeines Refactoring",
            ],
        },
    ]
}

export const useContributors = () => {
    return [
        {
            initials: "AB",
            name: "Anne Basedau",
            tag: "EvJu BuLa",
            job: "Projektbegleitung",
            insta: "https://instagram.com/annebasedau",
            color: "bg-red-400",
        },
        {
            initials: "AB",
            name: "Anna Brandt",
            tag: "EvJu Celle",
            job: "Testerin und Begleitung für IOS",
            insta: "https://instagram.com/anna.c.brandt",
            color: "bg-secondary",
        },
        {
            initials: "AR",
            name: "Anni Reimann",
            tag: "EvJu Burgdorf",
            job: "Projektbegleitung",
            insta: "https://instagram.com/annimation85",
            color: "bg-orange-400",
        },
        {
            initials: "CL",
            name: "Christian Lerch",
            tag: "EvJu BuLa",
            job: "IOS Entwicklung",
            web: "https://softwareschmiede-lerch.de/",
            color: "bg-cyan-400",
        },
        {
            initials: "LM",
            name: "Lukas Mayrhofer-Reinhartshuber",
            tag: null,
            job: "Designberatung",
            insta: "https://instagram.com/lukasm06_",
            color: "bg-purple-400",
        },
        {
            initials: "OF",
            name: "Oliver Fruth-Schünemann",
            tag: "Laju",
            job: "Projektbegleitung",
            color: "bg-yellow-600"
        }
    ]
}