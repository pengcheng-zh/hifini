/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: [
        'antd-mobile',
        'rc-util', 
        'rc-picker',
        'rc-pagination',
        '@ant-design', 
        'antd'],
    env: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        BACKEND_URL: process.env.BACKEND_URL
    }
}

module.exports = nextConfig
