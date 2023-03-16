const contacts = require("./contacts");
const { program } = require("commander");
require("colors");

program
  .option("-a, --action <type>")
  .option("-n, --name <type>")
  .option("-id, --id <type>")
  .option("-e, --email <type>")
  .option("-ph, --phone <type>");

program.parse(process.argv);
const options = program.opts();

const contactsApi = async ({ id, name, email, phone, action }) => {
  switch (action) {
    case "getAll":
      const allContacts = await contacts.getAllContacts();
      console.log(allContacts, "allContacts".cyan);
      break;
    case "update":
      const updatedContact = await contacts.updateContact(
        id,
        name,
        email,
        phone
      );
      console.log(updatedContact, "updatedContact".magenta);
      break;
    case "getContact":
      const contact = await contacts.getContact(id);
      console.log(contact, "contact".blue);
      break;
    case "add":
      const newContact = await contacts.addContact(name, phone, email);
      console.log(newContact, "newContact".yellow);
      break;
    case "delete":
      const deletedContact = await contacts.deleteContact(id);
      console.log(deletedContact, "deletedContact".red);
      break;
  }
};
contactsApi(options);
