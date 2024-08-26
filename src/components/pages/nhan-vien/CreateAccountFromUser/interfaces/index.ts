import {IUser} from '../../MainPage/interfaces';

export interface PropsCreateAccountFromUser {
	onClose: () => void;

	dataCreateAccount: IUser | null;
}
