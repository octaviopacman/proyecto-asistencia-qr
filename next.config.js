module.exports = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://backend-asistencia-qr.vercel.app/api/:path',
          },
        ]
      },
  };