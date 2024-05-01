import { Box, Chip, FormControl, InputLabel, ListSubheader, MenuItem, OutlinedInput, Select, TextField } from '@mui/material'
import React, { useState } from 'react'

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

export const Header = () => {

    const [techstack, setTechStack] = useState([]);
    const [location, setLocation] = useState([]);
    const [experience, setExperience] = useState();
    const [workmode, setWorkmode] = useState();


    const handleChange = (event, setState) => {
        const {
            target: { value },
        } = event;
        setState(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    return (
        <>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">TechStack</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={techstack}
                    onChange={(e) => handleChange(e, setTechStack)}
                    input={<OutlinedInput id="select-multiple-chip" label="techstack" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {technologies.map((technology) => (
                        <MenuItem
                            key={technology}
                            value={technology}
                        >
                            {technology}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-chip-label">Location</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={location}
                    onChange={(e) => handleChange(e, setLocation)}
                    input={<OutlinedInput id="select-multiple-chip" label="location" />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {cities.map((city) => (
                        <MenuItem
                            key={city}
                            value={city}
                        >
                            {city}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel htmlFor="grouped-select">Roles</InputLabel>
                <Select defaultValue="" id="grouped-select" label="Roles">
                    <MenuItem value="">
                        <em>Roles</em>
                    </MenuItem>
                    <ListSubheader>Category 1</ListSubheader>
                    <MenuItem value={1}>Option 1</MenuItem>
                    <MenuItem value={2}>Option 2</MenuItem>
                    <ListSubheader>Category 2</ListSubheader>
                    <MenuItem value={3}>Option 3</MenuItem>
                    <MenuItem value={4}>Option 4</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 160 }}>
                <InputLabel id="demo-simple-select-label">Min Experience</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={experience}
                    label="Experience"
                    onChange={e => handleChange(e,setExperience)}
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
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">Remote</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={workmode}
                    label="Remote"
                    onChange={e => handleChange(e,setWorkmode)}
                >
                {worktypes.map((work) => (
                    <MenuItem
                        key={work}
                        value={work}
                    >
                        {workmode}
                    </MenuItem>
                ))}
                </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <TextField id="outlined-basic" label="Seach Companies" />
            </FormControl>

        </>
    )
}