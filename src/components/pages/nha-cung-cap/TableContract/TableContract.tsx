import React, {useState} from 'react';

import {PropsTableContract} from './interfaces';
import styles from './TableContract.module.scss';
import DateRangerCustom from '~/components/common/DateRangerCustom';
import DataWrapper from '~/components/common/DataWrapper';
import Table from '~/components/common/Table';
import Noti from '~/components/common/DataWrapper/components/Noti';
import {convertCoin} from '~/common/funcs/convertCoin';
import router from 'next/router';
import Pagination from '~/components/common/Pagination';
import {
	CONFIG_DESCENDING,
	CONFIG_PAGING,
	CONFIG_STATUS,
	CONFIG_TYPE_FIND,
	QUERY_KEY,
	TYPE_DATE,
	TYPE_GROUPBY,
} from '~/constants/config/enum';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {httpRequest} from '~/services';
import dashbroadServices from '~/services/dashbroadServices';
import clsx from 'clsx';
import Moment from 'react-moment';
import FlexLayout from '~/components/layouts/FlexLayout';
import FullColumnFlex from '~/components/layouts/FlexLayout/components/FullColumnFlex';
import FilterCustom from '~/components/common/FilterCustom';
import Tippy from '@tippyjs/react';
import TippyHeadless from '@tippyjs/react/headless';
import companyServices from '~/services/companyServices';
import Search from '~/components/common/Search';
import contractServices from '~/services/contractServices';
import Dialog from '~/components/common/Dialog';
import SelectFilterMany from '~/components/common/SelectFilterMany';
import Button from '~/components/common/Button';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import Popup from '~/components/common/Popup';
import FormCreateContract from '../FormCreateContract';
import IconCustom from '~/components/common/IconCustom';
import {LuPencil} from 'react-icons/lu';
import FormUpdateContract from '../FormUpdateContract';
import Loading from '~/components/common/Loading';
import {HiOutlineLockClosed, HiOutlineLockOpen} from 'react-icons/hi';
import TagStatus from '~/components/common/TagStatus';
import receiverServices from '~/services/receiverServices';

function TableContract({}: PropsTableContract) {
	const {_page, _pageSize, _keywordContract, _status, _uuid} = router.query;
	const [dataStatus, setDataStatus] = useState<any>(null);
	const [contractUuid, setcontractUuid] = useState<string[]>([]);
	const [create, setCreate] = useState<boolean>(false);
	const [update, setUpdate] = useState<string | null>(null);
	const queryClient = useQueryClient();
	const [uuidDescription, setUuidDescription] = useState<string>('');
	const [uuidNote, setUuidNote] = useState<string>('');

	const listReceiver = useQuery([QUERY_KEY.dropdown_cong_ty_nhan], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: receiverServices.getListReceiver({
					page: 1,
					pageSize: 50,
					keyword: '',
					isPaging: CONFIG_PAGING.NO_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.DROPDOWN,
					status: CONFIG_STATUS.HOAT_DONG,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listContract = useQuery([QUERY_KEY.table_lich_su_hop_dong, _page, _pageSize, _keywordContract, _status, _uuid, contractUuid], {
		queryFn: () =>
			httpRequest({
				isList: true,
				http: contractServices.getListContract({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 200,
					keyword: (_keywordContract as string) || '',
					isPaging: CONFIG_PAGING.IS_PAGING,
					isDescending: CONFIG_DESCENDING.NO_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.TABLE,
					status: !!_status ? Number(_status) : null,
					listPartnerUuid: [_uuid as string],
					listReceiverUuid: contractUuid,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!_uuid,
	});

	const funcChangeStatus = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: dataStatus?.status == CONFIG_STATUS.HOAT_DONG ? 'Dừng hoạt động thành công' : 'Mở khóa thành công',
				http: contractServices.changeStatus({
					uuid: dataStatus?.uuid!,
					status: dataStatus?.status! == CONFIG_STATUS.HOAT_DONG ? CONFIG_STATUS.BI_KHOA : CONFIG_STATUS.HOAT_DONG,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setDataStatus(null);
				queryClient.invalidateQueries([]);
			}
		},
	});

	return (
		<FlexLayout isPage={false}>
			<Loading loading={funcChangeStatus.isLoading} />
			<div className={styles.header}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search keyName='_keywordContract' placeholder='Tìm kiếm theo hợp đồng' />
					</div>
					<div className={styles.filter}>
						<FilterCustom
							isSearch
							name='Trạng thái'
							query='_status'
							listFilter={[
								{
									id: CONFIG_STATUS.HOAT_DONG,
									name: 'Đang hoạt động',
								},
								{
									id: CONFIG_STATUS.BI_KHOA,
									name: 'Bị khóa',
								},
							]}
						/>
					</div>
					<SelectFilterMany
						selectedIds={contractUuid}
						setSelectedIds={setcontractUuid}
						listData={listReceiver?.data?.map((v: any) => ({
							uuid: v?.uuid,
							name: v?.name,
						}))}
						name='Quản lý công ty nhận'
					/>
				</div>
				<div>
					<Button
						p_8_16
						rounded_2
						icon={<Image alt='icon add' src={icons.add} width={20} height={20} />}
						onClick={() => {
							setCreate(true);
						}}
					>
						Thêm hợp đồng
					</Button>
				</div>
			</div>

			<FullColumnFlex>
				<DataWrapper
					data={listContract?.data?.items || []}
					loading={listContract?.isLoading}
					noti={<Noti disableButton={true} title='Dữ liệu trống!' des='Danh sách hợp đồng trống!' />}
				>
					<Table
						fixedHeader={true}
						data={listContract?.data?.items || []}
						column={[
							{
								title: 'STT',
								fixedLeft: true,
								render: (data: any, index: number) => <>{index + 1}</>,
							},
							{
								title: 'Tên hợp đồng',
								fixedLeft: true,
								render: (data: any) => <p style={{color: '#2367ed', fontWeight: 600}}>{data?.name}</p>,
							},
							{
								title: 'bên mua',
								render: (data: any) => <p>{data?.receiverUu?.name}</p>,
							},
							{
								title: 'Thơi gian bắt đầu',
								render: (data: any) => <Moment date={data?.timeStart} format='DD/MM/YYYY' />,
							},
							{
								title: 'Thơi gian kết thúc',
								render: (data: any) => <Moment date={data?.timeEnd} format='DD/MM/YYYY' />,
							},

							{
								title: 'Trạng thái',
								render: (data: any) => <TagStatus status={data.status} />,
							},
							{
								title: 'Ghi chú 1',
								render: (data: any) => (
									<TippyHeadless
										maxWidth={'100%'}
										interactive
										onClickOutside={() => setUuidNote('')}
										visible={uuidNote == data?.uuid}
										placement='bottom'
										render={(attrs) => (
											<div className={styles.main_description}>
												<p>{data?.note}</p>
											</div>
										)}
									>
										<Tippy content='Xem chi tiết ghi chú 1'>
											<p
												onClick={() => {
													if (!data.note) {
														return;
													} else {
														setUuidNote(uuidNote ? '' : data.uuid);
													}
												}}
												className={clsx(styles.description, {[styles.active]: uuidNote == data.uuid})}
											>
												{data?.note || '---'}
											</p>
										</Tippy>
									</TippyHeadless>
								),
							},
							{
								title: 'Ghi chú 2',
								render: (data: any) => (
									<TippyHeadless
										maxWidth={'100%'}
										interactive
										onClickOutside={() => setUuidDescription('')}
										visible={uuidDescription == data?.uuid}
										placement='bottom'
										render={(attrs) => (
											<div className={styles.main_description}>
												<p>{data?.description}</p>
											</div>
										)}
									>
										<Tippy content='Xem chi tiết mô tả'>
											<p
												onClick={() => {
													if (!data.description) {
														return;
													} else {
														setUuidDescription(uuidDescription ? '' : data.uuid);
													}
												}}
												className={clsx(styles.description, {[styles.active]: uuidDescription == data.uuid})}
											>
												{data?.description || '---'}
											</p>
										</Tippy>
									</TippyHeadless>
								),
							},
							{
								title: 'Tác vụ',
								fixedRight: true,
								render: (data: any) => (
									<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
										<IconCustom
											edit
											icon={<LuPencil fontSize={20} fontWeight={600} />}
											tooltip='Chỉnh sửa'
											color='#777E90'
											onClick={() => {
												setUpdate(data?.uuid);
											}}
										/>
										<IconCustom
											lock
											icon={
												data?.status == CONFIG_STATUS.HOAT_DONG ? (
													<HiOutlineLockClosed size='22' />
												) : (
													<HiOutlineLockOpen size='22' />
												)
											}
											tooltip={data.status == CONFIG_STATUS.HOAT_DONG ? 'Khóa' : 'Mở khóa'}
											color='#777E90'
											onClick={() => {
												setDataStatus(data);
											}}
										/>
									</div>
								),
							},
						]}
					/>
				</DataWrapper>
				<Pagination
					currentPage={Number(_page) || 1}
					pageSize={Number(_pageSize) || 200}
					total={listContract?.data?.pagination?.totalCount}
					dependencies={[_pageSize, _keywordContract, _status, _uuid]}
				/>
			</FullColumnFlex>
			<Dialog
				danger={dataStatus?.status == CONFIG_STATUS.HOAT_DONG}
				green={dataStatus?.status != CONFIG_STATUS.HOAT_DONG}
				open={!!dataStatus}
				onClose={() => setDataStatus(null)}
				title={dataStatus?.status == CONFIG_STATUS.HOAT_DONG ? 'Khóa hợp đồng' : 'Mở khóa hợp đồng'}
				note={
					dataStatus?.status == CONFIG_STATUS.HOAT_DONG
						? 'Bạn có chắc chắn muốn khóa hợp đồng này?'
						: 'Bạn có chắc chắn muốn mở khóa hợp đồng này?'
				}
				onSubmit={funcChangeStatus.mutate}
			/>
			<Popup open={!!create} onClose={() => setCreate(false)}>
				<FormCreateContract onClose={() => setCreate(false)} />
			</Popup>
			<Popup open={!!update} onClose={() => setUpdate(null)}>
				<FormUpdateContract dataUuid={update} onClose={() => setUpdate(null)} />
			</Popup>
		</FlexLayout>
	);
}

export default TableContract;
