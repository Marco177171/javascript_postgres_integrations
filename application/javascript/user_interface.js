import fs from "fs/promises"

export async function RenderPageFromBase(res, page_name) {
	try {
		let baseHtml = await fs.readFile(`./application/pages/base.html`, "utf8");
		const htmlContent = await fs.readFile(`./application/pages/${page_name}.html`, "utf8");
		const compositePage = baseHtml.replace("{% JPI_CONTENT %}", htmlContent);
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(compositePage);
	}
	catch (error) {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(`<h1 style="color:red;">${error.message}</h1>`);
	}
}

export async function RenderStandalonePage(res, page_name) {
	try {
		const htmlContent = await fs.readFile(`./application/pages/${page_name}.html`);
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(htmlContent);
	}
	catch (error) {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(`<h1 style="color:red;">${error.message}</h1>`);
	}
}