const { PoolManager, QueryBuilder } = require("../../../../common/index");
const mssql = require("mssql/msnodesqlv8");
const Query = require("./query");

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
            // kelompok: { type: mssql.VarChar, searchable: true },
            // kelompok2: { type: mssql.VarChar, searchable: true },
        };
        const { kelompok, ...options2 } = options;
        const input2 = [["kelompok", mssql.VarChar, kelompok]];
        const _query = `SELECT kode, nama FROM @akun
        `;
        const [query, input] = QueryBuilder.parse(_query, options2, columns);
        const pool = await PoolManager.get();
        const request = pool.request();
        input.concat(input2).forEach(([column, type, value]) => request.input(column, type, value));
        const result = await request.query(Query.getAkun + query);
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
        if(
            !options.id_bank&&
            !options.id_pemasok&&
            !options.id_pelanggan
        ){
            return { recordsets: [[{'':0}],[]] }
        }
        const _query = `USE akuntansi
        SELECT jurnal.tanggal, jurnal.keterangan, mutasi.kode_akun, mutasi.debit, mutasi.kredit, mutasi.saldo FROM mutasi
        INNER JOIN jurnal ON jurnal.id = mutasi.id_jurnal
        `;
        const [query, input] = QueryBuilder.parse(_query, options, columns);
        const pool = await PoolManager.get();
        const request = pool.request();
        input.forEach(([column, type, value]) => request.input(column, type, value));
        console.log(query)
        const result = await request.query(query);
        return result;
    }

    static async postJurnal(options = {}) {
        const pool = await PoolManager.get();
        const request = pool.request();
        request.input("kode", mssql.VarChar, options.kode);
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

    static async getMutasi() {
        do {
            const pool = await PoolManager.get();
            const request = pool.request();
            const result = await request.query(Query.getMutasi);
            console.log(result.recordset.length);

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
                console.log(row);
            }
            await new Promise((resolve) => setTimeout(resolve, 1000));
        } while (true);
    }

    static async getNeracaSaldo(options = {}) {
        const columns = {
            _start: { type: mssql.Int },
            _limit: { type: mssql.Int },
        };
        const { tanggal1, tanggal2, ...options2 } = options;
        const _query = `SELECT * FROM @mutasi3
        `;
        const [query, input] = QueryBuilder.parse(_query, options2, columns);
        const input2 = [
            ["tanggal1", mssql.DateTime, tanggal1],
            ["tanggal2", mssql.DateTime, tanggal2],
        ];
        const pool = await PoolManager.get();
        const request = pool.request();
        input.concat(input2).forEach(([column, type, value]) => request.input(column, type, value));
        const result = await request.query(Query.getNeracaSaldo + query);
        return result;
    }

    static async getLabaRugi(options = {}) {
        const columns = {
            _start: { type: mssql.Int },
            _limit: { type: mssql.Int },
        };
        const { tanggal1, tanggal2, ...options2 } = options;
        const _query = `SELECT * FROM @mutasi3
        `;
        const [query, input] = QueryBuilder.parse(_query, options2, columns);
        const input2 = [
            ["tanggal1", mssql.DateTime, tanggal1],
            ["tanggal2", mssql.DateTime, tanggal2],
        ];
        const pool = await PoolManager.get();
        const request = pool.request();
        input.concat(input2).forEach(([column, type, value]) => request.input(column, type, value));
        const result = await request.query(Query.getLabaRugi + query);
        return result;
    }

    static async getNeraca(options = {}) {
        const columns = {
            _start: { type: mssql.Int },
            _limit: { type: mssql.Int },
        };
        const { tanggal1, tanggal2, ...options2 } = options;
        const _query = `SELECT * FROM @mutasi4
        `;
        const [query, input] = QueryBuilder.parse(_query, options2, columns);
        const input2 = [
            ["tanggal1", mssql.DateTime, tanggal1],
            ["tanggal2", mssql.DateTime, tanggal2],
        ];
        const pool = await PoolManager.get();
        const request = pool.request();
        input.concat(input2).forEach(([column, type, value]) => request.input(column, type, value));
        const result = await request.query(Query.getNeraca + query);
        return result;
    }

    // kode
    // JU=Jurnal Umum
    // JB=Jurnal Pembelian
    // JJ=Jurnal Penjualan
    // JK=Jurnal Pengeluaran
    // JM=Jurnal Penerimaan

    static async postJurnalUmum(options = {}) {
        let { rows, ...jurnal } = options;
        /* 
            {
                kode,
                tanggal,
                bukti,
                keterangan,
                rows: [
                    {
                        kode_akun,
                        debit,
                        kredit,
                        ...
                    }
                ]
            }
        */
        jurnal = Object.assign({ kode: "JU" }, jurnal);
        const result = await Model.postJurnal(jurnal);
        let id_jurnal = result.recordsets?.[0]?.[0]?.["id"];

        for (const row of rows) {
            const mutasi = Object.assign(jurnal, row, { id_jurnal });
            await Model.postMutasi(mutasi);
        }
        return result;
    }

    static async postJurnalDeposit(options = {}) {
        options.jumlah = Math.abs(options.jumlah);
        return this.postJurnalUmum(
            Object.assign({ kode: "JM" }, options, {
                rows: [
                    { kode_akun: "110000020", debit: options.jumlah, kredit: 0 },
                    { kode_akun: "220000110", debit: 0, kredit: options.jumlah },
                ],
            })
        );
    }

    static async postJurnalTiketDeposit(options = {}) {
        options.jumlah = Math.abs(options.jumlah);
        return this.postJurnalUmum(
            Object.assign({ kode: "JM" }, options, {
                rows: [
                    { kode_akun: "120000010", debit: options.jumlah, kredit: 0 },
                    { kode_akun: "220000110", debit: 0, kredit: options.jumlah },
                ],
            })
        );
    }

    static async postJurnalBatalDeposit(options = {}) {
        options.jumlah = Math.abs(options.jumlah);
        return this.postJurnalUmum(
            Object.assign({ kode: "JU" }, options, {
                rows: [
                    { kode_akun: "220000110", debit: options.jumlah, kredit: 0 },
                    { kode_akun: "110000020", debit: 0, kredit: options.jumlah },
                ],
            })
        );
    }

    static async postJurnalBatalTiketDeposit(options = {}) {
        options.jumlah = Math.abs(options.jumlah);
        return this.postJurnalUmum(
            Object.assign({ kode: "JU" }, options, {
                rows: [
                    { kode_akun: "220000110", debit: options.jumlah, kredit: 0 },
                    { kode_akun: "120000010", debit: 0, kredit: options.jumlah },
                ],
            })
        );
    }

    static async postJurnalTukarKomisi(options = {}) {
        options.jumlah = Math.abs(options.jumlah);
        return this.postJurnalUmum(
            Object.assign({ kode: "JU" }, options, {
                rows: [
                    { kode_akun: "210000950", debit: options.jumlah, kredit: 0 },
                    { kode_akun: "220000110", debit: 0, kredit: options.jumlah },
                ],
            })
        );
    }

    static async postJurnalBatalKomisi(options = {}) {
        options.jumlah = Math.abs(options.jumlah);
        return this.postJurnalUmum(
            Object.assign({ kode: "JU" }, options, {
                rows: [
                    { kode_akun: "220000110", debit: options.jumlah, kredit: 0 },
                    { kode_akun: "210000950", debit: 0, kredit: options.jumlah },
                ],
            })
        );
    }

    static async postJurnalTransferKe(options = {}) {
        options.jumlah = Math.abs(options.jumlah);
        return this.postJurnalUmum(
            Object.assign({ kode: "JU" }, options, {
                rows: [
                    { kode_akun: "220000110", debit: options.jumlah, kredit: 0 },
                    { kode_akun: "320000099", debit: 0, kredit: options.jumlah },
                ],
            })
        );
    }

    static async postJurnalTransferDari(options = {}) {
        options.jumlah = Math.abs(options.jumlah);
        return this.postJurnalUmum(
            Object.assign({ kode: "JU" }, options, {
                rows: [
                    { kode_akun: "320000099", debit: options.jumlah, kredit: 0 },
                    { kode_akun: "220000110", debit: 0, kredit: options.jumlah },
                ],
            })
        );
    }

    static async postJurnalBiayaReply(options = {}) {
        options.jumlah = Math.abs(options.jumlah);
        return this.postJurnalUmum(
            Object.assign({ kode: "JM" }, options, {
                rows: [
                    { kode_akun: "220000110", debit: options.jumlah, kredit: 0 },
                    { kode_akun: "490000010", debit: 0, kredit: options.jumlah },
                ],
            })
        );
    }

    static async postJurnalTransaksi(options = {}) {
        options.jumlah = Math.abs(options.jumlah);
        return this.postJurnalUmum(
            Object.assign({ kode: "JM" }, options, {
                rows: [
                    { kode_akun: "220000110", debit: options.jumlah, kredit: 0 },
                    { kode_akun: "410000010", debit: 0, kredit: options.jumlah },
                    ...((options.harga_beli && [
                        { kode_akun: "510000010", debit: options.harga_beli, kredit: 0 },
                        { kode_akun: "150000110", debit: 0, kredit: options.harga_beli },
                    ]) ||
                        []),
                    ...((options.komisi && [
                        { kode_akun: "610000020", debit: options.komisi, kredit: 0 },
                        { kode_akun: "210000950", debit: 0, kredit: options.komisi },
                    ]) ||
                        []),
                ],
            })
        );
    }

    static async postJurnalRefund(options = {}) {
        options.jumlah = Math.abs(options.jumlah);
        return this.postJurnalUmum(
            Object.assign({ kode: "JU" }, options, {
                rows: [
                    { kode_akun: "410000010", debit: options.jumlah, kredit: 0 },
                    { kode_akun: "220000110", debit: 0, kredit: options.jumlah },
                    ...((options.harga_beli && [
                        { kode_akun: "150000110", debit: options.harga_beli, kredit: 0 },
                        { kode_akun: "510000010", debit: 0, kredit: options.harga_beli },
                    ]) ||
                        []),
                    ...((options.komisi && [
                        { kode_akun: "210000950", debit: options.komisi, kredit: 0 },
                        { kode_akun: "610000020", debit: 0, kredit: options.komisi },
                    ]) ||
                        []),
                ],
            })
        );
    }
}

module.exports = Model;

// akun penting
// ongkos kirim pembelian=beban pengiriman
// ongkos kirim penjualan=pendapatan lain
// potongan pembelian=potongan pembelian
// potongan penjualan=potongan penjualan
// denda keterlambatan beli=beban lain
// denda keterlambatan jual=pendapatan lain
// laba tahun berjalan=shu
// laba ditahan=dana cadangan
// pengimbang neraca=historical balance
// komisi penjualan=beban komisi penjualan
// hutang komisi penjualan=utang komisi penjualan

// harga pokok=harga pokok penjualan
// penjualan=penjualan
// persediaan=persediaan
// pengiriman beli=utang usaha yang belum ditagih
// pengiriman jual=persediaan yang belum dibebankan
// retur penjualan=penjualan
// konsinyasi=utang konsinyasi

// informasi perusahaan
// nama perusahaan=
// alamat perusahaan=
// negara
// kota=
// kode pos=
// telp=
// email=
// website=

// periode akuntansi
// bulan=
// tahun=
// tutup buku akhir tahun=

// faktur pajak
// npwp=
// pkp=
// tanggal pkp=
// nomor seri=
// nomor urut terakhir=
// alamat pkp=
// kota pkp=
// format tax version=

// penandatanganan faktur pajak
// nama
// jabatan
