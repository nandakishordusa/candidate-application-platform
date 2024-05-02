import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import "./App.css";
import { ExpandLessOutlined, ExpandMoreOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { add_jobs } from "./features/jobSlice";


function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [expand, setExpand] = useState(false);

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const jobs = useSelector(state => state.jobs.jobs)
  const dispatch = useDispatch();

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
  };


  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.weekday.technology/adhoc/getSampleJdJSON?offset=' + offset + '&limit=10', requestOptions)
      const data = await response.json();
      setCount(data.totalCount);
      //setJobs(prevJobs => [...prevJobs, ...data2]);
      dispatch(add_jobs(data.jdList));
      setOffset(prevOffset => prevOffset + 10);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);
  
  const handleExpand = () => {
    setExpand(prevExpand => !prevExpand);
  }
  

  return (
    <div>
      <Header />
      <InfiniteScroll
        dataLength={jobs.length}
        next={fetchData}
        hasMore={jobs.length !== count}
        loader={<p>Loading...</p>}
        endMessage={<p>No more data to load.</p>}
      >
        <div className="container">
          {
            jobs.map(element => {
              return (

                <Card sx={{ p: 1, m: 2, borderRadius: 1, width: '22rem' }} key={element.jdUid} >
                  <CardContent>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                      <img style={{ height: 40, width: 40, padding: '1rem' }} src="https://jobs.weekday.works/_next/static/media/logo-small.08826abd.png" alt="" />
                      <div style={{ flexDirection: 'column' }}>
                        <Typography sx={{ fontWeight: "bold", fontSize: 14 }} color="text.secondary" gutterBottom>
                          Company Name
                        </Typography>
                        <Typography variant="h6" component="div">
                          {element.jobRole}
                        </Typography>
                        <Typography sx={{ fontWeight:"bold", mb: 1.5 }} color="text.primary">
                          {element.location}
                        </Typography>
                      </div>
                    </div>
                    <Typography sx={{fontSize: 15}} color="text.primary">
                      Estimated Salary : ₹{element.minJdSalary} - {element.maxJdSalary}LPA✅
                    </Typography>
                    <Typography sx={{fontSize: 16, fontWeight: 550}} color="text.primary">
                      About Company:
                    </Typography>
                    <Typography sx={{fontSize: 14, fontWeight: 700}} color="text.primary">
                      About us
                    </Typography>
                    <Typography className="truncate"> 
                      {expand ? element.jobDetailsFromCompany : element.jobDetailsFromCompany.substr(0,100) + "..."}
                    </Typography>
                    {expand ?  <ExpandLessOutlined onClick = {handleExpand}/> : <ExpandMoreOutlined onClick={handleExpand}/>}
                    <Typography sx={{ fontWeight: "bold", fontSize: 14 }} color="text.secondary">
                      Minimum Experience
                    </Typography>
                    <Typography>
                      {element.minExp} years
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button style={{ color: 'black', backgroundColor: '#42f2f5', width: '22rem', borderRadius: '0.5rem' }} size="small"> ⚡ Easy Apply</Button>
                  </CardActions>
                  <CardActions>
                    <Button style={{ color: 'white', backgroundColor: '#494ee3', width: '22rem', borderRadius: '0.5rem' }} size="small">Unlock referral asks</Button>
                  </CardActions>
                </Card>

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
