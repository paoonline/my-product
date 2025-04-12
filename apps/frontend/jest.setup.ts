// jest.setup.ts
import '@testing-library/jest-dom';
import { TextEncoder } from 'util';

// Polyfill TextEncoder
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}

// Polyfill TextDecoder (if needed)
if (typeof global.TextDecoder === 'undefined') {
  try {
    const { TextDecoder } = require('util');
    global.TextDecoder = TextDecoder;
  } catch {
    // Optional: log or ignore
  }
}