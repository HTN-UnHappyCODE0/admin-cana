import {createContext} from 'react';

export interface IContextDashbroad {
	partnerUuid: string;
	setPartnerUuid: (any: string) => void;
}

export const ContextDashbroad = createContext<IContextDashbroad>({
	partnerUuid: '',
	setPartnerUuid: () => '',
});
