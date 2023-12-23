import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FC, useState } from 'react';
import {IAddCharacteristicsModal} from '@/interfaces'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';


const AddCharacteristicsModal:FC<IAddCharacteristicsModal> = ({isOpen,onHandleCloseModal}) => {

    const [tab,setTab] = useState("1")


    const handleChangePage = (_:any,value:string) => setTab(value)

    return (
        <Modal
            open={isOpen}
            onClose={onHandleCloseModal}
        >
                <TabContext value={tab}>
                <Box sx={{ borderColor: 'divider',display:"flex",justifyContent:"center" }}> 
                <TabList onChange={handleChangePage} variant='scrollable'>
                      <Tab label="Национальные кухни" value="1"/>
                      <Tab label="Праздники" value="2"/>
                      <Tab label="Типы" value="3"/>
                </TabList>
              </Box>
                </TabContext>

        </Modal>
    )

}