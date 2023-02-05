import { Model, CID, CString, CBool, CDate, Column, CForeign } from './items'
import Users from './Users'
import { TYPE_FORM, TYPE_TABLE } from '@r/service/config'

class Instances extends Model {
  route = '/faker/instances'
  methods = ['POST', 'PUT', 'DELETE', 'GET']
  title = 'Instances'
  description = 'Instances for testing'

  columns = [
    CID.new('id', '#'),
    CBool.new('https', 'HTTPS').setDefault(true),
    CString.new('host', 'Host').setFormat(Column.FORMAT_URL),
    CForeign.new('user', 'Owner').asRequired().setForeign(Users).setDisplayedValue(TYPE_TABLE, 'username'),
    CString.new('date_format', 'Date format'),
    CString.new('datetime_format', 'Datetime format'),
    CDate.new('created_at', 'Created at').asDisabled(),
    CDate.new('updated_at', 'Updated at').asDisabled(),
  ]
}

export default Instances
