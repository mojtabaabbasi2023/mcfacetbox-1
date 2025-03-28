import is from '@sindresorhus/is'
import { HttpResponse, http } from 'msw'
import destr from 'destr'
import { paginateArray } from '@api-utils/paginateArray'
import { db } from '@/plugins/fake-api/handlers/apps/searchSimple/db'

export const handlerAppsSimpleSearch = [
  // Get Users Details
  http.get(('/api/apps/searchsimple'), ({ request }) => {
    const url = new URL(request.url)

    const q = url.searchParams.get('phrase')
    const itemsPerPage = url.searchParams.get('itemsPerPage')
    const page = url.searchParams.get('page')
    const parsedItemsPerPage = destr(itemsPerPage)
    const parsedPage = destr(page)
    const itemsPerPageLocal = is.number(parsedItemsPerPage) ? parsedItemsPerPage : 10
    const pageLocal = is.number(parsedPage) ? parsedPage : 1
    const searchQuery = is.string(q) ? q : undefined
    const queryLower = (searchQuery ?? '').toString().toLowerCase()

    const filtereditems = db.items.filter(items => ((items.title.toLowerCase().includes(queryLower)))).reverse()
    const totalItems = filtereditems.length

    // total pages
    const totalPages = Math.ceil(totalItems / itemsPerPageLocal)

    return HttpResponse.json(
      {
        items: paginateArray(filtereditems, itemsPerPageLocal, pageLocal),
        totalPages,
        totalItems,
        page: pageLocal > Math.ceil(totalItems / itemsPerPageLocal) ? 1 : page,
      },
      { status: 200 },
    )
  }),
]
