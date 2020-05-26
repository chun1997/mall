// 创建`index.js`文件，导入想要创建的插件
import Toast from './Toast'

//创建一个空对象`obj`，调用`install`方法
const obj = {}

obj.install = function (Vue) {
    // 1.创建组件构造器
    const toastConstructor = Vue.extend(Toast)
    // 2.new的方式，根据组件构造器，创建一个组件对象
    const toast = new toastConstructor()
    //3.将组件对象挂载到某一个元素中
    toast.$mount(document.createElement('div'))
    //4.挂载后添加到body中  toast.$el对应的就是div
    document.body.appendChild(toast.$el)
    //5.挂载到Vue原型
    Vue.prototype.$toast = toast
}
// 导出obj
export default obj