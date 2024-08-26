import {IPosition} from '../../MainPagePosition/interfaces';

export interface PropsFormUpdatePosition {
	dataUpdate: IPosition | null;
	onClose: () => void;
}

export interface IFormUpdatePosition {
	uuid: string;
	time: string;
	name: string;
	description: string;
}
