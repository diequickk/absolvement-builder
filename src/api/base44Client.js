export const base44 = {
  entities: {
    Build: {
      create: async (data) => {
        console.warn('base44Client stub: no API configured', data);
        return Promise.resolve({ success: true, data });
      },
    },
  },
};
