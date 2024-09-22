// FIXME: add VITE_REACT... value in env
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL || 'http://localhost:3001';

/** API class with static methods for getting and sending to the API. */

class BabyBootcampAPI {

  // this will hold the authenticated user's JWT
  static token;

  static async request(endpoint, data = {}, method = "GET") {
    const url = new URL(`${BASE_URL}/${endpoint}`);
    const headers = {
      authorization: `Bearer ${token}`,
      'content-type': 'application/json',
    };

    url.search = (method === "GET")
      ? new URLSearchParams(data).toString()
      : "";

    // set to undefined since the body property cannot exist on a GET method
    const body = (method !== "GET")
      ? JSON.stringify(data)
      : undefined;

    const resp = await fetch(url, { method, body, headers });

    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const message = (await resp.json()).error.message;
      throw Array.isArray(message) ? message : [message];
    }

    return await resp.json();
  }

  // Individual API routes

  /** Get current user's feeding entries by username. */
  static async userEntries(userId) {
    let res = await this.request(`eat/${userId}`)
    return res.userEntries;
  }

  /** Create a new feeding entry. */
  static async createEntry(createdData) {
    let res = await this.request(`/eat`, data, "POST");
    // FIXME: update what is returned
    return res;
  }

  /** Update an existing feeding entry. */
  static async updateEntry(entryId, updatedData) {
    let res = await this.request(`eat/`, updatedData, "PATCH");
  }

}

export default BabyBootcampAPI;