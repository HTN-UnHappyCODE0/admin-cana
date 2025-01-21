import React, {Fragment, useState} from 'react';
import {ICompany, PropsPageCompany} from './interfaces';
import styles from './PageCompany.module.scss';
import Search from '~/components/common/Search';
import FilterCustom from '~/components/common/FilterCustom';
import Button from '~/components/common/Button';
import {PATH} from '~/constants/config';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import {useRouter} from 'next/router';
import Table from '~/components/common/Table';
import {LuPencil} from 'react-icons/lu';
import IconCustom from '~/components/common/IconCustom';
import Pagination from '~/components/common/Pagination';
import Dialog from '~/components/common/Dialog';
import {HiOutlineLockClosed, HiOutlineLockOpen} from 'react-icons/hi';
import Image from 'next/image';
import icons from '~/constants/images/icons';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND, QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import TagStatus from '~/components/common/TagStatus';
import Loading from '~/components/common/Loading';
import companyServices from '~/services/companyServices';
import Tippy from '@tippyjs/react';
import TippyHeadless from '@tippyjs/react/headless';
import clsx from 'clsx';
import FlexLayout from '~/components/layouts/FlexLayout';
import FullColumnFlex from '~/components/layouts/FlexLayout/components/FullColumnFlex';
function PageCompany({}: PropsPageCompany) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_page, _pageSize, _keyword, _manager, _dateFrom, _dateTo, _status} = router.query;
	const [uuidDescription, setUuidDescription] = useState<string>('');
	const [dataStatus, setDataStatus] = useState<ICompany | null>(null);

	// Lấy danh sách KV cảng xuất khẩu
	const listCompany = useQuery([QUERY_KEY.table_cong_ty, _page, _pageSize, _keyword, _status], {
		queryFn: () =>
			httpRequest({
				isList: true,
				http: companyServices.listCompany({
					page: Number(_page) || 1,
					pageSize: Number(_pageSize) || 200,
					keyword: (_keyword as string) || '',
					isPaging: CONFIG_PAGING.IS_PAGING,
					isDescending: CONFIG_DESCENDING.IS_DESCENDING,
					typeFind: CONFIG_TYPE_FIND.TABLE,
					status: !!_status ? Number(_status) : null,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const funcChangeStatus = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: dataStatus?.status == CONFIG_STATUS.BI_KHOA ? 'Mở khóa thành công' : 'Khóa thành công',
				http: companyServices.changeStatus({
					uuid: dataStatus?.uuid!,
					status: dataStatus?.status! == CONFIG_STATUS.HOAT_DONG ? CONFIG_STATUS.BI_KHOA : CONFIG_STATUS.HOAT_DONG,
				}),
			});
		},
		onSuccess: (data) => {
			if (data) {
				setDataStatus(null);
				queryClient.invalidateQueries([QUERY_KEY.table_cong_ty, _page, _pageSize, _keyword, _status]);
			}
		},
	});

	return (
		<Fragment>
			<FlexLayout>
				<Loading loading={funcChangeStatus.isLoading} />
				<div className={styles.header}>
					<div className={styles.main_search}>
						<div className={styles.search}>
							<Search keyName='_keyword' placeholder='Tìm kiếm theo tên KV cảng xuất khẩu' />
						</div>

						<div className={styles.filter}>
							<FilterCustom
								isSearch
								name='Trạng thái'
								query='_status'
								listFilter={[
									{
										id: CONFIG_STATUS.BI_KHOA,
										name: 'Bị khóa',
									},
									{
										id: CONFIG_STATUS.HOAT_DONG,
										name: 'Hoạt động',
									},
								]}
							/>
						</div>
					</div>

					<div className={styles.btn}>
						<Button
							href={PATH.ThemMoiCongTy}
							p_8_16
							rounded_2
							icon={<Image alt='icon add' src={icons.add} width={20} height={20} />}
						>
							Thêm KV cảng xuất khẩu
						</Button>
					</div>
				</div>

				<FullColumnFlex>
					<DataWrapper
						data={listCompany?.data?.items || []}
						loading={listCompany?.isLoading}
						noti={
							<Noti
								titleButton='Thêm KV cảng xuất khẩu'
								onClick={() => router.push(PATH.ThemMoiCongTy)}
								des='Hiện tại chưa có KV cảng xuất khẩu nào, thêm ngay?'
							/>
						}
					>
						<Table
							fixedHeader={true}
							data={listCompany?.data?.items || []}
							column={[
								{
									title: 'STT',
									render: (data: ICompany, index: number) => <>{index + 1}</>,
								},

								{
									title: 'Tên KV cảng xuất khẩu',
									fixedLeft: true,
									render: (data: ICompany) => <>{data?.name || '---'}</>,
								},

								{
									title: 'Số điện thoại',
									render: (data: ICompany) => <>{data?.phoneNumber || '---'}</>,
								},
								{
									title: 'Người liên hệ',
									render: (data: ICompany) => <>{data?.dirrector || '---'}</>,
								},
								{
									title: 'Địa chỉ chi tiết',
									render: (data: ICompany) => <>{data?.address || '---'}</>,
								},
								{
									title: 'Ghi chú',
									render: (data: ICompany) => (
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
									title: 'Trạng thái',
									render: (data: ICompany) => <TagStatus status={data.status} />,
								},
								{
									title: 'Tác vụ',
									fixedRight: true,
									render: (data: ICompany) => (
										<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
											<IconCustom
												edit
												icon={<LuPencil fontSize={20} fontWeight={600} />}
												tooltip='Chỉnh sửa'
												color='#777E90'
												href={`/cong-ty/chinh-sua?_id=${data?.uuid}`}
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
						total={listCompany?.data?.pagination?.totalCount}
						pageSize={Number(_pageSize) || 200}
						dependencies={[_pageSize, _keyword, _status]}
					/>
				</FullColumnFlex>
			</FlexLayout>

			<Dialog
				danger={dataStatus?.status == CONFIG_STATUS.HOAT_DONG}
				green={dataStatus?.status != CONFIG_STATUS.HOAT_DONG}
				open={!!dataStatus}
				onClose={() => setDataStatus(null)}
				title={dataStatus?.status == CONFIG_STATUS.HOAT_DONG ? 'Khóa KV cảng xuất khẩu' : 'Dùng KV cảng xuất khẩu'}
				note={
					dataStatus?.status == CONFIG_STATUS.HOAT_DONG
						? 'Bạn có chắc chắn muốn khóa KV cảng xuất khẩu này?'
						: 'Bạn có chắc chắn muốn dùng KV cảng xuất khẩu này?'
				}
				onSubmit={funcChangeStatus.mutate}
			/>
		</Fragment>
	);
}

export default PageCompany;
