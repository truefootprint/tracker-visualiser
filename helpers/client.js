import axios from "axios";

class Client {
  constructor(host) {
    if (process.env.NODE_ENV === "production") {
      this.host = "http://tracker-backend.truefootprint.com";
    } else {
      this.host = "http://localhost:3000";
    }
  }

  companyRankings(sector, distribution, threshold, year, { type, id }) {
    let t = threshold.toString().replace(".", "-");

    if (type === "trend") {
      return this.get(`/company_rankings/${sector}/${distribution}/${t}/all/history/${id}`);
    } else {
      return this.get(`/company_rankings/${sector}/${distribution}/${t}/${year}/${type}/${id}`);
    }
  }

  companyRanking(sector, distribution, threshold, year, company, { type, id }) {
    let t = threshold.toString().replace(".", "-");

    return this.get(`/company_rankings/${sector}/${distribution}/${t}/${year}/history/${type}-${id}-${company}`);
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
