import {createContext} from 'react';

export interface IContextDashbroad {
	companyUuid: string;
	setCompanyUuid: (any: string) => void;
}

export const ContextDashbroad = createContext<IContextDashbroad>({
	companyUuid: '',
	setCompanyUuid: () => '',
});
