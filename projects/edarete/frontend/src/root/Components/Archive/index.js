import React from 'react'
import Header from '../../custom/topnavBar'
import { routesName } from '../../routes/adminConstants';
import ArchClass from './ArchiveClasses';


export default function ArchiveClasses(){


    return(
        <>
        <Header navigations={routesName.dashboardView} title={'Cleared classes'} showAddIcon={false} hideLogout={false} hidearchieveclass={false} />
        <ArchClass/>
        </>
    )
}