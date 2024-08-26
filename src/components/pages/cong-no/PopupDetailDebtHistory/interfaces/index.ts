export interface PropsPopupDetailDebtHistory {
	onClose: () => void;
}

export interface IDetailTransaction {
	partnerUu: {
		code: string;
		name: string;
		status: number;
		type: number;
		uuid: string;
	};
	type: number;
	amountCash: number;
	amountBank: number;
	path: string[];
	code: string | null;
	status: number;
	totalAmount: number;
	created: string;
	creatorUu: {
		username: string;
		status: number;
		uuid: string;
	};
	uuid: string;
}
