import researchSoftware from './researchSoftware'
import userManagement from './userManagement'
import type { HorizontalNavItems } from '@layouts/types'

// export default [...dashboard, ...apps, ...pages, ...uiElements, ...forms, ...tables, ...charts, ...misc] as HorizontalNavItems
export const userManagementItems = [...userManagement] as HorizontalNavItems
export const researchSoftwareItems = [...researchSoftware] as HorizontalNavItems
