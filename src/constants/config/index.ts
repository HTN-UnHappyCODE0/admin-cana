import icons from '../images/icons';
import {TYPE_DATE} from './enum';

export const MAXIMUM_FILE = 10; //MB

export const allowFiles = [
	'application/pdf',
	'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'image/jpeg',
	'image/jpg',
	'image/png',
];

export enum PATH {
	Any = 'any',
	Login = '/auth/login',
	ForgotPassword = '/auth/forgot-password',

	Home = '/',
	Profile = '/profile',

	// Kho hàng
	KhoHang = '/kho-hang',
	KhoHangThongKe = '/kho-hang/thong-ke',
	KhoHangDanhSach = '/kho-hang/danh-sach',

	// Hàng hóa
	HangHoa = '/hang-hoa',
	HangHoaLoaiGo = '/hang-hoa/loai-go',
	HangHoaQuocGia = '/hang-hoa/quoc-gia',
	HangHoaQuyCach = '/hang-hoa/quy-cach',
	ThemQuyCach = '/hang-hoa/quy-cach/them-moi',

	// Trạm cân
	QuanLyCan = '/quan-ly-can',
	TramCan = '/quan-ly-can/tram-can',
	CauCan = '/quan-ly-can/cau-can',
	ThemTramCan = '/quan-ly-can/tram-can/them-moi',

	// RFID
	RFID = '/rfid',

	// Xe hàng
	XeHang = '/xe-hang',

	// Quản lý tàu
	QuanLyTau = '/tau',

	// Phiếu dự kiến
	PhieuDuKien = '/lenh-can',
	PhieuDuKienTatCa = '/lenh-can/tat-ca',
	PhieuDuKienNhap = '/lenh-can/phieu-nhap',
	PhieuDuKienXuat = '/lenh-can/phieu-xuat',
	PhieuDuKienDichVu = '/lenh-can/dich-vu',
	PhieuDuKienChuyenKho = '/lenh-can/chuyen-kho',
	PhieuDuKienXuatThang = '/lenh-can/phieu-xuat-thang',

	// Phiếu cân
	PhieuCan = '/phieu-can',
	PhieuCanTatCa = '/phieu-can/tat-ca',
	PhieuCanNhap = '/phieu-can/phieu-nhap',
	PhieuCanXuat = '/phieu-can/phieu-xuat',
	PhieuCanDichVu = '/phieu-can/dich-vu',
	PhieuCanChuyenKho = '/phieu-can/chuyen-kho',
	PhieuCanXuatThang = '/phieu-can/xuat-thang',

	// Nhập liệu
	NhapLieu = '/nhap-lieu',
	NhapLieuQuyCach = '/nhap-lieu/quy-cach',
	NhapLieuDoKho = '/nhap-lieu/do-kho',
	NhapLieuPhieuDaGui = '/nhap-lieu/phieu-da-gui',

	// Lượt cân
	LuotCan = '/luot-can',
	LuotCanTatCa = '/luot-can/tat-ca',
	LuotCanNhap = '/luot-can/phieu-nhap',
	LuotCanXuat = '/luot-can/phieu-xuat',
	LuotCanDichVu = '/luot-can/dich-vu',
	LuotCanChuyenKho = '/luot-can/chuyen-kho',
	LuotCanXuatThang = '/luot-can/xuat-thang',
	LuotCanGomTheoXe = '/luot-can/gom-theo-xe',

	// Công nợ
	CongNo = '/cong-no/cong-ty',
	CongNoKhachHang = '/cong-no/khach-hang',
	LichSuThanhToan = '/cong-no/lich-su',

	// Công nợ phiếu
	CongNoPhieu = '/cong-no-phieu/tat-ca',
	CongNoPhieuChuaKCS = '/cong-no-phieu/chua-kcs',
	CongNoPhieuDaKCS = '/cong-no-phieu/da-kcs',

	// Giá tiền hàng
	GiaTien = '/gia-tien-hang',
	GiaTienHangHienTai = '/gia-tien-hang/gia-hang-hien-tai',
	GiaTienHangQuaKhu = '/gia-tien-hang/gia-hang-chinh-sua',
	ThemGiaTien = '/gia-tien-hang/them-moi',
	ThemThayDoiGiaTien = '/gia-tien-hang/them-gia-hang-chinh-sua',
	ChinhSuaGiaTien = '/gia-tien-hang/chinh-sua',

	// Xưởng
	Xuong = '/xuong',
	ThemMoiXuong = '/xuong/them-moi',
	ChinhSuaXuong = '/xuong/chinh-sua',

	// Nhà cung cấp
	NhaCungCap = '/nha-cung-cap',
	ThemMoiNhaCungCap = '/nha-cung-cap/them-moi',
	ChinhSuaNhaCungCap = '/nha-cung-cap/chinh-sua',

	// Khách hàng xuất
	KhachHangXuat = '/khach-hang-xuat',
	ThemMoiKhachHangXuat = '/khach-hang-xuat/them-moi',
	ChinhSuaKhachHangXuat = '/khach-hang-xuat/chinh-sua',

	// Khách hàng dịch vụ
	KhachHangDichVu = '/khach-hang-dich-vu',
	ThemMoiKhachHangDichVu = '/khach-hang-dich-vu/them-moi',
	ChinhSuaKhachHangDichVu = '/khach-hang-dich-vu/chinh-sua',

	// Duyệt sản lượng
	DuyetSanLuong = '/duyet-san-luong',

	// Nhân viên
	NhanVien = '/nhan-vien',
	ThemNhanVien = '/nhan-vien/them-moi',

	// Công ty
	CongTy = '/cong-ty',
	ThemMoiCongTy = '/cong-ty/them-moi',

	// Tài khoản
	TaiKhoan = '/tai-khoan',

	// Chức vụ
	ChucVu = '/chuc-vu',

	// Vai trò
	VaiTro = '/vai-tro',
	ThemVaiTro = '/vai-tro/them-vai-tro',

	// LOG
	ThongKeDuLieuCan = '/thong-ke-log/du-lieu-can',
	ThongKeDuLieuKho = '/thong-ke-log/du-lieu-kho',
	ThongKeKeToanTaiChinh = '/thong-ke-log/ke-toan-tai-chinh',
	ThongKeKhac = '/thong-ke-log/thong-ke-khac',
	TinhHuongBatThuong = '/thong-ke-log/tinh-huong-bat-thuong',
}

export const Menu: {
	title: string;
	group: {
		path: string;
		pathActive?: string;
		title: string;
		icon: any;
	}[];
}[] = [
	{
		title: 'overview',
		group: [{title: 'Tổng quan', icon: icons.tongQuan, path: PATH.Home}],
	},
	{
		title: 'Kế toán',
		group: [
			{title: 'Công nợ phiếu', icon: icons.phieuhang, path: PATH.CongNoPhieu, pathActive: '/cong-no-phieu'},
			{title: 'Công nợ công ty', icon: icons.congno, path: PATH.CongNo, pathActive: '/cong-no'},
			{title: 'Giá tiền hàng', icon: icons.giatienhang, path: PATH.GiaTienHangHienTai, pathActive: PATH.GiaTien},
			{title: 'Duyệt sản lượng', icon: icons.duyetsanluong, path: PATH.DuyetSanLuong, pathActive: PATH.DuyetSanLuong},
		],
	},
	{
		title: 'Kho hàng',
		group: [
			{title: 'Kho hàng', icon: icons.danhsachkho, path: PATH.KhoHangThongKe, pathActive: PATH.KhoHang},
			{title: 'Hàng hóa', icon: icons.hanghoa, path: PATH.HangHoaLoaiGo, pathActive: PATH.HangHoa},
			{title: 'Trạm cân', icon: icons.tramcan, path: PATH.TramCan, pathActive: PATH.QuanLyCan},
			{title: 'RFID', icon: icons.icon_rfid, path: PATH.RFID, pathActive: PATH.RFID},
			{title: 'Xe hàng', icon: icons.xehang, path: PATH.XeHang, pathActive: PATH.XeHang},
			{title: 'Quản lý tàu', icon: icons.icon_ship, path: PATH.QuanLyTau},
		],
	},
	{
		title: 'Quản lý cân',
		group: [
			{title: 'Lệnh cân', icon: icons.phieudukien, path: PATH.PhieuDuKienTatCa, pathActive: PATH.PhieuDuKien},
			{title: 'Phiếu cân', icon: icons.phieudacan, path: PATH.PhieuCanTatCa, pathActive: PATH.PhieuCan},
			{title: 'Lượt cân', icon: icons.luotcan, path: PATH.LuotCanTatCa, pathActive: PATH.LuotCan},
			{title: 'Nhập liệu', icon: icons.nhaplieu, path: PATH.NhapLieuQuyCach, pathActive: PATH.NhapLieu},
		],
	},
	{
		title: 'Nhà cung cấp',
		group: [
			{title: 'Nhà cung cấp', icon: icons.xuong, path: PATH.Xuong},
			{title: 'Công ty', icon: icons.congty, path: PATH.NhaCungCap},
		],
	},
	{
		title: 'Khách hàng',
		group: [
			{title: 'Khách hàng xuất', icon: icons.khachhangxuat, path: PATH.KhachHangXuat},
			{title: 'Khách hàng dịch vụ ', icon: icons.khachhangdichvu, path: PATH.KhachHangDichVu},
		],
	},
	{
		title: 'Hệ thống',
		group: [
			{
				title: 'Nhân viên',
				icon: icons.NhanVien,
				path: PATH.NhanVien,
			},
			{title: 'KV cảng xuất khẩu', icon: icons.congty, path: PATH.CongTy},
			{title: 'Tài khoản', icon: icons.taikhoan, path: PATH.TaiKhoan},
			{title: 'Chức vụ', icon: icons.chucvu, path: PATH.ChucVu},
			{title: 'Vai trò & Phân quyền', icon: icons.phanquyen, path: PATH.VaiTro},
		],
	},
	{
		title: 'Log',
		group: [
			{
				title: 'Thống kê log',
				icon: icons.thongkelog,
				path: PATH.ThongKeDuLieuCan,
				pathActive: '/thong-ke-log',
			},
		],
	},
];

export const KEY_STORE = 'ADMIN-TRAM-CAN';

export const ListOptionTimePicker: {
	name: string;
	value: number;
}[] = [
	{
		name: 'Hôm nay',
		value: TYPE_DATE.TODAY,
	},
	{
		name: 'Tuần này',
		value: TYPE_DATE.THIS_WEEK,
	},
	{
		name: 'Tuần trước',
		value: TYPE_DATE.LAST_WEEK,
	},
	{
		name: 'Tháng này',
		value: TYPE_DATE.THIS_MONTH,
	},
	// {
	// 	name: 'Tháng trước',
	// 	value: TYPE_DATE.LAST_MONTH,
	// },
	// {
	// 	name: 'Năm này',
	// 	value: TYPE_DATE.THIS_YEAR,
	// },
	{
		name: 'Lựa chọn',
		value: TYPE_DATE.LUA_CHON,
	},
];

export const WEIGHT_WAREHOUSE = 10000; // tấn
