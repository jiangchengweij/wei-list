## 轻量级页面列表组件，支持瀑布流，完美支持nvue，兼容多端的列表组件
只需要少许的配置就能实现跨越多端的高性能列表。
注意在nvue下会使用原生渲染方式，即nvue下的list，waterfall。
而在非nvue下会使用页面滚动和下拉刷新，因为其性能比scroll-view更好，官方文档都有说明。
目前已经在android、ios、h5、微信小程序端测试可正常使用。

### wei-list
普通的列表的组件，使用和nvue的list一致。
#### 示例
```
<template>
  <wei-list 
    class="wei-list" 
    :loadmoreoffset="30" 
    :enableLoadmore="true"
    @loadmore="onLoadData($event, false)" 
    @refresh="onLoadData($event)"
    ref="listRef"
  >
    <wei-cell v-for="item in listData" :key="item.id">
      <view class="demo-item">

      </view>
    </wei-cell>
  </wei-list>
</template>
<script setup>
  import { onLoad, onPullDownRefresh, onReachBottom  } from '@dcloudio/uni-app';
  import { ref } from 'vue';
  
  const listData = ref([]);
  const listRef = ref(null);
  
  onLoad(() => {
    setTimeout(() => {
      listRef.value.reload()
    }, 100)
  }) 
  
  onPullDownRefresh(() => {
    listRef.value.reload()
  })
  
  onReachBottom(() => {
    listRef.value.loadMore()
  })
  
  function onLoadData(e, isRefresh = true) {
    setTimeout(() => {
      if(isRefresh) {
        index = 0;
        //请求接口数据
        listData.value = getFetcheData(20); 
      } else {
        //请求加载更多接口数据
        const append = getFetcheData(2);
        listData.value.push(...append);
      }
      if(index >= 24) {
        e.end();
      }
      e.complete();
    }, 1500)
  }
</script>
```
#### 属性说明

|属性名	           |类型	      |默认值	|说明	  |
|:--:|:--:|:--:|:--:|
|showScrollbar     |Boolean   |true   |控制是否出现滚动条|
|refresherEnable   |Boolean   |false  |是否启用下拉刷新，必须同pages配置enablePullDownRefresh相同|
|enableLoadmore    |Boolean   |false  |控制是否出现滚动条|
|loadingTextConfig |Object    |{ loading: '正在加载...', finished: '没有更多了', error: '' }  |加载文案|
|bounce            |Boolean   |true  |加载文案|
|loadmoreoffset    |Number    |10  |控制 onscroll 事件触发的频率：表示两次onscroll事件之间列表至少滚动了10px。注意，将该值设置为较小的数值会提高滚动事件采样的精度，但同时也会降低页面的性能|
|scrollable        |Boolean   |true  |是否允许List滚动|
|enableBackToTop   |Boolean   |false  |iOS点击顶部状态栏滚动条返回顶部，只支持竖向|
|@reload   |Function   |  |重新加载数据，也是初始化数据|
|@loadmore   |Boolean   |  |加载更多事件|

#### 方法
|方法名称  |说明  |参数 |
|:--:|:--:|:--:|:--:|
|reload  |手动触发重新加载  | |
|loadMore  |触发加载更多事件  | |
|loadMore  |触发加载更多事件  | |
|completeLoading  |触发加载完成  | |
|endLoading  |触发加载结束  | |
|completeRefresh  |触发刷新结束  | |
|getListRef  |获取的内部列表组件的引用  | |
#### 插槽
+ default 默认列表数据
+ footer 底部插槽
+ refresher 上拉刷新的插槽，只针对nvue起作用

### wei-waterfall
瀑布流组件，对应nvue的wei-waterfall,支持grid和absolute布局，通过属性layout设置。
grid布局使用css支持的grid布局演示，纯css实现，所以性能是损耗是最低的，但是缺点就是子cell高度都是一致的。
absolute布局会形成高度掺杂不齐的瀑布流效果，通过自动计算元素的高度设置absolute的top,left插入。
有时候每一列的子元素会因为数据越来越多，导致两边的高度相差越来越大，此时可以配置autoFill为true开启智能自动填坑模式，
尽可能的元素会往最凹的地方排列。absolute布局在nvue下无效，因为nvue已经是高度掺杂不齐的普通流。此组件具体可参考示例。

#### 示例
```
<template>
  <wei-waterfall
    column-count="2"
    left-gap="10"
    right-gap="10"
    column-gap="10"
    row-gap="10"
    :loadmoreoffset="50" 
    @loadmore="onLoadData($event, false)"
    @refresh="onLoadData($event)"
    :enableLoadmore="true"
    ref="listRef"
  >
    <template #header>
      <wei-header :sticky="true">

      </wei-header>
    </template>
    <template #footer>
      
    </template>
    <wei-cell v-for="(item, index) in listData" :index="index" :key="item.id">
      <view class="demo-item">
      </view>
    </wei-cell>
  </wei-waterfall>
</template>

<script setup>
  import { onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
  import { nextTick, ref } from 'vue';

  const listData = ref([]);
  const listRef = ref(null);
  
  onLoad(() => {
    setTimeout(() => {
      listRef.value.reload()
    }, 100)
  })
  
  onPullDownRefresh(() => {
    listRef.value.reload()
  })
  
  onReachBottom(() => {
    listRef.value.loadMore()
  })

  function onLoadData(e, isRefresh = true) {
    setTimeout(() => {
      if(isRefresh) {
        index = 0;
        //请求接口数据
        listData.value = getFetcheData(20); 
      } else {
        //请求加载更多接口数据
        const append = getFetcheData(2);
        listData.value.push(...append);
      }
      if(index >= 100) {
        e.end();
      }
      e.complete();
    }, 1500)
  }
</script>
```
#### 属性说明

|属性名	           |类型	      |默认值	|说明	  |
|:--:|:--:|:--:|:--:|
|layout            |String    |grid   |瀑布流布局方式,可选值 grid,absolute|
|autoFill          |Boolean   |false  |是否启用智能填坑模式|
|columnCount       |Number    |1      |每行列数|
|columnWidth       |Number    |auto   |每行宽度，不指定会自动计算|
|columnGap         |Number    |32     |每列间隔|
|rowGap            |Number    |0      |每行间隔|
|leftGap           |Number    |0      |左边cell和列表的间隙. 如果未指定 ，则对应 0|
|rightGap          |Number    |0      |右边cell和列表的间隙. 如果未指定，则对应 0|
|delay             |Number    |200    |延时渲染子cell，在layout=absolute时启用|
|showScrollbar     |Boolean   |true   |控制是否出现滚动条|
|refresherEnable   |Boolean   |false  |是否启用下拉刷新，必须同pages配置enablePullDownRefresh相同|
|enableLoadmore    |Boolean   |false  |控制是否出现滚动条|
|loadingTextConfig |Object    |{ loading: '正在加载...', finished: '没有更多了', error: '' }  |加载文案|
|bounce            |Boolean   |true  |加载文案|
|loadmoreoffset    |Number    |10  |控制 onscroll 事件触发的频率：表示两次onscroll事件之间列表至少滚动了10px。注意，将该值设置为较小的数值会提高滚动事件采样的精度，但同时也会降低页面的性能|
|scrollable        |Boolean   |true  |是否允许List滚动|
|enableBackToTop   |Boolean   |false  |iOS点击顶部状态栏滚动条返回顶部，只支持竖向|
|@reload   |Function   |  |重新加载数据，也是初始化数据|
|@loadmore   |Boolean   |  |加载更多事件|

#### 方法
|方法名称  |说明  |参数 |
|:--:|:--:|:--:|:--:|
|reload  |手动触发重新加载  | |
|loadMore  |触发加载更多事件  | |
|loadMore  |触发加载更多事件  | |
|completeLoading  |触发加载完成  | |
|endLoading  |触发加载结束  | |
|completeRefresh  |触发刷新结束  | |
|getListRef  |获取的内部列表组件的引用  | |
#### 插槽
+ default 默认列表数据
+ header 头部插槽
+ footer 底部插槽
+ refresher 上拉刷新的插槽，只针对nvue起作用

### wei-cell
子部渲染项，对应nvue的cell
次组件必须值wei-list，wei-waterfall的直接组件
#### 属性说明
|属性名 |类型 |默认值	|说明	|
|:--:|:--:|:--:|:--:|
|keepScollPosition|Boolean|false|它控制插入单元格后是否保持最后一个滑动位置。只支持nvue|
|insetAnimation|string|false|cell 的插入动画。当前只支持 none 和 default。只支持nvue|
|delete-animation|string|false|cell 的删除动画。当前只支持 none 和 default。只支持nvue
|recycle|Boolean|true|这个属性控制这个 Cell 的 view 和子 views 是否在列表滚动时进行回收。只支持nvue|
|renderReversePosition|Boolean|false|定义开始渲染的位置。只支持nvue|

### wei-header
头部组件，对应nvue的header,
次组件必须值wei-list，wei-waterfall的直接组件
#### 属性说明
|属性名 |类型 |默认值	|说明	|
|:--:|:--:|:--:|:--:|
|sticky|Boolean|false|是否固定在顶部,wei-waterfall下有效，wei-list无论何值，都会固定顶部，为了和nvue的list使用保持一致|
|top|Number|0|固定顶部的距离|
|zIndex|Number|99|层叠属性值|
