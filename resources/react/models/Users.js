import { Model, CID, CString, CBool, CDateTime } from './items'

class Users extends Model {
  route = '/system/user'
  methods = ['POST', 'GET', 'PUT']
  description = 'Setup your settings'

  columns = [
    CID.new('name', '#'),
    CString.new('title', 'Name').asRequired(),
    CString.new('email', 'Email').asEmail().asDisabled(),
    CString.new('phone', 'Phone'),
    CDateTime.new('email_verified_at', 'Email verification').asDisabled(),
    CDateTime.new('phone_verified_at', 'Phone verification').asDisabled(),
    CBool.new('account_verified', 'Account verified'),
    CString.new('password', 'Password').asPassword().asHidden(),
    CString.new('access_type', 'Access type')
      .setOptions([
        { label: 'Guest', value: 'guest' },
        { label: 'Teacher', value: 'teacher' },
      ])
      .asSelect(),
    CDateTime.new('created_at', 'Created').asDisabled(),
    CDateTime.new('updated_at', 'Updated').asDisabled(),
    CDateTime.new('deleted_at', 'Deleted').asHidden(),
  ]
}

export default Users
