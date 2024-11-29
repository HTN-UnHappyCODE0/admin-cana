import React from 'react';

import {PropsMainStatisticalWarehouse} from './interfaces';
import styles from './MainStatisticalWarehouse.module.scss';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY, TYPE_STORE} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import warehouseServices from '~/services/warehouseServices';
import DashboardWarehouse from '../DashboardWarehouse';

function MainStatisticalWarehouse({}: PropsMainStatisticalWarehouse) {
	const {data: dataWarehouse} = useQuery([QUERY_KEY.thong_ke_kho_hang], {
		queryFn: () =>
			httpRequest({
				isData: true,
				http: warehouseServices.dashbroadWarehouse({typeProduct: TYPE_STORE.ADMIN_KHO}),
			}),
		select(data) {
			if (data) {
				return data.data;
			}
		},
	});

	return (
		<div className={styles.container}>
			<DashboardWarehouse
				isTotal={true}
				total={dataWarehouse?.total}
				productTotal={dataWarehouse?.productTotal}
				qualityTotal={dataWarehouse?.qualityTotal}
				specTotal={dataWarehouse?.specTotal}
			/>
			{dataWarehouse?.detailWarehouseSpec?.map((v: any) => (
				<DashboardWarehouse dataWarehouse={v} key={v?.uuid} isTotal={false} />
			))}
		</div>
	);
}

export default MainStatisticalWarehouse;
