import Box from '@mui/material/Box';
import {DataGrid, type GridColDef, type GridRowParams} from '@mui/x-data-grid'
import {useContext, useEffect, useState} from 'react'
import type {Company, Contact} from "../datatypes.tsx";
import {IconButton, Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import {ContactContext} from "../../contexts/contact-context.tsx";

export const ContactsDataGrid:  React.FC = () => {

    const contactContext = useContext(ContactContext);

    if (!contactContext) {
        throw new Error('ChildComponent must be used within a MyContextProvider');
    }

    const [contacts, setContacts] = useState<Contact[]>([]);

    useEffect(() => {
        fetch('http://localhost:8080/rest/contacts/userId/2')
            .then((response) => response.json())
            .then((json) => setContacts(json));
    }, []);

    const handleRowClick = (params: GridRowParams["row"]) => {
        contactContext.updateContactId(params.id);
    };

    const onDeleteClick = (id: number) => {
        // Update the DataGrid's state to remove the deleted row
        setContacts(prevRows => prevRows.filter(row => row.contactId !== id));
    };

    const columns: GridColDef<Contact>[] = [
        { field: 'contactId', headerName: 'ID', width: 90 },
        {
            field: 'firstName',
            headerName: 'First Name',
            flex: 1,
            width: 150
        },
        {
            field: 'lastName',
            headerName: 'Last Name',
            flex: 1,
            width: 150
        },
        {
            field: 'address1',
            headerName: 'Address 1',
            flex: 1,
            width: 150
        },
        {
            field: 'address2',
            headerName: 'Address 2',
            flex: 1,
            width: 150
        },
        {
            field: 'city',
            headerName: 'City',
            flex: 1,
            width: 150
        },
        {
            field: 'state',
            headerName: 'State',
            flex: 1,
            width: 110
        },
        {
            field: 'zip',
            headerName: 'Zip Code',
            flex: 1,
            width: 110
        },
        {
            field: 'birthDate',
            headerName: 'Birthday',
            flex: 1,
            width: 110
        },
        {
            field: 'company',
            headerName: 'Company',
            flex: 1,
            valueGetter: (company: Company) => company.companyName,
            width: 150
        },
        {
            field: 'deleteButton',
            headerName: 'Actions',
            description: 'Actions column.',
            sortable: false,
            width: 90,
            renderCell: (params) => {
                return (
                    <IconButton
                        size='small'
                        color='error'
                        onClick={() => onDeleteClick(params.row.contactId)}
                    >
                        <Tooltip title="Delete Contact">
                            <DeleteIcon />
                        </Tooltip>
                    </IconButton>
                );
            },
        },
    ];



    return (
        <Box sx={{ height: 300, width: '100%', border: '2px solid black', }}>
            <DataGrid sx={{ width: '100%', border: '2px solid red'}}
                rows={contacts}
                columns={columns}
                getRowId={(row) => row.contactId}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                    columns: {
                        columnVisibilityModel: {
                            contactId: false,
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
