import ContactsDataGrid from '../components/grids/ContactsDataGrid.tsx';
import ContactEmailsDataGrid from "../components/grids/ContactEmailsDataGrid.tsx";
import {ContactContextProvider} from "../contexts/contact-context.tsx";
import ContactLinksDataGrid from "../components/grids/ContactLinksDataGrid.tsx"
import { Grid } from '@mui/material';

export const ContactsPage = () => {

  return(
    <>
        <ContactContextProvider >
            <ContactsDataGrid/>
            <Grid container spacing={2}> {/* Use Grid container for layout */}
                <Grid size={{ xs: 12, md: 6 }}> {/* First Grid item, takes 6 columns on medium screens and up */}
                    <div style={{ height: 400, width: '100%' }}>
                            <ContactEmailsDataGrid/>
                    </div>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}> {/* Second Grid item, takes 6 columns on medium screens and up */}
                    <div style={{ height: 400, width: '100%' }}>
                            <ContactLinksDataGrid/>
                    </div>
                </Grid>
            </Grid>
        </ContactContextProvider>
    </>
  );

}
