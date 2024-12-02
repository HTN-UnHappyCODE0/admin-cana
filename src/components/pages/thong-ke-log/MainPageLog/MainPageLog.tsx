import React, {Fragment, useRef, useState} from 'react';

import {PropsMainPageLog} from './interfaces';
import styles from './MainPageLog.module.scss';
import Search from '~/components/common/Search';
import FilterCustom from '~/components/common/FilterCustom';
import Button from '~/components/common/Button';
import {PATH} from '~/constants/config';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import {useRouter} from 'next/router';
import Table from '~/components/common/Table';
import IconCustom from '~/components/common/IconCustom';
import {LuPencil} from 'react-icons/lu';
import {TickCircle, UserAdd} from 'iconsax-react';
import Pagination from '~/components/common/Pagination';
import Dialog from '~/components/common/Dialog';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import Link from 'next/link';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {
	CONFIG_DESCENDING,
	CONFIG_PAGING,
	CONFIG_STATUS,
	CONFIG_TYPE_FIND,
	QUERY_KEY,
	TYPE_DATE,
	TYPE_UPDATE_BILL,
} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import userServices from '~/services/userServices';
import Loading from '~/components/common/Loading';
import {HiOutlineLockClosed, HiOutlineLockOpen} from 'react-icons/hi';
import TagStatus from '~/components/common/TagStatus';
import regencyServices from '~/services/regencyServices';
import Popup from '~/components/common/Popup';
import Tippy from '@tippyjs/react';
import TippyHeadless from '@tippyjs/react/headless';
import clsx from 'clsx';
import FlexLayout from '~/components/layouts/FlexLayout';
import FullColumnFlex from '~/components/layouts/FlexLayout/components/FullColumnFlex';
import {useSelector} from 'react-redux';
import {RootState} from '~/redux/store';
import Moment from 'react-moment';
import logServices from '~/services/logServices';
import DateRangerCustom from '~/components/common/DateRangerCustom';

function MainPageLog({}: PropsMainPageLog) {
	const router = useRouter();

	const {_page, _pageSize, _userUuid, _keyword, _status, _dateFrom, _dateTo} = router.query;

	const listLog = useQuery([QUERY_KEY.table_nhan_vien, _page, _pageSize, _keyword, _userUuid, _status, _dateFrom, _dateTo], {
		queryFn: () =>
			httpRequest({
				isList: true,
				http: logServices.getListActionAudit({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 200,
					keyword: (_keyword as string) || '',
					isPaging: CONFIG_PAGING.IS_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.TABLE,
					status: !!_status ? Number(_status) : null,
					caseId: null,
					weightSessionUuid: '',
					type: null,
					username: _userUuid as string,
					timeStart: _dateFrom ? (_dateFrom as string) : null,
					timeEnd: _dateTo ? (_dateTo as string) : null,
				}),
			}),
		select(data) {
			return data;
		},
	});

	return (
		<Fragment>
			<div className={styles.header}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keyword' placeholder='Tìm kiếm...' />
					</div>
					<div className={styles.filter}>
						<DateRangerCustom titleTime='Thời gian' typeDateDefault={TYPE_DATE.TODAY} />
					</div>
				</div>
			</div>

			<div className={styles.table}>
				<DataWrapper
					data={listLog?.data?.items || []}
					loading={listLog?.isLoading}
					noti={<Noti des='Dữ liệu trống?' disableButton />}
				>
					<Table
						data={listLog?.data?.items || []}
						column={[
							{
								title: 'STT',
								render: (data: any, index: number) => <>{index + 1}</>,
							},
							{
								title: 'Tài khoản',
								fixedLeft: true,
								render: (data: any) => <>{data?.username || '---'}</>,
							},
							{
								title: 'Tác vụ',
								render: (data: any) => <>{data?.nameAction || '---'}</>,
							},
							{
								title: 'Trang thái',
								render: (data: any) => (
									<p style={{fontWeight: 600}}>
										{data?.actionId == TYPE_UPDATE_BILL.DUYET_PHIEU && (
											<span style={{color: '#6FD195'}}>Duyệt phiếu</span>
										)}
										{data?.actionId == TYPE_UPDATE_BILL.DOI_TRANG_THAI && (
											<span style={{color: '#FFAE4C'}}>Đổi trạng thái</span>
										)}
										{data?.actionId == TYPE_UPDATE_BILL.CHINH_SUA && <span style={{color: '#3CC3DF'}}>Chỉnh sửa</span>}
										{data?.actionId == TYPE_UPDATE_BILL.TU_CHOI_DUYET && (
											<span style={{color: '#D95656'}}>Từ chối duyệt</span>
										)}
									</p>
								),
							},
							{
								title: 'Thời gian',
								render: (data: any) => (
									<>{data?.created ? <Moment date={data?.created} format='HH:mm, DD/MM/YYYY' /> : '---'}</>
								),
							},
							{
								title: 'Lý do',
								render: (data: any) => <>{data?.description || '---'}</>,
							},
						]}
					/>
				</DataWrapper>
				<Pagination
					currentPage={Number(_page) || 1}
					pageSize={Number(_pageSize) || 200}
					total={listLog?.data?.pagination?.totalCount}
					dependencies={[_keyword, _pageSize]}
				/>
			</div>
		</Fragment>
	);
}

export default MainPageLog;
