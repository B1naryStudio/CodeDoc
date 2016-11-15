export const SHOW_MODAL_WINDOW = "SHOW_MODAL_WINDOW";
export const HIDE_MODAL_WINDOW = "HIDE_MODAL_WINDOW";

export function showModal() {
  return {
    type: SHOW_MODAL_WINDOW
  }
}

export function hideModal() {
  return {
    type: HIDE_MODAL_WINDOW
  }
}
