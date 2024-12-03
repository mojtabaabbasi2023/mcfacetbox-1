import { ISimpleDTO, ISimpleSelectableDTO } from "./baseModels";



export interface ISearchResult {
    id: number;
    title: string;
    trees: ISimpleDTO[];
    createDate: string;
    isActive: boolean;
    description: string;
}

export interface ISearchResultTabBoxItem {
    id: number;
    title: string;
    content: ISimpleSelectableDTO[];

}
export interface ISearchResultTabBox {
    id: number;
    content: ISearchResultTabBoxItem[]
}
