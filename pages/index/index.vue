<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="btn-area">
      <button class="demo-btn" @tap="onRouter('/pages/demo-list/demo-list')">list</button>
			<button class="demo-btn" @tap="onRouter('/pages/demo-waterfall/demo-waterfall')">watefall</button>
		</view>
	</view>
</template>

<script setup>
  function onRouter(url) {
    uni.navigateTo({
      url,
    })
  }
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.btn-area {
		display: flex;
    flex-direction: column;
		align-items: center;
	}
  
  .demo-btn {
    margin-bottom: 20px;
  }
  
</style>
