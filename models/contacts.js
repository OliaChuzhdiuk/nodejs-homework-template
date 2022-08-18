const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(({ id }) => id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((item) => item.id === contactId);
      if (idx === -1) {
        return null;
      }
    const [result] = contacts.splice(idx, 1);
      await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
      return result;
  } catch (err) {
    console.log(err.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: nanoid(), name, email, phone };
    const newContacts = [...contacts, newContact];
      await fs.writeFile(contactsPath, JSON.stringify(newContacts));
      console.log(`Contact with name=${name} was added to database`);
  } catch (err) {
    console.log(err.message);
  }
}
const updateContactById = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex((contact) => contact.id === contactId);
    if (idx === -1) {
      return null;
    }
     if (!body) {
    return null;
  }
  contacts[idx] = { id: contactId, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx];
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById
}
