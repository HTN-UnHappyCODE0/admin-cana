import React from 'react';

import {PropsChartServiceCompany} from './interfaces';
import styles from './ChartServiceCompany.module.scss';
import SelectFilterDate from '../SelectFilterDate';
import {convertCoin} from '~/common/funcs/convertCoin';
import {Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import SelectFilterOption from '../SelectFilterOption';

function ChartServiceCompany({}: PropsChartServiceCompany) {
	const data = [
		{
			name: '21/07/2024',
			total: 4000,
		},
		{
			name: '22/07/2024',
			total: 2000,
		},
		{
			name: '23/07/2024',
			total: 2000,
		},
		{
			name: '24/07/2024',
			total: 1000,
		},
		{
			name: '25/07/2024',
			total: 200,
		},
		{
			name: '26/07/2024',
			total: 2000,
		},
		{
			name: '27/07/2024',
			total: 2000,
		},
	];
	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h3>Biểu đầu thống kê hàng xuất của tổng công ty</h3>
				<div className={styles.filter}>
					<SelectFilterOption />
					<SelectFilterDate />
				</div>
			</div>
			<div className={styles.head_data}>
				<div className={styles.data_item}>
					<div style={{background: '#D95656'}} className={styles.box_color}></div>
					<p className={styles.data_total}>
						Tổng khối lượng cân dịch vụ: <span>{convertCoin(1460203)}</span>
					</p>
				</div>
			</div>
			<div className={styles.main_chart}>
				<ResponsiveContainer width='100%' height='100%'>
					<BarChart
						width={500}
						height={300}
						data={data}
						margin={{
							top: 8,
							right: 16,
							left: -8,
							bottom: 8,
						}}
						barSize={44}
					>
						<XAxis dataKey='name' scale='point' padding={{left: 40, right: 10}} />
						<YAxis />
						<Tooltip />
						<CartesianGrid strokeDasharray='3 3' vertical={false} />
						<Bar dataKey='total' stackId='a' fill='#D95656' />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

export default ChartServiceCompany;
