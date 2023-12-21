
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import { useState } from "react"
import TypesList from '../List/TypesList'
import HolidaysList from '../List/HolidaysList'
import NationalCuisinesList from '../List/NationalCuisineList';
import RecipeOptionsTab from '../RecipeOptionsTab'

export default function FilterTab(){


    const [tab,setTab] = useState<string>("1")

    const handleChangeTab = (_:any,tab:string) => {
            setTab(tab)
    }
 
    return (
        <TabContext value={tab}>
            <Box sx={{display:'flex',justifyContent:'center'}} >
              <TabList onChange={handleChangeTab} variant="scrollable" aria-label="lab API tabs example">
                <Tab label="Типы" value="1" />
                <Tab label="Национальные кухни" value="2" />
                <Tab label="Праздники" value="3" />
                <Tab label="Дополнительные опции" value="4"/>
              </TabList>
            </Box>
            <TabPanel value="1">
              <TypesList/>
            </TabPanel>
            <TabPanel value="2">
              <NationalCuisinesList/>
            </TabPanel>
            <TabPanel value="3">        
               <HolidaysList/>
            </TabPanel>
            <TabPanel value='4'>
                <RecipeOptionsTab/>
            </TabPanel>
        </TabContext> 
    )
}
