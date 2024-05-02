import { Box, Chip, FormControl, InputLabel, ListSubheader, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { filter_jobs, search_jobs } from '../features/jobSlice';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const years = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const technologies = [
    'Python',
    'java',
    'GoLang',
    'Ruby/Rails',
    'C++',
    'Kotlin',
    'Django',
    'C#'
];
const cities = [
    'Bangalore',
    'Hyderabad',
    'Pune',
    'Kolkata',
    'Delhi',
    'Noida',
    'Gurgaon',
    'Kochi',
    'Chennai'
];
const worktypes = [
    'Remote',
    'Onsite',
    'Hybrid'
]
const salaries = [
    0,
    10,
    20,
    30,
    40,
    50,
    60
]

const ENGINEERING = ['Backend','FrontEnd','FullStack','IOS','Flutter','React Native','Android','DevOps']
const DESIGN = ['Designer','Design Manager','Graphic Designer', 'Product Designer']

export const Header = () => {

    const [techstack, setTechStack] = useState([]);
    const [location, setLocation] = useState([]);
    const [experience, setExperience] = useState();
    const [workmode, setWorkmode] = useState();
    const [basepay, setBasePay] = useState();
    const [input, setInput] = useState();
    const [roles, setRoles] = useState([]);

    const dispatch = useDispatch()
    const [filters,setFilters] = useState({})

    useEffect(()=>{
        dispatch(filter_jobs(filters))
    },[filters])

    useEffect(() => {
        if(techstack?.length === 0){
            delete(filters['techstack'])
        }
        else{
            setFilters({...filters, 'techstack' : techstack})
        }
    },[techstack])

    useEffect(() => {
        if(location?.length === 0){
            delete(filters['location'])
        }
        else{
            setFilters({...filters, 'location' : location})
        }
    },[location])

    useEffect(() => {
        if(experience?.length === 0){
            delete(filters['minExp'])
        }
        else{
            setFilters({...filters, 'minExp' : experience})
        }
    },[experience])

    useEffect(() => {
        if(basepay === null){
            delete(filters['minJdSalary'])
        }
        else{
            setFilters({...filters, 'minJdSalary' : basepay})
        }
    },[basepay])

    const handleTechChange = (event) => {
        const {
            target: { value },
        } = event;
        setTechStack(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

    };



    const handleLocChange = (event) => {
        const {
            target: { value },
        } = event;
        setLocation(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );

    };

    const handleRoleChange = (event) => {
        const {
            target: { value },
        } = event;
        setRoles(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
         );

    };

    const handleExpChange = (event) => {
        const {
            target: { value },
        } = event;
        setExperience(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
         );

    };

    const handleBasepayChange = (event) => {
        const {
            target: { value },
        } = event;
        setBasePay(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
         );

    };

    

    const handleInput = (e) => {
        dispatch(search_jobs(e));
    }

    return (
        <div>
            <FormControl sx={{m:1, minWidth : 140}}>
                <InputLabel id="demo-multiple-chip-label">TechStack</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={techstack}
                    onChange={(e) => handleTechChange(e)}
                    input={<OutlinedInput id="select-multiple-chip" label="techstack" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                    autoWidth
                >
                    {technologies.map((technology) => (
                        <MenuItem
                            key={technology}
                            value={technology.toLowerCase()}
                        >
                            {technology}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl sx={{m:1, minWidth : 140}}>
                <InputLabel id="demo-multiple-chip-label">Location</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={location}
                    onChange={(e) => handleLocChange(e)}
                    input={<OutlinedInput id="select-multiple-chip" label="location" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))} 
                        </Box>
                    )}
                    autoWidth
                    MenuProps={MenuProps}
                >
                    {cities.map((city) => (
                        <MenuItem
                            key={city}
                            value={city.toLowerCase}
                        >
                            {city}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl sx={{m:1, minWidth : 140}}>
                <InputLabel htmlFor="grouped-select">Roles</InputLabel>
                <Select 
                    id="grouped-select" 
                    label="Roles" 
                    value={roles}
                    onChange={(e) => handleRoleChange(e)}
                    multiple
                    input={<OutlinedInput id="select-multiple-chip" label="roles" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value}/>
                            ))} 
                        </Box>
                    )}
                    autoWidth
                    MenuProps={MenuProps}
                >
                    <ListSubheader>ENGINEERING</ListSubheader>
                    {
                        ENGINEERING.map((role) => (
                            <MenuItem
                                key={role}
                                value={role}
                            >
                                {role}
                            </MenuItem>
                        ))
                    }
                    
                    <ListSubheader>DESIGN</ListSubheader>
                    {
                        DESIGN.map((role) => (
                            <MenuItem
                                key={role}
                                value={role}
                            >
                                {role}
                            </MenuItem>
                        ))
                    }
                    
                </Select>
            </FormControl>
            <FormControl sx={{m:1, minWidth : 200}}>
                <InputLabel id="demo-simple-select-label">Min Experience</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={experience}
                    label="Experience"
                    onChange={e => handleExpChange(e)}
                >
                    {years.map((year) => (
                        <MenuItem
                            key={year}
                            value={year}
                        >
                            {year}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl sx={{m:1, minWidth : 120}}>
                <InputLabel id="demo-simple-select-label">Remote</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={workmode}
                    label="Remote"
                    onChange={e => handleLocChange(e)}
                >
                {worktypes.map((work) => (
                    <MenuItem
                        key={work}
                        value={work}
                    >
                        {work}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            <FormControl sx={{m:1, minWidth : 200}}>
                <InputLabel id="demo-simple-select-label">Min Base Pay</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={basepay}
                    label="Min Base Pay"
                    onChange={e => handleBasepayChange(e)}
                >
                {salaries.map((salary) => (
                    <MenuItem
                        key={salary}
                        value={salary}
                    >
                        {salary}L
                    </MenuItem>
                ))}
                </Select>
            </FormControl>

            <FormControl sx={{m:1, minWidth : 140}}>
                <TextField onChange = {e => handleInput(e)} id="outlined-basic" label="Seach Companies" />
            </FormControl>

        </div>
    )
}
