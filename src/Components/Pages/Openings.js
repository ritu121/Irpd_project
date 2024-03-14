import { React, useEffect, useState } from 'react';
import RootLayout from '../Layout/RootLayout';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { FaSearch } from "react-icons/fa";

import ListData from '../common/ListData';
import { getAPI } from '../network';

import './index.css'

function CustomTabPanel(props) {
  const { children, value, index, tab, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== tab}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === tab && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Openings = () => {

  const [value, setValue] = useState('Open');
  const [jobData, setJobData] = useState([])


  useEffect(() => {
    OpeningData()
  }, [value])


  const handleChange = async (event, newValue) => {
    setValue(newValue);
  };
  const OpeningData = async () => {
    let Data = await getAPI(`/getJobByStatus?status=${value}`)
    if (Data) {
      setJobData(Data.data)
    }
  }
  const SearchJob = async (e) => {

    const input = e.target.value

    let Data = await getAPI(`/search?name=${input}`)
    if (Data) {
      setJobData(Data.data)
    }
  }

  
 


  return (
    <RootLayout>
      <div className="bg-white rounded-full border-none p-3 m-4 shadow-md  z-1 ">
        <div className="flex items-center ">
          <FaSearch />
          <input type="text" placeholder="Search..." className="ml-3 focus:outline-none w-full" onChange={(e) => { SearchJob(e) }} />
        </div>
      </div>

      {/* <Box sx={{ width: '100%' }}> */}
        
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab sx={{ color: 'green',borderRadius:'5px'  }} label="Open" value={'Open'}    {...a11yProps(0)} />
            <Tab sx={{ color: 'red',borderRadius:'5px'}} label="Active" value={'Active'}   {...a11yProps(1)} />
            <Tab sx={{  color: '#ad04cf',borderRadius:'5px' }} label="InActive" value={'InActive'}{...a11yProps(2)} />
          </Tabs>
        
        <CustomTabPanel value={value} index={0} tab={'Open'}>

          <ListData jobData={jobData} status={'Current'} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1} tab={'Active'}>

          <ListData jobData={jobData} status={'Active'}/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2} tab={'InActive'}>

          <ListData jobData={jobData} status={'InActive'}/>
        </CustomTabPanel>
      {/* </Box> */}
    </RootLayout>

  )
}

export default Openings