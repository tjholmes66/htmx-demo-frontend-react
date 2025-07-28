import ContactsDataGrid from '../components/grids/ContactsDataGrid.tsx';
import ContactEmailsDataGrid from "../components/grids/ContactEmailsDataGrid.tsx";

export const ContactsPage = () => {

  return(
      <>
        <ContactsDataGrid/>
        <ContactEmailsDataGrid/>
      </>

  );

}
