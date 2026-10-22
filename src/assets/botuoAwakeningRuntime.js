// Accepted display density and support anchor: original root(200,274), crop(100,80).
export const botuoAwakeningAction={
 kind:'area-observed',
 animation:{source:'botuo.awakeningPoses',frames:[0,200,400,600].map(x=>({x,y:0,width:200,height:200})),duration:1.26,loop:false,staticFrame:2,origin:[.5,.97],scale:200/72},
 frameDurationsMs:[450,450,180,180],impactFrame:2,coordinateSize:[200,200],
 blade:{assetKey:'botuo.awakeningRelease',offset:[-161.5,42.5],size:[523,283],layer:4,attach:'fixed',holdAfterResolveMs:360},
 contact:{assetKey:'botuo.awakeningImpact',offset:[-146.5,-146.5],size:[293,293],layer:7,attach:'target',retainOnNextCast:true,durationMs:240},
 statusVisuals:{'boyi.team':{assetKey:'botuo.awakeningState',styleId:'earth-mitigation',type:'mitigation',size:[232,162],offset:[0,-10],layer:4,opacity:1,reducedOpacity:.48,priority:1}},
};
