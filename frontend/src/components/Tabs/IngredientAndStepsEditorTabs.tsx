import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';

import Box from '@mui/material/Box';
import AddIngredientModal from '@/components/Modals/AddIngredientModal'
import AddStepModal from '@/components/Modals/AddStepModal'

const IngredientAndStepsEditorTabs = () => {


    const [tab,setTab] = useState("1")

    const handleChangeTab = (_:any,tab:string) => {
        setTab(tab)
    }

    const [isIngredientsModalVisible,setIsIngredientsModalVisible] = useState<boolean>(false)

    const [isStepsModalVisible,setIsStepsModalVisible] = useState<boolean>(false)

    const handleCloseIngredientModal = () => setIsIngredientsModalVisible(false)

    const handleCloseStepModal = () => setIsStepsModalVisible(false)

    const handleAddIngredient = (e:any) => {
        e.preventDefault()
        setIsIngredientsModalVisible(true)
    }

    const handleAddStep = (e:any) => {
        e.preventDefault()
        setIsStepsModalVisible(true)
    }

    return (
        <>
            <TabContext value={tab}>
                     <Box sx={{ borderBottom: 1,display:'flex',justifyContent:'center', borderColor: 'divider' }}>
                        <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
                          <Tab label="Ингридиенты" value="1" />
                          <Tab label="Шаги" value="2" />
                        </TabList>   
                     </Box>
                     <TabPanel value="1">
                           <button type="button" className='block mx-auto border-2 rounded-lg p-2' onClick={handleAddIngredient}>Добавить Ингридиенты</button>
                     </TabPanel>
                     <TabPanel value="2">
                           <button type="button" className='block mx-auto border-2 rounded-lg p-2' onClick={handleAddStep}>Добавить шаги</button>
                     </TabPanel>            
            </TabContext>
            <AddIngredientModal isOpen={isIngredientsModalVisible} onHandleCloseModal={handleCloseIngredientModal}/>
            <AddStepModal isOpen={isStepsModalVisible} onHandleCloseModal={handleCloseStepModal}/>
         </>
    )
}

export default IngredientAndStepsEditorTabs