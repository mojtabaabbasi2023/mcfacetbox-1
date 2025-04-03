import is from '@sindresorhus/is'
import destr from 'destr'
import { HttpResponse, http } from 'msw'
import { paginateArray } from '@api-utils/paginateArray'
import { db } from '@/plugins/fake-api/handlers/apps/dataShelf/db'

export const handlerDataShelf = [
  // Get Users Details
  http.get(('/api/apps/dataShelf'), ({ request }) => {
    const url = new URL(request.url)

    const itemsPerPage = url.searchParams.get('itemsPerPage')
    const page = url.searchParams.get('page')
    const nodeId = useToNumber(url.searchParams.get('nodeId') ?? '0').value

    // const nodeId = useToNumber(url.searchParams.get('nodeId') ?? '0').value
    const parsedNodeId = destr(nodeId)
    const parsedItemsPerPage = destr(itemsPerPage)
    const parsedPage = destr(page)

    const itemsPerPageLocal = is.number(parsedItemsPerPage) ? parsedItemsPerPage : 10
    const pageLocal = is.number(parsedPage) ? parsedPage : 1

    // filter index
    // const filteredIndexes = db.dataShelfBox.filter(item => {
    //   return (item.connectedTreeNode?.id ?? 0) === (is.number(parsedNodeId) ? parsedNodeId : 0)
    // })
    const filteredIndexes = db.dataShelfBox
    const totalItems = filteredIndexes.length

    // total pages
    const totalPages = Math.ceil(totalItems / itemsPerPageLocal)

    return HttpResponse.json(
      {
        items: paginateArray(filteredIndexes, itemsPerPageLocal, pageLocal),
        totalPages,
        totalItems,
        page: pageLocal > Math.ceil(totalItems / itemsPerPageLocal) ? 1 : page,
      },
      { status: 200 },
    )
  }),
]
