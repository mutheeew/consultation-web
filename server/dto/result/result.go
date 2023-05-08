package dto

type SuccessResult struct {
	Code int
	Data interface{}
	// Tipe data interface{} pada dasarnya dapat mewakili banyak jenis tipe data yang berbeda, sehingga Data pada struktur SuccessResult dapat digunakan untuk menyimpan berbagai jenis data, seperti array, map, objek, dan sebagainya.
}

type ErrorResult struct {
	Code    int
	Message string
}
