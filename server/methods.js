import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Logger } from '../lib/logger';
import api from 'mieapi';

const { apiService } = api;

Meteor.methods({
  async fetchApiData(userHandle, username, password) {
    check(userHandle, String);
    check(username, String);
    check(password, String);

    Logger.info('Fetching API data', { userHandle, username });

    try {
      const result = await apiService.initializeSession(userHandle, username, password);
      if (result && result.success) {
        Logger.info('API data fetched successfully', { userHandle });
        return result.cookie;
      } else {
        Logger.warn('API error', { userHandle, message: result ? result.message : 'No result' });
        throw new Meteor.Error('api-error', result ? result.message : 'Failed to fetch API data');
      }
    } catch (error) {
      Logger.error('Error fetching API data', { error: error.message, stack: error.stack });
      throw new Meteor.Error('api-error', 'Error fetching API data: ' + error.message);
    }
  },

  async getApiData(apiName, cookie, userHandle) {
    check(apiName, String);
    check(cookie, String);
    check(userHandle, String);

    Logger.info('Getting API data', { apiName, userHandle });

    try {
      const result = await apiService.getApi(cookie, apiName, {}, userHandle);
      Logger.info('API data retrieved successfully', { apiName, userHandle });
      return result;
    } catch (error) {
      Logger.error('Error getting API data', { error: error.message, stack: error.stack });
      throw new Meteor.Error('get-api-error', 'Error fetching Get API data', error);
    }
  },

  async putApiData(apiName, jsonData, cookie, userHandle) {
    check(apiName, String);
    check(jsonData, Object);
    check(cookie, String);
    check(userHandle, String);

    Logger.info('Putting API data', { apiName, userHandle });

    try {
      const result = await apiService.putApi(cookie, apiName, jsonData, userHandle);
      Logger.info('API data updated successfully', { apiName, userHandle });
      return result;
    } catch (error) {
      Logger.error('Error putting API data', { error: error.message, stack: error.stack });
      throw new Meteor.Error('put-api-error', 'Error updating data via PUT API', error);
    }
  }
});

if (Meteor.isServer) {
  Meteor.startup(() => {
    // This ensures the methods are properly registered
  });
}