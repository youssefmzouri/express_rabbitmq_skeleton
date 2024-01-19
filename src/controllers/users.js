const UserEventController = {
  created: (msg) => {
  },
  updated: () => {
    const msg = 'user updated'
  },
  deleted: () => {
    const msg = 'user deleted'
  }
}

const UserController = {
  getAll: (req, res) => {
    res.send('getAll called')
  },
  getOne: (req, res) => {
    res.send('getOne called')
  },
  createOne: (req, res) => {
    const { message } = req.body
    UserEventController.created(message)
    res.send('createOne called')
  },
}

export {
  UserController,
  UserEventController
}
