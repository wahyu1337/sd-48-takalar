const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    // Mode akan menyesuaikan perintah (development untuk serve, production untuk build)
    entry: './src/script.js', // Entry point sederhana
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'src'), // Serve src untuk memastikan css dan image lokal dapat diakses langsung
        },
        compress: true,
        port: 8080,
        hot: true,
        open: true, // Otomatis membuka browser
    },
    plugins: [
        // Konfigurasi untuk halaman Beranda
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            inject: false, // Karena kita sudah menautkan script.js secara manual di HTML
        }),
        // Konfigurasi untuk halaman Profil
        new HtmlWebpackPlugin({
            template: './src/profil/index.html',
            filename: 'profil/index.html',
            inject: false,
        }),
        // Konfigurasi untuk halaman Staff & Guru
        new HtmlWebpackPlugin({
            template: './src/staff/index.html',
            filename: 'staff/index.html',
            inject: false,
        }),
        // Konfigurasi untuk halaman Gallery
        new HtmlWebpackPlugin({
            template: './src/gallery/index.html',
            filename: 'gallery/index.html',
            inject: false,
        }),
        // Konfigurasi untuk halaman Kontak
        new HtmlWebpackPlugin({
            template: './src/kontak/index.html',
            filename: 'kontak/index.html',
            inject: false,
        }),
        // Menyalin file CSS, JS, dan Assets ke folder dist saat build
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/styles.css', to: 'styles.css' },
                { from: 'src/script.js', to: 'script.js' },
                { from: 'src/assets', to: 'assets', noErrorOnMissing: true }
            ],
        }),
    ],
};