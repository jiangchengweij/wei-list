export default {
  showScrollbar: {
    type: Boolean,
    default: false,
  },
  columnCount: {
    type: [String, Number],
    default: 'auto',
  },
  columnWidth: {
    type: [String, Number],
    default: 'auto',
  },
  columnGap: {
    type: [String, Number],
    default: 32,
  },
  delay: {
    type: Number,
    default: 200
  },
  rowGap: {
    type: [String, Number],
    default: 10,
  },
  leftGap: {
    type: [String, Number],
    default: 0,
  },
  rightGap: {
    type: [String, Number],
    default: 0,
  },
  alwaysScrollableVertical: {
    type: Boolean,
    default: false,
  },
  bounce: {
    type: Boolean,
    default: false,
  },
  loadmoreoffset: {
    type: Number,
    default: 0,
  },
  offsetAccuracy: {
    type: Number,
    default: 10,
  },
  pageEnabled: {
    type: Boolean,
    default: null,
  },
  scrollable: {
    type: Boolean,
    default: null,
  },
  enableBackToTop: {
    type: Boolean,
    default: false,
  },
  renderReverse: {
    type: Boolean,
    default: false,
  },
  refresherEnable: {
    type: Boolean,
    default: false,
  },
  refreshTextConfig: {
    type: Object,
    default: null,
  },
  layout: {
    type: String,
    default: 'grid',
  },
  autoFill: {
    type: Boolean,
    default: false
  },
  enableLoadmore: {
    type: Boolean,
    default: false,
  }
}