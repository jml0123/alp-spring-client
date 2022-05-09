import axios from 'axios';
import config from '../../../config';

export default class DonationHttpService {
    static rootUrl = config.API_ENDPOINT;

    static async fetchUserCollections(userId) {
      try {
          const res = await axios.get(`${this.rootUrl}/collections/${userId}/index`);
          return res.data
      } catch(err) {
          return;
      }
    }

    static async fetchUserDrive(userId) {
        try {
            const res = await axios.get(`${this.rootUrl}/users/${userId}/drive`);
            return res.data
        } catch(err) {
            return;
        }
      }

    static async patchUserDrive(userId, books) {
        try {
            const res = await axios.put(`${this.rootUrl}/users/${userId}/drive`, books);
            return res.data
        } catch(err) {
            return;
        }
      }
  
    static async createNewCollection(collection) {
      try {
          const res = await axios.post(`${this.rootUrl}/collections/new`, collection);
          return res.data
      } catch(err) {
          return;
      }
    }

    static async patchCollection({books, points, status, collectionId}) {
        try {
            const res = await axios.put(`${this.rootUrl}/collections/${collectionId}`, {books, points, status});
            return res.data
        } catch(err) {
            return;
        }
    }

    static async getCollectionByQrCode(collectionId) {
        try {
            const res = await axios.get(`${this.rootUrl}collections/${collectionId}`);
            return res.data
        } catch(err) {
            return;
        }
    }
  
    static async fetchNearestBookCollectors({lat, long}) {
      try {
          const res = await axios.post(`${this.rootUrl}/users/index?long=${long}&latt=${lat}`);
          return res.data
      } catch(err) {
          return;
      }
    }

}