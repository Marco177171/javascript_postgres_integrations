import DataTypes from "./data_types.js"

class BaseModel {
	"id" = DataTypes.int;
	"created_at" = DataTypes.date_time;
}

export class Account extends BaseModel {
	"email" = DataTypes.text;
	"password" = DataTypes.text;
}