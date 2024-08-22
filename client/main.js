import { initializeSession, getApi, putApi } from './api-methods';
import { configureLogger } from '../../lib/logger';

export const MieApi = {
  initializeSession,
  getApi,
  putApi,
  configureLogger
};