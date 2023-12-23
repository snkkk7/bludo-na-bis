
import { useAppSelector,useAppDispatch } from "@/store/hooks"
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from "react";
import Box from '@mui/material/Box';
import {characteristicsActions} from '@/store/characteristicsSlice'
import ChoosedOCharacteristicsList from "../List/ChoosedCharacteristicsList";


const ChoosedFilterCharacteristicsTab = () => { 

    const dispatch = useAppDispatch()

    const {types,holidays,nationalCuisines} = useAppSelector(state => state.characteristcs)

    const [tab,setTab] = useState<string>("1")

    const handleChangeTab = (_ :any,tab:string) => setTab(tab)

    const handleRemoveType = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(characteristicsActions.removeType({id:event.currentTarget.id,name:event.currentTarget.value}))
    }

    const handleRemoveNationalCuisine = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(characteristicsActions.removeNationalCuisine({id:event.currentTarget.id,name:event.currentTarget.value}))
    } 

    const handleRemoveHoliday = (event: React.MouseEvent<HTMLButtonElement>) => {
        dispatch(characteristicsActions.removeHoliday({id:event.currentTarget.id,name:event.currentTarget.value}))
    }

    return (
        <>
            <TabContext value={tab}>
                <Box sx={{display:'flex',justifyContent:'center'}} >
                  <TabList onChange={handleChangeTab} variant="scrollable" aria-label="lab API tabs example">
                    <Tab label="Типы" value="1" />
                    <Tab label="Национальные кухни" value="2" />
                    <Tab label="Праздники" value="3" />
                  </TabList>
                </Box>

                <TabPanel value="1">
                 <ChoosedOCharacteristicsList onRemoveCharacteristic={handleRemoveType} characteristics={types}/>           
                </TabPanel>
                <TabPanel value="2">
                  <ChoosedOCharacteristicsList onRemoveCharacteristic={handleRemoveNationalCuisine} characteristics={nationalCuisines}/>
                </TabPanel>
                <TabPanel value="3">
                  <ChoosedOCharacteristicsList onRemoveCharacteristic={handleRemoveHoliday} characteristics={holidays}/>
                </TabPanel>
                

            </TabContext>
        </>
    )

}


export default ChoosedFilterCharacteristicsTab