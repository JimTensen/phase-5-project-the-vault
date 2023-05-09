import { useEffect, useState } from "react";


function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("/articles")
      .then((r) => r.json())
      .then(setArticles);
  }, []);

  return (
    <main>
      <h1>this is home</h1>
    </main>
  );
}

export default Home;
