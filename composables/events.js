import { useLocalStorage } from "@vueuse/core"

export const useEventManager = () => {
    const pb = usePocketBase()
    const storage = useLocalStorage("eventStore", { updated: null, items: [] })

    async function getInternalEventList() {
        const response = await pb.collection('events').getFullList({
            expand: "location,category",
            sort: "start"
        });
        const data = { updated: new Date(), items: response }
        return data
    }

    async function update() {
        const data = await getInternalEventList()
        storage.value = data
        return data
    }

    async function getEventList() {
        let shouldUpdate = false
        if (shouldUpdateCache(storage, 5)) {
            shouldUpdate = true
        }
        if (shouldUpdate) {
            return await update()
        } else {
            if (storage.value.updated !== null) {
                return storage.value
            } else {
                throw "User is offline and no data is downloaded"
            }
        }
    }

    function groupEventsByDay(events) {
        // Create an object to hold the grouped events
        const groupedEvents = {};

        // Iterate through the list of events
        events.forEach(event => {
            // Convert the ISO string to a Date object
            const eventDate = new Date(event.start);

            // Get the day of the week as a string (e.g., "Sunday", "Monday", etc.)
            const dayOfWeek = eventDate.toLocaleDateString('de-DE', { weekday: 'long' });

            // Check if the day exists in the groupedEvents object, and if not, initialize it as an empty array
            if (!groupedEvents[dayOfWeek]) {
                groupedEvents[dayOfWeek] = [];
            }

            // Add the event to the corresponding day
            groupedEvents[dayOfWeek].push(event);
        });

        // Convert the groupedEvents object into an array of objects
        const result = Object.keys(groupedEvents).map(day => ({
            day,
            events: groupedEvents[day],
        }));

        return result;
    }

    const EventManager = {
        getList: async (limit = -1) => {
            const data = (await getEventList()).items
            if (limit === -1) {
                return data
            } else {
                return data.slice(0, limit);
            }
        },
        getById: async (id) => {
            const data = (await getEventList()).items.find(obj => obj.id === id)
            return data
        },
        getUpcomingEvents: async (limit = -1) => {
            const data = (await getEventList()).items.filter(obj => (new Date(obj.end)).getTime() > (new Date()).getTime())
            if (limit === -1) {
                return data
            } else {
                return data.slice(0, limit);
            }
        },
        getUpcomingHomepageEvents: async (limit = -1) => {
            const data = (await getEventList()).items.filter(obj => ((new Date(obj.end)).getTime() > (new Date()).getTime() && !obj.homepage_ignore))
            if (limit === -1) {
                return data
            } else {
                return data.slice(0, limit);
            }
        },
        getByCategory: async (id) => {
            const data = (await getEventList()).items.filter(obj => obj.category == id)
            return data
        },
        getDayList: async () => {
            const data = (await getEventList()).items
            return groupEventsByDay(data)
        },
        update: async () => {
            await update()
        },
        lastUpdated: () => {
            return storage.value.updated
        }
    }

    return EventManager
}