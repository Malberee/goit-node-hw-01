const { Command } = require('commander')
const program = new Command()
const contacts = require('./contacts')

program
	.option('-a, --action <type>', 'choose action')
	.option('-i, --id <type>', 'user id')
	.option('-n, --name <type>', 'user name')
	.option('-e, --email <type>', 'user email')
	.option('-p, --phone <type>', 'user phone')
program.parse(process.argv)
const argv = program.opts()

async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case 'list':
			const listContacts = await contacts.listContacts()
			return console.log(listContacts)
			break
		case 'get':
			const oneContact = await contacts.getContactById(id)
			return console.log(oneContact)
			break
		case 'add':
			const newContact = await contacts.addContact(name, email, phone)
			return console.log(newContact)
			break
		case 'remove':
			const removeContact = await contacts.removeContact(id)
			return console.log(removeContact)
			break
		default:
			console.warn('\x1B[31m Unknown action type!')
	}
}

invokeAction(argv)
