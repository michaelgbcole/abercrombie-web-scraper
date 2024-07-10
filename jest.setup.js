require('dotenv').config();
process.env.PUPPETEER_WS_ENDPOINTS = process.env.PUPPETEER_WS_ENDPOINTS || 'ws://localhost:8080';
