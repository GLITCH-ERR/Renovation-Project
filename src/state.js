const DATA_URL = "./assets/requests.json";
 
const state = {
  query: "",
  activeFilter: "all",
  selectedId: null,
  requests: [],
  isLoading: false,
  error: null,
};
 
/*validation*/
 
function isValidRequest(item) {
  return (
    item
    && typeof item === "object"
    && typeof item.id === "string"
    && typeof item.title === "string"
    && typeof item.description === "string"
    && typeof item.email === "string"
    && typeof item.category === "string"
  );
}
 
 
const errorDescriptors = [
  {
    test: (err) => err.name === "AbortError",
    message: "The request timed out. Please try again.",
    showRetry: true,
  },
  {
    test: (err) => err instanceof TypeError,
    message: "Network error. Please check your connection and try again.",
    showRetry: true,
  },
  {
    test: (err) => err.message && err.message.startsWith("HTTP"),
    message: "Server error. Please try again later.",
    showRetry: true,
  },
];
 
const defaultDescriptor = {
  message: "An unexpected error occurred. Please try again.",
  showRetry: true,
};
 
function getErrorDisplay(error) {
  return errorDescriptors.find((d) => d.test(error)) || defaultDescriptor;
}
 
/*selectors*/
 
function getFilteredRequests() {
  const normalizedQuery = state.query.trim().toLowerCase();
 
  return state.requests.filter((req) => {
    const matchesQuery = normalizedQuery === ""
      || req.title.toLowerCase().includes(normalizedQuery)
      || req.description.toLowerCase().includes(normalizedQuery);
 
    const matchesFilter = state.activeFilter === "all"
      || req.category === state.activeFilter;
 
    return matchesQuery && matchesFilter;
  });
}
 
function getSortedRequests() {
  return [...getFilteredRequests()].sort(
    (a, b) => new Date(b.created) - new Date(a.created)
  );
}
 
export {
  DATA_URL,
  getErrorDisplay,
  getFilteredRequests,
  getSortedRequests,
  isValidRequest,
  state,
};