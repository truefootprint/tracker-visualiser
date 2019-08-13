import axios from "axios";

class Client {
  constructor(host) {
    this.host = "http://localhost:3000";
  }

  companyRankings(sector, year, { type, id }) {
    return this.get(`/company_rankings/${sector}/${year}/${type}/${id}`);
  }

  trend(sector, outcomeId, companyId) {
    return this.get(`/company_rankings/${sector}/trend/outcome/${outcomeId}/${companyId}`);
  }

  company(id) {
    return this.get(`/companies/${id}`);
  }

  ancestry({ type, id }) {
    return this.get(`/ancestry/${type}/${id}`);
  }

  get(path) {
    return axios.get(`${this.host}${path}`);
  }
}

export default Client;
