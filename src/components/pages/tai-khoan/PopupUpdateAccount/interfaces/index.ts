import {IAccount} from '../../MainPageAccount/interfaces';

export interface PropsPopupUpdateAccount {
	onClose: () => void;
	dataUpdateAccount: IAccount | null;
}
