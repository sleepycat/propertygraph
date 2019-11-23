const makeMigrations = ({ databaseName, rootPass }) => [
  {
    type: 'database',
    databaseName,
    users: [{ username: 'root', passwd: rootPass }],
  },
  {
    type: 'documentcollection',
    databaseName,
    name: 'corporations',
  },
  {
    type: 'documentcollection',
    databaseName,
    name: 'emailAddresses',
  },
  {
    type: 'documentcollection',
    databaseName,
    name: 'emailContents',
  },
  {
    type: 'edgecollection',
    databaseName,
    name: 'communications',
  },
]

module.exports.makeMigrations = makeMigrations
