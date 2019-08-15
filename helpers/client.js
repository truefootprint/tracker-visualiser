import axios from "axios";

class Client {
  constructor(host) {
    this.host = "http://localhost:3000";
  }

  companyRankings(sector, threshold, year, { type, id }) {
    let t = threshold.replace(".", "-");

    if (type === "trend") {
      return this.get(`/company_rankings/${sector}/${t}/all/history/${id}`);
    } else {
      return this.get(`/company_rankings/${sector}/${t}/${year}/${type}/${id}`);
    }
  }

  companyRanking(sector, threshold, year, company, { type, id }) {
    let t = threshold.replace(".", "-");

    return this.get(`/company_rankings/${sector}/${t}/${year}/history/${type}-${id}-${company}`);
  }

  company(id) {
    return this.get(`/companies/${id}`);
  }

  ancestry({ type, id }) {
    if (type === "trend") {
      const [rankableType, rankableId] = id.split("-");

      return this.get(`/ancestry/${rankableType.toLowerCase()}/${rankableId}`);
    } else {
      return this.get(`/ancestry/${type}/${id}`);
    }
  }

  get(path) {
    return axios.get(`${this.host}${path}`);
  }
}

export default Client;
