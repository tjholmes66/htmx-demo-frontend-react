import Box from '@mui/material/Box';
import {DataGrid, type GridColDef, type GridRowParams} from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import type {ContactEmail, EmailType} from "../datatypes.tsx";
import {IconButton, Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

export const ContactEmailsDataGrid = () => {

    const [contactEmails, setContactEmails] = useState<ContactEmail[]>([]);
    const [clickedRowId, setClickedRowId] = useState(0); // State to store the clicked row ID

    useEffect(() => {
        fetch('http://localhost:8080/rest/contact/email/contactId/{contactId}')
            .then((response) => response.json())
            .then((json) => setContactEmails(json));
    }, []);

    const handleRowClick = (params: GridRowParams["row"]) => {
        // params.id contains the unique ID of the clicked row
        setClickedRowId(params.contactId); // params.id contains the ID of the clicked row
        console.log('handleRowClick: Clicked row ID: params.id', params.id + '  clickedRowId=' + clickedRowId + '   contactId=' + params.contactId);
        // You can perform further actions with the ID here, e.g., open a modal, fetch data, etc.
    };

    const onDeleteClick = (id: number) => {
        console.log('onDeleteClick: Clicked row is: ' + id);
        // Update the DataGrid's state to remove the deleted row
        setContactEmails(prevRows => prevRows.filter(row => row.emailId !== id));
        console.log(`Row with ID ${id} deleted successfully.`);
    };

    const columns: GridColDef<ContactEmail>[] = [
        { field: 'emailId', headerName: 'ID', width: 90 },
        {
            field: 'email',
            headerName: 'email',
            flex: 1,
            width: 150
        },
        {
            field: 'emailType',
            headerName: 'EmailType',
            flex: 1,
            valueGetter: (emailType: EmailType) => emailType.description,
            width: 150
        },
        {
            field: 'enteredDate',
            headerName: 'Created',
            flex: 1,
            width: 110
        },
        {
            field: 'deleteButton',
            headerName: 'Actions',
            description: 'Actions column.',
            sortable: false,
            width: 160,
            renderCell: (params) => {
                return (
                    <IconButton
                        size='small'
                        color='error'
                        onClick={() => onDeleteClick(params.row.emailId)}
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
        <Box sx={{ height: 300, width: '33%', border: '2px solid black', padding: '2px' }}>
            <DataGrid sx={{ width: '100%', border: '2px solid red'}}
                rows={contactEmails}
                columns={columns}
                getRowId={(row) => row.emailId}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                    columns: {
                        columnVisibilityModel: {
                            emailId: false,
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

export default ContactEmailsDataGrid
