import {CONFIG_DESCENDING, CONFIG_PAGING, CONFIG_TYPE_FIND} from '~/constants/config/enum';
import axiosClient from '.';

const appSettingServices = {
	updateDryness: (
		data: {
			key: string;
			value: string;
		},
		tokenAxios?: any
	) => {
		return axiosClient.post(`/AppSetting/update-dryness`, data, {
			cancelToken: tokenAxios,
		});
	},
};

export default appSettingServices;
