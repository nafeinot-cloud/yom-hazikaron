// Shared helpers for rendering a person's name in its different forms.

/** The religious/patronymic form used in prayers: "ישראל בן משה יוסף". */
export function religiousName(person) {
  const rel = person.gender === 'female' ? 'בת' : 'בן';
  return person.fatherName ? `${person.firstName} ${rel} ${person.fatherName}` : person.firstName;
}

/** Casual display form for cards/headers: "ישראל עינות". */
export function displayName(person) {
  return person.lastName ? `${person.firstName} ${person.lastName}` : person.firstName;
}

/** ז״ל for a man, ע״ה for a woman. */
export function honorific(person) {
  return person.gender === 'female' ? 'ע״ה' : 'ז״ל';
}

/** "(בת אברהם)" / "(בן אברהם)" — father's-name suffix for headers, e.g. the mishnayot and tefila tabs. */
export function fatherNameSuffix(person) {
  if (!person.fatherName) return '';
  const rel = person.gender === 'female' ? 'בת' : 'בן';
  return ` (${rel} ${person.fatherName})`;
}
