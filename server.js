import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { createSavedOrder, validateOrder } from "./shared/orders.js";

const root = process.cwd();
const distRoot = path.join(root, "dist");
const staticRoot = fs.existsSync(path.join(distRoot, "index.html")) ? distRoot : root;
const port = Number(process.env.PORT || 4173);
const host = "127.0.0.1";
const ordersFile = path.join(root, "orders.json");

const types = {
  ".html": "text/html;charset=utf-8",
  ".css": "text/css;charset=utf-8",
  ".js": "application/javascript;charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url.split("?")[0] === "/api/orders") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) req.destroy();
    });
    req.on("end", () => {
      try {
        const order = JSON.parse(body || "{}");
        const validationError = validateOrder(order);
        if (validationError) {
          res.writeHead(400, { "Content-Type": "application/json;charset=utf-8" });
          res.end(JSON.stringify({ error: validationError }));
          return;
        }

        const existing = fs.existsSync(ordersFile)
          ? JSON.parse(fs.readFileSync(ordersFile, "utf8") || "[]")
          : [];
        const savedOrder = createSavedOrder(order);
        existing.push(savedOrder);
        fs.writeFileSync(ordersFile, JSON.stringify(existing, null, 2));
        res.writeHead(201, { "Content-Type": "application/json;charset=utf-8" });
        res.end(JSON.stringify({ orderId: savedOrder.orderId, status: savedOrder.status }));
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json;charset=utf-8" });
        res.end(JSON.stringify({ error: "Invalid order payload" }));
      }
    });
    return;
  }

  let pathname = decodeURIComponent(req.url.split("?")[0]);
  if (pathname === "/") pathname = "/index.html";

  const file = path.normalize(path.join(staticRoot, pathname));
  const relativePath = path.relative(staticRoot, file);
  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(file, (error, data) => {
    if (error) {
      const fallback = path.join(staticRoot, "index.html");
      if (staticRoot === distRoot && req.method === "GET") {
        fs.readFile(fallback, (fallbackError, fallbackData) => {
          if (fallbackError) {
            res.writeHead(404, { "Content-Type": "text/plain;charset=utf-8" });
            res.end("Not found");
            return;
          }
          res.writeHead(200, { "Content-Type": types[".html"] });
          res.end(fallbackData);
        });
        return;
      }
      res.writeHead(404, { "Content-Type": "text/plain;charset=utf-8" });
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": types[path.extname(file)] || "application/octet-stream",
    });
    res.end(data);
  });
});

server.listen(port, host, () => {
  console.log(`FishWeb preview: http://${host}:${port}`);
});
