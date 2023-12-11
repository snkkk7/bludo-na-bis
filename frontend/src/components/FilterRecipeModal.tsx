import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TypesList from './TypesList';
import {IFilterRecipeModal} from '../interfaces'
import HolidaysList from './HolidaysList';
import NationalCuisinesList from './NationalCuisineList'
import RecipeOptionsTab from './RecipeOptionsTab';
import SelectedFiltersTab from './SelectedFiltersTab'


const FilterRecipeModal:React.FC<IFilterRecipeModal> = ({isOpen,handleCloseFilterModal}) => {

  const [page,setPage] = React.useState<string>("1")
  
  const handleChangePage = (e:any,page:string) => {
    setPage(page)

  }


    return (
        <Modal
        open={isOpen}
        onClose={handleCloseFilterModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="bg-white w-6/12 mx-auto mt-44 px-10 py-5">
        <TabContext value={page}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider',display:"flex",justifyContent:"center" }}>
              <TabList onChange={handleChangePage} variant="scrollable" aria-label="lab API tabs example">
                <Tab label="Выбранные фильтры" value="5"/>
                <Tab label="Типы" value="1" />
                <Tab label="Национальные кухни" value="2" />
                <Tab label="Праздники" value="3" />
                <Tab label="Дополнительные опции" value="4"/>
              </TabList>
            </Box>
            <TabPanel value='5'>
              <SelectedFiltersTab/>
            </TabPanel>
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
        </Box>
      </Modal>
    )
}

export default FilterRecipeModal