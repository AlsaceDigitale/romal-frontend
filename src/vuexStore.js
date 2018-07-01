export default {
  state: {
    cameraIds: [],
    cameraId: null,
  },
  mutations: {
    setCameraIds(state, cameraIds) {
      if (Object.keys(cameraIds).length === 0) return;

      state.cameraIds = cameraIds;
      if (state.cameraId === null) {
        if (cameraIds['Caméra arrière']) {
          state.cameraId = cameraIds['Caméra arrière'];
        } else {
          state.cameraId = cameraIds[Object.keys(cameraIds)[0]];
        }
      }
    },
  },
};
