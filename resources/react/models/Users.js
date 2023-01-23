import { Model, CID, CString, CBool, CDateTime } from './items'

class Users extends Model {
  route = '/accounts/users'
  methods = ['GET']
  description = 'User list'

  columns = [
    CID.new('id', '#').asSortable(false),
    CString.new('username', 'Username').asRequired(),
    CString.new('email', 'Email').asEmail().asDisabled(),
    CDateTime.new('date_joined', 'Date joined').asDisabled(),
    CBool.new('is_active', 'Is active'),
    CBool.new('is_superuser', 'Is superuser'),
    CBool.new('is_staff', 'Is staff'),
  ]
}

export default Users
