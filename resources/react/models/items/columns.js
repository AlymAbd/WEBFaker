import { session } from '@r/service/axios'
import Model from './model'

class Column {
  static TYPE_STRING = 'string'
  static TYPE_TEXT = 'text'
  static TYPE_DATE = 'date'
  static TYPE_DATETIME = 'datetime'
  static TYPE_BOOL = 'bool'
  static TYPE_INTEGER = 'int'
  static TYPE_DECIMAL = 'decimal'
  static TYPE_FLOAT = 'float'
  static TYPE_ARRAY = 'array'
  static TYPE_OBJECTARRAY = 'objectarray'

  static FORMAT_NUMBER = 'number'
  static FORMAT_TEXT = 'text'
  static FORMAT_SELECT = 'select'
  static FORMAT_DATE = 'date'
  static FORMAT_DATETIME = 'datetime'
  static FORMAT_MULTISELECT = 'multiselect'
  static FORMAT_CHECKBOX = 'checkbox'
  static FORMAT_RADIO = 'radio'
  static FORMAT_TEXTAREA = 'textarea'
  static FORMAT_PASSWORD = 'password'
  static FORMAT_EMAIL = 'email'
  static FORMAT_FILE = 'file'
  static FORMAT_FOREIGN = 'foreign'
  static FORMAT_ENUM = 'enum'
  static FORMAT_JSON = 'json'
  static FORMAT_IMAGE = 'image'
  static FORMAT_ID = 'cid'

  _name = null
  _format = null
  _type = null
  _options = []
  _required = false
  _hidden = false
  _default = null
  _title = null
  _maxLength = -1
  _disabled = false
  _value = null
  _settedValues = false
  _canSort = false
  _canFilter = false

  constructor(name, title = null) {
    this._name = name
    this._title = title ? title : name.charAt(0).toUpperCase() + name.slice(1)
    this.setFormat(Column.FORMAT_INPUT)
  }

  static new(name, title = null) {
    return new this(name, title)
  }

  serialize = (value) => {
    return value ? String(value) : ''
  }

  getValueOrDefault = () => {
    return this.value !== null ? this.value : this.default
  }

  getOption = (value = null, label = null) => {
    let option = this.options.filter((row) => {
      if (label) {
        return row.label === label
      } else {
        return row.value === value
      }
    })
    return option.length > 0 ? option[0] : {}
  }

  setValue = (value) => {
    this._value = this.serialize(value)
    this._settedValues = true
    return this
  }

  setFormat = (value) => {
    this._format = value
    return this
  }

  setType = (value) => {
    this._type = value
    return this
  }

  setTitle = (value) => {
    this._title = value
    return this
  }

  setMaxlength = (length) => {
    this._maxLength = length
    return this
  }

  setOptions = (options) => {
    this._options = options
    return this
  }

  setName = (value) => {
    this._name = value
    return this
  }

  setDefault = (value) => {
    this._default = this.serialize(value)
    return this
  }

  asRequired = () => {
    this._required = true
    return this
  }

  asSelect = () => {
    this.setFormat(Column.FORMAT_SELECT)
    return this
  }

  asMultipleSelect = () => {
    this.setFormat(Column.FORMAT_MULTISELECT)
    return this
  }

  asRadio = () => {
    this.setFormat(Column.FORMAT_RADIO)
    return this
  }

  asPassword = () => {
    this.setFormat(Column.FORMAT_PASSWORD)
    return this
  }

  asEmail = () => {
    this.setFormat(Column.FORMAT_EMAIL)
    return this
  }

  asHidden = (value = true) => {
    this._hidden = value
    return this
  }

  asDisabled = () => {
    this._disabled = true
    return this
  }

  asFilterable = () => {
    this._canFilter = true
    return this
  }

  asSortable = () => {
    this._canSort = true
    return this
  }

  getOption = (value = null, label = null) => {
    value = value ? value : this.value
    return this.options.filter((row) => {
      if (label) {
        return row.label === label
      } else {
        return row.value === value
      }
    })
  }

  get name() {
    return this._name
  }

  get format() {
    return this._format
  }

  get maxLength() {
    return this._maxLength
  }

  get options() {
    if (this.required) {
      return [{ label: <i>{global.$t('empty')}</i>, value: '' }].concat(this._options)
    } else {
      return this._options
    }
  }

  get required() {
    return this._required
  }

  get type() {
    return this._type
  }

  get hidden() {
    return this._hidden
  }

  get default() {
    return this._default
  }

  get title() {
    return this._title
  }

  get disabled() {
    return this._disabled
  }

  get value() {
    return this._value || this.default
  }

  get sortable() {
    return this._canSort
  }

  get filterable() {
    return this._canFilter
  }
}

class CString extends Column {
  _default = ''

  constructor(name, title = null) {
    super(name, title)
    if (name == 'password') {
      this.setFormat(Column.FORMAT_PASSWORD)
    } else {
      this.setFormat(Column.FORMAT_TEXT)
    }
    this.setType(Column.TYPE_STRING)
    this.setMaxlength(255)
  }
}

class CID extends Column {
  _default = ''

  constructor(name, title = null) {
    super(name, title)
    this.setFormat(Column.FORMAT_ID)
    this.setType(Column.TYPE_STRING)
    this.asDisabled()
  }
}

class CText extends Column {
  _rows = 5
  _default = ''

  constructor(name, title = null, rows = 5) {
    super(name, title)
    this.rows = rows
    this.setType(Column.TYPE_TEXT)
    this.setFormat(Column.FORMAT_TEXTAREA)
  }

  set rows(value) {
    this._rows = value
  }

  get rows() {
    return this._rows
  }
}

class CNumber extends Column {
  _default = 0

  constructor(name, title = null) {
    super(name, title)
    this.setType(Column.TYPE_INTEGER)
    this.setFormat(Column.FORMAT_NUMBER)
  }
}

class CFloat extends Column {
  _default = 0

  constructor(name, title = null) {
    super(name, title)
    this.setType(Column.TYPE_FLOAT)
    this.setFormat(Column.FORMAT_NUMBER)
  }
}

class CDecimal extends Column {
  _max = null
  _places = null
  _default = 0

  constructor(name, title = null, max = 100, places = 2) {
    super(name, title)
    this._max = max
    this._places = places
    this.setType(Column.TYPE_DECIMAL)
    this.setFormat(Column.FORMAT_NUMBER)
  }
}

class CDateTime extends Column {
  _default = ''

  constructor(name, title = null) {
    super(name, title)
    this.setType(Column.TYPE_DATETIME)
    this.setFormat(Column.FORMAT_DATETIME)
  }

  serialize = (value) => {
    return new Date(value)
  }

  toNormalDate = (value) => {
    if (value) {
      const date = this.serialize(value)
      const mm = date.getMonth() + 1
      const dd = date.getDate()
      const datet = [date.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('.')
      const time = [date.getHours(), date.getMinutes(), date.getSeconds()].join(':')
      return datet + ' ' + time
    } else {
      return ' '
    }
  }
}

class CDate extends Column {
  _default = ''

  constructor(name, title = null) {
    super(name, title)
    this.setType(Column.TYPE_DATE)
    this.setFormat(Column.FORMAT_DATE)
  }

  serialize = (value) => {
    return new Date(value)
  }

  withTime = () => {
    this.setType(Column.TYPE_DATETIME)
    this.setFormat(Column.FORMAT_DATETIME)
    return this
  }

  toNormalDate = (value) => {
    if (value) {
      const date = this.serialize(value)
      const mm = date.getMonth() + 1
      const dd = date.getDate()
      return [date.getFullYear(), (mm > 9 ? '' : '0') + mm, (dd > 9 ? '' : '0') + dd].join('.')
    } else {
      return ' '
    }
  }
}

class CBool extends Column {
  _default = false

  constructor(name, title = null) {
    super(name, title)
    this.setType(Column.TYPE_BOOL)
    this.setFormat(Column.FORMAT_CHECKBOX)
  }

  serialize = (value) => {
    return Boolean(value)
  }
}

class CEnum extends Column {
  _default = []

  constructor(name, title = null) {
    super(name, title)
    this.setType(Column.TYPE_ARRAY)
    this.setFormat(Column.FORMAT_ENUM)
  }
}

class CForeign extends Column {
  _requestName = null
  _foreign = null
  _where = null
  _default = ''

  constructor(name, title = null) {
    super(name, title)
    this.setType(Column.TYPE_OBJECTARRAY)
    this.setFormat(Column.FORMAT_FOREIGN)
  }

  setForeign = (value) => {
    this._foreign = value
    return this
  }

  setRequestName = (value) => {
    this._requestName = value
    return this
  }

  setFilter = (value) => {
    this._where = value
    return this
  }

  requestOptions = () => {
    let fmodel = new this.foreign()
    return new Promise((resolve, reject) => {
      session
        .get(fmodel.getRoute())
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  get foreign() {
    return this._foreign
  }

  get filter() {
    return this._where
  }

  get requestName() {
    return this._requestName
  }
}

class CJSON extends Column {
  _scheme = {}
  _default = {}

  constructor(name, title = null) {
    super(name, title)
    this.setType(Column.TYPE_OBJECTARRAY)
    this.setFormat(Column.FORMAT_JSON)
  }

  setScheme = (value) => {
    this._scheme = value.map((row) => {
      return row.setName(this.name + '__' + row.name)
    })
    return this
  }

  getScheme = () => {
    let model = new Model()
    return model.getColumnState(this._scheme)
  }

  getSchemeValues = () => {
    let model = new Model()
    return model.getColumnValues(this._scheme)
  }

  getSchemeValidation = (validation) => {
    let model = new Model()
    return model.getColumnValues(this._scheme, validation)
  }

  get requestName() {
    return this._requestName
  }

  get scheme() {
    return this._scheme
  }
}

class CFile extends Column {
  _default = ''
  _filetype = '*'
  _multiple = false
  _maxSize = 1024
  _files = []

  constructor(name, title = null) {
    super(name, title)
    this.setType(Column.TYPE_STRING)
    this.setFormat(Column.FORMAT_FILE)
  }

  asMultiple = () => {
    this._multiple = true
    return this
  }

  text = () => {
    this._filetype = '.txt'
    return this
  }

  excel = () => {
    this._filetype = '.xlsx,.xls'
    return this
  }

  csv = () => {
    this._filetype = '.csv'
    return this
  }

  addFile = (filename) => {
    this._files.push(filename)
  }

  serialize = (value) => {
    return String(value)
  }

  /**
   * @param {number} value
   */
  set maxSize(value) {
    this._maxSize = value
  }

  get accepts() {
    return this._filetype
  }
}

class CImage extends CFile {
  _filetype = 'image/*'

  constructor(name, title = null) {
    super(name, title)
    this.setType(Column.TYPE_STRING)
    this.setFormat(Column.FORMAT_IMAGE)
  }
}

export { Column, CID, CFile, CBool, CDate, CDateTime, CFloat, CDecimal, CNumber, CText, CString, CEnum, CForeign, CJSON, CImage }
