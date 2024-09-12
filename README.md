#### [taro](https://taro-docs.jd.com/docs/GETTING-STARTED)

https://github.com/NervJS/taro/issues/10049#issuecomment-1662429775
https://github.com/toFrankie/blog/issues/331


<NavBar
  fixed
  safeAreaInsetTop
  titleAlign='center'
  back={<ArrowLeft />}
  right={
    <>
      <span onClick={e => Toast.show('编辑')}>编辑</span>
      <More onClick={e => Toast.show('icon')} />
    </>
  }
  onBackClick={e => Toast.show('返回')}
>
  <span onClick={e => Toast.show('标题')}>购物车</span>
  <i style={{ marginLeft: '5px' }} className='flex-center' onClick={e => Toast.show('icon')}>
    <Cart />
  </i>
</NavBar>

https://react-icons.github.io/react-icons/
https://juejin.cn/post/7084674623425478686
https://github.com/pmndrs/zustand/blob/main/docs/guides/slices-pattern.md
