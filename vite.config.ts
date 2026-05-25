import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '');
    return {
        plugins: [react()],
        root: ".",
        resolve: {
            alias: {
                "@": resolve(__dirname, "src"),
            },
        },
        build: {
            outDir: "dist",
            emptyOutDir: true,
        },
        server: {
            port: 3456,
            strictPort: true,
            proxy: {
                '/api': {
                    target: 'http://localhost:6543',
                    changeOrigin: true,
                },
                '/img': {
                    target: 'http://localhost:6543',
                    changeOrigin: true,
                },
                '/admin': {
                    target: 'http://localhost:3456', // your own vite port, just to intercept
                    bypass(req, res) {
                        const authHeader = req.headers['authorization'];
                        if (authHeader?.startsWith('Basic ')) {
                            const decoded = Buffer.from(authHeader.slice(6), 'base64').toString();
                            const [, password] = decoded.split(':');
                            if (password === (env.ADMIN_PW ?? 'changeme')) {
                                res?.setHeader('Set-Cookie', 'admin=true; Path=/');
                                return '/index.html'; // serve the vite index
                            }
                        }
                        if (!res) return;
                        res.setHeader('WWW-Authenticate', 'Basic realm="Admin"');
                        res.statusCode = 401;
                        res.end('Unauthorized');
                    },
                },
            }
        },
    }
});