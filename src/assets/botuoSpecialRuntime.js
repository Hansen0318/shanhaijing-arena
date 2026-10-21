const state={assetKey:'botuo.specialState',styleId:'protective-guard',type:'mitigation',size:[224,234],offset:[0,-88],layer:4,opacity:.9,reducedOpacity:.78,priority:0};
export const botuoSpecialAction={
 kind:'utility',
 animation:{source:'botuo.specialPoses',frames:[0,200,400,600].map(x=>({x,y:0,width:200,height:200})),fps:6.25,duration:.64,loop:false,staticFrame:2,origin:[.5,.92],scale:200/72},
 frameDurationsMs:[160,160,160,160],reducedGestureMs:160,
 activation:{assetKey:'botuo.specialActivation',size:[320,260],offset:[0,-88],layer:4,durationMs:320,fadeMs:160,opacity:1,reducedOpacity:.8},
 statusVisuals:{primary:state,'boyi.ally':state},
};
