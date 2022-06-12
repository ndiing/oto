const Query = {}

Query.init = [
    `
USE master

DROP DATABASE IF EXISTS akuntansi 

CREATE DATABASE akuntansi
`,
    `
USE akuntansi

CREATE TABLE jurnal (
    id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    kode VARCHAR(20) NOT NULL,
    tanggal DATETIME NOT NULL,
    bukti VARCHAR(MAX) NULL,
    keterangan VARCHAR(MAX) NOT NULL,
    id_mutasi INT NULL
)

CREATE TABLE akun (
    kode VARCHAR(20) NOT NULL PRIMARY KEY,
    kelompok VARCHAR(20) NOT NULL,
    nama VARCHAR(50) NOT NULL,
    kelompok2 INT NOT NULL
)

CREATE TABLE mutasi (
    id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    id_jurnal INT NOT NULL,
    kode_akun VARCHAR(50) NOT NULL,
    debit MONEY NULL,
    kredit MONEY NULL,
    saldo MONEY NULL,
    saldo_akun MONEY NULL,
    id_karyawan VARCHAR(50) NULL,
    id_bank VARCHAR(50) NULL,
    id_pemasok VARCHAR(50) NULL,
    id_pelanggan VARCHAR(50) NULL,
    id_pelanggan2 VARCHAR(50) NULL,
    id_konsumen VARCHAR(50) NULL,
    kode_bahan VARCHAR(50) NULL,
    kode_produk VARCHAR(50) NULL,
    harga_beli MONEY NULL,
    harga_jual MONEY NULL,
    id_mutasi INT NULL,
)

CREATE TABLE parameter (
    nama VARCHAR(20) NULL UNIQUE,
    nilai VARCHAR(MAX) NULL
)

INSERT INTO akun (kode,kelompok,nama,kelompok2)
VALUES
('1', '0', 'Harta', 0),
('2', '0', 'Kewajiban', 0),
('3', '0', 'Modal', 0),
('4', '0', 'Pendapatan', 1),
('5', '0', 'Beban Atas Pendapatan', 1),
('6', '0', 'Beban Operasional', 1),
('7', '0', 'Beban Non Operasional', 1),
('8', '0', 'Pendapatan Lain', 1),
('9', '0', 'Beban Lain', 1),
('1100', '1', 'Kas', 0),
('1200', '1', 'Bank', 0),
('1300', '1', 'Piutang Usaha', 0),
('1390', '1', 'Piutang Lain', 0),
('1400', '1', 'Persediaan Barang', 0),
('1490', '1', 'Persediaan Lain', 0),
('1510', '1', 'Uang Muka Dibayar', 0),
('1520', '1', 'Pajak Dibayar Dimuka', 0),
('1530', '1', 'Biaya Dibayar Dimuka', 0),
('1600', '1', 'Investasi Jangka Panjang', 0),
('1700', '1', 'Harta Tetap Berwujud', 0),
('1710', '1', 'Akumulasi Penyusutan Harta Tetap', 0),
('1800', '1', 'Harta Tetap Tidak Berwujud', 0),
('1900', '1', 'Harta Lainnya', 0),
('2100', '2', 'Utang Usaha', 0),
('2190', '2', 'Utang Lain', 0),
('2210', '2', 'Uang Muka Diterima', 0),
('2220', '2', 'Pendapatan Diterima Dimuka', 0),
('2300', '2', 'Utang Pajak', 0),
('2500', '2', 'Utang Jangka Panjang', 0),
('3100', '3', 'Modal', 0),
('3200', '3', 'Laba', 0),
('4100', '4', 'Pendapatan Usaha', 1),
('4900', '4', 'Pendapatan Lain', 1),
('5100', '5', 'Beban atas Pendapatan', 1),
('6100', '6', 'Beban Pemasaran Dan Penjualan', 1),
('6200', '6', 'Beban Administrasi Dan Umum', 1),
('6900', '6', 'Beban Operasional Lain', 1),
('7100', '7', 'Beban Penyusutan', 1),
('7900', '7', 'Beban Non Operasional Lain', 1),
('8100', '8', 'Pendapatan Luar Usaha', 1),
('9100', '9', 'Beban Luar Usaha', 1),
('9900', '9', 'Beban Pajak', 1),
('110000010', '1100', 'Kas Kecil', 0),
('110000020', '1100', 'Kas', 0),
('110000030', '1200', 'Kas (USD)', 0),
('120000010', '1200', 'Bank', 0),
('120000020', '1200', 'Bank (USD)', 0),
('130000010', '1300', 'Piutang Usaha', 0),
('130000020', '1300', 'Piutang Usaha (USD)', 0),
('130000910', '1390', 'Piutang Giro', 0),
('130000920', '1390', 'Piutang Karyawan', 0),
('130000990', '1390', 'Piutang Lain', 0),
('130000999', '1390', 'Cadangan Kerugian Piutang', 0),
('140000010', '1400', 'Persediaan # 1', 0),
('140000020', '1400', 'Persediaan # 2', 0),
('140000030', '1400', 'Persediaan # 3', 0),
('140000040', '1400', 'Persediaan # 4', 0),
('140000910', '1490', 'Persediaan Yang Belum Dibebankan', 0),
('150000110', '1510', 'Uang Muka Pembelian', 0),
('150000120', '1510', 'Uang Muka Pembelian (USD)', 0),
('150000130', '1510', 'Uang Muka Pembelian Harta Tetap', 0),
('150000211', '1520', 'PPN Masukan', 0),
('150000212', '1520', 'PPh 21 Dibayar Dimuka', 0),
('150000213', '1520', 'PPh 22 Dibayar Dimuka', 0),
('150000214', '1520', 'PPh 23 Dibayar Dimuka', 0),
('150000215', '1520', 'PPh 24 Dibayar Dimuka', 0),
('150000216', '1520', 'PPh 25 Dibayar Dimuka', 0),
('150000217', '1520', 'PPh 26 Dibayar Dimuka', 0),
('150000218', '1520', 'PPh Ps 4 Ayat 2 Dibayar Dimuka', 0),
('150000310', '1530', 'Sewa Dibayar di Muka', 0),
('150000320', '1530', 'Asuransi Dibayar di Muka', 0),
('150000390', '1530', 'Biaya Dibayar di Muka Lain', 0),
('160000010', '1600', 'Investasi Saham', 0),
('170000010', '1700', 'Tanah', 0),
('170000020', '1700', 'Bangunan', 0),
('170000030', '1700', 'Mesin & Peralatan', 0),
('170000040', '1700', 'Kendaraan', 0),
('170000090', '1700', 'Harta Lain', 0),
('170000120', '1710', 'Akumulasi Penyusutan Bangunan', 0),
('170000130', '1710', 'Akumulasi Penyusutan Mesin & Peralatan', 0),
('170000140', '1710', 'Akumulasi Penyusutan Kendaraan', 0),
('170000190', '1710', 'Akumulasi Penyusutan Harta Lain', 0),
('180000010', '1800', 'Hak Merek', 0),
('180000020', '1800', 'Hak Cipta', 0),
('180000030', '1800', 'Good Will', 0),
('210000010', '2100', 'Utang Usaha', 0),
('210000020', '2100', 'Utang Usaha (USD)', 0),
('210000910', '2190', 'Utang Usaha Yang Belum Ditagih', 0),
('210000920', '2190', 'Utang Konsinyasi', 0),
('210000930', '2190', 'Utang Giro', 0),
('210000940', '2190', 'Utang Gaji & Upah', 0),
('210000950', '2190', 'Utang Komisi Penjualan', 0),
('220000110', '2210', 'Uang Muka Penjualan', 0),
('220000120', '2210', 'Uang Muka Penjualan (USD)', 0),
('230000011', '2300', 'PPN Keluaran', 0),
('230000012', '2300', 'Utang PPh 21', 0),
('230000013', '2300', 'Utang PPh 22', 0),
('230000014', '2300', 'Utang PPh 23', 0),
('230000015', '2300', 'Utang PPh 24', 0),
('230000016', '2300', 'Utang PPh 25', 0),
('230000017', '2300', 'Utang PPh 26', 0),
('230000018', '2300', 'Utang PPh Ps 4 Ayat 2', 0),
('250000010', '2500', 'Utang Bank', 0),
('250000020', '2500', 'Utang Pembiayaan', 0),
('310000010', '3100', 'Simpanan Wajib', 0),
('310000020', '3100', 'Simpanan Pokok', 0),
('310000030', '3100', 'Simpanan Sukarela', 0),
('320000010', '3200', 'Dana Cadangan', 0),
('320000020', '3200', 'SHU', 0),
('320000099', '3200', 'Historical Balancing', 0),
('410000010', '4100', 'Penjualan # 1', 1),
('410000020', '4100', 'Penjualan # 2', 1),
('410000030', '4100', 'Penjualan # 3', 1),
('410000040', '4100', 'Potongan Penjualan', 1),
('490000010', '4900', 'Pendapatan Lain', 1),
('510000010', '5100', 'Harga Pokok Penjualan # 1', 1),
('510000020', '5100', 'Harga Pokok Penjualan # 2', 1),
('510000030', '5100', 'Harga Pokok Penjualan # 3', 1),
('510000040', '5100', 'Penyesuaian Persediaan', 1),
('510000050', '5100', 'Beban Pengiriman', 1),
('510000060', '5100', 'Potongan Pembelian', 1),
('610000010', '6100', 'Beban Iklan & Promosi', 1),
('610000020', '6100', 'Beban Komisi Penjualan', 1),
('610000030', '6100', 'Beban Piutang Tak Tertagih', 1),
('620000010', '6200', 'Beban Gaji & Upah', 1),
('620000020', '6200', 'Beban Staff Ahli & Perizinan', 1),
('620000031', '6200', 'Beban Sewa Kantor', 1),
('620000032', '6200', 'Beban Listrik', 1),
('620000033', '6200', 'Beban Air', 1),
('620000034', '6200', 'Beban Telepon', 1),
('620000035', '6200', 'Beban Internet', 1),
('620000040', '6200', 'Beban Perlengkapan', 1),
('690000010', '6900', 'Beban Lain', 1),
('710000020', '7100', 'Beban Penyusutan Bangunan', 1),
('710000030', '7100', 'Beban Penyusutan Mesin & Peralatan', 1),
('710000040', '7100', 'Beban Penyusutan Kendaraan', 1),
('710000090', '7100', 'Beban Penyusutan Harta Lain', 1),
('810000010', '8100', 'Laba (Rugi) Selisih Kurs', 1),
('810000020', '8100', 'Laba (Rugi) Penjualan Harta Tetap', 1),
('910000011', '9100', 'Beban Bunga Bank', 1),
('910000012', '9100', 'Beban Jasa Bank', 1),
('990000010', '9900', 'Beban Pajak Penghasilan', 1)

USE otomax

DECLARE @komisi TABLE(
    kode VARCHAR(20),
    saldo MONEY
)
DECLARE @saldo MONEY
DECLARE @jurnal TABLE(
    id INT
)
DECLARE @id_jurnal INT

INSERT INTO akuntansi.dbo.jurnal
    (tanggal,keterangan)
OUTPUT inserted.id INTO @jurnal
VALUES
    (GETDATE(), 'Saldo Awal')

INSERT INTO @komisi
SELECT kode_reseller, SUM(jumlah)
FROM komisi
WHERE tukar = 0
GROUP BY kode_reseller

SET @id_jurnal = (SELECT id
FROM @jurnal)
SET @saldo = (SELECT SUM(saldo)
FROM reseller) + (SELECT SUM(saldo)
FROM @komisi)

-- "kode": "320000099",
-- "nama": "Historical Balancing",
INSERT INTO akuntansi.dbo.mutasi
    (id_jurnal,kode_akun,saldo_akun)
SELECT @id_jurnal, '320000099', @saldo

-- "kode": "220000110",
-- "nama": "Uang Muka Penjualan",
INSERT INTO akuntansi.dbo.mutasi
    (id_jurnal,kode_akun,id_pelanggan,saldo,saldo_akun)
SELECT @id_jurnal, '220000110', kode, 0 - saldo, SUM(0 - saldo) OVER(ORDER BY kode)
FROM reseller

-- "kode": "210000950",
-- "nama": "Hutang Komisi Penjualan",
INSERT INTO akuntansi.dbo.mutasi
    (id_jurnal,kode_akun,id_pelanggan,saldo,saldo_akun)
SELECT @id_jurnal, '210000950', kode, 0 - saldo, SUM(0 - saldo) OVER(ORDER BY kode)
FROM @komisi

DECLARE @id_mutasi INT = ISNULL((SELECT TOP 1
    kode
FROM mutasi
ORDER BY kode DESC), 0)

UPDATE akuntansi.dbo.parameter
SET nilai = @id_mutasi
WHERE nama = 'id_mutasi'

IF @@ROWCOUNT = 0
BEGIN
    INSERT INTO akuntansi.dbo.parameter
        (nama,nilai)
    VALUES
        ('id_mutasi', @id_mutasi)
END
`,
];

Query.postJurnal = `
USE akuntansi

DECLARE @jurnal TABLE(id INT)

INSERT INTO jurnal (id_mutasi, tanggal, bukti, keterangan)
OUTPUT inserted.id INTO @jurnal
VALUES (@id_mutasi, @tanggal, @bukti, @keterangan)

SELECT id FROM @jurnal
`;

Query.postMutasi = `
USE akuntansi

DECLARE @saldo MONEY

-- "kode": "120000010",
-- "nama": "Bank",
IF @kode_akun = '120000010' AND ( @id_bank IS NOT NULL AND @id_bank <> '' )
BEGIN
    SET @saldo = ISNULL((SELECT TOP 1 saldo FROM mutasi WHERE kode_akun = @kode_akun AND id_bank = @id_bank ORDER BY id DESC), 0) + (@debit - @kredit)
END
-- "kode": "150000110",
-- "nama": "Uang Muka Pembelian",
ELSE IF @kode_akun = '150000110' AND ( @id_pemasok IS NOT NULL AND @id_pemasok <> '' )
BEGIN
    SET @saldo = ISNULL((SELECT TOP 1 saldo FROM mutasi WHERE kode_akun = @kode_akun AND id_pemasok = @id_pemasok ORDER BY id DESC), 0) + (@debit - @kredit)
END
-- "kode": "220000110",
-- "nama": "Uang Muka Penjualan",
ELSE IF @kode_akun = '220000110' AND ( @id_pelanggan IS NOT NULL AND @id_pelanggan <> '' )
BEGIN
    SET @saldo = ISNULL((SELECT TOP 1 saldo FROM mutasi WHERE kode_akun = @kode_akun AND id_pelanggan = @id_pelanggan ORDER BY id DESC), 0) + (@debit - @kredit)
END
-- "kode": "210000950",
-- "nama": "Hutang Komisi Penjualan",
ELSE IF @kode_akun = '210000950' AND ( @id_pelanggan IS NOT NULL AND @id_pelanggan <> '' )
BEGIN
    SET @saldo = ISNULL((SELECT TOP 1 saldo FROM mutasi WHERE kode_akun = @kode_akun AND id_pelanggan = @id_pelanggan ORDER BY id DESC), 0) + (@debit - @kredit)
END

DECLARE @saldo_akun MONEY = ISNULL((SELECT TOP 1 saldo_akun FROM mutasi WHERE kode_akun = @kode_akun ORDER BY id DESC), 0) + (@debit - @kredit)

INSERT INTO mutasi ( id_jurnal, id_mutasi, id_karyawan, id_pemasok, id_pelanggan, id_konsumen, id_bank, kode_produk, kode_bahan, harga_beli, harga_jual, kode_akun, debit, kredit, saldo, saldo_akun )
VALUES ( @id_jurnal, @id_mutasi, @id_karyawan, @id_pemasok, @id_pelanggan, @id_konsumen, @id_bank, @kode_produk, @kode_bahan, @harga_beli, @harga_jual, @kode_akun, @debit, @kredit, @saldo, @saldo_akun )

IF @id_mutasi IS NOT NULL AND @id_mutasi <> ''
BEGIN
    UPDATE parameter SET nilai = @id_mutasi WHERE nama = 'id_mutasi'
END
`;

Query.getMutasi = `
USE otomax

DECLARE @mutasi TABLE(
    id_mutasi INT,
    id_pelanggan VARCHAR(50),
    tanggal DATETIME,
    jumlah MONEY,
    keterangan VARCHAR(MAX),
    id_pelanggan2 VARCHAR(50),
    jenis VARCHAR(50),
    kode_transaksi VARCHAR(50),
    kode_produk VARCHAR(50),
    id_konsumen VARCHAR(50),
    harga_jual MONEY,
    id_pemasok INT,
    harga_beli MONEY,
    bukti VARCHAR(MAX),
    komisi MONEY,
    id_bank INT,
    status INT,
    tgl_status DATETIME
)
DECLARE @kode INT = CAST(ISNULL((SELECT nilai FROM akuntansi.dbo.parameter WHERE nama = 'id_mutasi'), 0) AS INT)
DECLARE @kode2 INT

INSERT INTO @mutasi
SELECT TOP (1000)
    mutasi.kode AS id_mutasi,
    mutasi.kode_reseller AS id_pelanggan,
    mutasi.tanggal AS tanggal,
    mutasi.jumlah AS jumlah,
    mutasi.keterangan AS keterangan,
    mutasi.kode_reseller_2 AS id_pelanggan2,
    mutasi.jenis AS jenis,
    mutasi.kode_transaksi AS kode_transaksi,
    transaksi.kode_produk AS kode_produk,
    transaksi.tujuan AS id_konsumen,
    transaksi.harga AS harga_jual,
    transaksi.kode_modul AS id_pemasok,
    transaksi.harga_beli AS harga_beli,
    transaksi.sn AS bukti,
    transaksi.komisi AS komisi,
    i_banking.kode AS id_bank,
    transaksi.status AS status,
    transaksi.tgl_status AS tgl_status
FROM mutasi
LEFT OUTER JOIN transaksi ON transaksi.kode = mutasi.kode_transaksi
LEFT OUTER JOIN i_banking ON mutasi.keterangan LIKE '%' + i_banking.label + '%'
WHERE mutasi.kode > @kode
ORDER BY mutasi.kode

SET @kode2 = (SELECT TOP 1 id_mutasi FROM @mutasi WHERE status < 20 OR DATEADD(SECOND, 5, tgl_status) > GETDATE() ORDER BY id_mutasi)

SELECT * FROM @mutasi 
WHERE @kode2 IS NOT NULL 
AND id_mutasi < @kode2 
OR @kode2 IS NULL 
ORDER BY id_mutasi
`;

Query.getNeracaSaldo = `
USE akuntansi

DECLARE @mutasi TABLE (
    kode_akun VARCHAR(20),
    saldo_akun MONEY
)
DECLARE @mutasi2 TABLE (
    kode VARCHAR(20),
    nama VARCHAR(MAX),
    debit MONEY,
    kredit MONEY
)
DECLARE @mutasi3 TABLE (
    kode VARCHAR(20),
    nama VARCHAR(MAX),
    debit MONEY,
    kredit MONEY
)
DECLARE @saldo MONEY

INSERT INTO @mutasi
SELECT mutasi.kode_akun, mutasi.saldo_akun
FROM mutasi
JOIN jurnal ON jurnal.id = mutasi.id_jurnal
WHERE mutasi.id IN (SELECT MAX(mutasi.id) FROM mutasi GROUP BY mutasi.kode_akun)
AND jurnal.tanggal BETWEEN @tanggal1 AND @tanggal2

INSERT INTO @mutasi2
SELECT 
    akun.kode,
    akun.nama,
    CASE WHEN m.saldo_akun > 0 THEN m.saldo_akun ELSE 0 END AS debit,
    CASE WHEN m.saldo_akun < 0 THEN ABS(m.saldo_akun) ELSE 0 END AS kredit
FROM @mutasi m
FULL JOIN akun ON akun.kode = m.kode_akun

SET @saldo = (SELECT SUM(debit) - SUM(kredit) FROM @mutasi2)

INSERT INTO @mutasi3
SELECT kode, nama, debit, kredit FROM @mutasi2
WHERE debit <> 0 OR kredit <> 0
UNION ALL
SELECT '', '', SUM(debit), SUM(kredit) FROM @mutasi2
UNION ALL
SELECT '', '', CASE WHEN @saldo > 0 THEN @saldo ELSE '' END, CASE WHEN @saldo < 0 THEN ABS(@saldo) ELSE '' END
`;

Query.getLabaRugi = `
USE akuntansi

DECLARE @mutasi TABLE (
    kode_akun VARCHAR(20),
    saldo_akun MONEY
)
DECLARE @mutasi2 TABLE (
    kode VARCHAR(20),
    kelompok2 VARCHAR(20),
    nama VARCHAR(MAX),
    debit MONEY,
    kredit MONEY
)
DECLARE @mutasi3 TABLE (
    kode VARCHAR(20),
    nama VARCHAR(MAX),
    debit MONEY,
    kredit MONEY
)
DECLARE @saldo MONEY

INSERT INTO @mutasi
SELECT mutasi.kode_akun, mutasi.saldo_akun
FROM mutasi
JOIN jurnal ON jurnal.id = mutasi.id_jurnal
WHERE mutasi.id IN (SELECT MAX(mutasi.id) FROM mutasi GROUP BY mutasi.kode_akun)
AND jurnal.tanggal BETWEEN @tanggal1 AND @tanggal2

INSERT INTO @mutasi2
SELECT 
    akun.kode,
    akun.kelompok2,
    akun.nama,
    CASE WHEN m.saldo_akun > 0 THEN m.saldo_akun ELSE 0 END AS debit,
    CASE WHEN m.saldo_akun < 0 THEN ABS(m.saldo_akun) ELSE 0 END AS kredit
FROM @mutasi m
FULL JOIN akun ON akun.kode = m.kode_akun
WHERE akun.kelompok2 = 1

SET @saldo = (SELECT SUM(debit) - SUM(kredit) FROM @mutasi2)

INSERT INTO @mutasi3
SELECT kode, nama, debit, kredit FROM @mutasi2
WHERE debit <> 0 OR kredit <> 0
UNION ALL
SELECT '', '', SUM(debit), SUM(kredit) FROM @mutasi2
UNION ALL
SELECT '', '', CASE WHEN @saldo > 0 THEN @saldo ELSE '' END, CASE WHEN @saldo < 0 THEN ABS(@saldo) ELSE '' END
`;

Query.getNeraca = `
USE akuntansi

DECLARE @mutasi TABLE (
    kode_akun VARCHAR(20),
    saldo_akun MONEY
)
DECLARE @mutasi2 TABLE (
    kode VARCHAR(20),
    kelompok2 VARCHAR(20),
    nama VARCHAR(MAX),
    debit MONEY,
    kredit MONEY
)
DECLARE @mutasi3 TABLE (
    kode VARCHAR(20),
    nama VARCHAR(MAX),
    debit MONEY,
    kredit MONEY
)
DECLARE @mutasi4 TABLE (
    kode VARCHAR(20),
    nama VARCHAR(MAX),
    debit MONEY,
    kredit MONEY
)
DECLARE @saldo MONEY
DECLARE @saldo2 MONEY

INSERT INTO @mutasi
SELECT mutasi.kode_akun, mutasi.saldo_akun
FROM mutasi
JOIN jurnal ON jurnal.id = mutasi.id_jurnal
WHERE mutasi.id IN (SELECT MAX(mutasi.id) FROM mutasi GROUP BY mutasi.kode_akun)
AND jurnal.tanggal BETWEEN @tanggal1 AND @tanggal2

INSERT INTO @mutasi2
SELECT 
    akun.kode,
    akun.kelompok2,
    akun.nama,
    CASE WHEN m.saldo_akun > 0 THEN m.saldo_akun ELSE 0 END AS debit,
    CASE WHEN m.saldo_akun < 0 THEN ABS(m.saldo_akun) ELSE 0 END AS kredit
FROM @mutasi m
FULL JOIN akun ON akun.kode = m.kode_akun

SET @saldo = (SELECT SUM(debit) - SUM(kredit) FROM @mutasi2
WHERE kelompok2 = 1)

-- "kode": "320000020",
-- "nama": "Laba Tahun Berjalan",
UPDATE @mutasi2
SET 
debit = CASE WHEN @saldo > 0 THEN @saldo ELSE 0 END,
kredit = CASE WHEN @saldo < 0 THEN ABS(@saldo) ELSE 0 END
WHERE kode = '320000020'

INSERT INTO @mutasi3
SELECT kode, nama, debit, kredit FROM @mutasi2
WHERE kelompok2 = 0

SET @saldo2 = (SELECT SUM(debit) - SUM(kredit) FROM @mutasi3)

INSERT INTO @mutasi4
SELECT kode, nama, debit, kredit FROM @mutasi3
WHERE debit <> 0 OR kredit <> 0
UNION ALL
SELECT '', '', SUM(debit), SUM(kredit) FROM @mutasi3
UNION ALL
SELECT '', '', CASE WHEN @saldo2 > 0 THEN @saldo2 ELSE '' END, CASE WHEN @saldo2 < 0 THEN ABS(@saldo2) ELSE '' END
`;

Query.getAkun = `
USE akuntansi

-- DECLARE @kelompok VARCHAR(20) = '0'
DECLARE @akun TABLE (
    kode VARCHAR(20) NOT NULL PRIMARY KEY,
    kelompok VARCHAR(20) NOT NULL,
    nama VARCHAR(50) NOT NULL,
    kelompok2 INT NOT NULL,
	level INT NOT NULL
)

;WITH akun2 AS (
    SELECT kode,
        kelompok,
        nama,
        kelompok2,
		0 AS level
    FROM akun
    WHERE kelompok = @kelompok
    UNION ALL
    SELECT a.kode,
        a.kelompok,
        a.nama,
        a.kelompok2,
		level + 1 AS level
    FROM akun a
        JOIN akun2 a2 ON a2.kode = a.kelompok
)

INSERT INTO @akun
SELECT kode,
    kelompok,
    nama,
    kelompok2,
	level
FROM akun2
ORDER BY kode

-- SELECT * FROM @akun
`;
module.exports=Query