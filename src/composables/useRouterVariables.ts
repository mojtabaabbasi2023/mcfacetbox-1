import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { isNumericString } from '@sindresorhus/is'

export enum QueryParamAlias {
  Excerptpage = 'dp',
  ExcerptpageSize = 'dps',
  ExcerptFacet = 'df',
  TreeId = 'gtd',
  NodeId = 'snd',
}

/**
 * \
 * از این کامپوزیبل برای مدیریت مقادیر عمومی که در کل برنامه موردنیاز است و باید در کوئری باشد استفاده میگردد
 * این مقادیر در کوئری قرار داده شده که کاربر با کپی آن و استفاده در مرورگر دیگر وضعیت اولیه خود را از دست ندهد
 */
export default function useRouterForGlobalVariables() {
  const route = useRoute()

  const routerTreeId = computed<number>(() => {
    const id = route.query[QueryParamAlias.TreeId]

    if (id && isNumericString(atob(id.toString())))
      return Number(atob(id.toString()))

    return 0
  })

  const routerNodeId = computed<number>(() => {
    const id = route.query[QueryParamAlias.NodeId]

    if (id && isNumericString(atob(id.toString())))
      return Number(atob(id.toString()))

    return 0
  })

  const routerExcerptPage = computed<number>(() => {
    const page = route.query[QueryParamAlias.Excerptpage]

    if (page && isNumericString(atob(page.toString())))
      return Number(atob(page.toString()))

    return 0
  })

  const routerExcerptPageSize = computed<number>(() => {
    const pagesize = route.query[QueryParamAlias.ExcerptpageSize]

    if (pagesize && isNumericString(atob(pagesize.toString())))
      return Number(atob(pagesize.toString()))

    return 0
  })

  const routerExcerptFacet = computed<string>(() => {
    const facet = route.query[QueryParamAlias.ExcerptFacet]

    if (facet && atob(facet.toString()))
      return atob(facet.toString())

    return ''
  })

  const clearUnNeededQueryItems = (currentquery: Record<string, any>) => {
    Object.keys(currentquery).forEach(key => {
      // پارامتر dps از کوئری نباید حذف شود چون اندازه صفحه میباشد
      if (key !== QueryParamAlias.ExcerptpageSize)
        delete currentquery[key]
    })
  }

  const addTreeIdToQuery = (treeid: number, currentquery: Record<string, any>) => {
    currentquery[QueryParamAlias.TreeId] = btoa(treeid.toString())
  }

  const addNodeIdToQuery = (nodeid: number, currentquery: Record<string, any>) => {
    currentquery[QueryParamAlias.NodeId] = btoa(nodeid.toString())
  }

  const excerptPageQuery = (page: number) => {
    return { [QueryParamAlias.Excerptpage]: btoa(page.toString()) }
  }

  const excerptPageSizeQuery = (pagesize: number) => {
    return { [QueryParamAlias.ExcerptpageSize]: btoa(pagesize.toString()) }
  }

  const excerptFacetQuery = (facet: string) => {
    return { [QueryParamAlias.ExcerptFacet]: btoa(facet) }
  }

  const treeIdQuery = (treeid: number) => {
    return { [QueryParamAlias.TreeId]: btoa(treeid.toString()) }
  }

  /**
   * تابع برای بررسی اینکه آیا پارامتر جدید که میخواهد در کوئری درج شود تکراری است یا نه
   * اگر تکراری بود درج نمیشود
   * اگر تکراری درج شود در صفحاتی که از کوئری برای خواندن یکسری دیتا استفاده میکنیم حلقه ایجاد میشود مثلا صفحه بندی و فست در فیش ها
   * @param newparam
   * @param currentquery
   */
  const changeRouteQueryIfNeeded = (newparam: Record<string, any>, currentquery: Record<string, any>) => {
    Object.keys(newparam).forEach(paramKey => {
      const newVal = newparam[paramKey]

      // 👉 - بررسی اینکه آیا تغییرات صفحه بندی و فست تکراری است یا نه؟ برای جلوگیری از ایجاد حلقه
      if (currentquery[paramKey] !== newVal.toString())
        currentquery[paramKey] = newVal.toString()
    })
  }

  const hasTreeId = computed(() => routerTreeId.value > 0)

  return {
    routerTreeId,
    routerNodeId,
    routerExcerptPage,
    routerExcerptPageSize,
    routerExcerptFacet,
    excerptPageQuery,
    excerptPageSizeQuery,
    excerptFacetQuery,
    treeIdQuery,
    changeRouteQueryIfNeeded,
    hasTreeId,
    clearUnNeededQueryItems,
    addTreeIdToQuery,
    addNodeIdToQuery,
  }
}
