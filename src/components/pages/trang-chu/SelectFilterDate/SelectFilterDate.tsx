import React, {useState} from 'react';

import TippyHeadless from '@tippyjs/react/headless';
import {ArrowDown2, Calendar} from 'iconsax-react';
import clsx from 'clsx';

import {PropsSelectFilterDate} from './interfaces';
import styles from './SelectFilterDate.module.scss';
import FilterDateOption from './FilterDateOption';
import {getTextDateRange} from '~/common/funcs/selectDate';
import Moment from 'react-moment';

function SelectFilterDate({}: PropsSelectFilterDate) {
	const [openDate, setOpenDate] = useState<boolean>(false);

	const [typeDate, setTypeDate] = useState<number | null>(null);
	const [date, setDate] = useState<{
		from: Date | null;
		to: Date | null;
	} | null>(null);

	return (
		<TippyHeadless
			maxWidth={'100%'}
			interactive
			visible={openDate}
			onClickOutside={() => setOpenDate(false)}
			placement='bottom-start'
			render={() => (
				<FilterDateOption
					date={date}
					setDate={setDate}
					typeDate={typeDate}
					setTypeDate={setTypeDate}
					show={openDate}
					setShow={setOpenDate}
				/>
			)}
		>
			<div className={clsx(styles.btn_filter, {[styles.active]: openDate})} onClick={() => setOpenDate(!openDate)}>
				<div className={styles.box_icon}>
					<Calendar size={16} color='#6F767E' />
					<p>
						<span style={{fontWeight: 600, marginRight: 4}}>Thời gian: </span>
						{Number(typeDate) == 8 ? (
							<span className={styles.value}>
								<Moment date={date?.from!} format='DD/MM/YYYY' /> - <Moment date={date?.to!} format='DD/MM/YYYY' />
							</span>
						) : (
							<span className={styles.value}>{getTextDateRange(typeDate)}</span>
						)}
					</p>
				</div>
				<div className={styles.arrow}>
					<ArrowDown2 size={16} />
				</div>
			</div>
		</TippyHeadless>
	);
}

export default SelectFilterDate;
