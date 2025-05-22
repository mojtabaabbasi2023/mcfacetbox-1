import { DataBoxType } from '@/types/baseModels'

export const resolveActiveColor = (isActive: boolean) => {
  if (isActive)
    return 'success'
  else
    return 'error'
}

export const resolveActiveTitle = (isActive: boolean) => {
  if (isActive)
    return 'active'
  else
    return 'deactive'
}

export const createHadithURL = (resourceid: string) => {
  return `https://hadith.inoor.ir/fa/hadith/${resourceid}`
}
export const createAyahUrl = (surahid: number, ayahid: number) => {
  return `https://quran.inoor.ir/fa/ayah/${surahid}/${ayahid}`
}
