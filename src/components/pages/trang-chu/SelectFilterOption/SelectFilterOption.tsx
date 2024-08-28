import React, {useState} from 'react';
import TippyHeadless from '@tippyjs/react/headless';

import {PropsSelectFilterOption} from './interfaces';
import styles from './SelectFilterOption.module.scss';
import {useQuery} from '@tanstack/react-query';
import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND, QUERY_KEY, TYPE_PARTNER} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import partnerServices from '~/services/partnerServices';
import clsx from 'clsx';
import {BiCheck} from 'react-icons/bi';
import {removeVietnameseTones} from '~/common/funcs/optionConvert';
import {ArrowDown2} from 'iconsax-react';

function SelectFilterOption({}: PropsSelectFilterOption) {
	const [keyword, setKeyword] = useState<string>('');
	const [openPartner, setOpenPartner] = useState<boolean>(false);

	const [partnerUuid, setPartnerUuid] = useState<string>('');

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

	return (
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
							?.filter((v: any) => removeVietnameseTones(v.name)?.includes(keyword ? removeVietnameseTones(keyword) : ''))
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
			<div className={clsx(styles.btn_filter, {[styles.active]: openPartner})} onClick={() => setOpenPartner(!openPartner)}>
				<p>{partnerUuid == '' ? 'Tất cả nhà cung cấp' : listPartner?.data?.find((v: any) => v?.uuid == partnerUuid)?.name}</p>
				<div className={styles.arrow}>
					<ArrowDown2 size={16} />
				</div>
			</div>
		</TippyHeadless>
	);
}

export default SelectFilterOption;
