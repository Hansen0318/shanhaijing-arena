// Isolate active-skill contracts from separately verified conditional support healing.
export function disableSupport(session){for(const [id,entries]of session.passives.entries){const keep=entries.filter(e=>e.definition.trigger.kind!=='rear-support');if(keep.length)session.passives.entries.set(id,keep);else session.passives.entries.delete(id);}return session;}
