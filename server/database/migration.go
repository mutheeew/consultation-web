package database

import (
	"fmt"
	"hallocorona/models"
	"hallocorona/pkg/mysql"
)

func RunMigration() {

	//auto migration models to database
	err := mysql.DB.AutoMigrate(
		// object "mysql.DB yaitu koneksi database menggunakan mySql"
		// fungsi AotoMigrate untuk membuat tabel-tabel pada database yg belum ada dan menyesuaikan tabel-tabel yang sudah ada dengan struktur model yg sudah didefinisikan di dalam file "models"
		&models.User{},
		// dia pake kurawal karena manggil struct
		&models.Article{},
		&models.Consultation{},
		&models.Response{},
	)
	if err != nil {
		fmt.Println(err)
		panic("Migration Failed")
	}
	// Setelah itu, nilai error yang dikembalikan oleh fungsi AutoMigrate disimpan pada variabel err menggunakan operator ":=". Jika variabel err tidak nil, maka pesan error akan dicetak di konsol menggunakan fungsi fmt.Println dan program akan dihentikan dengan menggunakan fungsi panic("Migration Failed").

	fmt.Println("Migration Success")

}
