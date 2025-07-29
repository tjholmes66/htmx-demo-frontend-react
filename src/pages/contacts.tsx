import ContactsDataGrid from '../components/grids/ContactsDataGrid.tsx';
import ContactEmailsDataGrid from "../components/grids/ContactEmailsDataGrid.tsx";
import {ContactContextProvider} from "../contexts/contact-context.tsx";
import ContactLinksDataGrid from "../components/grids/ContactLinksDataGrid.tsx";

export const ContactsPage = () => {

  return(
    <>
        <ContactContextProvider >
            <ContactsDataGrid/>
            <ContactEmailsDataGrid/>
            <ContactLinksDataGrid/>
        </ContactContextProvider>
    </>

  );

}
