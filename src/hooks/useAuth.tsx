const useAuth = () => {
  const isAuthenticated: boolean =
    localStorage.getItem("isAuthenticated") &&
    localStorage.getItem("isAuthenticated") == "true"
      ? true
      : false;
  return {
    isAuthenticated,
  };
};
export default useAuth;
