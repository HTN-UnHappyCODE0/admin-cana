import React, {useState} from 'react';
import TippyHeadless from '@tippyjs/react/headless';

import {PropsChartImportCompany} from './interfaces';
import styles from './ChartImportCompany.module.scss';
import {useQuery} from '@tanstack/react-query';
import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND, QUERY_KEY, TYPE_PARTNER} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import partnerServices from '~/services/partnerServices';
import RangeDatePicker from '~/components/common/RangeDatePicker';
import {ArrowDown2, Calendar} from 'iconsax-react';
import clsx from 'clsx';
import {removeVietnameseTones} from '~/common/funcs/optionConvert';
import {BiCheck} from 'react-icons/bi';
import Moment from 'react-moment';

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

function ChartImportCompany({}: PropsChartImportCompany) {
	const [keyword, setKeyword] = useState<string>('');
	const [openPartner, setOpenPartner] = useState<boolean>(false);
	const [openDate, setOpenDate] = useState<boolean>(false);

	const [partnerUuid, setPartnerUuid] = useState<string>('');
	const [date, setDate] = useState<{
		from: Date | null;
		to: Date | null;
	} | null>(null);

	const listPartner = useQuery([QUERY_KEY.dropdown_nha_cung_cap], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: partnerServices.listPartner({
					page: 1,
					pageSize: 20,
					keyword: '',
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					userUuid: '',
					status: CONFIG_STATUS.HOAT_DONG,
					provinceId: '',
					type: TYPE_PARTNER.NCC,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const data = [
		{
			name: '21/07/2024',
			'Tổng trọng lượng nhập hàng': 4000,
		},
		{
			name: '22/07/2024',
			'Tổng trọng lượng nhập hàng': 3000,
		},
		{
			name: '23/07/2024',
			'Tổng trọng lượng nhập hàng': 2000,
		},
		{
			name: '24/07/2024',
			'Tổng trọng lượng nhập hàng': 2780,
		},
		{
			name: '25/07/2024',
			'Tổng trọng lượng nhập hàng': 1890,
		},
		{
			name: '26/07/2024',
			'Tổng trọng lượng nhập hàng': 2390,
		},
		{
			name: '27/07/2024',
			'Tổng trọng lượng nhập hàng': 3490,
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.head}>
				<h3>Biểu đầu thống kê hàng nhập của tổng công ty</h3>
				<div className={styles.filter}>
					<TippyHeadless
						maxWidth={'100%'}
						interactive
						visible={openPartner}
						onClickOutside={() => setOpenPartner(false)}
						placement='bottom-start'
						render={() => (
							<div className={styles.main_option}>
								<input
									placeholder='Tìm kiếm...'
									className={styles.inputSearch}
									value={keyword}
									onChange={(e) => setKeyword(e.target.value)}
								/>
								<div className={styles.overflow}>
									<div
										className={clsx(styles.option, {
											[styles.option_active]: partnerUuid == '',
										})}
										onClick={() => {
											setOpenPartner(false);
											setPartnerUuid('');
										}}
									>
										<p>{'Tất cả'}</p>
										{partnerUuid == '' && (
											<div className={styles.icon_check}>
												<BiCheck fontSize={18} color='#5755FF' fontWeight={600} />
											</div>
										)}
									</div>
									{listPartner?.data
										?.filter((v: any) =>
											removeVietnameseTones(v.name)?.includes(keyword ? removeVietnameseTones(keyword) : '')
										)
										?.map((v: any) => (
											<div
												key={v?.uuid}
												className={clsx(styles.option, {
													[styles.option_active]: partnerUuid == v.uuid,
												})}
												onClick={() => {
													setOpenPartner(false);
													setPartnerUuid(v?.uuid);
												}}
											>
												<p>{v.name}</p>
												{partnerUuid == v.uuid && (
													<div className={styles.icon_check}>
														<BiCheck fontSize={20} fontWeight={600} />
													</div>
												)}
											</div>
										))}
								</div>
							</div>
						)}
					>
						<div
							className={clsx(styles.btn_filter, {[styles.active]: openPartner})}
							onClick={() => setOpenPartner(!openPartner)}
						>
							<p>
								{partnerUuid == ''
									? 'Tất cả nhà cung cấp'
									: listPartner?.data?.find((v: any) => v?.uuid == partnerUuid)?.name}
							</p>
							<div className={styles.arrow}>
								<ArrowDown2 size={16} />
							</div>
						</div>
					</TippyHeadless>

					<TippyHeadless
						maxWidth={'100%'}
						interactive
						visible={openDate}
						onClickOutside={() => setOpenDate(false)}
						placement='bottom-start'
						render={() => (
							<RangeDatePicker value={date} onSetValue={setDate} onClose={() => setOpenDate(false)} open={openDate} />
						)}
					>
						<div className={clsx(styles.btn_filter, {[styles.active]: openDate})} onClick={() => setOpenDate(!openDate)}>
							<div className={styles.box_icon}>
								<Calendar size={16} color='#6F767E' />
								<p>
									{date?.from && date?.to ? (
										<p>
											<Moment date={date?.from} format='DD/MM/YYYY' /> -{' '}
											<Moment date={date?.to} format='DD/MM/YYYY' />
										</p>
									) : (
										<p>Thời gian</p>
									)}
								</p>
							</div>
							<div className={styles.arrow}>
								<ArrowDown2 size={16} />
							</div>
						</div>
					</TippyHeadless>
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
						<Legend verticalAlign='top' align='center' />
						<CartesianGrid strokeDasharray='3 3' vertical={false} />
						<Bar dataKey='Tổng trọng lượng nhập hàng' fill='#2A85FF' />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
}

export default ChartImportCompany;
