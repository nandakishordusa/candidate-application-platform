import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name : 'jobs',
    initialState : {
        jobs : [],
        filters : {}
    },
    reducers : {
        add_jobs : (state, action) => {
            const newJobs = action.payload;
            // const uniqueJobs = newJobs.filter(newJob => 
            //     !state.jobs.some(existingJob => existingJob.jdUid === newJob.jdUid)
            // );
            state.jobs = [...state.jobs, ...newJobs];
        },
        search_jobs : (state, action) => {
            let query = action.payload;
            let searchResults = query === '' ? state.jobs : state.jobs.filter(job => job.companyname?.toLowerCase().includes(query))
            state.jobs = searchResults
        },
        filter_jobs : (state,action) => {
            let filters = action.payload;
            console.log(filters)
          
            let items = state.jobs;

            state.jobs =  filters?.length === 0 ? state.jobs : items.filter(item => {
                    return Object.keys(filters).every(key => {
                        return filters[key].includes(item[key]);
                    });
                });
        }
    }
})

export const {add_jobs, search_jobs, filter_jobs} = jobSlice.actions

export default jobSlice.reducer
