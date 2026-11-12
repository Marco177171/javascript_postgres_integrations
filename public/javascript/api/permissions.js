const allowed_tables = {
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

// const allowed_tables = [
// 	"users": [],
// ];

export default allowed_tables;