import Box from '@mui/material/Box';
import {DataGrid, type GridColDef} from '@mui/x-data-grid'
import {useContext, useEffect, useState} from 'react'
import type {ContactLink, LinkType} from "../datatypes.tsx";
import {IconButton, Tooltip} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete'
import {ContactContext} from "../../contexts/contact-context.tsx";

export const ContactLinksDataGrid: React.FC = () => {

    // contact context to retrieve contact id
    const contactContext = useContext(ContactContext);

    if (!contactContext) {
        throw new Error('ContactLinksDataGrid must be used within a ContactContextProvider');
    }

    const { contactId} = contactContext;

    const [contactLinks, setContactLinks] = useState<ContactLink[]>([]);

    useEffect(() => {
        console.log("ContactLinksDataGrid: contactContext.contactId = " + contactContext.contactId);

        /*
        fetch('http://localhost:8080/rest/contact/link/contactId/${contactContext.contactId}')
            .then((response) => response.json())
            .then((json) => setContactLinks(json));

        fetch('http://localhost:8080/rest/contact/link/contactId/{contactContext.contactId}')
            .then((response) => response.json())
            .then((json) => setContactLinks(json));

        fetch('http://localhost:8080/rest/contact/link/contactId/${contactId}')
            .then((response) => response.json())
            .then((json) => setContactLinks(json));

        fetch('http://localhost:8080/rest/contact/link/contactId/{contactId}')
            .then((response) => response.json())
            .then((json) => setContactLinks(json));
            */

        fetch('http://localhost:8080/rest/contact/link/contactId/' + contactContext.contactId)
            .then((response) => response.json())
            .then((json) => setContactLinks(json));

    }, [contactId]);

    const onDeleteClick = (id: number) => {
        console.log('onDeleteClick: Clicked row is: ' + id);
        // Update the DataGrid's state to remove the deleted row
        setContactLinks(prevRows => prevRows.filter(row => row.linkId !== id));
        console.log(`Row with ID ${id} deleted successfully.`);
    };

    const columns: GridColDef<ContactLink>[] = [
        { field: 'linkId', headerName: 'ID', width: 90 },
        {
            field: 'link',
            headerName: 'link',
            flex: 1,
            width: 150
        },
        {
            field: 'linkType',
            headerName: 'LinkType',
            flex: 1,
            valueGetter: (linkType: LinkType) => linkType.description,
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
                        onClick={() => onDeleteClick(params.row.linkId)}
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
                rows={contactLinks}
                columns={columns}
                getRowId={(row) => row.linkId}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                    columns: {
                        columnVisibilityModel: {
                            linkId: false,
                        },
                    },
                }}
                pageSizeOptions={[5]}
                disableMultipleRowSelection={true}
            />
        </Box>
    );

};

export default ContactLinksDataGrid
