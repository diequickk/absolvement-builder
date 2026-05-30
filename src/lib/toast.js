export const toast = {
  success: (message) => {
    if (typeof window !== 'undefined' && window.console) {
      console.info('[toast success]', message);
    }
  },
  error: (message) => {
    if (typeof window !== 'undefined' && window.console) {
      console.error('[toast error]', message);
    }
  },
};
