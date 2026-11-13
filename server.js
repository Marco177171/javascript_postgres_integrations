// server.js
import { createServer } from "node:http";
import { RenderPageFromBase, GetStaticSource } from "./public/javascript/user_interface.js"
import { 
	Search, LikeSearch, 
	Post, Put, Delete, Patch
} from "./public/javascript/api/crud_operations.js"
import { 
	Registration, Login, 
	UserIsAuthenticated 
} from "./public/javascript/api/authentication.js";

const server = createServer(async (req, res) => {

	// Static sources (CSS, fonts, ...)
	if (req.url.split("?")[0] === "/static" && req.method === "GET")
		return GetStaticSource(req, res);
	
	// Application VIEWs / UI
	else if (req.url === "/" && req.method === "GET")
		return RenderPageFromBase(res, "app/index", "app_base");
	else if (req.url === "/login" && req.method === "GET")
		return RenderPageFromBase(res, "app/login", "app_base");
	else if (req.url === "/registration" && req.method === "GET")
		return RenderPageFromBase(res, "app/registration", "app_base");
	
	// Inner DOCS / Only rendered in Dev mode
	else if (process.env.JPI_MODE === "Development") {
		// UI renderings
		if (req.url === "/docs" && req.method === "GET")
			return RenderPageFromBase(res, "docs/index", "base");
		else if (req.url === "/docs/install" && req.method === "GET")
			return RenderPageFromBase(res, "docs/install", "base");
		else if (req.url === "/docs/get" && req.method === "GET")
			return RenderPageFromBase(res, "docs/get", "base");
		else if (req.url === "/docs/get_like_search" && req.method === "GET")
			return RenderPageFromBase(res, "docs/get_like_search", "base");
		else if (req.url === "/docs/post" && req.method === "GET")
			return RenderPageFromBase(res, "docs/post", "base");
		else if (req.url === "/docs/put" && req.method === "GET")
			return RenderPageFromBase(res, "docs/put", "base");
		else if (req.url === "/docs/patch" && req.method === "GET")
			return RenderPageFromBase(res, "docs/patch", "base");
		else if (req.url === "/docs/delete" && req.method === "GET")
			return RenderPageFromBase(res, "docs/delete", "base");
	}
	
	// API routes

	// Accounts management / Authentication
	if (req.url === "/api/registration" && req.method === "POST")
		return Registration(req, res);
	else if (req.url === "/api/login" && req.method === "POST")
		return Login(req, res);
	
	// > Protected API routes
	else if (UserIsAuthenticated(req)) {
		// CRUD operations:
		if (req.url.split("?")[0] === "/api/like_search" && req.method === "GET")
			return LikeSearch(req, res);
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
		else if (req.url === "/api/logout" && req.method === "POST")
			return Logout(req, res);
	} else {
		res.writeHead(401, {
			"Content-type": "application/text"
		});
		res.end("Token verification failed. Unauthorized request.");
		return ;
	}

	res.writeHead(404);
	res.end("Not Found");
});

server.listen(3000, () => {
	console.log("Server listening on http://localhost:3000");
});