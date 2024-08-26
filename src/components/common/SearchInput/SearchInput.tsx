import {useState} from 'react';

import {PropsSearchInput} from './interfaces';
import {GrSearch} from 'react-icons/gr';
import clsx from 'clsx';
import styles from './SearchInput.module.scss';

function SearchInput({keyword, setKeyword, placeholder = 'Nhập từ khoá tìm kiếm'}: PropsSearchInput) {
	const [isFocus, setIsfocus] = useState<boolean>(false);

	return (
		<div className={clsx(styles.container, {[styles.focus]: isFocus})}>
			<div className={styles.icon}>
				<GrSearch color='#3f4752' size={20} />
			</div>
			<input
				value={keyword}
				placeholder={placeholder}
				onFocus={() => setIsfocus(true)}
				onBlur={() => setIsfocus(false)}
				onChange={(e: any) => setKeyword(e.target.value)}
			/>
		</div>
	);
}

export default SearchInput;
