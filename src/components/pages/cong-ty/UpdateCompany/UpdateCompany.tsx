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
import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_STATUS, CONFIG_TYPE_FIND, QUERY_KEY} from '~/constants/config/enum';
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
		parentCompanyUuid: '',
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
				dirrector: data?.dirrector,
				parentCompanyUuid: data?.parentCompanyUu?.uuid,
			});
		},
		enabled: !!_id,
	});

	const listCompany = useQuery([QUERY_KEY.dropdown_cong_ty], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: companyServices.listCompany({
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

	const listProvince = useQuery([QUERY_KEY.dropdown_tinh_thanh_pho], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: commonServices.listProvince({
					keyword: '',
					status: null,
				}),
			}),
		select(data) {
			return data;
		},
	});

	const listTown = useQuery([QUERY_KEY.dropdown_xa_phuong, form?.provinceId], {
		queryFn: () =>
			httpRequest({
				isDropdown: true,
				http: commonServices.listTown({
					keyword: '',
					status: null,
					idParent: form.provinceId,
				}),
			}),
		select(data) {
			return data;
		},
		enabled: !!form?.provinceId,
	});

	const funcUpdateCompany = useMutation({
		mutationFn: () =>
			httpRequest({
				showMessageFailed: true,
				showMessageSuccess: true,
				msgSuccess: 'Cập nhật KV cảng xuất khẩu thành công!',
				http: companyServices.upsertCompany({
					uuid: _id as string,
					name: form?.name,
					phoneNumber: form?.phoneNumber,
					dirrector: form?.dirrector,
					provinceId: form?.provinceId,
					townId: form?.townId,
					address: form?.address,
					description: form?.description,
					parentCompanyUuid: form?.parentCompanyUuid,
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
		return funcUpdateCompany.mutate();
	};
	return (
		<div className={styles.container}>
			<Loading loading={funcUpdateCompany.isLoading} />
			<Form form={form} setForm={setForm} onSubmit={handleSubmit}>
				{' '}
				<div className={styles.header}>
					<div className={styles.left}>
						<h4>Chỉnh sửa thông tin KV cảng xuất khẩu</h4>
						<p>Điền đầy đủ các thông tin KV cảng xuất khẩu con</p>
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
					<div className={clsx('mt', 'col_2')}>
						<div>
							<Input
								name='name'
								value={form.name}
								blur={true}
								isRequired
								max={255}
								label={
									<span>
										Tên KV cảng <span style={{color: 'red'}}>*</span>
									</span>
								}
								placeholder='Nhập tên KV cảng'
							/>
						</div>
						<Select
							isSearch
							name='parentCompanyUuid'
							placeholder='Chọn khu vực cảng xuất khẩu'
							value={form?.parentCompanyUuid}
							onChange={(e: any) =>
								setForm((prev: any) => ({
									...prev,
									parentCompanyUuid: e.target.value,
								}))
							}
							label={<span>Khu vực cảng xuất khẩu</span>}
						>
							{listCompany?.data?.map((v: any) => (
								<Option key={v?.uuid} value={v?.uuid} title={v?.name} />
							))}
						</Select>
					</div>

					<div className={clsx('mt', 'col_2')}>
						<Input
							type='number'
							name='phoneNumber'
							value={form.phoneNumber}
							blur={true}
							isPhone
							label={<span>Số điện thoại</span>}
							placeholder='Nhập số điện thoại'
						/>
						<div>
							<Input
								name='dirrector'
								value={form.dirrector}
								blur={true}
								max={255}
								label={<span>Người đại diện</span>}
								placeholder='Nhập tên người đại diện'
							/>
						</div>
					</div>

					<div className={clsx('mt', 'col_2')}>
						<Select
							isSearch
							name='provinceId'
							value={form.provinceId}
							placeholder='Chọn tỉnh/thành phố'
							label={<span>Tỉnh/Thành phố</span>}
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
											townId: '',
										}))
									}
								/>
							))}
						</Select>
						<div>
							<Select isSearch name='townId' value={form.townId} placeholder='Chọn xã/phường' label={<span>Xã/phường</span>}>
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
					</div>

					<div className={clsx('mt')}>
						<Input
							name='address'
							value={form.address || ''}
							blur={true}
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
