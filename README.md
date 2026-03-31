# SmartRecruit - Frontend CV Screening

Aplikasi frontend untuk SmartRecruit, 

## 🛠️ Teknologi yang Digunakan

Proyek ini dibangun menggunakan:
- **[React](https://react.dev/)** + **[Vite](https://vitejs.dev/)** - Framework utama & Build Tool
- **[React Router](https://reactrouter.com/)** - Routing navigasi aplikasi
- **[Redux Toolkit](https://redux-toolkit.js.org/)** - State Management
- **[Axios](https://axios-http.com/)** - HTTP Client untuk pemanggilan API
- **[Styled Components](https://styled-components.com/)** - Penulisan CSS dalam JS (CSS-in-JS)
- **[React Hook Form](https://react-hook-form.com/)** - Manajemen formulir (Form Handling) yang efisien
- **[Recharts](https://recharts.org/)** - Visualisasi data dan chart (Dashboard)

## 📁 Struktur Folder Utama

```text
src/
├── assets/         # Gambar, ikon, dll
├── components/     # Komponen React yang dapat digunakan kembali
│   ├── common/     # Komponen umum (Navbar, Button, dll)
│   └── hr/         # Komponen khusus halaman HR
├── hooks/          # Custom React Hooks
├── pages/          # Halaman aplikasi
│   ├── public/     # Halaman publik (Landing Page, Job List)
│   └── hr/         # Halaman HR yang dilindungi (Dashboard, Candidates)
├── services/       # Integrasi API (berisi konfigurasi Axios)
├── store/          # Konfigurasi Redux dan Slices
└── utils/          # Fungsi utility/helper
```

## 🚀 Cara Menjalankan Project

### 1. Persiapan Environment

Buat file `.env` di root direktori (sejajar dengan `package.json`) lalu isi dengan URL API backend Anda. Contoh:

```env
VITE_API_URL=http://localhost:5000/api
```

### 2. Install Dependensi

Buka terminal di dalam folder proyek ini, kemudian jalankan:

```bash
npm install
```

### 3. Jalankan Development Server

Setelah instalasi selesai, mulai server dengan menjalankan:

```bash
npm run dev
```

Aplikasi dapat diakses via browser pada URL yang tertera di terminal (biasanya `http://localhost:5173`).

## 🔐 Fitur & Panduan

- **Halaman Publik**: Mengakses lowongan (Job List) dan melamar pekerjaan (Apply Job).
- **Halaman HR**: Memerlukan login. Terdapat proteksi menggunakan `localStorage` dengan token JWT (diatur via `axiosInstance.js` dan `ProtectedRoute.jsx`). 
- **Auto Logout**: Jika token JWT expired (mendapat status `401 Unauthorized` dari Backend), sesi akan otomatis terhapus dan kembali ke halaman Login.
