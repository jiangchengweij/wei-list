## 轻量级页面列表组件，支持瀑布流，完美支持nvue，兼容多端的列表组件
注意在nvue下会使用原生渲染方式，即nvue下的list，waterfall。
目前已经在android、ios、h5、微信小程序端测试可正常使用，

### wei-list

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
#### 插槽
+ default 默认列表数据
+ footer 底部插槽
+ refresher 上拉刷新的插槽，只针对nvue起作用

### wei-waterfall

#### 使用说明

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
#### 插槽
+ default 默认列表数据
+ footer 底部插槽
+ refresher 上拉刷新的插槽，只针对nvue起作用

### wei-cell

#### 属性说明

### wei-header

#### 属性说明

