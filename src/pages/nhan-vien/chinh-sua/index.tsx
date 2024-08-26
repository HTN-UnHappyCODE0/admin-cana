import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import MainUpdate from '~/components/pages/nhan-vien/MainUpdate';
export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Chỉnh sửa nhân viên</title>
				<meta name='description' content='Chỉnh sửa nhân viên' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer bg={true}>
				<MainUpdate />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Chỉnh sửa nhân viên'>{Page}</BaseLayout>;
};
