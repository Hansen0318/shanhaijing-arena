export function battlePortrait(session,instanceId) {
 const actor=session.actorById(instanceId);
 const definition=actor?session.characterDefinitions[actor.definitionId]:null;
 const slot=instanceId.toUpperCase();
 return {
  label:definition?.portrait?`${slot}\n${definition.name}`:slot,
  color:definition?.portrait?.color ?? (instanceId.startsWith('a')?'#58c8dc':'#ee9475'),
 };
}
