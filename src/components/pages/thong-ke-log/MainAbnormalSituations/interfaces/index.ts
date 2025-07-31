export interface PropsMainAbnormalSituations {}

export interface ILog {
	case: {
		name: string;
		id: number;
	};
	plan: {
		name: string;
		id: number;
	};
	caseSelection: {
		name: string;
		id: number;
	};
	weightSessionUu: {
		truckUu: {
			code: string;
			licensePlate: string;
			status: number;
		};
		status: number;
		code: string;
		uuid: string;
	};
	accountUu: {
		username: string;
		status: number;
		uuid: string;
	};
	feedBackerUu: any;
	feedback: string;
	reason: string;
	note: any;
	status: number;
	uuid: string;
}
