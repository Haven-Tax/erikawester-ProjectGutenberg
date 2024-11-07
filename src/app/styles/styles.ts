export const styles = {
  layout: {
    // page: "min-h-screen bg-[#FDF8F6]", // Haven uses a warm off-white background
    // wrapper: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    page: "min-h-screen bg-[#FDF8F6] p-4", // Added p-4 for testing
    wrapper: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border border-gray-200", // Added border for testing
    section: "space-y-12",
    grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
  },

  text: {
    h1: "text-5xl font-serif text-[#2D2A27] mb-6",
    h2: "text-2xl font-bold text-gray-800 mb-4",
    h3: "text-lg font-semibold text-gray-700 mb-2",
    body: "text-gray-600",
    meta: "text-sm text-gray-500",
    pre: "whitespace-pre-wrap font-sans text-gray-700",
  },

  button: {
    primary:
      "bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors",
    secondary:
      "bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors",
    tertiary:
      "bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors",
    disabled:
      "bg-gray-300 text-gray-500 cursor-not-allowed px-6 py-3 rounded-lg",
  },

  input: {
    container: "flex gap-4 items-center",
    field:
      "flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none",
  },

  contentStyle: {
    scroll: "max-h-[400px] overflow-y-auto border rounded-lg p-4 bg-gray-50",
    card: "p-4 border rounded-lg hover:bg-gray-50 transition-colors",
  },

  link: {
    default:
      "text-blue-600 hover:underline hover:text-blue-800 transition-colors",
    nav: "text-gray-600 hover:text-gray-800 transition-colors",
  },
};
