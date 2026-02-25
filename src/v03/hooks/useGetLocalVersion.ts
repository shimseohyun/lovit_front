const currentVersion = "1.0.0";

const useGetLocalVersion = () => {
  const localVersion = localStorage.getItem("STORAGE_VERSION_KEY");

  if (!localVersion) {
    localStorage.setItem("STORAGE_VERSION_KEY", currentVersion);
    return;
  }

  if (localVersion === currentVersion) return;

  localStorage.clear();
  localStorage.setItem("STORAGE_VERSION_KEY", currentVersion);

  return;
};

export default useGetLocalVersion;
