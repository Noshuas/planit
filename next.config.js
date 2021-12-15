const withTM = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@fullcalendar/interaction',
  '@fullcalendar/react',
  '@fullcalendar/timegrid',
  '@fullcalendar/daygrid',
]);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: ['wallpaperaccess.com', 'res.cloudinary.com', 'upload.wikimedia.org'],
  },
});
