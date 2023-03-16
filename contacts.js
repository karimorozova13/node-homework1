const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/db/contacts.json");

const updateDb = async (data) => {
  await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
};

const getAllContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContact = async (id) => {
  const contacts = await getAllContacts();
  const contact = contacts.find((item) => item.id === id);
  return contact;
};

const updateContact = async (id, name, email, phone) => {
  const contacts = await getAllContacts();
  let updatedContact = null;
  const updatedContacts = contacts.map((item) => {
    if (item.id === id) {
      item.name = name ? name : item.name;
      item.phone = phone ? phone : item.phone;
      item.email = email ? email : item.email;
      updatedContact = item;
    }
    return item;
  });
  await updateDb(updatedContacts);
  return updatedContact;
};

const addContact = async (name = "", phone = "", email = "") => {
  const contacts = await getAllContacts();
  const cotact = { name, phone, email, id: nanoid() };
  contacts.push(cotact);
  await updateDb(contacts);
  return cotact;
};

const deleteContact = async (id) => {
  const contacts = await getAllContacts();
  const idx = contacts.findIndex((item) => item.id === id);
  if (idx === -1) return null;
  const [contact] = contacts.splice(idx, 1);
  await updateDb(contacts);
  return contact;
};

module.exports = {
  getAllContacts,
  updateContact,
  getContact,
  addContact,
  deleteContact,
};
