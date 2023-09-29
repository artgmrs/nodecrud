exports.generateCrudMethods = Model => {
  return {
    getAll: () => Model.find(),
    getById: id => Model.findById(id),
    crate: record => Model.create(record),
    update: (id, record) => Model.findByIdAndUpdate(id, record, { new: true }),
    delete: id => Model.findByIdAndDelete(id),
  }
}