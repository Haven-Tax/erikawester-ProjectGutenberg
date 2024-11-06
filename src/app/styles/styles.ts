export const styles = {
  layout: {
    page: "min-h-screen bg-blue-50 p-8",
    wrapper: "max-w-6xl mx-auto space-y-8",
    card: "bg-white rounded-lg shadow-md p-6",
    section: "space-y-8",
    grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
  },

  text: {
    h1: "text-4xl font-bold text-gray-800 mb-8",
    h2: "text-2xl font-bold text-gray-800 mb-4",
    h3: "text-lg font-semibold text-gray-700 mb-2",
    body: "text-gray-600",
    meta: "text-sm text-gray-500",
    pre: "whitespace-pre-wrap font-sans text-gray-700",
  },

  button: {
    primary: "bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors",
    secondary: "bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors",
    tertiary: "bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors",
    disabled: "bg-gray-300 text-gray-500 cursor-not-allowed px-6 py-3 rounded-lg",
  },

  input: {
    container: "flex gap-4 items-center",
    field: "flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none",
  },

  contentStyle: {
    scroll: "max-h-[400px] overflow-y-auto border rounded-lg p-4 bg-gray-50",
    card: "p-4 border rounded-lg hover:bg-gray-50 transition-colors",
  },

  link: {
    default: "text-blue-600 hover:underline hover:text-blue-800 transition-colors",
    nav: "text-gray-600 hover:text-gray-800 transition-colors",
  }
};
