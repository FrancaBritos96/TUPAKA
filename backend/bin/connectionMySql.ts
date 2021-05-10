import mysql from 'mysql';

const connection = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "",
    database: "reclamos_v2",
    port: 3306
});

export default connection;