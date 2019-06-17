import utils from '../../utils/index'
import tools from '../../utils/util'
let temp;
Page({
    data:{
        creatingBookName: '',       //当前正在创建的书名
        creatingBookAuthor: '',     //当前正在创建的作者名
        profile: '',        //用户信息
        bookList: [],        //书单列表
        curRecordId: '',      //编辑图书对应的id
        editingBookName: ''     //当前正在编辑的书名
    },
    onLoad(){
        temp = this;
        wx.BaaS.auth.loginWithWechat().then(user => {
            console.log(user);
            temp.setData({
              profile: user
            })
            // console.log(temp.data.profile.id);
            temp.fetchBookList()
        })
    },
    onShow(){

    },
    // 获取 bookList 数据
    fetchBookList() {
        wx.showLoading({
            title:'加载中...'
        })
        utils.getBooks(temp.data.profile.id, (res) => {
            let objects = res.data.objects;
            for(let i in objects){
                // console.log(objects[i].created_at);
                objects[i].created_at = tools.formatTime(objects[i].created_at);
                objects[i].edit = false;
            }
            // console.log(objects);
            temp.setData({
                bookList: res.data.objects // bookList array, mock data in mock/mock.js
            })
            wx.hideLoading()
        })
    },
    confirm(){
        let bookName = temp.data.creatingBookName,
            author = temp.data.creatingBookAuthor;
        if(!bookName){
            wx.showToast({
                title:'请输入书单名',
                icon: 'none'
            })
            return false;
        }
        if(!author){
            wx.showToast({
                title:'请输入作者名',
                icon: 'none'
            })
            return false;
        }
        wx.showModal({
            title: '',
            content: '确定添加该书籍？',
            showCancel: true,
            confirmText: '确定',
            confirmColor: '#ff6600',
            cancelText: '取消',
            success (res) {
                if (res.confirm) {
                    temp.createBook()
                //   console.log('用户点击确定')
                } else if (res.cancel) {
                //   console.log('用户点击取消')
                }
            }
        })
    },
    // 创建书籍
    createBook(e){
        let bookName = temp.data.creatingBookName // 缓存在 data 对象中的输入框输入的书名
        let author= temp.data.creatingBookAuthor    //作者名
        let Books = new wx.BaaS.TableObject('bookshelf') //实例化对应 tableName 的数据表对象
        let book = Books.create() // 创建一条记录
    
      // 调用创建数据项接口，进行数据的持久化存储，详见：https://doc.minapp.com/js-sdk/schema/create-record.html
        book.set({bookName,author})
          .save()
          .then(() => {
            //...
            temp.setData({
                creatingBookName: '',
                creatingBookAuthor: ''
            })
            temp.fetchBookList()
          })
    },
    keyInput(e){
        let type = e.currentTarget.dataset.type,
            key = type == 0?'creatingBookName':'creatingBookAuthor',
            value = e.detail.value;
        temp.setData({
            [key]: value
        })
    },
    // 编辑/更新书名
    bookEdit(e){
        let idx = e.currentTarget.dataset.idx,
            bookList = temp.data.bookList,
            id = bookList[idx].id;
        bookList[idx].edit = !bookList[idx].edit;
        temp.setData({
            bookList: bookList,
            curRecordId: id,
            editingBookName: bookList[idx].bookName
        })
        // 更新操作
        if(!bookList[idx].edit){
            utils.updateBook(temp, (res) => {
                temp.fetchBookList()
                temp.setData({curRecordId: '',editingBookName:''})
            })
        }
    },
    // 书籍名更改
    bookInput(e){
        let value = e.detail.value,
            idx = e.currentTarget.dataset.idx,
            bookList = temp.data.bookList;
        bookList[idx].bookName = value
        temp.setData({
            bookList
        })
    },
    // 书籍删除
    bookDelete(e){
        let idx = e.currentTarget.dataset.idx,
            bookList = temp.data.bookList,
            id = bookList[idx].id,
            bookName = bookList[idx].bookName;
        wx.showModal({
            title: '提示',
            content: '是否删除书籍'+bookName+'？',
            showCancel: true,
            confirmText: '确定',
            confirmColor: '#ff6600',
            cancelText: '取消',
            success (res) {
                if (res.confirm) {
                    temp.setData({
                        curRecordId: id
                    })
                    utils.deleteBook(temp, (res) => {
                        temp.fetchBookList()
                        temp.setData({curRecordId: '',editingBookName:''})
                    })
                //   console.log('用户点击确定')
                } else if (res.cancel) {
                //   console.log('用户点击取消')
                }
            }
        })
    }
})