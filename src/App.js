import { useEffect } from "react";
import { Header } from "./components/Header";
import { JobCard } from "./components/JobCard";

function App() {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "limit": 10,
    "offset": 0
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
  };

  useEffect(() => {
    fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
  },[])

  
  return (
    <div>
      <Header/>
      <JobCard/>
    </div>
  );
}

export default App;
