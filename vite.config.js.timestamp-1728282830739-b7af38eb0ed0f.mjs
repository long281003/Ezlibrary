// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/Developer/Project/demoVue/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/Developer/Project/demoVue/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///D:/Developer/Project/demoVue/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "^/auth": {
        target: "http://localhost:8080",
        changeOrigin: true,
        pathRewrite: { "^/auth": "/auth" }
      },
      "^/member": {
        target: "http://localhost:8080/",
        changeOrigin: true,
        pathRewrite: { "^/member": "/member" }
      },
      "^/otp": {
        target: "http://localhost:8080/",
        changeOrigin: true,
        pathRewrite: { "^/otp": "/otp" }
      },
      "^/book": {
        target: "http://localhost:8080/",
        changeOrigin: true,
        pathRewrite: { "^/book": "/book" }
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxEZXZlbG9wZXJcXFxcUHJvamVjdFxcXFxkZW1vVnVlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxEZXZlbG9wZXJcXFxcUHJvamVjdFxcXFxkZW1vVnVlXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9EZXZlbG9wZXIvUHJvamVjdC9kZW1vVnVlL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFt2dWUoKSxdLFxuICBzZXJ2ZXI6e1xuICAgIHByb3h5OntcbiAgICAgICdeL2F1dGgnOntcbiAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDo4MDgwJywgXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgcGF0aFJld3JpdGU6IHsgJ14vYXV0aCc6ICcvYXV0aCcgfSxcbiAgICAgIH0sXG4gICAgICAnXi9tZW1iZXInOiB7XG4gICAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDo4MDgwLycsXG4gICAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICAgIHBhdGhSZXdyaXRlOiB7ICdeL21lbWJlcic6ICcvbWVtYmVyJyB9LFxuICAgICAgfSxcbiAgICAgICdeL290cCc6IHtcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjgwODAvJyxcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgICAgIHBhdGhSZXdyaXRlOiB7ICdeL290cCc6ICcvb3RwJyB9LFxuICAgICAgfSxcbiAgICAgICAnXi9ib29rJzoge1xuICAgICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MC8nLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICAgcGF0aFJld3JpdGU6IHsgJ14vYm9vayc6ICcvYm9vaycgfSxcbiAgICAgIH1cbiAgICB9XG4gIH0sICAgXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcbiAgICB9XG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQThRLFNBQVMsZUFBZSxXQUFXO0FBRWpULFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUh1SixJQUFNLDJDQUEyQztBQU14TixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsSUFBSSxDQUFFO0FBQUEsRUFDaEIsUUFBTztBQUFBLElBQ0wsT0FBTTtBQUFBLE1BQ0osVUFBUztBQUFBLFFBQ1AsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsYUFBYSxFQUFFLFVBQVUsUUFBUTtBQUFBLE1BQ25DO0FBQUEsTUFDQSxZQUFZO0FBQUEsUUFDUixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxhQUFhLEVBQUUsWUFBWSxVQUFVO0FBQUEsTUFDekM7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNMLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNiLGFBQWEsRUFBRSxTQUFTLE9BQU87QUFBQSxNQUNwQztBQUFBLE1BQ0MsVUFBVTtBQUFBLFFBQ1AsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2IsYUFBYSxFQUFFLFVBQVUsUUFBUTtBQUFBLE1BQ3RDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
