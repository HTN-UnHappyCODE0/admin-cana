import {Fragment, useState} from 'react';

import {useMutation, useQueryClient} from '@tanstack/react-query';
import clsx from 'clsx';
import {HiOutlineLockClosed, HiOutlineLockOpen, HiOutlineMap} from 'react-icons/hi';
import {IoIosArrowDown} from 'react-icons/io';
import {LuPencil} from 'react-icons/lu';
import {convertCoin} from '~/common/funcs/convertCoin';
import Dialog from '~/components/common/Dialog';
import IconCustom from '~/components/common/IconCustom';
import Loading from '~/components/common/Loading';
import TagStatus from '~/components/common/TagStatus';
import {CONFIG_STATUS, QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import storageServices from '~/services/storageServices';
import warehouseServices from '~/services/warehouseServices';
import styles from './ItemTableWarehouse.module.scss';
import {PropsItemTableWarehouse} from './interfaces';
import Link from 'next/link';
import {useRouter} from 'next/router';

function ItemTableWarehouse({order, dataWarehouse, isParent = true, uuidParent = ''}: PropsItemTableWarehouse) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const [openArrow, setOpenArrow] = useState<boolean>(true);
	const [dataStatus, setDataStatus] = useState<any | null>(null);

	const fucnChangeStatusWarehouse = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: dataStatus?.status == CONFIG_STATUS.HOAT_DONG ? 'Khóa kho hàng thành công!' : 'Mở khóa kho hàng thành công!',
				http: warehouseServices.changeStatusWarehouse({
					uuid: dataStatus?.uuid!,
					status: dataStatus?.status! == CONFIG_STATUS.HOAT_DONG ? CONFIG_STATUS.BI_KHOA : CONFIG_STATUS.HOAT_DONG,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setDataStatus(null);
				queryClient.invalidateQueries([QUERY_KEY.table_kho_hang_chinh]);
			}
		},
	});

	const fucnChangeStatusStorage = useMutation({
		mutationFn: () => {
			return httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: dataStatus?.status == CONFIG_STATUS.HOAT_DONG ? 'Khóa kho hàng thành công!' : 'Mở khóa kho hàng thành công!',
				http: storageServices.changeStatusStorage({
					uuid: dataStatus?.uuid!,
					status: dataStatus?.status! == CONFIG_STATUS.HOAT_DONG ? CONFIG_STATUS.BI_KHOA : CONFIG_STATUS.HOAT_DONG,
				}),
			});
		},
		onSuccess(data) {
			if (data) {
				setDataStatus(null);
				queryClient.invalidateQueries([QUERY_KEY.table_kho_hang_chinh]);
			}
		},
	});

	const handleChangeStatus = async () => {
		if (isParent) {
			return fucnChangeStatusWarehouse.mutate();
		} else {
			return fucnChangeStatusStorage.mutate();
		}
	};

	return (
		<Fragment>
			<Loading loading={fucnChangeStatusStorage.isLoading || fucnChangeStatusWarehouse.isLoading} />
			<div className={clsx(styles.container, {[styles.isChild]: !isParent})}>
				<div style={{width: '44px', paddingRight: '16px'}} className={styles.box_arrow} onClick={() => setOpenArrow(!openArrow)}>
					{isParent && (
						<IoIosArrowDown
							className={clsx(styles.arrow, {[styles.activeArrow]: openArrow})}
							size={18}
							color='rgba(45, 116, 255, 1)'
						/>
					)}
				</div>
				<p style={{width: '44px', paddingRight: '16px'}}>{order}</p>
				<p style={{width: '120px', paddingRight: '16px'}}>{dataWarehouse?.code || '---'}</p>
				<Link
					href={isParent ? `/kho-hang/${dataWarehouse.uuid}` : `/kho-hang/${dataWarehouse.uuid}?_storage=true`}
					className={styles.link}
					style={{width: '180px', paddingRight: '16px'}}
				>
					{dataWarehouse?.name || '---'}
				</Link>
				<p className={styles.table_head_item}>{dataWarehouse?.storage ? dataWarehouse?.storage?.length : '---'}</p>
				<p className={styles.table_head_item}>{dataWarehouse?.amountMt ? convertCoin(dataWarehouse?.amountMt) : 0}</p>
				<p className={styles.table_head_item}>{dataWarehouse?.amountBdmt ? convertCoin(dataWarehouse?.amountBdmt) : 0}</p>
				<p className={styles.table_head_item}>{dataWarehouse?.amountIn ? convertCoin(dataWarehouse?.amountIn) : 0}</p>
				<p className={styles.table_head_item}>{dataWarehouse?.amountOut ? convertCoin(dataWarehouse?.amountOut) : 0}</p>
				<div style={{width: '120px', paddingRight: '16px'}}>
					<TagStatus status={dataWarehouse.status} />
				</div>
				<div style={{width: '120px', paddingRight: '16px'}} className={styles.control}>
					<IconCustom
						edit
						icon={<LuPencil fontSize={20} fontWeight={600} />}
						tooltip='Chỉnh sửa'
						color='#777E90'
						onClick={() => {
							if (isParent) {
								router.push(`/kho-hang/chinh-sua?_id=${dataWarehouse?.uuid}`);
							} else {
								router.replace(
									{
										pathname: router.pathname,
										query: {
											...router.query,
											_action: 'update-storage',
											_uuidStorage: dataWarehouse.uuid,
										},
									},
									undefined,
									{shallow: true, scroll: false}
								);
							}
						}}
					/>
					<IconCustom
						edit
						icon={
							dataWarehouse?.status == CONFIG_STATUS.HOAT_DONG ? (
								<HiOutlineLockClosed size='22' />
							) : (
								<HiOutlineLockOpen size='22' />
							)
						}
						tooltip={dataWarehouse.status == CONFIG_STATUS.HOAT_DONG ? 'Khóa kho hàng' : 'Dùng kho hàng'}
						color='#777E90'
						onClick={() => setDataStatus(dataWarehouse)}
					/>
					{isParent && (
						<IconCustom
							edit
							icon={<HiOutlineMap size='22' />}
							tooltip={'Sơ đồ kho hàng'}
							color='#777E90'
							href={`/kho-hang/so-do/${dataWarehouse?.uuid}`}
						/>
					)}
				</div>
			</div>

			{openArrow && !!dataWarehouse?.storage ? (
				<div className={styles.list_storage}>
					{dataWarehouse?.storage?.map((v: any, i: number) => (
						<ItemTableWarehouse key={v.uuid} order={i + 1} dataWarehouse={v} isParent={false} uuidParent={uuidParent} />
					))}
				</div>
			) : null}

			<Dialog
				danger
				open={!!dataStatus}
				onClose={() => setDataStatus(null)}
				title={dataStatus?.status == CONFIG_STATUS.HOAT_DONG ? 'Khóa kho hàng' : 'Mở khóa kho hàng'}
				note={
					dataStatus?.status == CONFIG_STATUS.HOAT_DONG
						? 'Bạn có chắc chắn muốn khóa kho hàng này?'
						: 'Bạn có chắc chắn muốn mở khóa kho hàng này?'
				}
				onSubmit={handleChangeStatus}
			/>
		</Fragment>
	);
}

export default ItemTableWarehouse;
