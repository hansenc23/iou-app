const dev = {
  API_URL: 'http://localhost:5000',
};

const prod = {
  API_URL: 'https://www.iou-app.com',
};

const config = process.env.NODE_ENV === 'development' ? dev : prod;

export default config;
