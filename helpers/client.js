import axios from "axios";

class Client {
  constructor(host) {
    this.host = "http://localhost:3000";
  }

  companyRankings(sector, year, { type, id }) {
    if (type === "trend") {
      return this.get(`/company_rankings/${sector}/all/${type}/${id}`);
    } else {
      return this.get(`/company_rankings/${sector}/${year}/${type}/${id}`);
    }
  }

  company(id) {
    return this.get(`/companies/${id}`);
  }

  ancestry({ type, id }) {
    if (type === "trend") {
      const outcomeId = id.split("-")[1];
      return this.get(`/ancestry/outcome/${outcomeId}`);
    } else {
      return this.get(`/ancestry/${type}/${id}`);
    }
  }

  get(path) {
    return axios.get(`${this.host}${path}`);
  }
}

export default Client;
