/** Whether the first-load preloader has already played this session; entrance delays depend on it. */
let played = typeof sessionStorage !== 'undefined' && !!sessionStorage.getItem('elevate-loaded')
export const introDelay = () => (played ? 0.15 : 1.6)
export function markIntroPlayed() {
  played = true
}
