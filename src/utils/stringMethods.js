export const getFirstTwoSentences = (text) => {
  const sentences = text.split(/[.!?]/)
  const firstTwoSentences = sentences
    .filter((sentence) => sentence.trim() !== "")
    .slice(0, 2)
    .map((sentence) => sentence.trim() + ".")
  return firstTwoSentences.join(" ")
}

export const replacedCategory = (category) => {
  const replacedCategory =
    category.indexOf(" / ") === -1
      ? category.replace(" ", "-")
      : category.substring(0, category.indexOf(" / ")).replace(" ", "-")

  return replacedCategory
}
