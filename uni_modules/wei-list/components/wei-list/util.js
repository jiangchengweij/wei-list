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
