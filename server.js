// server.js
import { createServer } from "node:http";
import { RenderPageFromBase, GetStaticSource } from "./public/javascript/user_interface.js"
import { 
	GetByID, Search,
	Post, Put, Delete,
	Patch
} from "./public/javascript/api/crud_operations.js"
import { Registration } from "./public/javascript/api/authentication.js";
import fs from "fs";

const server = createServer(async (req, res) => {
	// ManageCachedObjects();
	
	if (process.env.JPI_MODE === "Development") {
		// Get static sources (CSS, fonts, ...)
		if (req.url.split("?")[0] === "/static" && req.method === "GET")
			return GetStaticSource(req, res);
		// UI renderings
		if (req.url === "/docs" && req.method === "GET")
			return RenderPageFromBase(res, "docs/index");
		if (req.url === "/docs/install" && req.method === "GET")
			return RenderPageFromBase(res, "docs/install");
		else if (req.url === "/docs/get" && req.method === "GET")
			return RenderPageFromBase(res, "docs/get");
		else if (req.url === "/docs/post" && req.method === "GET")
			return RenderPageFromBase(res, "docs/post");
		else if (req.url === "/docs/put" && req.method === "GET")
			return RenderPageFromBase(res, "docs/put");
		else if (req.url === "/docs/patch" && req.method === "GET")
			return RenderPageFromBase(res, "docs/patch");
		else if (req.url === "/docs/delete" && req.method === "GET")
			return RenderPageFromBase(res, "docs/delete");
	}
	
	// API calls

	// > Users management
	if (req.url === "/api/registration" && req.method === "POST")
		return Registration(req, res);
	else if (req.url === "/api/login" && req.method === "POST")
		return Login(req, res);
	else if (req.url === "/api/logout" && req.method === "POST")
		return Logout(req, res);
	
	// > CRUD operations
	else if (req.url.split("?")[0] === "/api/get_by_id" && req.method === "GET")
		return GetByID(req, res);
	else if (req.url.split("?")[0] === "/api" && req.method === "GET")
		return Search(req, res);
	else if (req.url.split("?")[0] === "/api" && req.method === "POST")
		return Post(req, res);
	else if (req.url.split("?")[0] === "/api" && req.method === "PUT")
		return Put(req, res);
	else if (req.url.split("?")[0] === "/api" && req.method === "PATCH")
		return Patch(req, res);
	else if (req.url.split("?")[0] === "/api" && req.method === "DELETE")
		return Delete(req, res);

	res.writeHead(404);
	res.end("Not Found");
});

server.listen(3000, () => {
	console.log("Server listening on http://localhost:3000");
});