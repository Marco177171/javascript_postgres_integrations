import fs from "fs/promises"

export async function RenderPage(res, page_name) {
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