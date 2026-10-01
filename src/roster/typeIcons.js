// Replaceable prototype marks. Type is independent of role, ownership and progression.
const marks=Object.freeze({
 power:Object.freeze({symbol:'◆',label:'Power',color:'#ffc080'}),
 speed:Object.freeze({symbol:'➤',label:'Speed',color:'#8de2bf'}),
 blast:Object.freeze({symbol:'✦',label:'Blast',color:'#c6b0ff'}),
});
export const typeMark=definition=>marks[definition.type];
