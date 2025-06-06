import { type ISearchResultItem, SearchResultItemModel } from './SearchResult'

export interface IqaelItem {
  id: number
  roleId: number
  title: string
  roleTitle: string
}

/**
 * Represents a hadith translation item
 */
export interface IAyahTranslateItem extends ISearchResultItem {
  translationBookId: number
  bookFromPage: number
  authorFullName: string
  bookTitle: string
  noorLibId: number
  noorLibLink: string
  volumeNumber: number
  section: number
  ayahId: number
}

/**
 * Represents a hadith search result item with additional metadata
 */
export interface IAyahSearchResultItem extends ISearchResultItem {
  ayahNumber: number
  isSpecialAyah: boolean
  link: string
  surahId: number
  surahTitle: string
}

/**
 * Model for hadith search results
 */
export class AyahSearchResultItemModel
  extends SearchResultItemModel
  implements IAyahSearchResultItem {
  constructor(
    highLight: string[] = [],
    id: number = 0,
    ayahNumber: number = 0,
    link: string = '',
    shortText: string = '',
    text: string = '',
    surahTitle: string = '',
    surahId: number = 0,
  ) {
    super(highLight, id, text, shortText)
    this.ayahNumber = ayahNumber
    this.link = link
    this.surahTitle = surahTitle
    this.surahId = surahId
  }

  [x: string]: any
  ayahNumber: number = 0
  isSpecialAyah: boolean = false
  link: string = ''
  surahId: number = 0
  surahTitle: string = ''
}

export class AyahTranslateItemModel
  extends SearchResultItemModel
  implements IAyahTranslateItem {
  translationBookId: number = 0
  bookFromPage: number = 0
  authorFullName: string = ''
  bookTitle: string = ''
  noorLibId: number = 0
  noorLibLink: string = ''
  volumeNumber: number = 0
  section: number = 0
  ayahId: number = 0
  constructor(
    highLight: string[] = [],
    id: number = 0,
    text: string = '',
    shortText: string = '',
    translationBookId: number = 0,
    bookFromPage: number = 0,
    bookTitle: string = '',
    volumeNumber: number = 0,
    section: number = 0,
    ayahId: number = 0,

  ) {
    super(highLight, id, text, shortText)
    this.translationBookId = translationBookId
    this.bookFromPage = bookFromPage
    this.bookTitle = bookTitle
    this.volumeNumber = volumeNumber
    this.section = section
    this.ayahId = ayahId
  }

  [x: string]: any
  vol: number = 0
  pageNum: number = 0
}
