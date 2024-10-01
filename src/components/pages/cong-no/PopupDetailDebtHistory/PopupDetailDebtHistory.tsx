import React from 'react';
import {IDetailTransaction, PropsPopupDetailDebtHistory} from './interfaces';
import styles from './PopupDetailDebtHistory.module.scss';
import {IoClose} from 'react-icons/io5';
import {useRouter} from 'next/router';
import {useQuery} from '@tanstack/react-query';
import {QUERY_KEY, TYPE_TRANSACTION} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import transactionServices from '~/services/transactionServices';
import Moment from 'react-moment';
import {convertCoin} from '~/common/funcs/convertCoin';
import StatePaymentMode from '../StatePaymentMode';
import SliderDebt from '~/components/common/SliderDebt';

function PopupDetailDebtHistory({onClose}: PropsPopupDetailDebtHistory) {
	const router = useRouter();

	const {_uuid} = router.query;

	const {data: detailTransaction} = useQuery<IDetailTransaction>([QUERY_KEY.chi_tiet_lich_su_thanh_toan, _uuid], {
		queryFn: () =>
			httpRequest({
				http: transactionServices.detailTransaction({
					uuid: _uuid as string,
				}),
			}),
		onSuccess(data) {
			return data;
		},
		enabled: !!_uuid,
	});

	const getTextPaymentMethod = (amountCash: number, amountBank: number) => {
		if (amountCash > 0 && amountBank == 0) {
			return 'Tiền mặt';
		}
		if (amountCash == 0 && amountBank > 0) {
			return 'Chuyển khoản';
		}
		if (amountCash > 0 && amountBank > 0) {
			return 'Tiền mặt + Chuyển khoản';
		}
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Chi tiết thanh toán</h2>
			<table>
				<thead>
					<tr>
						<th className={styles.table_header_left}>Thông tin phiếu</th>
						<th className={styles.table_header_right}>Tệp đính kèm</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className={styles.left}>
							<ul className={styles.list_detail}>
								<li>
									<p>Mã giao dịch :</p>
									<p>{detailTransaction?.code || '---'}</p>
								</li>
								<li>
									<p>Thanh toán cho :</p>
									<p>{detailTransaction?.partnerUu?.name}</p>
								</li>
								<li>
									<p>Phương thức thanh toán :</p>
									<p>{getTextPaymentMethod(detailTransaction?.amountCash!, detailTransaction?.amountBank!)}</p>
								</li>
								<li>
									<p>Thời gian thanh toán :</p>
									<p>
										<Moment date={detailTransaction?.transTime} format='DD/MM/YYYY' />
									</p>
								</li>
								{(detailTransaction?.type == TYPE_TRANSACTION.THANH_TOAN ||
									detailTransaction?.type == TYPE_TRANSACTION.THU_HOI) && (
									<>
										<li>
											<p>Tiền mặt :</p>
											<p>{convertCoin(detailTransaction?.amountCash!)} VND</p>
										</li>
										<li>
											<p>Tiền chuyển khoản :</p>
											<p>{convertCoin(detailTransaction?.amountBank!)} VND</p>
										</li>
										<li>
											<p>Tổng số tiền :</p>
											<p style={{color: 'var(--blue)'}}>{convertCoin(detailTransaction?.totalAmount!)} VND</p>
										</li>
									</>
								)}

								{detailTransaction?.type == TYPE_TRANSACTION.THUE && (
									<>
										<li>
											<p>Tiền thuế :</p>
											<p>{convertCoin(detailTransaction?.amountCash!)} VND</p>
										</li>
									</>
								)}

								<li>
									<p>Hình thức :</p>
									<p>
										<StatePaymentMode state={detailTransaction?.type!} />
									</p>
								</li>
								<li>
									<p>Người tạo :</p>
									<p>{detailTransaction?.creatorUu?.username}</p>
								</li>
							</ul>
						</td>
						<td className={styles.right}>
							<SliderDebt listImage={detailTransaction?.path! || []} />
						</td>
					</tr>
				</tbody>
			</table>

			<div className={styles.icon_close} onClick={onClose}>
				<IoClose size={24} color='#23262F' />
			</div>
		</div>
	);
}

export default PopupDetailDebtHistory;
