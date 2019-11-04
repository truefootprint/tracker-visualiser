import axios from "axios";

class Client {
  constructor(username, password) {
    this.auth = { username, password };

    if (process.env.NODE_ENV === "production") {
      this.host = "https://tracker-backend.truefootprint.com";
    } else {
      this.host = "http://localhost:3000";
    }
  }

  companyRankings(sector, distribution, threshold, year, metal, { type, id }) {
    let t = threshold.toString().replace(".", "-");
    let tagsParam = "";

    if (metal && metal === "Gold") {
      tagsParam = `?tags=${metal}`;
    }

    if (type === "trend") {
      return this.get(`/company_rankings/${sector}/${distribution}/${t}/all/history/${id}${tagsParam}`);
    } else {
      return this.get(`/company_rankings/${sector}/${distribution}/${t}/${year}/${type}/${id}${tagsParam}`);
    }
  }

  companyRanking(sector, distribution, threshold, year, company, { type, id }) {
    let t = threshold.toString().replace(".", "-");

    return this.get(`/company_rankings/${sector}/${distribution}/${t}/${year}/history/${type}-${id}-${company}`);
  }

  compareCompanies(sector, distribution, threshold, excludedCompany, metal, { type, id }) {
    let t = threshold.toString().replace(".", "-");
    let tagsParam = "";

    if (metal && metal === "Gold") {
      tagsParam = `?tags=${metal}`;
    }

    return this.get(
      `/company_rankings/${sector}/${distribution}/${t}/all/compare/${type}-${id}-${excludedCompany}${tagsParam}`
    );
  }

  company(id) {
    return this.get(`/companies/${id}`);
  }

  ancestry({ type, id, sector }) {
    if (type === "trend") {
      const [rankableType, rankableId] = id.split("-");

      return this.get(`/ancestry/${sector}/${rankableType.toLowerCase()}/${rankableId}`);
    } else {
      return this.get(`/ancestry/${sector}/${type}/${id}`);
    }
  }

  get(path) {
    return axios.get(`${this.host}${path}`, { auth: this.auth });
  }
}

export default Client;
