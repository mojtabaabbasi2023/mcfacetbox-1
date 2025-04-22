import type { ISimpleDTO, baseItemState } from './baseModels'

// NOTE - بازای هر تغییری در محتوای جعبه داده باید یک نسخه ثبت گردد و قابلیت آندو داشته باشد
export interface IDataShelfBoxView {
  id: number
  content: string

  // NOTE - فقط یک نود متصل رو اینجا ذخیره می کنیم که چسنچو راحت تر باشه، بعد میشه از طریق شناسه، اتصالات یک جعبه داده به چند نود را استخراج کرد
  node?: ISimpleDTO<number>
  treeId: number

  // NOTE - مشخص کننده، حدیث، متن، آیه و یا لغت
  excerptType: ISimpleDTO<number>

  order: number

  // NOTE - برای پاورقی یک تگ اچ تی ام ال با شناسه پاورقی در محتوای جعبه داده درج میشود و باید بررسی گردد که اگر در ویرایش کاربر این تگ حذف شد در پاورقی هم حذف شود
  footnotes: IFootNote[]

  // NOTE - شناسه جعبه داده ای که به این جعبه داده وصل شده و باید با آن حرکت کند
  pinnedItem?: number
  creationTime?: string
  creatorId?: string
  creatorFullName?: string
  selected?: boolean

  //   tags?: ISimpleDTO<number>[]
  labelCount: number

  //   comment?: string
  hasDescription: boolean

  // NOTE - شناسه سایتی که محتوا از آن دریافت شده مثلا شناسه حدیث، آیه یا لغت
  refrenceId: string
}

export interface IDataShelfBoxNew {
  id: number
  treeId: number
  nodeId: number
  content: string
  description: string
  footNotes: IFootNote[]
  labels: number[]
}

export class DataShelfBoxModelNew implements IDataShelfBoxNew {
  id: number = 0
  treeId: number = 0
  nodeId: number = 0
  content: string = ''
  description: string = ''
  footNotes: IFootNote[] = []
  labels: number[] = []
  constructor(id: number, treeId: number, nodeId: number, content: string, description: string, footNotes: IFootNote[], labels: number[]) {
    this.id = id
    this.treeId = treeId
    this.nodeId = nodeId
    this.content = content
    this.description = description
    this.footNotes = footNotes
    this.labels = labels
  }
}

export class DataShelfBoxModelView implements IDataShelfBoxView {
  id: number = 0
  content: string = ''
  node?: ISimpleDTO<number> | undefined = { id: 0, title: '' }
  treeId: number = 0
  excerptType: ISimpleDTO<number> = { id: 0, title: '' }
  order: number = 0
  footnotes: IFootNote[] = []
  pinnedItem?: number | undefined = 0
  creationTime?: string | undefined = ''
  creatorId?: string | undefined = ''
  creatorFullName?: string | undefined = ''
  selected?: boolean | undefined = false
  labelCount: number = 0
  hasDescription: boolean = false
  refrenceId: string = ''

//   constructor(id: number, content: string, treeId: number, excerptType: ISimpleDTO<number>, footnotes: IFootNote[], hasDescription: boolean, labelCount: number, refrenceId: string) {
//     this.id = id
//     this.treeId = treeId
//     this.content = content
//     this.hasDescription = hasDescription
//     this.footnotes = footnotes
//     this.labelCount = labelCount
//     this.refrenceId = refrenceId
//     this.excerptType = excerptType
//   }
}

export interface IFootNote extends ISimpleDTO<string>, baseItemState {
  index: number
}
