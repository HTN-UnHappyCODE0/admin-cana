import React, {useState} from 'react';
import Moment from 'react-moment';
import {PropsMainPageRole} from './interfaces';
import styles from './MainPageRole.module.scss';
import Search from '~/components/common/Search';
import {PATH} from '~/constants/config';
import DataWrapper from '~/components/common/DataWrapper';
import Noti from '~/components/common/DataWrapper/components/Noti';
import {useRouter} from 'next/router';
import Table from '~/components/common/Table';
import Pagination from '~/components/common/Pagination';
import IconCustom from '~/components/common/IconCustom';
import {LuPencil} from 'react-icons/lu';
import {Trash} from 'iconsax-react';
import Button from '~/components/common/Button';
import Dialog from '~/components/common/Dialog';
import Image from 'next/image';
import icons from '~/constants/images/icons';
function MainPageRole({}: PropsMainPageRole) {
	const router = useRouter();

	const {_page, _pageSize, _keyword, _time, _dateFrom, _dateTo} = router.query;
	const [openDelete, setOpenDelete] = useState<boolean>(false);
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.main_search}>
					<div className={styles.search}>
						<Search placeholder='Tìm kiếm theo id, tên' keyName='_keyword' />
					</div>
				</div>
				<div className={styles.btn}>
					<Button p_8_16 rounded_2 href={PATH.ThemVaiTro} icon={<Image alt='icon add' src={icons.add} width={20} height={20} />}>
						Thêm vai trò
					</Button>
				</div>
			</div>

			<div className={styles.table}>
				<DataWrapper data={[1, 2, 3]} loading={false} noti={<Noti des='Hiện tại chưa có vai trò nào, thêm ngay?' />}>
					<Table
						data={[1, 2, 3]}
						column={[
							{
								title: 'STT',
								render: (data: any, index: number) => <>{index + 1}</>,
							},
							{
								title: 'Tên vai trò',
								render: (data: any) => <>Admin</>,
							},
							{
								title: 'Ghi chú',
								render: (data: any) => <>Ghi chú</>,
							},
							{
								title: 'Số lượng',
								render: (data: any) => <>3</>,
							},
							{
								title: 'Thời gian tạo',
								render: (data: any) => (
									<Moment
										date={'Mon May 13 2024 11:05:09 GMT+0700 (Indochina Time)'}
										format='HH:mm - DD/MM/YYYY'
									></Moment>
								),
							},
							{
								title: 'Người tạo',
								render: (data: any) => <>Nguyễn Minh Vũ</>,
							},
							{
								title: 'Tác vụ',
								render: (data: any) => (
									<div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
										<IconCustom
											edit
											icon={<LuPencil fontSize={20} fontWeight={600} />}
											tooltip='Chỉnh sửa'
											color='#777E90'
											onClick={() => {}}
										/>

										<IconCustom
											delete
											icon={<Trash size='22' />}
											tooltip='Xóa'
											color='#777E90'
											onClick={() => {
												setOpenDelete(true);
											}}
										/>
									</div>
								),
							},
						]}
					/>
					<Pagination
						currentPage={Number(_page) || 1}
						total={400}
						pageSize={Number(_pageSize) || 20}
						dependencies={[_pageSize, _keyword, _time, _dateFrom, _dateTo]}
					/>
				</DataWrapper>
			</div>
			<Dialog
				danger
				open={openDelete}
				onClose={() => setOpenDelete(false)}
				title='Xóa vai trò'
				note='Bạn có chắc chắn muốn xóa vai trò này?'
				onSubmit={() => setOpenDelete(false)}
			/>
		</div>
	);
}

export default MainPageRole;
