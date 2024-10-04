import React, {useState} from 'react';

import {PropsMainDashboard} from './interfaces';
import styles from './MainDashboard.module.scss';
import GeneralStatistics from '../GeneralStatistics';
import WarehouseStatistics from '../WarehouseStatistics';
import ChartImportCompany from '../ChartImportCompany';
import ChartExportCompany from '../ChartExportCompany';
import ChartServiceCompany from '../ChartServiceCompany';
import {ContextDashbroad} from './context';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import dashbroadServices from '~/services/dashbroadServices';
import clsx from 'clsx';
import DataFlowWeight from '../DataFlowWeight';
import DataFlowDryness from '../DataFlowDryness';

function MainDashboard({}: PropsMainDashboard) {
	const [companyUuid, setCompanyUuid] = useState<string>('');

	const {data: dataCompany, isFetching} = useQuery([QUERY_KEY.thong_ke_trang_chu_admin], {
		queryFn: () =>
			httpRequest({
				http: dashbroadServices.dashbroadAdmin({}),
			}),
		select(data) {
			return data;
		},
	});

	return (
		<ContextDashbroad.Provider
			value={{
				companyUuid: companyUuid,
				setCompanyUuid: setCompanyUuid,
			}}
		>
			<div className={styles.container}>
				<GeneralStatistics weight={dataCompany?.weight} debt={dataCompany?.debt} isLoading={isFetching} />
				<div className={clsx('col_2', 'mt')}>
					{dataCompany?.lstInfoCompany?.map((v: any) => (
						<WarehouseStatistics key={v?.companyDTO?.uuid} infoCompany={v} isLoading={isFetching} />
					))}
				</div>
				<DataFlowWeight />
				<DataFlowDryness />
				<ChartImportCompany />
				<ChartExportCompany />
				<ChartServiceCompany />
			</div>
		</ContextDashbroad.Provider>
	);
}

export default MainDashboard;
