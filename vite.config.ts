import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  base: '/lucky-mango/' // ✅ ชื่อ repo ต้องตรง
});
