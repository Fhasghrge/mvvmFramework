// 观察者模式中 通知

export default class Dep {
  constructor() {
    // 存放所有watcher
    this.subs= {}
  }

  addSub(target) {
    this.subs[target.uid] = target
  } 

  notify() {
    for(let uid in this.subs) {
      this.subs[uid].update()
    }
  }
}