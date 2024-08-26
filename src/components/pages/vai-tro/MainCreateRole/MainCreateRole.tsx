import React, {useState} from 'react';
import {IoMdAddCircle} from 'react-icons/io';

import {PropsMainCreateRole} from './interfaces';
import styles from './MainCreateRole.module.scss';
import Button from '~/components/common/Button';
import Form, {Input} from '~/components/common/Form';
import clsx from 'clsx';
import DatePicker from '~/components/common/DatePicker';
import Select, {Option} from '~/components/common/Select';
import {PATH} from '~/constants/config';
import {GENDER} from '~/constants/config/enum';
import {IoClose} from 'react-icons/io5';
import TextArea from '~/components/common/Form/components/TextArea';
import DataWrapper from '~/components/common/DataWrapper';
import Table from '~/components/common/Table';

function MainCreateRole({}: PropsMainCreateRole) {
	const [open, setOpen] = useState<boolean>(false);
	const [date, setDate] = useState<string>('');
	const [form, setForm] = useState<any>({
		avatar: '',
		name: '',
		email: '',
		phone: '',
		province: '',
		district: '',
		ward: '',
		address: '',
		username: '',
		role: '',
		description: '',
		gender: null,
	});

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.left}>
					<h4>Thêm vai trò</h4>
					<p>Nhập và gán quyền cho vai trò của bạn</p>
				</div>
				<div className={styles.right}>
					<Button href={PATH.VaiTro} p_10_24 rounded_2 grey_outline>
						Hủy bỏ
					</Button>
					<Button p_10_24 rounded_2 primary>
						Lưu lại
					</Button>
				</div>
			</div>

			<div className={styles.form}>
				<Form form={form} setForm={setForm}>
					{/* <div className={'mb'}>
						<AvatarChange path={form?.avatar} name='avatar' />
					</div> */}
					<Input
						name='name'
						value={form.name || ''}
						label={
							<span>
								Chọn chức vụ <span style={{color: 'red'}}>*</span>
							</span>
						}
						placeholder='Nhập vai trò'
					/>
					<div className={clsx('mt')}>
						<TextArea placeholder='Nhập mô tả ngắn về vai trò' name='description' label={<span>Mô tả</span>} blur />
					</div>
					<div className={clsx('mt')}>
						<div className={styles.classify}>
							<label>
								<strong>Phân quyền quản trị</strong> <span style={{color: 'red'}}>*</span>
							</label>
							<div className={styles.group_radio}>
								<div className={styles.item_radio}>
									<input
										id='ready'
										className={styles.input_radio}
										type='radio'
										name='classify'
										// value={classify.ready}
										// checked={form.classify === classify.ready}
										// onChange={(e) =>
										// 	setForm((prev) => ({
										// 		...prev,
										// 		classify: classify.ready,
										// 	}))
										// }
									/>
									<label className={styles.input_label} htmlFor='ready'>
										Web quản trị
									</label>
								</div>

								<div className={styles.item_radio}>
									<input
										id='notReady'
										className={styles.input_radio}
										type='radio'
										name='classify'
										// value={classify.notReady}
										// checked={form.classify === classify.notReady}
										// onChange={(e) =>
										// 	setForm((prev) => ({
										// 		...prev,
										// 		classify: classify.notReady,
										// 	}))
										// }
									/>
									<label className={styles.input_label} htmlFor='female'>
										Phần mềm cân và kho{' '}
									</label>
								</div>
								<div className={styles.item_radio}>
									<input
										id='notReady'
										className={styles.input_radio}
										type='radio'
										name='classify'
										// value={classify.notReady}
										// checked={form.classify === classify.notReady}
										// onChange={(e) =>
										// 	setForm((prev) => ({
										// 		...prev,
										// 		classify: classify.notReady,
										// 	}))
										// }
									/>
									<label className={styles.input_label} htmlFor='female'>
										Kế toán tài chính
									</label>
								</div>
							</div>
						</div>
						<div className={clsx('mt')}>
							<div className={styles.table}>
								<DataWrapper
									data={[1, 2, 3]}
									loading={false}
									// noti={
									// 	<Noti
									// 		titleButton='Thêm khách hàng'
									// 		onClick={() => router.push(PATH.ThemKhachHang)}
									// 		des='Hiện tại chưa có khách hàng nào, thêm ngay?'
									// 	/>
									// }
								>
									<Table
										data={[-1, 1, 2, 3]}
										column={[
											{
												title: 'Chức năng',
												render: (data: any) => <>Tổng quan</>,
											},
											{
												title: 'TẤT CẢ QUYỀN',
												render: (data: any) => <input type='checkbox'/>,
											},
											{
												title: 'CHỈ XEM',
												render: (data: any) => <input type='checkbox'/>,
											},											{
												title: 'THÊM MỚI',
												render: (data: any) => <input type='checkbox'/>,
											},
											{
												title: 'CHỈNH SỬA',
												render: (data: any) => <input type='checkbox'/>,
											},
											{
												title: 'XÓA BỎ',
												render: (data: any) => <input type='checkbox'/>,
											},
										]}
									/>
								</DataWrapper>
							</div>
						</div>
					</div>
				</Form>
			</div>
		</div>
	);
}

export default MainCreateRole;
