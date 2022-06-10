const mssql = require("mssql/msnodesqlv8");

class QueryBuilder {
    // filter
    // paginate
    // sort
    // slice
    // search

    static parse(query = "", options = {}, columns = {}) {
        let { _page = 1, _limit = 500000, _sort, _order, _start = 0, _end = 20, q, ...filters } = options;
        let where_and = "";
        let where_or = "";
        let where = "";
        const input = new Map();
        _page = Number(_page);
        _limit = Number(_limit);
        _start = Number(_start);
        _end = Number(_end);

        const {database,select,table,query2} = ({...query.match(new RegExp(/^(USE (?<database>.*)(\n| ))?[\s\S]+SELECT (?<select>.*) FROM (?<table>.*)(\n| )(?<query2>[\s\S]+)$/))?.groups})

        let keys = Object.keys(filters);
        if (keys.length) {
            where_and = keys
                .map((key) => {
                    const [column, operator] = key.match(/^(\w+)(_lt|_gt|_lte|_gte|_eq|_nq|_in|_nin|_like|_between)$/)?.slice(1) || [key, "_eq"];
                    const value = filters[key];
                    input.set(column, value);
                    return {
                        _lt: (column, value) => `${column} < @${column}\n`,
                        _gt: (column, value) => `${column} > @${column}\n`,
                        _lte: (column, value) => `${column} <= @${column}\n`,
                        _gte: (column, value) => `${column} >= @${column}\n`,
                        _eq: (column, value) => `${column} = @${column}\n`,
                        _nq: (column, value) => `${column} <> @${column}\n`,
                        _in: (column, value) => `${column} IN (@${column})\n`,
                        _nin: (column, value) => `${column} NOT IN (@${column})\n`,
                        _like: (column, value) => `${column} LIKE '%'+@${column}+'%'\n`,
                        _between: (column, value) => {
                            const [value1, value2] = value.split(",");
                            input.delete(column);
                            input.set(`${column}1`, value1);
                            input.set(`${column}2`, value2);
                            return `${column} BETWEEN @${column}1 AND @${column}2\n`;
                        },
                    }[operator](column, value);
                })
                .join("AND ");
        }

        if (q) {
            where_or = Object.keys(columns)
                .filter((key) => columns[key]?.searchable)
                .map((column) => {
                    let query = `${column} LIKE '%'+@q+'%'\n`;
                    if (where_and) {
                        query = [query, where_and].join("AND ");
                    }
                    return query;
                })
                .join("OR ");
            input.set("q", q);
        }

        if (where_or || where_and) {
            where += `WHERE `;
            if (where_or) {
                where += where_or;
            } else {
                where += where_and;
            }
        }

        query = "";

        if (database) {
            query += `USE ${database}\n`;
        }

        query += `SELECT COUNT(*) FROM ${table}\n`;
        query += query2;
        query += where;

        query += `SELECT ${select} FROM ${table}\n`;
        query += query2;
        query += where;

        if (_sort || (!isNaN(_start) && !isNaN(_end))) {
            query += `ORDER BY `;
            if (_sort) {
                _order = _order.split(",");
                query += _sort
                    .split(",")
                    .map((column, index) => `${column} ${_order[index]}`)
                    .join(", ");
            } else {
                query += `(SELECT NULL)`;
            }
            query += `\n`;
        }

        if (!isNaN(_start) && !isNaN(_end)) {
            if (!isNaN(_page) && !isNaN(_limit)) {
                _start = _start + (_page - 1) * _limit;
            }
            _limit = _end - _start;

            input.set("_start", _start);
            input.set("_limit", _limit);

            query += `OFFSET @_start ROWS\n`;
            query += `FETCH NEXT @_limit ROWS ONLY\n`;
        }

        return [query,Array.from(input.entries(), ([column, value]) => [column, columns?.[column]?.type || mssql.VarChar, value])];
    }
}

module.exports = QueryBuilder;

// QueryBuilder.parse(
//     ``,
//     {
//         // _sort: "kode,nama",
//         // _order: "desc,asc",
//         // nama: "virgin",
//         // nama_lt: "virgin",
//         // nama_gt: "virgin",
//         // nama_lte: "virgin",
//         // nama_gte: "virgin",
//         // nama_eq: "virgin",
//         // nama_nq: "virgin",
//         // nama_in: "virgin",
//         // nama_nin: "virgin",
//         // nama_like: "virgin",
//         // nama_between: "vir,gin",
//         // q: "virgin",
//     },
//     {
//         _start: { type: mssql.Int, searchable: false },
//         _limit: { type: mssql.Int, searchable: false },
//         kode: { type: mssql.VarChar, searchable: true },
//         nama: { type: mssql.VarChar, searchable: true },
//         nama: { type: mssql.VarChar, searchable: true },
//     }
// );
