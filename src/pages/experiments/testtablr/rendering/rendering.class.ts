type RenderingRule = (ifield:IField) => string; 
type RenderingFunc = {handle:string, func:(ifield:IField) => (value:any, setValue:React.Dispatch<any>) => JSX.Element|any}; 



// RENDERING MAPPER ============================= 
export class RenderingMapper { 
  private renderingRules:RenderingRule[] = []; 
  private renderingFuncs:RenderingFunc[] = []; 

  public defaultFunc:(ifield:IField) => (value:any, setValue:React.Dispatch<any>) => JSX.Element|any
    = (ifield:IField) => (value:any, setValue:React.Dispatch<any>) => {return null}; 

  // Constructor -------------------------------- 
  constructor( renderingRules:RenderingRule[], renderingFuncs:RenderingFunc[] ) { 
    this.renderingRules = renderingRules; 
    this.renderingFuncs = renderingFuncs; 
  } 

  // Get Renderer ------------------------------- 
  public GetRenderer(ifield:IField):(value:any, setValue:React.Dispatch<any>) => JSX.Element|any { 
    const rule = this.renderingRules.find( rule => rule(ifield) !== '' ); 
    const handle = rule ? rule(ifield) : ''; 
    const rf = this.renderingFuncs.find( rf => rf.handle === handle ); 
    return rf ? rf.func(ifield): this.defaultFunc(ifield); 
  } 
} 