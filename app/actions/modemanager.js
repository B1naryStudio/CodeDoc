export const OPEN_NEW_FILE = 'OPEN_NEW_FILE';
export const OPEN_DOCUMENTING = 'OPEN_DOCUMENTING';
export const OPEN_LINE_COMMENTING = 'OPEN_LINE_COMMENTING';

export  function createNewFile(location){
  return {
  	type: OPEN_NEW_FILE
  }
}

export  function openDocumenting(location){
  return {
  	type: OPEN_DOCUMENTING
  }
}

export  function openLineCommenting(location){
  return {
  	type: OPEN_LINE_COMMENTING
  }
}
