export const shouldUpdateCache = (storage, minutes) => {
    if (storage.value.updated !== null) {
        if (((new Date()) > (new Date(storage.value.updated))) > minutes * 60 * 1000 && navigator.onLine) {
            return true
        } else {
            return false
        }
    } else {
        return true
    }
}