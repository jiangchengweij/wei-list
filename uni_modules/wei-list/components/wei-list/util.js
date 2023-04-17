import loadingIconSrc from '@/uni_modules/wei-list/static/loading.gif';
export const allowDown = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAh5JREFUaEPtmT9LxDAYxt+W4uokuLr6Z3HQwUEF13LJYR0U/AJ+CM8P4RcQdDByydFV8BwcdHDxztVVcHKV0EighVqaJk3bk4PcVi553+f3Pk/uSuvBnH+8OdcPDuC/HXQOqBxACO3lv2OMjbtwqzMHMMYPAJBBjCml+w6gZALOAVUsXIQMD4yLkIuQYVRUy1yEXIRchBpOwEWo4QDdr5CL0Kwi1Ov1Vkej0btpvyZ3o3V6GZ0BhNDA87zDJEmOTCFsAaR43/dvhRB3jLGBbmBagFT8eVpoagphA5CJB4A12U8IMWCMXVRBVAIUC9aBqAtg20vrgG3hOgC2PeRAtQBykU0DUwCb2vlIGQHIDWEYrgRBEGf51MXJBEAlnnMexnH8oTvAxg5khaIoWuac35tA6ABU4oMgOCCEfJqIrw0gN0RRtMg5f9JBVAFUiN8hhHybircCSCEWOOevVRAqgArxm4SQnzrirQGyJhjjiQqiDEAlnlK6Xld4tt74EFfctJVC+L5/mX82miTJmfyHLQI3Ed/YgSonAOArDwAAS22Lbw1AFiqLU07wtAvxrQKkEG8AoMvzhFK6YZv54r7GZ6BYEGP8DABbCoEvlNLttsS37kDuTMi3MbsFoY+U0j9vbdoAad2BTBRC6NrzvGN5LYS4YYydtCG48wjlG/T7/St5PRwOT7sQ31mEuhJbVrezCM0KwgHMatKqPs6B/3bgF+vOfkDpcvYrAAAAAElFTkSuQmCC';
export const loadingIcon = loadingIconSrc;

export function getUnit(value) {

  if( typeof value === 'string' &&(value === 'auto' || value.includes('%')) ) {
    value = String(value)
  } else {
    value = getPx(value);
  }
  return value && !isNaN(value) ? `${value}px` : value;
}

export function getPx(value, unit = false) {
	if (value && !isNaN(value)) {
		return unit ? `${value}px` : Number(value)
	}
	if (/(rpx|upx)$/.test(value)) {
		return unit ? `${uni.upx2px(parseInt(value))}px` : Number(uni.upx2px(parseInt(value)))
	}
	return unit ? `${parseInt(value)}px` : parseInt(value)
}
