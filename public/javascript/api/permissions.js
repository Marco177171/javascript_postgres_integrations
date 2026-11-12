const permissions_table = {
	"admin": {
		"users": ["GET", "POST", "PUT", "PATCH", "DELETE"],
		"cars": ["GET", "POST", "PUT", "PATCH", "DELETE"]
	},
	"user": {
		"users": ["GET", "POST"],
		"cars": ["GET", "POST", "PUT"]
	},
	"viewer": {
		"users": ["GET"],
		"cars": ["GET"]
	}
};

const actions = [
	"GET",
	"POST",
	"PUT",
	"PATCH",
	"DELETE",
];

const allowed_tables = [
	"users",
	"accounts",
];

export default allowed_tables;