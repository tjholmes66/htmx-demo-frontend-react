import Box from '@mui/material/Box';
import {DataGrid, type GridColDef, type GridRowParams} from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import type {Company, Contact} from "../datatypes.tsx";


export const ContactsDataGrid = () => {

    const columns: GridColDef<Contact>[] = [
        { field: 'contactId', headerName: 'ID', width: 90 },
        {
            field: 'firstName',
            headerName: 'First Name',
            width: 150
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            width: 150
        },
        {
            field: 'address1',
            headerName: 'Address 1',
            width: 110
        },
        {
            field: 'address2',
            headerName: 'Address 2',
            width: 110
        },
        {
            field: 'city',
            headerName: 'City',
            width: 110
        },
        {
            field: 'state',
            headerName: 'State',
            width: 110
        },
        {
            field: 'zip',
            headerName: 'Zip Code',
            width: 110
        },
        {
            field: 'birthDate',
            headerName: 'Birthday',
            width: 110
        },
        {
            field: 'company',
            headerName: 'Company',
            valueGetter: (company: Company) => company.companyName,
            width: 110
        },
    ];

    const [contacts, setContacts] = useState([]);
    const [clickedRowId, setClickedRowId] = useState(null); // State to store the clicked row ID

    useEffect(() => {
        fetch('http://localhost:8080/rest/contacts/userId/2')
            .then((response) => response.json())
            .then((json) => setContacts(json));
    }, []);

    const handleRowClick = (params: GridRowParams["row"]) => {
        // params.id contains the unique ID of the clicked row
        setClickedRowId(params.id); // params.id contains the ID of the clicked row
        console.log('Clicked row ID:', params + '   ' + params.id + '  ' + clickedRowId);
        // You can perform further actions with the ID here, e.g., open a modal, fetch data, etc.
    };

    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={contacts}
                columns={columns}
                getRowId={(row) => row.contactId}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                disableMultipleRowSelection={true}
                onRowClick={handleRowClick}
            />
        </Box>
    );

};

export default ContactsDataGrid
