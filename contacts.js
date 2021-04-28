const fs = require("fs");
const path = require("path");

const contactsPath = path.join("db/contacts.json");

function listContacts() {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      throw err;
    }
    console.table(JSON.parse(data));
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      throw err;
    }

    const parseData = JSON.parse(data);
    const checkId = parseData.find(({ id }) => id === Number(contactId));

    if (!checkId) {
      console.log("User not found.");
      return;
    }

    const contact = parseData.filter(({ id }) => id === Number(contactId));

    contact.forEach(({ name, email, phone }) =>
      console.log(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}`)
    );
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      throw err;
    }

    const parseData = JSON.parse(data);
    const checkId = parseData.find(({ id }) => id === Number(contactId));

    if (!checkId) {
      console.log("User not found.");
      return;
    }

    const contact = parseData.filter(({ id }) => id !== Number(contactId));

    // Sorting identifiers after deleting a user
    contact.forEach((item, index) => {
      item.id = index + 1;
    });

    fs.writeFile(contactsPath, JSON.stringify(contact, null, 2), (error) => {
      if (error) {
        throw error;
      }
    });
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, "utf-8", (err, data) => {
    if (err) {
      throw err;
    }

    const parseData = JSON.parse(data);
    const id =
      parseData.length === 0 ? 1 : parseData[parseData.length - 1].id + 1;
    const contact = { id, name, email, phone };

    parseData.push(contact);

    fs.writeFile(contactsPath, JSON.stringify(parseData, null, 2), (error) => {
      if (error) {
        throw error;
      }
    });
  });
}

module.exports = { listContacts, getContactById, removeContact, addContact };
