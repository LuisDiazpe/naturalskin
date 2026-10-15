// Iconos (sprite). Se usan con <Icon id="spark" /> → <svg><use href="#i-spark" /></svg>
export default function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <symbol id="i-spark" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.6" d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z" /></symbol>
      <symbol id="i-chat" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.7" d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /></symbol>
      <symbol id="i-chat-dots" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /><path d="M8.5 11h.01M12 11h.01M15.5 11h.01" /></g></symbol>
      <symbol id="i-check" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.8" d="M5 12l4 4 10-10" /></symbol>
      <symbol id="i-leaf" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.6" d="M5 19c0-8 6-14 15-14 0 9-6 15-14 15M5 19l7-7" /></symbol>
      <symbol id="i-drop" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.6" d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z" /></symbol>
      <symbol id="i-shield" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.6" d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" /></symbol>
      <symbol id="i-list" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.5" d="M9 6h11M9 12h11M9 18h11M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2" /></symbol>
      <symbol id="i-plus" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="2" d="M12 5v14M5 12h14" /></symbol>
      <symbol id="i-arrow" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.8" d="M5 12h14M13 6l6 6-6 6" /></symbol>
      <symbol id="i-phone" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.6" d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></symbol>
      <symbol id="i-menu" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.8" d="M4 7h16M4 12h16M4 17h10" /></symbol>
      <symbol id="i-close" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeWidth="1.8" d="M6 6l12 12M18 6L6 18" /></symbol>
    </svg>
  );
}
