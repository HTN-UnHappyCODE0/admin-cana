export interface PropsMainWeightSessionAll {}

export interface IWeightSession {
	description: string;
	accountUu: {
		username: string;
		status: number;
		uuid: string;
	};
	updatedTime: string;
	created: string;
	weight1: {
		weight: number;
		timeScales: string;
		scalesMachineUu: {
			status: number;
			name: string;
			uuid: string;
		};
	};
	weight2: {
		weight: number;
		timeScales: string;
		scalesMachineUu: {
			status: number;
			name: string;
			uuid: string;
		};
	};
	producTypeUu: {
		code: string;
		name: string;
		status: number;
		type: number;
		uuid: string;
	};
	specificationsUu: {
		name: string;
		status: number;
		uuid: string;
	};
	batchUu: {
		uuid: string;
		name: string;
		ship: string;
		shipOut: string;
		isShip: number;
		weightIntent: number;
		timeIntend: string;
	};
	specStyleUu: {
		uuid: string;
		ruleItems: {
			titleType: string;
			rule: number;
			value: string;
		}[];
		countRuler: number;
	};
	billUu: {
		uuid: string;
		code: string;
		ship: string;
		isSift: number;
		isBatch: number;
		scalesType: number;
	};
	fromUu: {
		parentUu: {
			uuid: string;
			code: string;
			name: string;
		};
		uuid: string;
		code: string;
		name: string;
	};
	toUu: {
		parentUu: {
			uuid: string;
			code: string;
			name: string;
		};
		uuid: string;
		code: string;
		name: string;
	};
	truckUu: {
		code: string;
		licensePlate: string;
		status: number;
		uuid: string;
	};
	dryness: number;
	lstValueSpec: string;
	weightReal: number;
	shift: number;
	count: number;
	status: number;
	code: string;
	uuid: string;
}
