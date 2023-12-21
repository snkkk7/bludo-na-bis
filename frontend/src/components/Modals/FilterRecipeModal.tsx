import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {IFilterRecipeModal} from '../../interfaces'
import FilterTab from '../Tabs/FilterTab';
import ChoosedCharacteristicsTab from '../Tabs/ChoosedCharacteristicsTab'


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
             <Box sx={{ borderColor: 'divider',display:"flex",justifyContent:"center" }}> 
                <TabList onChange={handleChangePage} variant='scrollable'>
                      <Tab label="Фильтр" value="1"/>
                      <Tab label="Выбранные опции" value="2"/>
                </TabList>
              </Box>
              <TabPanel value='1'>
                <FilterTab/>
              </TabPanel>
              <TabPanel value='2'>
                <ChoosedCharacteristicsTab/>
              </TabPanel>
          </TabContext>
        
        </Box>
      </Modal>
    )
}

export default FilterRecipeModal