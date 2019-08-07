import axios from "axios";

class Client {
  constructor(host) {
    this.host = host;
  }

  companyRankings(sector, year, { type, id }) {
    return this.get(`/company_rankings/${sector}/${year}/${type}/${id}`);
  }

  ancestry({ type, id }) {
    return this.get(`/ancestry/${type}/${id}`);
  }

  get(path) {
    return axios.get(`${this.host}${path}`);
  }
}

export default Client;
