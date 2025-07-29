import Box from '@mui/material/Box';
import {DataGrid, type GridColDef} from '@mui/x-data-grid'
import {useContext, useEffect, useState} from 'react'
import type {ContactEmail, EmailType} from "../datatypes.tsx";
import {IconButton, Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import {ContactContext} from "../../contexts/contact-context.tsx";

export const ContactEmailsDataGrid: React.FC = () => {

    // contact context to retrieve contact id
    const contactContext = useContext(ContactContext);

    if (!contactContext) {
        throw new Error('ContactEmailsDataGrid must be used within a ContactContextProvider');
    }

    const { contactId} = contactContext;

    const [contactEmails, setContactEmails] = useState<ContactEmail[]>([]);

    useEffect(() => {
        console.log("ContactEmailsDataGrid: contactContext.contactId = " + contactContext.contactId);

        /*
        fetch('http://localhost:8080/rest/contact/email/contactId/${contactContext.contactId}')
            .then((response) => response.json())
            .then((json) => setContactEmails(json));

        fetch('http://localhost:8080/rest/contact/email/contactId/{contactContext.contactId}')
            .then((response) => response.json())
            .then((json) => setContactEmails(json));

        fetch('http://localhost:8080/rest/contact/email/contactId/${contactId}')
            .then((response) => response.json())
            .then((json) => setContactEmails(json));

        fetch('http://localhost:8080/rest/contact/email/contactId/{contactId}')
            .then((response) => response.json())
            .then((json) => setContactEmails(json));
            */

        fetch('http://localhost:8080/rest/contact/email/contactId/' + contactContext.contactId)
            .then((response) => response.json())
            .then((json) => setContactEmails(json));

    }, [contactId]);

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
            width: 90,
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
            />
        </Box>
    );

};

export default ContactEmailsDataGrid
