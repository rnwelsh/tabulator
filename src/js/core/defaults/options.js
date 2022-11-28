export default {

  /** flag to console log events */
  debugEventsExternal:false, 
  /** flag to console log events */
  debugEventsInternal:false, 
  /** allow toggling of invalid option warnings */
  debugInvalidOptions:true, 
  /** allow toggling of invalid component warnings */
  debugInvalidComponentFuncs:true, 
  /** allow toggling of pre initialization function call warnings */
  debugInitialization:true, 
  /** allow toggling of deprecation warnings */
  debugDeprecation:true, 

  /** height of tabulator */
  height:false, 
  /** minimum height of tabulator */
  minHeight:false, 
  /** maximum height of tabulator */
  maxHeight:false, 

  /** vertical alignment of column headers */
  columnHeaderVertAlign:"top", 

  popupContainer:false,

  /** store for colum header info */
  columns:[],
  /** store column default props */
  columnDefaults:{}, 

  /** default starting data */
  data:false, 

  /** build columns from data row structure */
  autoColumns:false, 
  autoColumnsDefinitions:false,

  /** separator for nested data */
  nestedFieldSeparator:".", 

  /** hold footer element */
  footerElement:false, 

  /** filed for row index */
  index:"id", 

  textDirection:"auto",

  /** position to insert blank rows, top|bottom */
  addRowPos:"bottom", 

  /** hide header */
  headerVisible:true, 

  renderVertical:"virtual",
  renderHorizontal:"basic",
  /** set virtual DOM buffer size */
  renderVerticalBuffer:0, 

  scrollToRowPosition:"top",
  scrollToRowIfVisible:true,

  scrollToColumnPosition:"left",
  scrollToColumnIfVisible:true,

  rowFormatter:false,
  rowFormatterPrint:null,
  rowFormatterClipboard:null,
  rowFormatterHtmlOutput:null,

  rowHeight:null,

  placeholder:false,

  dataLoader:true,
  dataLoaderLoading:false,
  dataLoaderError:false,
  dataLoaderErrorTimeout:3000,

  dataSendParams:{},

  dataReceiveParams:{},
};
