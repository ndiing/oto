const { PoolManager, QueryBuilder } = require("../../../../common/index");
const mssql = require("mssql/msnodesqlv8");
const moment = require("moment");
const Query = {};

Query.init = [];
Query.init[0] = `
USE master

DROP DATABASE IF EXISTS akuntansi 

CREATE DATABASE akuntansi
`;

Query.init[1] = `
USE akuntansi

CREATE TABLE jurnal (
    id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    id_mutasi INT NULL,
    tanggal DATETIME NOT NULL,
    bukti VARCHAR(MAX) NULL,
    keterangan VARCHAR(MAX) NOT NULL
)

CREATE TABLE akun (
    kode VARCHAR(20) NOT NULL PRIMARY KEY,
    nama VARCHAR(50) NOT NULL,
    kelompok VARCHAR(20) NULL,
    kelompok2 VARCHAR(20) NULL,
    saldo MONEY NULL
)

CREATE TABLE mutasi (
    id INT NOT NULL IDENTITY(1,1) PRIMARY KEY,
    id_jurnal INT NOT NULL,
    id_mutasi INT NULL,
    id_karyawan VARCHAR(50) NULL,
    id_pemasok VARCHAR(50) NULL,
    id_pelanggan VARCHAR(50) NULL,
    id_konsumen VARCHAR(50) NULL,
    id_bank VARCHAR(50) NULL,
    kode_produk VARCHAR(50) NULL,
    kode_bahan VARCHAR(50) NULL,
    harga_beli MONEY NULL,
    harga_jual MONEY NULL,
    kode_akun VARCHAR(50) NOT NULL,
    debit MONEY NULL,
    kredit MONEY NULL,
    saldo MONEY NULL,
    saldo_akun MONEY NULL
)

CREATE TABLE parameter (
    nama VARCHAR(20) NULL UNIQUE,
    nilai VARCHAR(MAX) NULL
)

INSERT INTO akun (kode,nama,kelompok,kelompok2,saldo)
VALUES
('1', 'Harta', NULL,'rill',NULL),
('2', 'Kewajiban', NULL,'rill',NULL),
('3', 'Modal', NULL,'rill',NULL),
('4', 'Pendapatan', NULL,'nominal',NULL),
('5', 'Biaya atas Pendapatan', NULL,'nominal',NULL),
('6', 'Pengeluaran Operasional', NULL,'nominal',NULL),
('7', 'Pengeluaran Non Operasional', NULL,'nominal',NULL),
('8', 'Pendapatan Lain', NULL,'nominal',NULL),
('9', 'Pengeluaran Lain', NULL,'nominal',NULL),
('1100', 'Kas', '1','rill',NULL),
('1200', 'Bank', '1','rill',NULL),
('1300', 'Piutang Dagang', '1','rill',NULL),
('1400', 'Persediaan', '1','rill',NULL),
('1500', 'Biaya Dibayar Dimuka', '1','rill',NULL),
('1600', 'Investasi Jangka Panjang', '1','rill',NULL),
('1700', 'Harta Tetap Berwujud', '1','rill',NULL),
('1800', 'Harta Tetap Tidak Berwujud', '1','rill',NULL),
('1900', 'Harta Lainnya', '1','rill',NULL),
('2100', 'Hutang Lancar', '2','rill',NULL),
('2200', 'Pendapatan yang diterima di muka', '2','rill',NULL),
('2300', 'Hutang Jangka Panjang', '2','rill',NULL),
('2400', 'Hutang Lain', '2','rill',NULL),
('3100', 'Modal', '3','rill',NULL),
('3200', 'Laba', '3','rill',NULL),
('4100', 'Pendapatan Usaha', '4','nominal',NULL),
('4200', 'Pendapatan Lain', '4','nominal',NULL),
('5100', 'Biaya Produksi', '5','nominal',NULL),
('5200', 'Biaya Lain', '5','nominal',NULL),
('6100', 'Biaya Operasional', '6','nominal',NULL),
('6600', 'Biaya Non Operasional', '6','nominal',NULL),
('8100', 'Pendapatan Luar Usaha', '8','nominal',NULL),
('9100', 'Pengeluaran Luar Usaha', '9','nominal',NULL),
('110000010', 'Kas Kecil', '1100','rill',NULL),
('110000020', 'Kas', '1100','rill',NULL),
('110000030', 'Kas (USD)', '1200','rill',NULL),
('120000010', 'Bank', '1200','rill',NULL),
('120000020', 'Bank (USD)', '1200','rill',NULL),
('130000010', 'Piutang Giro', '1300','rill',NULL),
('130000020', 'Piutang Usaha', '1300','rill',NULL),
('130000030', 'Piutang Usaha (USD)', '1300','rill',NULL),
('130000040', 'Cadangan Kerugian Piutang', '1300','rill',NULL),
('130000050', 'Piutang Non Usaha', '1300','rill',NULL),
('140000010', 'Persediaan 1', '1400','rill',NULL),
('140000020', 'Persediaan 2', '1400','rill',NULL),
('140000030', 'Persediaan 3', '1400','rill',NULL),
('140000040', 'Persediaan 4', '1400','rill',NULL),
('1options.jumlah0010', 'Pajak Dibayar di Muka', '1500','rill',NULL),
('1options.jumlah0020', 'Asuransi Dibayar di Muka', '1500','rill',NULL),
('160000010', 'Investasi Saham', '1600','rill',NULL),
('160000020', 'Investasi Obligasi', '1600','rill',NULL),
('170000010', 'Tanah', '1700','rill',NULL),
('170000020', 'Bangunan', '1700','rill',NULL),
('170000021', 'Akumulasi Penyusutan Bangunan', '1700','rill',NULL),
('170000030', 'Mesin dan Peralatan', '1700','rill',NULL),
('170000031', 'Akumulasi Penyusutan Mesin dan Peralatan', '1700','rill',NULL),
('170000040', 'Mebel dan Alat Tulis Kantor', '1700','rill',NULL),
('170000041', 'Akumulasi Penyusutan Mebel dan ATK', '1700','rill',NULL),
('170000050', 'Kendaraan', '1700','rill',NULL),
('170000051', 'Akumulasi Penyusutan Kendaraan', '1700','rill',NULL),
('170000070', 'Harta Lainnya', '1700','rill',NULL),
('170000071', 'Akumulasi Penyusutan Harta Lainnya', '1700','rill',NULL),
('180000010', 'Hak Merek', '1800','rill',NULL),
('180000020', 'Hak Cipta', '1800','rill',NULL),
('180000030', 'Good Will', '1800','rill',NULL),
('190000020', 'Biaya Pra Operasi dan Operasi', '1900','rill',NULL),
('190000021', 'Akumulasi Amortisasi Pra Operasi dan Operasi', '1900','rill',NULL),
('210000010', 'Wesel Bayar', '2100','rill',NULL),
('210000015', 'Hutang Giro', '2100','rill',NULL),
('210000020', 'Hutang Usaha', '2100','rill',NULL),
('210000025', 'Hutang Usaha (USD)', '2100','rill',NULL),
('210000030', 'Hutang Konsinyasi', '2100','rill',NULL),
('210000040', 'Uang Muka Penjualan', '2100','rill',NULL),
('210000055', 'Hutang Deviden', '2100','rill',NULL),
('210000060', 'Hutang Bunga', '2100','rill',NULL),
('210000065', 'Biaya yang Masih Harus Dibayar', '2100','rill',NULL),
('210000075', 'Kartu Kredit', '2100','rill',NULL),
('210000080', 'Hutang Pajak Penjualan', '2100','rill',NULL),
('210000085', 'Hutang Gaji', '2100','rill',NULL),
('220000010', 'Sewa Diterima di Muka', '2200','rill',NULL),
('230000010', 'Pinjaman Hipotik', '2300','rill',NULL),
('230000020', 'Hutang Bank', '2300','rill',NULL),
('310000010', 'Saham Preferen', '3100','rill',NULL),
('310000020', 'Modal Disetor', '3100','rill',NULL),
('310000030', 'Saham Biasa', '3100','rill',NULL),
('320000010', 'Laba ditahan', '3200','rill',NULL),
('320000020', 'Laba Tahun Berjalan', '3200','rill',NULL),
('320000099', 'Historical Balancing', '3200','rill',NULL),
('410000010', 'Penjualan Produk 1', '4100','nominal',NULL),
('410000020', 'Penjualan Produk 2', '4100','nominal',NULL),
('410000030', 'Penjualan Produk 3', '4100','nominal',NULL),
('420000040', 'Penjualan Lain', '4200','nominal',NULL),
('420000070', 'Potongan Penjualan', '4200','nominal',NULL),
('420000080', 'Pendapatan Denda Keterlambatan', '4200','nominal',NULL),
('420000090', 'Pendapatan atas Pengantaran', '4200','nominal',NULL),
('510000010', 'Biaya 1', '5100','nominal',NULL),
('510000020', 'Biaya 2', '5100','nominal',NULL),
('510000030', 'Biaya 3', '5100','nominal',NULL),
('510000070', 'Potongan Pembelian', '5100','nominal',NULL),
('510000080', 'Biaya atas Pengiriman Barang', '5100','nominal',NULL),
('520000010', 'Kerugian Piutang', '5200','nominal',NULL),
('520000020', 'Biaya Denda Keterlambatan', '5200','nominal',NULL),
('520000030', 'Kerusakan dan Kegagalan Material', '5200','nominal',NULL),
('610000010', 'Gaji Direksi dan Karyawan', '6100','nominal',NULL),
('610000030', 'Listrik', '6100','nominal',NULL),
('610000050', 'Promosi dan Iklan', '6100','nominal',NULL),
('610000060', 'Administrasi Kantor', '6100','nominal',NULL),
('660000010', 'Penyusutan Bangunan', '6600','nominal',NULL),
('660000011', 'Penyusutan Mesin dan Peralatan', '6600','nominal',NULL),
('660000012', 'Penyusutan Mebel dan ATK', '6600','nominal',NULL),
('660000013', 'Penyusutan Kendaraan', '6600','nominal',NULL),
('660000015', 'Penyusutan Harta Lainnya', '6600','nominal',NULL),
('660000016', 'Amortisasi Pra Operasi dan Operasi', '6600','nominal',NULL),
('810000020', 'Laba Rugi Selisih Kurs', '8100','nominal',NULL),
('810000030', 'Hasil Sewa', '8100','nominal',NULL),
('910000010', 'Biaya Bunga', '9100','nominal',NULL),
('910000011', 'Jasa Bank', '9100','nominal',NULL),
('510000040', 'Komisi Penjualan', '5100','nominal',NULL),
('210000082', 'Hutang Komisi Penjualan', '2100','rill',NULL),
('130000021', 'Piutang Sementara', '1300','rill',NULL),
('130000031', 'Piutang Sementara (USD)', '1300','rill',NULL),
('130000098', 'Uang Muka Pembelian', '1300','rill',NULL),
('130000099', 'Uang Muka Pembelian (USD)', '1300','rill',NULL),
('210000098', 'Uang Muka Penjualan', '2100','rill',NULL),
('210000099', 'Uang Muka Penjualan (USD)', '2100','rill',NULL),
('140000098', 'Persediaan Dalam Perjalanan Beli', '1400','rill',NULL),
('140000099', 'Persediaan Dalam Perjalanan Jual', '1400','rill',NULL)

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

-- id_jurnal?
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

-- "kode": "210000098",
-- "nama": "Uang Muka Penjualan",
INSERT INTO akuntansi.dbo.mutasi
    (id_jurnal,kode_akun,id_pelanggan,saldo,saldo_akun)
SELECT @id_jurnal, '210000098', kode, 0 - saldo, SUM(0 - saldo) OVER(ORDER BY kode)
FROM reseller

-- "kode": "210000082",
-- "nama": "Hutang Komisi Penjualan",
INSERT INTO akuntansi.dbo.mutasi
    (id_jurnal,kode_akun,id_pelanggan,saldo,saldo_akun)
SELECT @id_jurnal, '210000082', kode, 0 - saldo, SUM(0 - saldo) OVER(ORDER BY kode)
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
`;
Query.postJurnal = `
USE akuntansi

-- DECLARE @id_mutasi INT = 123456789
-- DECLARE @tanggal DATETIME = GETDATE()
-- DECLARE @bukti VARCHAR(MAX)
-- DECLARE @keterangan VARCHAR(MAX) = 'keterangan'
DECLARE @jurnal TABLE(id INT)

INSERT INTO jurnal (id_mutasi, tanggal, bukti, keterangan)
OUTPUT inserted.id INTO @jurnal
VALUES (@id_mutasi, @tanggal, @bukti, @keterangan)

SELECT id FROM @jurnal
`;
Query.postMutasi = `
USE akuntansi

-- DECLARE @id_jurnal INT
-- DECLARE @id_mutasi INT

-- DECLARE @id_karyawan VARCHAR(20)
-- DECLARE @id_pemasok VARCHAR(20)
-- DECLARE @id_pelanggan VARCHAR(20) = 'AAA0000001'
-- DECLARE @id_konsumen VARCHAR(20)
-- DECLARE @id_bank VARCHAR(20)
-- DECLARE @kode_produk VARCHAR(20)
-- DECLARE @kode_bahan VARCHAR(20)
-- DECLARE @harga_beli MONEY
-- DECLARE @harga_jual MONEY

-- DECLARE @kode_akun VARCHAR(20) = '210000098'
-- DECLARE @debit MONEY = 0
-- DECLARE @kredit MONEY = 1000000

DECLARE @saldo MONEY

-- "kode": "120000010",
-- "nama": "Bank",
IF @kode_akun = '120000010' AND ( @id_bank IS NOT NULL AND @id_bank <> '' )
BEGIN
    SET @saldo = ISNULL((SELECT TOP 1 saldo FROM mutasi WHERE kode_akun = @kode_akun AND id_bank = @id_bank ORDER BY id DESC), 0) + (@debit - @kredit)
END
-- "kode": "130000098",
-- "nama": "Uang Muka Pembelian",
ELSE IF @kode_akun = '130000098' AND ( @id_pemasok IS NOT NULL AND @id_pemasok <> '' )
BEGIN
    SET @saldo = ISNULL((SELECT TOP 1 saldo FROM mutasi WHERE kode_akun = @kode_akun AND id_pemasok = @id_pemasok ORDER BY id DESC), 0) + (@debit - @kredit)
END
-- "kode": "210000098",
-- "nama": "Uang Muka Penjualan",
ELSE IF @kode_akun = '210000098' AND ( @id_pelanggan IS NOT NULL AND @id_pelanggan <> '' )
BEGIN
    SET @saldo = ISNULL((SELECT TOP 1 saldo FROM mutasi WHERE kode_akun = @kode_akun AND id_pelanggan = @id_pelanggan ORDER BY id DESC), 0) + (@debit - @kredit)
END
-- "kode": "210000082",
-- "nama": "Hutang Komisi Penjualan",
ELSE IF @kode_akun = '210000082' AND ( @id_pelanggan IS NOT NULL AND @id_pelanggan <> '' )
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

DROP TABLE IF EXISTS #mutasi

DECLARE @kode INT = CAST(ISNULL((SELECT nilai FROM akuntansi.dbo.parameter WHERE nama = 'id_mutasi'), 0) AS INT)
DECLARE @kode2 INT

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
INTO #mutasi
FROM mutasi
LEFT OUTER JOIN transaksi ON transaksi.kode = mutasi.kode_transaksi
LEFT OUTER JOIN i_banking ON mutasi.keterangan LIKE '%' + i_banking.label + '%'
WHERE mutasi.kode > @kode
ORDER BY mutasi.kode

SET @kode2 = (SELECT TOP 1 id_mutasi FROM #mutasi WHERE status < 20 OR DATEADD(SECOND, 5, tgl_status) > GETDATE() ORDER BY id_mutasi)

SELECT * FROM #mutasi 
WHERE @kode2 IS NOT NULL 
AND id_mutasi < @kode2 
OR @kode2 IS NULL 
ORDER BY id_mutasi
`;
Query.getNeracaSaldo=`
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
DECLARE @tanggal1 DATETIME = CAST('2022-05-31T17:00:00.000Z' AS DATETIME)
DECLARE @tanggal2 DATETIME = CAST('2022-06-30T16:59:59.999Z' AS DATETIME)

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

SELECT * FROM @mutasi3
`
Query.getLabaRugi=`
USE akuntansi

DECLARE @mutasi TABLE (
    kode_akun VARCHAR(20),
    saldo_akun MONEY
)
DECLARE @mutasi2 TABLE (
    kode VARCHAR(20),
    nama VARCHAR(MAX),
    kelompok2 VARCHAR(20),
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
DECLARE @tanggal1 DATETIME = CAST('2022-05-31T17:00:00.000Z' AS DATETIME)
DECLARE @tanggal2 DATETIME = CAST('2022-06-30T16:59:59.999Z' AS DATETIME)

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
    akun.kelompok2,
    CASE WHEN m.saldo_akun > 0 THEN m.saldo_akun ELSE 0 END AS debit,
    CASE WHEN m.saldo_akun < 0 THEN ABS(m.saldo_akun) ELSE 0 END AS kredit
FROM @mutasi m
FULL JOIN akun ON akun.kode = m.kode_akun
WHERE akun.kelompok2 = 'nominal'

SET @saldo = (SELECT SUM(debit) - SUM(kredit) FROM @mutasi2)

INSERT INTO @mutasi3
SELECT kode, nama, debit, kredit FROM @mutasi2
WHERE debit <> 0 OR kredit <> 0
UNION ALL
SELECT '', '', SUM(debit), SUM(kredit) FROM @mutasi2
UNION ALL
SELECT '', '', CASE WHEN @saldo > 0 THEN @saldo ELSE '' END, CASE WHEN @saldo < 0 THEN ABS(@saldo) ELSE '' END

SELECT * FROM @mutasi3
`

Query.getNeraca=`
USE akuntansi

DECLARE @mutasi TABLE (
    kode_akun VARCHAR(20),
    saldo_akun MONEY
)
DECLARE @mutasi2 TABLE (
    kode VARCHAR(20),
    nama VARCHAR(MAX),
    kelompok2 VARCHAR(20),
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
DECLARE @tanggal1 DATETIME = CAST('2022-05-31T17:00:00.000Z' AS DATETIME)
DECLARE @tanggal2 DATETIME = CAST('2022-06-30T16:59:59.999Z' AS DATETIME)

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
    akun.kelompok2,
    CASE WHEN m.saldo_akun > 0 THEN m.saldo_akun ELSE 0 END AS debit,
    CASE WHEN m.saldo_akun < 0 THEN ABS(m.saldo_akun) ELSE 0 END AS kredit
FROM @mutasi m
FULL JOIN akun ON akun.kode = m.kode_akun

SET @saldo = (SELECT SUM(debit) - SUM(kredit) FROM @mutasi2
WHERE kelompok2 = 'nominal')

-- "kode": "320000020",
-- "nama": "Laba Tahun Berjalan",
UPDATE @mutasi2
SET 
debit = CASE WHEN @saldo > 0 THEN @saldo ELSE 0 END,
kredit = CASE WHEN @saldo < 0 THEN ABS(@saldo) ELSE 0 END
WHERE kode = '320000020'

INSERT INTO @mutasi3
SELECT kode, nama, debit, kredit FROM @mutasi2
WHERE kelompok2 = 'rill'

SET @saldo2 = (SELECT SUM(debit) - SUM(kredit) FROM @mutasi3)

INSERT INTO @mutasi4
SELECT kode, nama, debit, kredit FROM @mutasi3
WHERE debit <> 0 OR kredit <> 0
UNION ALL
SELECT '', '', SUM(debit), SUM(kredit) FROM @mutasi3
UNION ALL
SELECT '', '', CASE WHEN @saldo2 > 0 THEN @saldo2 ELSE '' END, CASE WHEN @saldo2 < 0 THEN ABS(@saldo2) ELSE '' END

SELECT * FROM @mutasi4
`

class Model {
    static async getReseller(options = {}) {
        const columns = {
            _start: { type: mssql.Int },
            _limit: { type: mssql.Int },
            kode: { type: mssql.VarChar, searchable: true },
            nama: { type: mssql.VarChar, searchable: true },
            saldo: { type: mssql.Int },
        };
        const _query = `USE otomax
        SELECT kode,nama,saldo FROM reseller
        `;
        const [query, input] = QueryBuilder.parse(_query, options, columns);
        const pool = await PoolManager.get();
        const request = pool.request();
        input.forEach(([column, type, value]) => request.input(column, type, value));
        const result = await request.query(query);
        return result;
    }

    static async getIBanking(options = {}) {
        const columns = {
            _start: { type: mssql.Int },
            _limit: { type: mssql.Int },
            kode: { type: mssql.Int },
            label: { type: mssql.VarChar, searchable: true },
        };
        const _query = `USE otomax
        SELECT kode,label FROM i_banking
        `;
        const [query, input] = QueryBuilder.parse(_query, options, columns);
        const pool = await PoolManager.get();
        const request = pool.request();
        input.forEach(([column, type, value]) => request.input(column, type, value));
        const result = await request.query(query);
        return result;
    }

    static async getModul(options = {}) {
        const columns = {
            _start: { type: mssql.Int },
            _limit: { type: mssql.Int },
            kode: { type: mssql.Int },
            label: { type: mssql.VarChar, searchable: true },
            saldo: { type: mssql.Int },
        };
        const _query = `USE otomax
        SELECT kode,label,saldo FROM modul
        `;
        const [query, input] = QueryBuilder.parse(_query, options, columns);
        const pool = await PoolManager.get();
        const request = pool.request();
        input.forEach(([column, type, value]) => request.input(column, type, value));
        const result = await request.query(query);
        return result;
    }

    static async init(options = {}) {
        const pool = await PoolManager.get();
        let result;
        for (const query of Query.init) {
            result = await pool.request().query(query);
        }
        return result;
    }

    static async getAkun(options = {}) {
        const columns = {
            _start: { type: mssql.Int },
            _limit: { type: mssql.Int },
            kode: { type: mssql.VarChar, searchable: true },
            nama: { type: mssql.VarChar, searchable: true },
            kelompok: { type: mssql.VarChar, searchable: true },
            kelompok2: { type: mssql.VarChar, searchable: true },
        };
        const _query = `USE akuntansi
        SELECT * FROM akun
        `;
        const [query, input] = QueryBuilder.parse(_query, options, columns);
        const pool = await PoolManager.get();
        const request = pool.request();
        input.forEach(([column, type, value]) => request.input(column, type, value));
        const result = await request.query(query);
        return result;
    }

    static async getBukuBesar(options = {}) {
        const columns = {
            _start: { type: mssql.Int },
            _limit: { type: mssql.Int },
            tanggal1: { type: mssql.DateTime },
            tanggal2: { type: mssql.DateTime },
        };
        const _query = `USE akuntansi
        SELECT jurnal.tanggal, jurnal.keterangan, mutasi.kode_akun, mutasi.debit, mutasi.kredit, mutasi.saldo_akun FROM mutasi
        INNER JOIN jurnal ON jurnal.id = mutasi.id_jurnal
        `;
        const [query, input] = QueryBuilder.parse(_query, options, columns);
        const pool = await PoolManager.get();
        const request = pool.request();
        input.forEach(([column, type, value]) => request.input(column, type, value));
        const result = await request.query(query);
        return result;
    }

    static async getBukuBesarPembantu(options = {}) {
        const columns = {
            _start: { type: mssql.Int },
            _limit: { type: mssql.Int },
            tanggal1: { type: mssql.DateTime },
            tanggal2: { type: mssql.DateTime },
        };
        const _query = `USE akuntansi
        SELECT jurnal.tanggal, jurnal.keterangan, mutasi.kode_akun, mutasi.debit, mutasi.kredit, mutasi.saldo FROM mutasi
        INNER JOIN jurnal ON jurnal.id = mutasi.id_jurnal
        `;
        const [query, input] = QueryBuilder.parse(_query, options, columns);
        const pool = await PoolManager.get();
        const request = pool.request();
        input.forEach(([column, type, value]) => request.input(column, type, value));
        const result = await request.query(query);
        return result;
    }

    static async postJurnal(options = {}) {
        const pool = await PoolManager.get();
        const request = pool.request();
        request.input("id_mutasi", mssql.Int, options.id_mutasi);
        request.input("tanggal", mssql.DateTime, options.tanggal);
        request.input("bukti", mssql.VarChar, options.bukti);
        request.input("keterangan", mssql.VarChar, options.keterangan);
        const result = await request.query(Query.postJurnal);
        return result;
    }

    static async postMutasi(options = {}) {
        const pool = await PoolManager.get();
        const request = pool.request();
        request.input("id_jurnal", mssql.Int, options.id_jurnal);
        request.input("id_mutasi", mssql.Int, options.id_mutasi);
        request.input("id_karyawan", mssql.VarChar, options.id_karyawan);
        request.input("id_pemasok", mssql.VarChar, options.id_pemasok);
        request.input("id_pelanggan", mssql.VarChar, options.id_pelanggan);
        request.input("id_konsumen", mssql.VarChar, options.id_konsumen);
        request.input("id_bank", mssql.VarChar, options.id_bank);
        request.input("kode_produk", mssql.VarChar, options.kode_produk);
        request.input("kode_bahan", mssql.VarChar, options.kode_bahan);
        request.input("harga_beli", mssql.Money, options.harga_beli);
        request.input("harga_jual", mssql.Money, options.harga_jual);
        request.input("kode_akun", mssql.VarChar, options.kode_akun);
        request.input("debit", mssql.Money, options.debit);
        request.input("kredit", mssql.Money, options.kredit);
        const result = await request.query(Query.postMutasi);
        return result;
    }

    static async postJurnalUmum(options = {}) {
        const { rows, ...jurnal } = options;
        let id_jurnal;
        if (!(rows[0].debit > 0)) {
            throw { code: 400, message: "Pencatatan tidak sesuai." };
        }
        if (!(rows.reduce((p, c) => p + (c.debit - c.kredit), 0) == 0)) {
            throw { code: 400, message: "Saldo tidak seimbang." };
        }
        const result = await Model.postJurnal(jurnal);
        // console.log(jurnal);
        id_jurnal = result.recordsets?.[0]?.[0]?.["id"];
        for (const row of rows) {
            const mutasi = Object.assign(jurnal, row, { id_jurnal });
            await Model.postMutasi(mutasi);
            // console.log(mutasi);
        }
        return result;
    }

    static async postJurnalDeposit(options = {}) {
        options.jumlah = Math.abs(options.jumlah);
        return this.postJurnalUmum(
            Object.assign(options, {
                rows: [
                    { kode_akun: "110000020", debit: options.jumlah, kredit: 0 },
                    { kode_akun: "210000098", debit: 0, kredit: options.jumlah },
                ],
            })
        );
    }
    static async postJurnalTiketDeposit(options = {}) {
        options.jumlah = Math.abs(options.jumlah);
        return this.postJurnalUmum(
            Object.assign(options, {
                rows: [
                    { kode_akun: "120000010", debit: options.jumlah, kredit: 0 },
                    { kode_akun: "210000098", debit: 0, kredit: options.jumlah },
                ],
            })
        );
    }
    static async postJurnalBatalDeposit(options = {}) {
        options.jumlah = Math.abs(options.jumlah);
        return this.postJurnalUmum(
            Object.assign(options, {
                rows: [
                    { kode_akun: "210000098", debit: options.jumlah, kredit: 0 },
                    { kode_akun: "110000020", debit: 0, kredit: options.jumlah },
                ],
            })
        );
    }
    static async postJurnalBatalTiketDeposit(options = {}) {
        options.jumlah = Math.abs(options.jumlah);
        return this.postJurnalUmum(
            Object.assign(options, {
                rows: [
                    { kode_akun: "210000098", debit: options.jumlah, kredit: 0 },
                    { kode_akun: "120000010", debit: 0, kredit: options.jumlah },
                ],
            })
        );
    }
    static async postJurnalTukarKomisi(options = {}) {
        options.jumlah = Math.abs(options.jumlah);
        return this.postJurnalUmum(
            Object.assign(options, {
                rows: [
                    { kode_akun: "210000082", debit: options.jumlah, kredit: 0 },
                    { kode_akun: "210000098", debit: 0, kredit: options.jumlah },
                ],
            })
        );
    }
    static async postJurnalBatalKomisi(options = {}) {
        options.jumlah = Math.abs(options.jumlah);
        return this.postJurnalUmum(
            Object.assign(options, {
                rows: [
                    { kode_akun: "210000098", debit: options.jumlah, kredit: 0 },
                    { kode_akun: "210000082", debit: 0, kredit: options.jumlah },
                ],
            })
        );
    }
    static async postJurnalTransferKe(options = {}) {
        options.jumlah = Math.abs(options.jumlah);
        return this.postJurnalUmum(
            Object.assign(options, {
                rows: [
                    { kode_akun: "210000098", debit: options.jumlah, kredit: 0 },
                    { kode_akun: "320000099", debit: 0, kredit: options.jumlah },
                ],
            })
        );
    }
    static async postJurnalTransferDari(options = {}) {
        options.jumlah = Math.abs(options.jumlah);
        return this.postJurnalUmum(
            Object.assign(options, {
                rows: [
                    { kode_akun: "320000099", debit: options.jumlah, kredit: 0 },
                    { kode_akun: "210000098", debit: 0, kredit: options.jumlah },
                ],
            })
        );
    }
    static async postJurnalBiayaReply(options = {}) {
        options.jumlah = Math.abs(options.jumlah);
        return this.postJurnalUmum(
            Object.assign(options, {
                rows: [
                    { kode_akun: "210000098", debit: options.jumlah, kredit: 0 },
                    { kode_akun: "420000040", debit: 0, kredit: options.jumlah },
                ],
            })
        );
    }
    static async postJurnalTransaksi(options = {}) {
        options.jumlah = Math.abs(options.jumlah);
        return this.postJurnalUmum(
            Object.assign(options, {
                rows: [
                    { kode_akun: "210000098", debit: options.jumlah, kredit: 0 },
                    { kode_akun: "410000010", debit: 0, kredit: options.jumlah },
                    ...((options.harga_beli && [
                        { kode_akun: "510000010", debit: options.harga_beli, kredit: 0 },
                        { kode_akun: "130000098", debit: 0, kredit: options.harga_beli },
                    ]) ||
                        []),
                    ...((options.komisi && [
                        { kode_akun: "510000040", debit: options.komisi, kredit: 0 },
                        { kode_akun: "210000082", debit: 0, kredit: options.komisi },
                    ]) ||
                        []),
                ],
            })
        );
    }
    static async postJurnalRefund(options = {}) {
        options.jumlah = Math.abs(options.jumlah);
        return this.postJurnalUmum(
            Object.assign(options, {
                rows: [
                    { kode_akun: "410000010", debit: options.jumlah, kredit: 0 },
                    { kode_akun: "210000098", debit: 0, kredit: options.jumlah },
                    ...((options.harga_beli && [
                        { kode_akun: "130000098", debit: options.harga_beli, kredit: 0 },
                        { kode_akun: "510000010", debit: 0, kredit: options.harga_beli },
                    ]) ||
                        []),
                    ...((options.komisi && [
                        { kode_akun: "210000082", debit: options.komisi, kredit: 0 },
                        { kode_akun: "510000040", debit: 0, kredit: options.komisi },
                    ]) ||
                        []),
                ],
            })
        );
    }

    static async getMutasi() {
        do {
            const pool = await PoolManager.get();
            const request = pool.request();
            const result = await request.query(Query.getMutasi);
            let length = result.recordset.length;
            for (const row of result.recordset) {
                if (row.jenis == null || row.jenis == "B") {
                    if (row.jumlah > 0) {
                        if (row.id_bank) await this.postJurnalTiketDeposit(row);
                        else await this.postJurnalDeposit(row);
                    } else {
                        if (row.id_bank) await this.postJurnalBatalTiketDeposit(row);
                        else await this.postJurnalBatalDeposit(row);
                    }
                } else if (row.jenis == "K") {
                    if (row.jumlah > 0) await this.postJurnalTukarKomisi(row);
                    else await this.postJurnalBatalKomisi(row);
                } else if (row.jenis == "1") await this.postJurnalTransferKe(row);
                else if (row.jenis == "2") await this.postJurnalTransferDari(row);
                else if (row.jenis == "O") await this.postJurnalBiayaReply(row);
                else if (row.jenis == "T") await this.postJurnalTransaksi(row);
                else if (row.jenis == "G") await this.postJurnalRefund(row);
                console.log(--length);
            }
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } while (true);
    }


    static async getNeracaSaldo(options = {}) {
        // const columns = {
        //     _start: { type: mssql.Int },
        //     _limit: { type: mssql.Int },
        // };
        // const _query = `USE akuntansi
        // SELECT * FROM akun
        // `;
        // const [query, input] = QueryBuilder.parse(_query, options, columns);
        const pool = await PoolManager.get();
        const request = pool.request();
        // input.forEach(([column, type, value]) => request.input(column, type, value));
        const result = await request.query(Query.getNeracaSaldo);
        return result;
    }

    static async getLabaRugi(options = {}) {
        // const columns = {
        //     _start: { type: mssql.Int },
        //     _limit: { type: mssql.Int },
        // };
        // const _query = `USE akuntansi
        // SELECT * FROM akun
        // `;
        // const [query, input] = QueryBuilder.parse(_query, options, columns);
        const pool = await PoolManager.get();
        const request = pool.request();
        // input.forEach(([column, type, value]) => request.input(column, type, value));
        const result = await request.query(Query.getLabaRugi);
        return result;
    }

    static async getNeraca(options = {}) {
        // const columns = {
        //     _start: { type: mssql.Int },
        //     _limit: { type: mssql.Int },
        // };
        // const _query = `USE akuntansi
        // SELECT * FROM akun
        // `;
        // const [query, input] = QueryBuilder.parse(_query, options, columns);
        const pool = await PoolManager.get();
        const request = pool.request();
        // input.forEach(([column, type, value]) => request.input(column, type, value));
        const result = await request.query(Query.getNeraca);
        return result;
    }

}

module.exports = Model;

// console.log(
//     moment('2022-03').startOf('month').toISOString(),
//     moment('2022-03').endOf('month').toISOString(),
// )
