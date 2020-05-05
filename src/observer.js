import Dep from "./dep"

// 进行数据劫持
export default class Observer {
  constructor(data) {
    this.data = data
    // 遍历对象完成所有数据的劫持
    this.walk(this.data)
  }

  /**
   * 遍历对象
   * @param {*} data 
   */
  walk(data){
    if(!data || typeof data !== 'object'){ // 递归结束条件
      return
    }
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }

  /**
   * 动态设置响应式数据
   * @param {*} data 
   * @param {*} key 
   * @param {*} value 
   */
  defineReactive(data, key, value) {
    let dep = new Dep()
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: false,
      get: () => {
        Dep.target && dep.addSub(Dep.target)
        return value;
      },
      set: newValue => {
        console.log('set')
        value = newValue;
        dep.notify()
      }
    })
    this.walk(value)// 为了完成递归遍历
  }
}