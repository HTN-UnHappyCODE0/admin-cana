export interface PropsMainPagePosition {}

export interface IPosition {
	id: number;
	uuid: string;
	time: string;
	name: string;
	description: string | null;
	created: string;
	updatedTime: string;
	status: number;
	user: IUser[];
}

export interface IUser {}
