import ContactsDataGrid from '../components/grids/ContactsDataGrid.tsx';
import ContactEmailsDataGrid from "../components/grids/ContactEmailsDataGrid.tsx";
import {ContactProvider} from "../contexts/contact-context.tsx";

export const ContactsPage = () => {

  return(
    <>
        <ContactProvider>
            <ContactsDataGrid/>
            <ContactEmailsDataGrid/>
        </ContactProvider>
    </>

  );

}
