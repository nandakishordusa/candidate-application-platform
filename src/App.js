import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { JobCard } from "./components/JobCard";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";

function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "limit": 10,
    "offset": 20
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
  };


  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.weekday.technology/adhoc/getSampleJdJSON?offset=' + offset + '&limit=10', requestOptions)
      const data1 = await response.json();
      const data2 = data1.jdList;
      setCount(data1.totalCount);
      console.log("Helooooooooooooooooo");
      setJobs(prevJobs => [...prevJobs, ...data2]);
      setOffset(prevOffset => prevOffset + 10);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isLoading) {
      return;
    }
    fetchData();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  useEffect(() => {
    fetchData();
  }, []);
  console.log("JOBS" + jobs.length);
  console.log("Count" + count);

  return (
    <div>
      <Header />
      <InfiniteScroll
        dataLength={jobs.length}
        next={fetchData}
        hasMore={jobs.length !== count} // Replace with a condition based on your data source
        loader={<p>Loading...</p>}
        endMessage={<p>No more data to load.</p>}
      >
        <div>
          {
            jobs.map(element => {
              return (
                <>
                  <Card key={element.jdUid} sx={{ maxWidth: 275 }}>
                    <CardContent>
                      <Typography variant="body2">
                        {element.jobDetailsFromCompany}
                        <br />
                        {'"a benevolent smile"'}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                </>
              )
            })
          }

        </div>
      </InfiniteScroll>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default App;
