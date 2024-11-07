export const styles = {
  layout: {
    page: "min-h-screen bg-[#FDF8F6] pb-16",
    wrapper: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    section: "space-y-16 py-12",
    grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr",
  },

  text: {
    h1: "text-6xl font-['Inter'] text-[#2D2A27] mb-8 leading-tight",
    h2: "text-[2.5rem] font-serif text-[#2D2A27] mb-6",
    h3: "text-xl font-semibold text-[#2D2A27] mb-4",
    body: "text-[#4A4A4A] text-lg",
    meta: "text-sm text-[#6B6B6B]",
    pre: "whitespace-pre-wrap font-sans text-[#4A4A4A]",
  },

  button: {
    primary: `
      bg-[#4A4A4A] text-white px-8 py-4 rounded-full 
      hover:bg-[#2D2A27] transition-colors duration-200
      text-lg font-medium
    `,
    secondary: `
      bg-[#5C5C5C] text-white px-6 py-3 rounded-full
      hover:bg-[#4A4A4A] transition-colors duration-200
    `,
    tertiary:
      "bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors",
    disabled:
      "bg-gray-300 text-gray-500 cursor-not-allowed px-6 py-3 rounded-lg",
  },

  input: {
    container: "flex gap-4 items-center max-w-2xl mx-auto mt-8",
    field: `
    flex-1 p-4 rounded-full border-2 border-[#E5E5E5]
    focus:ring-2 focus:ring-[#4A4A4A] focus:border-[#4A4A4A]
      outline-none text-lg
    `,
  },

  contentStyle: {
    scroll: "max-h-[400px] overflow-y-auto border rounded-lg p-4 bg-gray-50",
    card: "p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow",
  },

  link: {
    default: "text-[#4A4A4A] hover:text-[#2D2A27] transition-colors",
    nav: "text-[#4A4A4A] hover:text-[#2D2A27] font-medium transition-colors",
  },

  card: {
    container: "flex flex-col h-full p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow",
    title: "text-2xl font-bold mb-2",
    author: "text-lg text-gray-600 mb-4",
    meta: "text-sm text-gray-500 mb-2",
    button: "mt-auto",
  },
};
