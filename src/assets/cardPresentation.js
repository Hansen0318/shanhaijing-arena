// Menu-only shared appearance; Tier values are read-only presentation inputs.
export const TIER_BORDER_COLORS=Object.freeze({T0:'#ffffff',T1:'#70d99a',T2:'#70baff',T3:'#c899ff'});
export function decorateSmallCard(host,definition,tier='T0'){
 const level=Object.hasOwn(TIER_BORDER_COLORS,tier)?tier:'T0',color=definition.portrait?.color??'#445565';
 host.dataset.tier=level;host.style.borderColor=TIER_BORDER_COLORS[level];
 host.style.backgroundImage=`linear-gradient(to bottom,color-mix(in srgb,${color} 35%,#101a28),color-mix(in srgb,${color} 80%,#c4d8e5))`;
 return host;
}
