import { paginateArray } from '@api-utils/paginateArray'
import { db } from '@db/apps/gates/db'
import is from '@sindresorhus/is'
import destr from 'destr'
import type { PathParams } from 'msw'
import { HttpResponse, http } from 'msw'

export const handlerAppsgates = [
  // Get gates Details
  http.get(('/api/apps/gates'), ({ request }) => {
    const url = new URL(request.url)

    const q = url.searchParams.get('q')
    const createDate = url.searchParams.get('createDate')
    const plan = url.searchParams.get('plan')
    const active = url.searchParams.get('active')
    const sortBy = url.searchParams.get('sortBy')
    const itemsPerPage = url.searchParams.get('itemsPerPage')
    const page = url.searchParams.get('page')
    const orderBy = url.searchParams.get('orderBy')

    const searchQuery = is.string(q) ? q : undefined
    const queryLower = (searchQuery ?? '').toString().toLowerCase()

    const parsedSortBy = destr(sortBy)
    const sortByLocal = is.string(parsedSortBy) ? parsedSortBy : ''

    const parsedOrderBy = destr(orderBy)
    const orderByLocal = is.string(parsedOrderBy) ? parsedOrderBy : ''

    const parsedItemsPerPage = destr(itemsPerPage)
    const parsedPage = destr(page)

    const itemsPerPageLocal = is.number(parsedItemsPerPage) ? parsedItemsPerPage : 10
    const pageLocal = is.number(parsedPage) ? parsedPage : 1

    // filter gates
    let filteredgates = db.gates.filter(gate => ((gate.gateTitle.toLowerCase().includes(queryLower) || gate.contact.toLowerCase().includes(queryLower)) && gate.active === (active || gate.active))).reverse()

    // sort gates
    if (sortByLocal) {
      console.log(sortByLocal)
      if (sortByLocal === 'gateTitle') {
        filteredgates = filteredgates.sort((a, b) => {
          if (orderByLocal === 'asc')
            return a.gateTitle.localeCompare(b.gateTitle)
          else
            return b.gateTitle.localeCompare(a.gateTitle)
        })
      }
      if (sortByLocal === 'nameFamily') {
        filteredgates = filteredgates.sort((a, b) => {
          if (orderByLocal === 'asc')
            return a.nameFamily.localeCompare(b.nameFamily)
          else
            return b.nameFamily.localeCompare(a.nameFamily)
        })
      }
      if (sortByLocal === 'createDate') {
        filteredgates = filteredgates.sort((a, b) => {
          if (orderByLocal === 'asc')
            return a.createDate.localeCompare(b.createDate)
          else
            return b.createDate.localeCompare(a.createDate)
        })
      }
      if (sortByLocal === 'expireDate') {
        filteredgates = filteredgates.sort((a, b) => {
          if (orderByLocal === 'asc')
            return a.expireDate.localeCompare(b.expireDate)
          else
            return b.expireDate.localeCompare(a.expireDate)
        })
      }
    }

    const totalItems = filteredgates.length

    // total pages
    const totalPages = Math.ceil(totalItems / itemsPerPageLocal)

    return HttpResponse.json(
      {
        items: paginateArray(filteredgates, itemsPerPageLocal, pageLocal),
        totalPages,
        totalItems,
        page: pageLocal > Math.ceil(totalItems / itemsPerPageLocal) ? 1 : page,
      },
      { status: 200 },
    )
  }),

  // Get Single gate Detail
  http.get<PathParams>(('/api/apps/gates/:id'), ({ params }) => {
    const gateId = Number(params.id)

    const gate = db.gates.find(e => e.id === gateId)

    if (!gate) {
      return HttpResponse.json({ message: 'gate not found' }, { status: 404 })
    }
    else {
      return HttpResponse.json(
        {
          ...gate,
          ...{
            taskDone: 1230,
            projectDone: 568,
            taxId: 'Tax-8894',
            language: 'English',
          },
        },
        { status: 200 },
      )
    }
  }),

  // Delete gate
  http.delete(('/api/apps/gates/:id'), ({ params }) => {
    const gateId = Number(params.id)

    const gateIndex = db.gates.findIndex(e => e.id === gateId)

    if (gateIndex === -1) {
      return HttpResponse.json('gate not found', { status: 404 })
    }
    else {
      db.gates.splice(gateIndex, 1)

      return new HttpResponse(null, {
        status: 204,
      })
    }
  }),

  // 👉 Add gate
  http.post(('/api/apps/gates'), async ({ request }) => {
    const gate = await request.json() as any

    db.gates.push({
      ...gate,
      id: db.gates.length + 1,
    })

    return HttpResponse.json(
      { body: gate },
      { status: 200 },
    )
  }),
]
