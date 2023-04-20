<template>
	<view class="content">
    <view class="info">
      <view><text class="info-title">示例</text></view>
      <view><text class="info-text">高性能列表组件，支持瀑布流，兼容nvue，h5，小程序</text></view>
    </view>
		<view class="btn-area">
      <button class="demo-btn" @tap="onRouter('/pages/demo-list/demo-list')">普通列表</button>
			<button class="demo-btn" @tap="onRouter('/pages/demo-waterfall/demo-waterfall')">宫格瀑布流</button>
      <button class="demo-btn" @tap="onRouter('/pages/demo-waterfall/demo-waterfall-absolute1')">普通瀑布流</button>
      <button class="demo-btn" @tap="onRouter('/pages/demo-waterfall/demo-waterfall-absolute2')">智能填坑瀑布流</button>
		</view>
	</view>
</template>

<script setup>
  function onRouter(url) {
    uni.navigateTo({
      url,
    });
  }
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
  .info-title {
    font-size: 16px;
  }
	.info {
    padding: 10px;
		margin-top: 60rpx;
		margin-left: auto;
		margin-right: auto;
    margin-bottom: 50rpx;
	}
  .info-title {
    font-size: 18px;
  }
  .info-text {
    font-size: 14px;
  }
	.btn-area {
		display: flex;
    flex-direction: column;
		align-items: center;
	}
  .demo-btn {
    margin-bottom: 20px;
  }
  .loading {
    width: 30px;
    height: 30px;
  }
</style>
