import React, {useState} from 'react';
import Select, {Option} from '~/components/common/Select';
import {IFormUpdateCompany, PropsUpdateCompany} from './interfaces';
import styles from './UpdateCompany.module.scss';
import {PATH} from '~/constants/config';
import Button from '~/components/common/Button';
import Form, {FormContext, Input} from '~/components/common/Form';
import clsx from 'clsx';
import TextArea from '~/components/common/Form/components/TextArea';
import {useRouter} from 'next/router';
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query';
import {CONFIG_STATUS, QUERY_KEY} from '~/constants/config/enum';
import {httpRequest} from '~/services';
import commonServices from '~/services/commonServices';
import Loading from '~/components/common/Loading';
import companyServices from '~/services/companyServices';

function UpdateCompany({}: PropsUpdateCompany) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const {_id} = router.query;

	const [form, setForm] = useState<IFormUpdateCompany>({
		description: '',
		name: '',
		address: '',
		phoneNumber: '',
		provinceId: '',
		townId: '',
		dirrector: '',
		districtId: '',
	});

	useQuery([QUERY_KEY.chi_tiet_cong_ty], {
		queryFn: () =>
			httpRequest({
				http: companyServices.detailCompany({
					uuid: _id as string,
				}),
			}),
		onSuccess(data) {
			setForm({
				description: data?.description,
				name: data?.name,
				address: data?.address,
				phoneNumber: data?.phoneNumber,
				provinceId: data?.detailAddress?.province?.uuid,
				townId: data?.detailAddress?.town?.uuid,
				districtId: data?.detailAddress?.district?.uuid,
				dirrector: data?.dirrector,
			});
		},
		enabled: !!_id,
	});

	const listProvince = useQuery([QUERY_KEY.dropdown_tinh_thanh_pho], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: commonServices.listProvince({
					keyword: '',
					status: CONFIG_STATUS.HOAT_DONG,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listDistrict = useQuery([QUERY_KEY.dropdown_quan_huyen, form.provinceId], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: commonServices.listDistrict({
					keyword: '',
					status: CONFIG_STATUS.HOAT_DONG,
					idParent: form?.provinceId,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!form?.provinceId,
	});

	const listTown = useQuery([QUERY_KEY.dropdown_xa_phuong, form?.districtId], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: commonServices.listTown({
					keyword: '',
					status: CONFIG_STATUS.HOAT_DONG,
					idParent: form.districtId,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!form?.districtId,
	});

	const fucnUpdateCompany = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Cập nhật công ty thành công!',
				http: companyServices.upsertCompany({
					uuid: _id as string,
					name: form?.name,

					phoneNumber: form?.phoneNumber,
					dirrector: form?.dirrector,
					provinceId: form?.provinceId,
					dictrictId: form?.districtId,
					townId: form?.townId,
					address: form?.address,
					description: form?.description,
				}),
			}),
		onSuccess(data) {
			if (data) {
				queryClient.invalidateQueries([QUERY_KEY.chi_tiet_cong_ty]);
				router.replace(PATH.CongTy, undefined, {
					scroll: false,
					shallow: false,
				});
			}
		},
		onError(error) {
			console.log({error});
			return;
		},
	});

	const handleSubmit = async () => {
		return fucnUpdateCompany.mutate();
	};
	return (
		<div className={styles.container}>
			<Loading loading={fucnUpdateCompany.isLoading} />
			<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
				{' '}
				<div className={styles.header}>
					<div className={styles.left}>
						<h4>Chỉnh sửa thông tin công ty</h4>
						<p>Điền đầy đủ các thông tin công ty con</p>
					</div>
					<div className={styles.right}>
						<Button href={PATH.CongTy} p_10_24 rounded_2 grey_outline>
							Hủy bỏ
						</Button>
						<FormContext.Consumer>
							{({isDone}) => (
								<Button disable={!isDone} p_10_24 rounded_2 primary>
									Cập nhật
								</Button>
							)}
						</FormContext.Consumer>
					</div>
				</div>
				<div className={styles.form}>
					<div className={clsx('mt')}>
						<div>
							<Input
								name='name'
								value={form.name}
								blur={true}
								isRequired
								min={5}
								max={255}
								label={
									<span>
										Tên công ty <span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='Nhập tên công ty'
							/>
						</div>
					</div>

					<div className={clsx('mt', 'col_2')}>
						<Input
							type='number'
							name='phoneNumber'
							value={form.phoneNumber}
							blur={true}
							isPhone
							isRequired
							label={
								<span>
									Số điện thoại<span style={{color: 'red'}}>*</span>
								</span>
							}
							placeholder='Nhập số điện thoại'
						/>
						<div>
							<Input
								name='dirrector'
								value={form.dirrector}
								blur={true}
								min={5}
								max={255}
								label={<span>Người đại diện</span>}
								placeholder='Nhập tên người đại diện'
							/>
						</div>
					</div>

					<div className={clsx('mt', 'col_3')}>
						<Select
							isSearch
							name='provinceId'
							value={form.provinceId}
							placeholder='Chọn tỉnh/thành phố'
							label={
								<span>
									Tỉnh/Thành phố<span style={{color: 'red'}}>*</span>
								</span>
							}
						>
							{listProvince?.data?.map((v: any) => (
								<Option
									key={v?.matp}
									value={v?.matp}
									title={v?.name}
									onClick={() =>
										setForm((prev: any) => ({
											...prev,
											provinceId: v?.matp,
											districtId: '',
											townId: '',
										}))
									}
								/>
							))}
						</Select>
						<div>
							<Select
								isSearch
								name='districtId'
								value={form.districtId}
								placeholder='Chọn quận/huyện'
								label={
									<span>
										Quận/Huyện<span style={{color: 'red'}}>*</span>
									</span>
								}
							>
								{listDistrict?.data?.map((v: any) => (
									<Option
										key={v?.maqh}
										value={v?.maqh}
										title={v?.name}
										onClick={() =>
											setForm((prev: any) => ({
												...prev,
												districtId: v?.maqh,
												townId: '',
											}))
										}
									/>
								))}
							</Select>
						</div>
						<Select
							isSearch
							name='townId'
							value={form.townId}
							placeholder='Chọn xã/phường'
							label={
								<span>
									Xã/phường<span style={{color: 'red'}}>*</span>
								</span>
							}
						>
							{listTown?.data?.map((v: any) => (
								<Option
									key={v?.xaid}
									value={v?.xaid}
									title={v?.name}
									onClick={() =>
										setForm((prev: any) => ({
											...prev,
											townId: v?.xaid,
										}))
									}
								/>
							))}
						</Select>
					</div>

					<div className={clsx('mt')}>
						<Input
							name='address'
							value={form.address || ''}
							blur={true}
							min={5}
							max={255}
							label={<span>Địa chỉ chi tiết</span>}
							placeholder='Nhập địa chỉ chi tiết'
						/>
					</div>

					<div className={clsx('mt')}>
						<TextArea placeholder='Nhập ghi chú' name='description' label={<span>Ghi chú</span>} max={5000} blur={true} />
					</div>
				</div>
			</Form>
		</div>
	);
}

export default UpdateCompany;
