export enum QUERY_KEY {
	dropdown_kho_hang_con,
	dropdown_kho_hang_chinh,
	dropdown_quoc_gia,
	dropdown_tram_can,
	dropdown_nha_cung_cap,
	dropdown_nha_cung_cap_nhap,
	dropdown_nha_cung_cap_xuat,
	dropdown_nha_cung_cap_dich_vu,
	dropdown_chuc_vu,
	dropdown_nhan_vien_thi_truong,
	dropdown_khach_hang,
	dropdown_loai_go,
	dropdown_quy_cach,
	dropdown_gia_tien_hang,
	dropdown_xuong,
	dropdown_tinh_thanh_pho,
	dropdown_tinh_thanh_pho_quan_ly,
	dropdown_quan_huyen,
	dropdown_xa_phuong,
	dropdown_nguoi_quan_ly_nhan_vien,
	dropdown_tieu_chi_quy_cach,
	dropdown_ban_can,
	dropdown_cong_ty,
	dropdown_xe_hang,
	dropdown_RFID,
	dropdown_nguoi_quan_ly_xe,
	dropdown_nguoi_quan_ly,
	dropdown_nguoi_quan_ly_nhap_hang,
	dropdown_khach_hang_nhap,
	dropdown_loai_go_quy_cach,
	dropdown_khach_hang_xuat,
	dropdown_tau_hang,
	dropdown_kho_hang,
	dropdown_bai,
	dropdown_bai_dich,
	dropdown_lo_hang,
	dropdown_ma_lo_hang,
	dropdown_kho_hang_den,
	dropdown_bai_nguon,
	dropdown_kho_hang_nguon,
	dropdown_khach_hang_dich_vu,
	dropdown_ma_tau,

	table_phieu_da_gui_KT,
	table_cang_boc_do,
	table_qlk_duyet_phieu,
	table_kho_hang_chinh,
	table_cong_no_phieu,
	table_cong_no_phieu_da_kcs,
	table_cong_no_phieu_chua_kcs,
	table_ktk_duyet_san_luong,
	table_phieu_can_tat_ca,
	table_phieu_can_nhap,
	table_phieu_can_xuat,
	table_phieu_can_dich_vu,
	table_phieu_can_chuyen_kho,
	table_phieu_can_xuat_thang,
	table_phieu_can,
	table_gia_tien_hang,
	table_lich_su_gia_tien_hang,
	table_cong_no_nha_cung_cap,
	table_lich_su_thanh_toan,
	table_khach_hang_bai,
	table_lich_su_bai,
	table_kiem_ke_bai,
	table_bai,
	table_tau,
	table_loai_go,
	table_quoc_gia,
	table_quy_cach,
	table_ban_can,
	table_tram_can,
	table_RFID,
	table_xe_hang,
	table_nhan_vien,
	table_khach_hang_quan_ly,
	table_cong_ty,
	table_khach_hang_doi_tac,
	table_hang_hoa_cua_khach_hang,
	table_lenh_can_tat_ca,
	table_lenh_can_xuat_thang,
	table_lenh_can_xuat,
	table_lenh_can_nhap,
	table_lenh_can_dich_vu,
	table_lenh_can_chuyen_kho,
	table_luot_can_tat_ca,
	table_luot_can_nhom_theo_xe,
	table_luot_can_phieu_xuat_thang,
	table_luot_can_phieu_xuat,
	table_luot_can_phieu_nhap,
	table_luot_can_phieu_dich_vu,
	table_luot_can_phieu_chuyen_kho,
	table_nhap_lieu_do_kho,
	table_nhap_lieu_quy_cach,
	table_chi_tiet_don_hang_phieu,
	table_chi_tiet_xe_hang_phieu_can,
	table_tai_khoan,
	table_chuc_vu,

	chi_tiet_gia_tien_chinh_sua,
	chi_tiet_cong_no_phieu,
	chi_tiet_lich_su_thanh_toan,
	chi_tiet_nhan_vien,
	chi_tiet_kho_hang_con,
	chi_tiet_kho_hang_chinh,
	chi_tiet_bai,
	chi_tiet_lich_su_kiem_ke,
	chi_tiet_kho_hang,
	chi_tiet_tau,
	chi_tiet_quy_cach,
	chi_tiet_tram_can,
	chi_tiet_xe_hang,
	chi_tiet_nha_cung_cap,
	chi_tiet_khach_hang,
	chi_tiet_doi_tac,
	chi_tiet_lenh_can,
	chi_tiet_bai_den,
	chi_tiet_phieu_can,
	chi_tiet_cong_ty,

	danh_sach_tieu_chi_nha_lieu,
	danh_sach_tieu_chi_quy_cach,
	danh_sach_tieu_chi_nhap_lieu,
	quy_cach_postion_storage,
	thong_ke_kho_hang,
	thong_ke_tong_hang_nhap,
	thong_ke_tong_hang_xuat,
	thong_ke_tong_hang_dich_vu,
	thong_ke_trang_chu_admin,
	thong_ke_tong_hop_phieu_can_tat_ca,
	thong_ke_tong_hop_phieu_can_nhap,
	thong_ke_tong_hop_phieu_can_xuat,
	thong_ke_tong_hop_phieu_can_dich_vu,
	thong_ke_tong_hop_phieu_can_chuyen_kho,
	thong_ke_tong_hop_phieu_can_xuat_thang,
	thong_ke_tong_hop_phieu_nhom_theo_xe,
}

export enum TYPE_DATE {
	ALL = -1,
	TODAY = 1,
	YESTERDAY = 2,
	THIS_WEEK = 3,
	LAST_WEEK = 4,
	THIS_MONTH = 5,
	LAST_MONTH = 6,
	THIS_YEAR = 7,
	LAST_7_DAYS = 8,
	LUA_CHON = 9,
}

export enum GENDER {
	NAM,
	NU,
	KHAC,
}

export enum CONDITION {
	BIG,
	SMALL,
}

// ENUM API CONFIG
export enum CONFIG_STATUS {
	DA_XOA = -1,
	BI_KHOA = 0,
	HOAT_DONG = 1,
}

export enum CONFIG_PAGING {
	NO_PAGING,
	IS_PAGING,
}

export enum CONFIG_DESCENDING {
	NO_DESCENDING,
	IS_DESCENDING,
}

export enum CONFIG_TYPE_FIND {
	DROPDOWN,
	FILTER,
	TABLE,
}

export enum CONFIG_PRINT {
	NOT_PRINT,
	IS_PRINT,
}

export enum CONFIG_STATE_SPEC_CUSTOMER {
	CHUA_CUNG_CAP,
	DANG_CUNG_CAP,
}

export enum TYPE_TRANSPORT {
	DUONG_BO,
	DUONG_THUY,
}

// PAGE CUSTOMER
export enum STATUS_CUSTOMER {
	DA_XOA = -1,
	DUNG_HOP_TAC = 0,
	HOP_TAC = 1,
}

export enum TYPE_CUSTOMER {
	NHA_CUNG_CAP = 1,
	KH_XUAT,
	DICH_VU,
}

export enum TYPE_PARTNER {
	NCC = 1,
	KH_XUAT,
	KH_DICH_VU,
}

export enum TYPE_PRODUCT {
	CONG_TY = 1,
	DICH_VU,
	DUNG_CHUNG,
}

export enum TYPE_SIFT {
	KHONG_CAN_SANG,
	CAN_SANG,
}

export enum TYPE_BATCH {
	CAN_LE,
	CAN_LO,
}

export enum TYPE_SCALES {
	CAN_NHAP = 1,
	CAN_XUAT,
	CAN_DICH_VU,
	CAN_CHUYEN_KHO,
	CAN_TRUC_TIEP,
}

export enum STATUS_BILL {
	DA_HUY,
	CHUA_CAN,
	DANG_CAN,
	TAM_DUNG,
	DA_CAN_CHUA_KCS,
	DA_KCS,
	CHOT_KE_TOAN,
}

export enum STATE_BILL {
	NOT_CHECK = 0,
	QLK_REJECTED,
	QLK_CHECKED,
	KTK_REJECTED,
	KTK_CHECKED,
	END,
}

export enum STATUS_WEIGHT_SESSION {
	DA_HUY,
	CAN_LAN_1,
	CAN_LAN_2,
	UPDATE_SPEC_DONE,
	UPDATE_DRY_DONE,
	KCS_XONG,
	CHOT_KE_TOAN,
}

// PAGE DEBT
export enum STATUS_DEBT {
	THANH_TOAN,
	TAM_UNG,
}

// PAGE PRICE
export enum STATUS_STANDARD {
	DANG_AP_DUNG,
	NGUNG_AP_DUNG,
}

// PAGE TRUCK
export enum OWNEW_TYPE_TRUCK {
	XE_KHACH_HANG,
	XE_CONG_TY,
}

export enum TYPE_TRANSACTION {
	THANH_TOAN = 1,
	THU_HOI,
	THUE,
}

export enum STATUS_TRANSACTION {
	DA_XOA,
	BINH_THUONG,
}

export enum TYPE_DATE_SHOW {
	HOUR,
	DAY,
	MONTH,
	YEAR,
}

export enum TYPE_SHOW_BDMT {
	MT,
	BDMT,
}

// COMON REGENCY
export enum REGENCY_NAME {
	'Nhân viên tài chính - kế toán' = '9',
	'Nhân viên KCS' = '8',
	'Nhân viên thị trường' = '7',
	'Nhân viên cân' = '6',
	'Quản lý xe' = '5',
	'Quản lý nhập hàng' = '4',
	'Quản lý kho KCS' = '3',
	'Phó Giám Đốc' = '2',
	'Giám Đốc' = '1',
}

// PAGE QUY CÁCH
export enum TYPE_RULER {
	NHO_HON,
	LON_HON,
}

// PAGE THỐNG KÊ LOG - TÌNH HUỐNG BẤT THƯỜNG
export enum STATUS_SITUATIONS {
	CHUA_KIEM_DUYET,
	DA_DUYET,
	XU_LY_SAI,
}
