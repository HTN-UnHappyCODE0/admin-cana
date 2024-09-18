import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import PageCompany from '~/components/pages/cong-ty/PageCompany';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>KV cảng xuất khẩu</title>
				<meta name='description' content='KV cảng xuất khẩu' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer bg={true}>
				<PageCompany />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return <BaseLayout title='Quản lý KV cảng xuất khẩu'>{Page}</BaseLayout>;
};
