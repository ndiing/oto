const mssql = require("mssql/msnodesqlv8");
const pools = new Map();
const sqlConfig = {
    user: "",
    password: "",
    database: "",
    server: "localhost",
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
    },
    options: {
        encrypt: false, // for azure
        trustServerCertificate: true, // change to true for local dev / self-signed certs
        trustedConnection: true, // change to true for local dev / self-signed certs
    },
};

module.exports = {
    /**
     * Get or create a pool. If a pool doesn't exist the config must be provided.
     * If the pool does exist the config is ignored (even if it was different to the one provided
     * when creating the pool)
     *
     * @param {string} name
     * @param {{}} [config]
     * @return {Promise.<mssql.ConnectionPool>}
     */
    get: (name='default', config=sqlConfig) => {
        if (!pools.has(name)) {
            if (!config) {
                throw new Error("Pool does not exist");
            }
            const pool = new mssql.ConnectionPool(config);
            // automatically remove the pool from the cache if `pool.close()` is called
            const close = pool.close.bind(pool);
            pool.close = (...args) => {
                pools.delete(name);
                return close(...args);
            };
            pools.set(name, pool.connect());
        }
        return pools.get(name);
    },
    /**
     * Closes all the pools and removes them from the store
     *
     * @return {Promise<mssql.ConnectionPool[]>}
     */
    closeAll: () =>
        Promise.all(
            Array.from(pools.values()).map((connect) => {
                return connect.then((pool) => pool.close());
            })
        ),
};
