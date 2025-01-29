const API_ENDPOINT = 'https://data.mongodb-api.com/app/data-zkcna/endpoint/data/v1';
const API_KEY = '664c94a8c1df14fb0ca508b8';
const DATA_SOURCE = 'Cluster0';
const DATABASE = 'clothing-app';

const db = {
  // Generic function to make requests to the MongoDB Data API
  async request(action, data) {
    const response = await fetch(`${API_ENDPOINT}/action/${action}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': API_KEY,
      },
      body: JSON.stringify({
        dataSource: DATA_SOURCE,
        database: DATABASE,
        ...data,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`MongoDB request failed: ${error}`);
    }

    return response.json();
  },

  // User operations
  async addUser(user) {
    return this.request('insertOne', {
      collection: 'users',
      document: user,
    });
  },

  async getUser(username) {
    const result = await this.request('findOne', {
      collection: 'users',
      filter: { username },
    });
    return result.document;
  },

  async updateUser(username, updatedUser) {
    return this.request('updateOne', {
      collection: 'users',
      filter: { username },
      update: { $set: updatedUser },
    });
  },

  async deleteUser(username) {
    return this.request('deleteOne', {
      collection: 'users',
      filter: { username },
    });
  },

  // Clothing item operations
  async addClothingItem(item) {
    const result = await this.request('insertOne', {
      collection: 'clothingItems',
      document: item,
    });
    return { ...item, _id: result.insertedId };
  },

  async getClothingItem(id) {
    const result = await this.request('findOne', {
      collection: 'clothingItems',
      filter: { _id: { $oid: id } },
    });
    return result.document;
  },

  async updateClothingItem(id, updatedItem) {
    return this.request('updateOne', {
      collection: 'clothingItems',
      filter: { _id: { $oid: id } },
      update: { $set: updatedItem },
    });
  },

  async deleteClothingItem(id) {
    return this.request('deleteOne', {
      collection: 'clothingItems',
      filter: { _id: { $oid: id } },
    });
  },

  async getAllClothingItems() {
    const result = await this.request('find', {
      collection: 'clothingItems',
      filter: {},
    });
    return result.documents;
  },

  // Current user operations
  async setCurrentUser(user) {
    // Using localStorage to simulate a session
    localStorage.setItem('currentUser', JSON.stringify(user));
  },

  async getCurrentUser() {
    // Using localStorage to simulate a session
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  },

  async clearCurrentUser() {
    // Using localStorage to simulate a session
    localStorage.removeItem('currentUser');
  },
};

export default db;
