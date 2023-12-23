import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {IRecipeModal} from '../../interfaces'
import CharacteristicsTab from '../Tabs/CharacteristicsTab';
import ChoosedFilterCharacteristicsTab from '../Tabs/ChoosedFilterCharacteristicsTab'
import ChoosedRecipeCharacteristicsTab from "../Tabs/ChoosedRecipeCharacteristicsTab"

const CharacteristicsRecipeModal:React.FC<IRecipeModal> = ({isOpen,handleCloseModal,addType,addHoliday,addNationalCuisine,typeModal}) => {

  const [page,setPage] = React.useState<string>("1")
  
  const handleChangePage = (e:any,page:string) => {
    setPage(page)

  }


    return (
        <Modal
        open={isOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="bg-white w-6/12 mx-auto mt-44 px-10 py-5">
          <TabContext value={page}>
             <Box sx={{ borderColor: 'divider',display:"flex",justifyContent:"center" }}> 
                <TabList onChange={handleChangePage} variant='scrollable'>
                      {
                        typeModal === "filterRecipeModal" &&  <Tab label="Фильтр" value="1"/>
                      }
                      {
                        typeModal === "postRecipeModal" && <Tab label="Характеристики" value="1"/>
                      }
                     
                      <Tab label="Выбранные опции" value="2"/>
                </TabList>
              </Box>
              <TabPanel value='1'>
                <CharacteristicsTab addHoliday={addHoliday} addType={addType} addNationalCuisine={addNationalCuisine} type={typeModal}/>
              </TabPanel>
              <TabPanel value='2'>
                {
                  typeModal === 'filterRecipeModal' &&  <ChoosedFilterCharacteristicsTab/>
                }
                {
                  typeModal === "postRecipeModal" && <ChoosedRecipeCharacteristicsTab/>
                }
              </TabPanel>
          </TabContext>
        
        </Box>
      </Modal>
    )
}

export default CharacteristicsRecipeModal