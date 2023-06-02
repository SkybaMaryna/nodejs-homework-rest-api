const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
};

const getContactById = async id => {
  const contactsList = await listContacts();
  const result = contactsList.find(contact => contact.id === id);
  return result || null;
};

const addContact = async body => {
  const contactsList = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return newContact;
};

const removeContact = async id => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex(contact => contact.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contactsList.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return result;
};

const updateContact = async (id, body) => {
  const contactsList = await listContacts();
  const index = contactsList.findIndex(contact => contact.id === id);
  if (index === -1) {
    return null;
  }
  contactsList[index] = { ...contactsList[index], ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return contactsList[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
