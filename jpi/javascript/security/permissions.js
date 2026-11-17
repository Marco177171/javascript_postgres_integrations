const permissions_table = {
	"admin": {
		"accounts": ["GET", "POST", "PUT", "PATCH", "DELETE"],
		"users": ["GET", "POST", "PUT", "PATCH", "DELETE"],
	},
	"user": {
		"accounts": [],
		"users": ["GET"],
	},
	"viewer": {
		"accounts": [],
		"users": ["GET"],
	}
};

const actions = [
	"GET",
	"POST",
	"PUT",
	"PATCH",
	"DELETE",
];

export const allowed_tables = [
	"users",
	"accounts",
];