import { db } from '@/plugins/fake-api/handlers/apps/dataShelf/db'
import { paginateArray } from '@api-utils/paginateArray'
import is from '@sindresorhus/is'
import destr from 'destr'
import { HttpResponse, http } from 'msw'

export const handlerDataShelf = [
    // Get Users Details
    http.get(('/api/apps/dataShelf'), ({ request }) => {
        const url = new URL(request.url)

        const itemsPerPage = url.searchParams.get('itemsPerPage')
        const page = url.searchParams.get('page')

        const parsedItemsPerPage = destr(itemsPerPage)
        const parsedPage = destr(page)

        const itemsPerPageLocal = is.number(parsedItemsPerPage) ? parsedItemsPerPage : 10
        const pageLocal = is.number(parsedPage) ? parsedPage : 1

        // filter users
        let filteredUsers = db.dataShelfBox;
        const totalItems = filteredUsers.length

        // total pages
        const totalPages = Math.ceil(totalItems / itemsPerPageLocal)

        return HttpResponse.json(
            {
                items: paginateArray(filteredUsers, itemsPerPageLocal, pageLocal),
                totalPages,
                totalItems,
                page: pageLocal > Math.ceil(totalItems / itemsPerPageLocal) ? 1 : page,
            },
            { status: 200 },
        )
    }),
]
