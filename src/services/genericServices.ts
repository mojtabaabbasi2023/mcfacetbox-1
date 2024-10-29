import { FetchError } from "ofetch";

export async function serviceAdd<T extends BodyInit | Record<string, any>>(dataModel: T, serviceUrl: string) {
    const serviceData = ref(0)
    const serviceError = ref('')
    try {

        await $api(serviceUrl, {
            method: 'POST',
            body: JSON.parse(JSON.stringify(dataModel)),
            ignoreResponseError: false
        }).then((responce) => {
            serviceData.value = responce.body
        }, (error) => {
            const temp = (error as FetchError)
            serviceError.value = temp.message
        }).catch((error) => {
            serviceError.value = error.data
        })
    } catch (error) {
        serviceError.value = 'error'
    }
    return { serviceData, serviceError }
}

export async function serviceUpdate<T extends BodyInit | Record<string, any>>(dataModel: T, entityId: number, serviceUrl: string) {
    const serviceData = ref(0)
    const serviceError = ref('')
    try {

        await $api(serviceUrl + entityId, {
            method: 'PUT',
            body: JSON.parse(JSON.stringify(dataModel)),
            ignoreResponseError: false
        }).then((responce) => {
            serviceData.value = responce.body
        }, (error) => {
            const temp = (error as FetchError)
            serviceError.value = temp.message
        }).catch((error) => {
            serviceError.value = error.data
        })
    } catch (error) {
        serviceError.value = 'error'
    }
    return { serviceData, serviceError }
}

export async function serviceDelete(id: number, serviceUrl: string) {
    const data = ref(null)
    const error = ref(null)
    await $api(serviceUrl + id, {
        method: 'DELETE',
    }).then((responce) => {
        data.value = responce.body
    }, (error) => {
        const temp = (error as FetchError)
        error.value = temp.message
    }).catch((error) => {
        error.value = error.data
    })
    return { data, error }
}
