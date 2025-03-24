const backendUrl = import.meta.env.VITE_BACKEND_URL;

if (!backendUrl) {
  throw new Error('Missing backend URL');
}

export default backendUrl;
