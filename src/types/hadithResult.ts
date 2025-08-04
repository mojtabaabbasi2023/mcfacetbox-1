import { type ISearchResultItem, SearchResultItemModel } from './SearchResult'
import type { IReference } from '@/utils/refrenceUtils'
import { generateFootnoteRefrence } from '@/utils/refrenceUtils'

export interface IqaelItem {
  id: number
  roleId: number
  title: string
  roleTitle: string
}

/**
 * Represents a hadith translation item
 */
export interface IHadithTranslateItem extends ISearchResultItem {
  hadithId: number
  noorLibLink: string
  sourceMainTitle: string
  sourceShortTitle: string
  authorTitle: string
  authorId: number
  vol: number
  pageNum: number
}

/**
 * Represents a hadith search result item with additional metadata
 */
export interface IHadithSearchResultItem extends ISearchResultItem {
  qaelTitleList: string
  noorLibLink: string
  qaelList: IqaelItem[]
  bookTitle: string
  bookTitleShort: string
  pageNum: number
  sourceId: number
  vol: number
  translateCount: number
  explanationCount: number
  translateList: IHadithTranslateItem[]
  hadithRelatedCount: number
}

/**
 * Model for hadith search results
 */
export class HadithSearchResultItemModel
  extends SearchResultItemModel
  implements IHadithSearchResultItem {
  qaelTitleList: string = ''
  noorLibLink: string = ''
  qaelList: IqaelItem[] = []
  bookTitle: string = ''
  bookTitleShort: string = ''
  pageNum: number = 0
  sourceId: number = 0
  vol: number = 0
  translateCount: number = 0
  explanationCount: number = 0
  translateList: IHadithTranslateItem[] = []
  hadithRelatedCount: number = 0

  constructor(
    highLight: string[] = [],
    id: number | string = 0,
    text: string = '',
    shortText: string = '',
    qaelTitleList: string = '',
    noorLibLink: string = '',
    qaelList: IqaelItem[] = [],
    bookTitle: string = '',
    bookTitleShort: string = '',
    pageNum: number = 0,
    sourceId: number = 0,
    vol: number = 0,
    translatecount: number = 0,
    hadithrelatedcount: number = 0,
  ) {
    super(highLight, id, text, shortText)
    this.qaelTitleList = qaelTitleList
    this.noorLibLink = noorLibLink
    this.qaelList = qaelList
    this.bookTitle = bookTitle
    this.bookTitleShort = bookTitleShort
    this.pageNum = pageNum
    this.sourceId = sourceId
    this.vol = vol
    this.translateCount = translatecount
    this.hadithRelatedCount = hadithrelatedcount
  }

  get refrenceAsString(): string {
    return generateFootnoteRefrence({ bookTitle: this.bookTitle, volumeNumber: this.vol.toString(), pageNumber: this.pageNum.toString() })
  }

  get refrenceAsModel(): IReference {
    return { bookTitle: this.bookTitle, volumeNumber: this.vol.toString(), pageNumber: this.pageNum.toString() }
  }

  //   override createRefrenceAsString(): string {
  //     return generateFootnoteRefrence({ bookTitle: this.bookTitle, volumeNumber: this.vol.toString(), pageNumber: this.pageNum.toString() })
  //   }

//   override createRefrenceAsModel(): IReference {
//     return { bookTitle: this.bookTitle, volumeNumber: this.vol.toString(), pageNumber: this.pageNum.toString() }
//   }
}

export class HadithTranslateItemModel
  extends SearchResultItemModel
  implements IHadithTranslateItem {
  hadithId: number = 0
  noorLibLink: string = ''
  sourceMainTitle: string = ''
  sourceShortTitle: string = ''
  authorTitle: string = ''
  authorId: number = 0

  constructor(
    highLight: string[] = [],
    id: number = 0,
    text: string = '',
    shortText: string = '',
    hadithId: number = 0,
    noorLibLink: string = '',
    sourceMainTitle: string = '',
    sourceShortTitle: string = '',
    authorTitle: string = '',
    authorId: number = 0,
    volume: number = 0,
    pagenumber: number = 0,
  ) {
    super(highLight, id, text, shortText)
    this.hadithId = hadithId
    this.noorLibLink = noorLibLink
    this.sourceMainTitle = sourceMainTitle
    this.sourceShortTitle = sourceShortTitle
    this.authorTitle = authorTitle
    this.authorId = authorId
    this.vol = volume
    this.pageNum = pagenumber
  }

  [x: string]: any
  vol: number = 0
  pageNum: number = 0

  get refrenceAsString(): string {
    return generateFootnoteRefrence({ bookTitle: this.sourceShortTitle, volumeNumber: this.vol.toString(), pageNumber: this.pageNum.toString() })
  }

  get refrenceAsModel(): IReference {
    return { bookTitle: this.sourceShortTitle, volumeNumber: this.vol.toString(), pageNumber: this.pageNum.toString() }
  }

  //   createRefrenceAsString(): string {
  //     return generateFootnoteRefrence({ bookTitle: this.sourceMainTitle, volumeNumber: this.vol.toString(), pageNumber: this.pageNum.toString(), author: this.authorTitle })
  //   }

//   createRefrenceAsModel(): IReference {
//     return { bookTitle: this.sourceMainTitle, volumeNumber: this.vol.toString(), pageNumber: this.pageNum.toString(), author: this.authorTitle }
//   }
}
