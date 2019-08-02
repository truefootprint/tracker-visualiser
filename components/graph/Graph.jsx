import Head from "next/head";

const Graph = () => {
  if (typeof document !== "undefined") {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "/static/graph.js";
    document.body.appendChild(s);
  }

  return <>
    <Head>
      <link rel="stylesheet" type="text/css" href="/static/graph.css" />
    </Head>

    <h1 className="title"></h1>
    <svg width="1000" height="600" />
    <p className="nulls"></p>
    <script src="https://d3js.org/d3.v5.min.js"></script>
  </>
}

export default Graph;
