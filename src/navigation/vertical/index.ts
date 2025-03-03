import researchSoftware from './researchSoftware'
import userManagement from './userManagement'
import type { VerticalNavItems } from '@layouts/types'

// export default [...dashboard, ...apps, ...pages, ...uiElements, ...forms, ...tables, ...charts, ...misc] as HorizontalNavItems
export const userManagementItems = [...userManagement] as VerticalNavItems
export const researchSoftwareItems = [...researchSoftware] as VerticalNavItems
