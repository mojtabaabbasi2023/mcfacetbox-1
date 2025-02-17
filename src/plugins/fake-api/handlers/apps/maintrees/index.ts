import type { PathParams } from 'msw'
import { HttpResponse, http } from 'msw'
import { db } from '@/plugins/fake-api/handlers/apps/maintrees/db'

export const handlerAppsTrees = [
  // Get Users Details
  http.get(('/api/apps/maintree'), ({ request }) => {
    // const searchQuery = is.string(q) ? q : undefined
    // const queryLower = (searchQuery ?? '').toString().toLowerCase()
    // // filter users
    // let filteredRols = db.mainTree.filter(item => ((item.title.toLowerCase().includes(queryLower)))).reverse()

    return HttpResponse.json(
      {
        items: db.mainTree,
      },
      { status: 200 },
    )
  }),

  // Get Single User Detail
  http.get<PathParams>(('/api/apps/maintree/:id'), ({ params }) => {
    const roleId = Number(params.id)

    const role = db.mainTree.find(e => e.id === roleId)

    if (!role) {
      return HttpResponse.json({ message: 'User not found' }, { status: 404 })
    }
    else {
      return HttpResponse.json(
        {
          ...role,
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

  // Delete User
  http.delete(('/api/apps/maintree/:id'), ({ params }) => {
    const roleId = Number(params.id)

    const userIndex = db.mainTree.findIndex(e => e.id === roleId)

    if (userIndex === -1) {
      return HttpResponse.json('User not found', { status: 404 })
    }
    else {
      db.mainTree.splice(userIndex, 1)

      return new HttpResponse(null, {
        status: 204,
      })
    }
  }),

  // 👉 Add user
  http.post(('/api/apps/maintree'), async ({ request }) => {
    const treenode = await request.json() as any

    db.mainTree.push({
      ...treenode,
      id: db.mainTree.length + 1,
    })

    return HttpResponse.json(
      { body: treenode },
      { status: 201 },
    )
  }),
]
