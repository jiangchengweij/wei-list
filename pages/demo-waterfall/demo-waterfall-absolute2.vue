<template>
  <wei-waterfall
    column-count="2"
    left-gap="10"
    right-gap="10"
    column-gap="10"
    :loadmoreoffset="50" 
    @loadmore="onLoadData($event, false)"
    @refresh="onLoadData($event)"
    ref="listRef"
    layout="absolute"
    :autoFill="true"
    :enableLoadmore="true"
  >
    <template #header>
      <wei-header :sticky="true">
        <view class="demo-header">
          <text>固定顶部</text>
        </view>
      </wei-header>
    </template>
    <wei-cell v-for="(item, index) in listData" :index="index" :key="item.id">
      <view class="demo-item">
        <image class="demo-item-image" :src="item.thumb" mode="widthFix"></image>
        <view class="demo-item-content">
          <text class="demo-item-title">{{ item.title }}</text>
          <text class="demo-item-subTitle">{{ item.subTitle }}</text>
          <text class="demo-item-price">{{ item.price }}</text>
        </view>
      </view>
    </wei-cell>
  </wei-waterfall>
</template>

<script setup>
  import { onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';
  import { nextTick, ref } from 'vue';

  const listData = ref([]);
  let isLoading = false;
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
        listData.value = getTestList(20);
      } else {
        const append = getTestList(2);
        listData.value.push(...append);
      }
      if(index >= 100) {
        e.end();
      }
      e.complete();
    }, 1500)
  }

  let index = 0;
  function getTestList(num = 20) {
    const curList = [];
    for(var i=0; i<num; i++) {
      index++;
      curList.push({
        id: 'key_'+index,
        title: '主标题'+index,
        subTitle: index%2==0 ? '端副标题'+index : '长长长长长长长长长长长长长长长副标题'+index,
        price: '￥'+(index * 10),
        thumb: `/static/images/test${(index % 4)+1}.webp`
      })
    }
    return curList;
  }
</script>

<style>
  .demo-header {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    margin-bottom: 10px;
  }
  .demo-item {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background-color: #fff;
    border-radius: 4px;
    overflow: hidden;
  }
  .demo-item-content {
    display: flex;
    flex-direction: column;
    padding: 5px 10px;
  }
  .demo-item-title {
    font-size: 18px;
    margin-bottom: 4px;
  }
  .demo-item-subTitle {
    font-size: 14px;
    margin-bottom: 8px;
  }
  .demo-item-image {
    /* #ifndef APP-NVUE */
    width: 100%;
    /* #endif */
  }
  .demo-item-price {
    font-size: 16px;
    color: #f0ad4e;
  }
</style>
