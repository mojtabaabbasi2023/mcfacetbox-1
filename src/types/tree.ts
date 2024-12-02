import { baseDataTableModel, ISimpleDTO } from "./baseModels";



export interface ITreeTitle extends baseDataTableModel {
    id: number;
    title: string;
    book: ISimpleDTO[];
    createDate: string;
    isActive: boolean;
    description: string;
}

export class TreeTitleModel implements ITreeTitle {
    [x: string]: any;
    id: number = 0;
    title: string = "";
    book: ISimpleDTO[] = [];
    createDate: string = "";
    isActive: boolean = false;
    description: string = "";
    isSelected: boolean = false;
    isLoading: boolean = false;
    selectable: boolean = false;
    disabled: boolean = false;

}
