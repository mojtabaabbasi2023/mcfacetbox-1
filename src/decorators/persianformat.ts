import moment from 'moment'

// این کد تستی است و کار نمیکند
export function PersianDate(format: string = 'jYYYY/jMM/jDD HH:mm:ss') {
  return function (target: any, propertyKey: string) {
    let value: string

    const getter = function () {
      if (!value)
        return ''

      return moment(value).format(format)
    }

    const setter = function (newVal: string) {
      value = newVal
    }

    Object.defineProperty(target, propertyKey, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true,
    })
  }
}
