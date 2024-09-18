import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import UpdateCompany from '~/components/pages/cong-ty/UpdateCompany';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Chỉnh sửa KV cảng xuất khẩu</title>
				<meta name='description' content='Chỉnh sửa KV cảng xuất khẩu' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer bg={true}>
				<UpdateCompany />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return (
		<BaseLayout title='Chỉnh sửa KV cảng xuất khẩu' bgLight={true}>
			{Page}
		</BaseLayout>
	);
};
