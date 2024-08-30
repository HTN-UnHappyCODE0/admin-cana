import axiosClient from '.';

const dashbroadServices = {
	dashbroadAdmin: (data: {}, tokenAxios?: any) => {
		return axiosClient.post(`/Dashbroad/dashbroad-admin`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default dashbroadServices;
