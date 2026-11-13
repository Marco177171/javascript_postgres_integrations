import postgres from "postgres";
// import { Accounts } from "./database/base.js"
// import { DataTypes } from "./database/data_types";

const sql = postgres({
	host: process.env.POSTGRES_HOST,
	port: Number(process.env.POSTGRES_PORT),
	database: process.env.POSTGRES_NAME,
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
});

// function InitPostgres() {
// 	try {
// 		const result = sql`
// 		CREATE TABLE schema_name.table_name (
// 			${Accounts.id} ${DataTypes.integer} unique,
// 			column_name data_type constraint,
// 			column_name data_type constraint,
// 			...
// 		);`
// 	} catch (error) {
// 		console.error(error);
// 		throw (error);
// 	}
// }

// InitPostgres();
export default sql;