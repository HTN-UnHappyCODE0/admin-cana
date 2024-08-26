import Head from 'next/head';
import {Fragment, ReactElement} from 'react';
import BaseLayout from '~/components/layouts/BaseLayout';
import WrapperContainer from '~/components/layouts/WrapperContainer';
import CreateCompany from '~/components/pages/cong-ty/CreateCompany/CreateCompany';

export default function Page() {
	return (
		<Fragment>
			<Head>
				<title>Thêm mới công ty</title>
				<meta name='description' content='Thêm mới công ty' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<WrapperContainer bg={true}>
				<CreateCompany />
			</WrapperContainer>
		</Fragment>
	);
}

Page.getLayout = function (Page: ReactElement) {
	return (
		<BaseLayout title='Thêm mới công ty' bgLight={true}>
			{Page}
		</BaseLayout>
	);
};
